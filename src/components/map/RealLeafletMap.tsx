import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Play, 
  Pause, 
  Layers, 
  Eye, 
  Radio, 
  Wind, 
  ShieldAlert, 
  Crosshair, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Compass,
  AlertTriangle,
  Info,
  MapPin,
  Satellite,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCyclone, TIMELINE_STEPS } from '../../context/CycloneContext';
import { CycloneTrackPoint } from '../../types/cyclone';

interface RealLeafletMapProps {
  heightClassName?: string;
  showFullControls?: boolean;
  activeLayerPreset?: 'STANDARD' | 'SATELLITE_ONLY';
}

export const RealLeafletMap: React.FC<RealLeafletMapProps> = ({
  heightClassName = 'h-[500px] md:h-[640px]',
  showFullControls = true,
  activeLayerPreset = 'STANDARD'
}) => {
  const { 
    theme,
    selectedCyclone, 
    timelineStep, 
    setTimelineStep, 
    isPlayingSimulation, 
    setIsPlayingSimulation,
    mapLayers,
    toggleMapLayer,
    mapCenter,
    setMapCenter,
    mapZoom,
    setMapZoom,
    formatWind,
    formatPressure
  } = useCyclone();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [mousePosition, setMousePosition] = useState<{ lat: string; lng: string }>({ lat: '19.5° N', lng: '83.0° E' });
  const [isLayersCollapsed, setIsLayersCollapsed] = useState(false);

  // Free OpenStreetMap tile URL (100% Free & Open-Source, No API Key Required)
  const getTileUrl = (isSatellite: boolean) => {
    if (isSatellite) {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    return 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        minZoom: 3,
        maxZoom: 18,
        zoomControl: false,
        attributionControl: true
      });

      // Free, open-source OpenStreetMap base tile layer (No API Key Required)
      const tileLayer = L.tileLayer(getTileUrl(mapLayers.satellite), {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Layer group for dynamic vectors (tracks, cones, markers)
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;

      map.on('mousemove', (e) => {
        setMousePosition({
          lat: `${Math.abs(e.latlng.lat).toFixed(2)}° ${e.latlng.lat >= 0 ? 'N' : 'S'}`,
          lng: `${Math.abs(e.latlng.lng).toFixed(2)}° ${e.latlng.lng >= 0 ? 'E' : 'W'}`
        });
      });

      map.on('moveend', () => {
        const c = map.getCenter();
        setMapCenter([c.lat, c.lng]);
        setMapZoom(map.getZoom());
      });

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map instance alive
    };
  }, []);

  // Update base tile when satellite mode is toggled
  useEffect(() => {
    if (tileLayerRef.current && mapInstanceRef.current) {
      tileLayerRef.current.setUrl(getTileUrl(mapLayers.satellite));
    }
  }, [mapLayers.satellite]);

  // Handle map resize on container layout change
  useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };
    window.addEventListener('resize', handleResize);
    const t = setTimeout(handleResize, 300);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, []);

  // Redraw Vector Layers
  useEffect(() => {
    if (!layerGroupRef.current || !mapInstanceRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    const curr = selectedCyclone.currentPosition;
    const history = selectedCyclone.trackHistory || [];
    const forecast = selectedCyclone.forecastTrack || [];

    // 1. Historical Best Track Polyline (Cyan dashed)
    if (mapLayers.historicalTrack && history.length > 0) {
      const historyPoints: L.LatLngTuple[] = history.map((p: CycloneTrackPoint) => [p.lat, p.lng]);
      historyPoints.push([curr.lat, curr.lng]);

      L.polyline(historyPoints, {
        color: '#0284c7',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '4, 6',
        lineCap: 'round'
      }).addTo(layerGroup);

      // Historical waypoints
      history.forEach((pt: CycloneTrackPoint) => {
        const marker = L.circleMarker([pt.lat, pt.lng], {
          radius: 4,
          fillColor: '#0284c7',
          color: '#ffffff',
          weight: 1.5,
          fillOpacity: 0.9
        }).addTo(layerGroup);

        marker.bindPopup(`
          <div class="p-1 text-xs font-sans">
            <div class="font-bold text-ops-cyan">${selectedCyclone.name} Past Track</div>
            <div class="text-xs text-ops-text">${pt.timestamp}</div>
            <div class="font-mono text-ops-amber">${formatWind(pt.windKts)} · ${formatPressure(pt.pressureHpa)}</div>
            <div class="text-[10px] text-ops-text-muted font-mono">${pt.lat.toFixed(2)}°N, ${pt.lng.toFixed(2)}°E</div>
          </div>
        `);
      });
    }

    // 2. Forecast Track Polyline & Uncertainty Cone
    if (forecast.length > 0) {
      const forecastPoints: L.LatLngTuple[] = [[curr.lat, curr.lng], ...forecast.map((p: CycloneTrackPoint) => [p.lat, p.lng] as L.LatLngTuple)];

      // 2a. Uncertainty Cone (67% probability envelope)
      if (mapLayers.uncertaintyCone) {
        const coneLeft: L.LatLngTuple[] = [];
        const coneRight: L.LatLngTuple[] = [];

        forecast.forEach((pt: CycloneTrackPoint) => {
          const spreadKm = pt.radiusKm || 60;
          const latSpread = spreadKm / 111;
          const lngSpread = spreadKm / (111 * Math.cos(pt.lat * (Math.PI / 180)));

          coneLeft.push([pt.lat + latSpread * 0.7, pt.lng - lngSpread * 0.7]);
          coneRight.unshift([pt.lat - latSpread * 0.7, pt.lng + lngSpread * 0.7]);
        });

        const conePolygonPoints: L.LatLngTuple[] = [[curr.lat, curr.lng], ...coneLeft, ...coneRight];

        L.polygon(conePolygonPoints, {
          fillColor: '#ea580c',
          fillOpacity: 0.18,
          color: '#ea580c',
          weight: 1.5,
          dashArray: '3, 4'
        }).addTo(layerGroup);
      }

      // 2b. Forecast centerline track (Amber solid)
      if (mapLayers.forecastTrack) {
        L.polyline(forecastPoints, {
          color: '#ea580c',
          weight: 3.5,
          opacity: 0.95,
          lineCap: 'round'
        }).addTo(layerGroup);

        // Forecast waypoints
        forecast.forEach((pt: CycloneTrackPoint, idx: number) => {
          const isLandfall = idx === 1 || pt.category.toLowerCase().includes('landfall') || idx === forecast.length - 1;
          const markerColor = isLandfall ? '#dc2626' : '#ea580c';

          const marker = L.circleMarker([pt.lat, pt.lng], {
            radius: isLandfall ? 6 : 4.5,
            fillColor: markerColor,
            color: '#ffffff',
            weight: 2,
            fillOpacity: 1
          }).addTo(layerGroup);

          marker.bindPopup(`
            <div class="p-1 text-xs font-sans">
              <div class="font-bold ${isLandfall ? 'text-ops-red' : 'text-ops-amber'}">
                ${isLandfall ? '⚠️ PROJECTED LANDFALL' : 'FORECAST POSITION'} (${pt.timeOffset})
              </div>
              <div class="text-xs text-ops-text">${pt.timestamp}</div>
              <div class="font-mono font-bold text-ops-amber">${formatWind(pt.windKts)} · ${formatPressure(pt.pressureHpa)}</div>
              <div class="text-[11px] text-ops-text-muted">${pt.category}</div>
              <div class="text-[10px] text-ops-text-dim mt-1">Uncertainty Radius: ±${pt.radiusKm || 60} km</div>
            </div>
          `);
        });
      }
    }

    // 3. Wind Radii Buffers
    if (mapLayers.windField) {
      L.circle([curr.lat, curr.lng], {
        radius: 180000,
        fillColor: '#0ea5e9',
        fillOpacity: 0.1,
        color: '#0ea5e9',
        weight: 1,
        dashArray: '2, 4'
      }).addTo(layerGroup);

      L.circle([curr.lat, curr.lng], {
        radius: 90000,
        fillColor: '#ea580c',
        fillOpacity: 0.12,
        color: '#ea580c',
        weight: 1.2
      }).addTo(layerGroup);

      L.circle([curr.lat, curr.lng], {
        radius: 45000,
        fillColor: '#dc2626',
        fillOpacity: 0.2,
        color: '#dc2626',
        weight: 1.5
      }).addTo(layerGroup);
    }

    // 4. Coastal Vulnerability Risk Zones
    if (mapLayers.coastalRiskZones) {
      const coastalRiskCoords: L.LatLngTuple[] = [
        [21.6, 86.8], [21.8, 87.5], [21.9, 88.2], [22.2, 88.8],
        [22.0, 89.1], [21.5, 88.4], [21.3, 87.4], [21.2, 86.9]
      ];
      L.polygon(coastalRiskCoords, {
        fillColor: '#dc2626',
        fillOpacity: 0.22,
        color: '#dc2626',
        weight: 2,
        dashArray: '4, 4'
      }).addTo(layerGroup).bindPopup(`
        <div class="p-1 text-xs font-sans">
          <div class="font-bold text-ops-red">⚠️ HIGH COASTAL SURGE ALERT ZONE</div>
          <div class="text-xs text-ops-text">Dhamra / Chandbali / Digha Coastal Belt</div>
          <div class="text-xs font-mono text-ops-amber mt-1">Expected Storm Surge: 1.5m – 2.5m</div>
          <div class="text-[10px] text-ops-text-muted">Evacuation & Fishermen Warnings Active</div>
        </div>
      `);
    }

    // 5. Current Cyclone Eye Core Marker
    const cycloneIcon = L.divIcon({
      className: 'cyclone-eye-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-ops-amber/30 animate-ping absolute"></div>
          <div class="w-7 h-7 rounded-full bg-ops-amber/60 animate-pulse absolute"></div>
          <div class="w-4 h-4 rounded-full bg-white border-2 border-ops-amber shadow-lg z-10 flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-ops-amber"></div>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    const eyeMarker = L.marker([curr.lat, curr.lng], { icon: cycloneIcon }).addTo(layerGroup);
    eyeMarker.bindPopup(`
      <div class="p-1.5 text-xs font-sans max-w-xs">
        <div class="flex items-center gap-1.5 border-b border-ops-border pb-1 mb-1">
          <span class="w-2 h-2 rounded-full bg-ops-amber animate-pulse"></span>
          <strong class="text-ops-amber font-sans uppercase">${selectedCyclone.name} (${selectedCyclone.code})</strong>
        </div>
        <div class="font-mono text-ops-cyan text-xs font-bold">${selectedCyclone.category}</div>
        <div class="mt-1 space-y-0.5 text-xs font-mono">
          <div>Winds: <strong class="text-ops-amber">${formatWind(selectedCyclone.maxSustainedWindKts)}</strong> (Gusts ${selectedCyclone.windGustsKts} kts)</div>
          <div>Pressure: <strong class="text-ops-cyan">${formatPressure(selectedCyclone.minCentralPressureHpa)}</strong></div>
          <div>Location: <strong>${curr.coordinatesFormatted}</strong></div>
          <div>Moving: <strong>${selectedCyclone.movementVector.direction} @ ${formatWind(selectedCyclone.movementVector.speedKts)}</strong></div>
          <div class="text-ops-red font-bold pt-0.5">ETA: ${selectedCyclone.landfallEta} -> ${selectedCyclone.landfallLocation}</div>
        </div>
      </div>
    `);

  }, [selectedCyclone, mapLayers, theme]);

  const handleFocusIndia = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([19.5, 83.0], 5, { duration: 1.2 });
    }
  };

  const handleFocusStorm = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedCyclone.currentPosition.lat, selectedCyclone.currentPosition.lng],
        6,
        { duration: 1.2 }
      );
    }
  };

  const handleZoom = (delta: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + delta);
    }
  };

  return (
    <div className={`relative w-full rounded-xl overflow-hidden border border-ops-border shadow-ops-card select-none ${mapLayers.satellite ? 'satellite-mode' : ''} ${heightClassName}`}>
      {/* Real Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* TOP LEFT: Quick Region & Status Badge (Compact on mobile) */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-ops-card/95 border border-ops-border rounded-lg sm:rounded-xl p-2 sm:p-3 text-xs font-mono backdrop-blur-md shadow-lg z-10 max-w-[200px] sm:max-w-xs transition-colors">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 border-b border-ops-border-subtle pb-1">
          <Crosshair className="w-3.5 h-3.5 text-ops-cyan flex-shrink-0" />
          <span className="font-bold text-ops-text uppercase tracking-wider text-[10px] sm:text-[11px] truncate">
            {selectedCyclone.name} ({selectedCyclone.code})
          </span>
        </div>
        <div className="space-y-0.5 text-[9px] sm:text-[10px] text-ops-text-dim">
          <div className="truncate">POS: <span className="text-ops-text font-bold">{selectedCyclone.currentPosition.coordinatesFormatted}</span></div>
          <div className="hidden xs:block truncate">CURSOR: <span className="text-ops-cyan font-bold">{mousePosition.lat}, {mousePosition.lng}</span></div>
          <div className="text-ops-green font-bold flex items-center gap-1 pt-0.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-pulse flex-shrink-0" />
            <span>OPENSTREETMAP TILES</span>
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Floating Map Layer Controls (Collapsible on mobile) */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-ops-card/95 border border-ops-border rounded-lg sm:rounded-xl p-2 sm:p-3 text-xs backdrop-blur-md shadow-lg z-10 w-44 sm:w-56 transition-all">
        <div 
          onClick={() => setIsLayersCollapsed(!isLayersCollapsed)}
          className="text-[9px] font-mono font-bold tracking-widest text-ops-text-muted uppercase flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-ops-cyan" />
            <span>LAYERS</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-ops-cyan sm:hidden">{isLayersCollapsed ? 'SHOW' : 'HIDE'}</span>
            {isLayersCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </div>

        {!isLayersCollapsed && (
          <div className="space-y-1.5 mt-2">
            {/* Satellite Layer */}
            <button
              onClick={() => toggleMapLayer('satellite')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                mapLayers.satellite 
                  ? 'bg-ops-cyan/20 text-ops-cyan border-ops-cyan' 
                  : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Satellite className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">SATELLITE TILES</span>
              </div>
              <span className="text-[9px] font-extrabold flex-shrink-0">{mapLayers.satellite ? 'ON' : 'OFF'}</span>
            </button>

            {/* Coastal Risk Zones */}
            <button
              onClick={() => toggleMapLayer('coastalRiskZones')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                mapLayers.coastalRiskZones 
                  ? 'bg-red-500/20 text-ops-red border-ops-red' 
                  : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">COASTAL RISK</span>
              </div>
              <span className="text-[9px] font-extrabold flex-shrink-0">{mapLayers.coastalRiskZones ? 'ON' : 'OFF'}</span>
            </button>

            {/* Forecast Cone */}
            <button
              onClick={() => toggleMapLayer('uncertaintyCone')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                mapLayers.uncertaintyCone 
                  ? 'bg-amber-500/20 text-ops-amber border-ops-amber' 
                  : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <ShieldAlert className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">FORECAST CONE</span>
              </div>
              <span className="text-[9px] font-extrabold flex-shrink-0">{mapLayers.uncertaintyCone ? 'ON' : 'OFF'}</span>
            </button>

            {/* Wind Field */}
            <button
              onClick={() => toggleMapLayer('windField')}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
                mapLayers.windField 
                  ? 'bg-sky-500/20 text-ops-sky border-ops-sky' 
                  : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Wind className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">WIND BUFFERS</span>
              </div>
              <span className="text-[9px] font-extrabold flex-shrink-0">{mapLayers.windField ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        )}
      </div>

      {/* QUICK VIEW BUTTONS (Left Side) */}
      <div className="absolute left-2.5 sm:left-3 bottom-20 sm:bottom-20 flex flex-col gap-1.5 z-10">
        <button
          onClick={handleFocusIndia}
          title="Center on India / Bay of Bengal"
          className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-ops-card/95 border border-ops-border text-ops-text hover:text-ops-cyan text-[10px] sm:text-xs font-mono font-bold shadow-md flex items-center gap-1.5 transition-colors backdrop-blur-md cursor-pointer"
        >
          <span>🇮🇳 Focus India</span>
        </button>
        <button
          onClick={handleFocusStorm}
          title="Center on Storm Eye"
          className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-ops-card/95 border border-ops-border text-ops-text hover:text-ops-amber text-[10px] sm:text-xs font-mono font-bold shadow-md flex items-center gap-1.5 transition-colors backdrop-blur-md cursor-pointer"
        >
          <span>🌪️ Center Storm</span>
        </button>
      </div>

      {/* BOTTOM HUD: Temporal Timeline Simulation & Controls */}
      {showFullControls && (
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3 z-10 pointer-events-none">
          {/* Timeline Scrubber */}
          <div className="flex-1 max-w-2xl bg-ops-card/95 border border-ops-border rounded-xl px-3 sm:px-4 py-2 backdrop-blur-md shadow-xl pointer-events-auto overflow-hidden">
            <div className="flex items-center justify-between text-[9px] font-mono uppercase mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-widest text-ops-cyan truncate">TIMELINE SIMULATION</span>
                <button
                  onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                  className="px-2 py-0.5 rounded bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-[9px] flex items-center gap-1 border border-ops-border cursor-pointer font-bold flex-shrink-0"
                >
                  {isPlayingSimulation ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                  <span>{isPlayingSimulation ? 'PAUSE' : 'PLAY'}</span>
                </button>
              </div>
              <div className="text-ops-text-dim text-[9px] flex-shrink-0">
                STEP: <span className="text-ops-amber font-bold">{timelineStep}</span>
              </div>
            </div>

            {/* Stepper Ticks */}
            <div className="relative flex items-center justify-between pt-1 pb-0.5 overflow-x-auto gap-1">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-ops-border rounded hidden sm:block" />
              {TIMELINE_STEPS.map((step) => {
                const isSelected = timelineStep === step;
                const isLive = step.includes('LIVE');
                return (
                  <button
                    key={step}
                    onClick={() => setTimelineStep(step)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer flex-1 min-w-[36px]"
                  >
                    <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-transform ${
                      isSelected 
                        ? 'bg-ops-amber border-white scale-125 shadow-md shadow-amber-500' 
                        : isLive 
                        ? 'bg-ops-cyan border-ops-bg' 
                        : 'bg-ops-card border-ops-border group-hover:border-ops-cyan'
                    }`} />
                    <span className={`text-[8px] sm:text-[9px] font-mono mt-1 font-semibold truncate ${
                      isSelected ? 'text-ops-amber font-bold' : isLive ? 'text-ops-cyan' : 'text-ops-text-muted group-hover:text-ops-text'
                    }`}>
                      {step.replace(' (T+0h)', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center self-end sm:self-auto bg-ops-card/95 border border-ops-border rounded-xl backdrop-blur-md shadow-md overflow-hidden pointer-events-auto">
            <button 
              onClick={() => handleZoom(1)}
              title="Zoom In"
              className="p-2 sm:p-2.5 text-ops-text hover:text-ops-cyan hover:bg-ops-card-sub border-r border-ops-border cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleZoom(-1)}
              title="Zoom Out"
              className="p-2 sm:p-2.5 text-ops-text hover:text-ops-cyan hover:bg-ops-card-sub cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
