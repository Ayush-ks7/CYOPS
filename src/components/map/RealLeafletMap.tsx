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
  Satellite
} from 'lucide-react';
import { useCyclone, TIMELINE_STEPS } from '../../context/CycloneContext';

interface RealLeafletMapProps {
  heightClassName?: string;
  showFullControls?: boolean;
  activeLayerPreset?: 'STANDARD' | 'SATELLITE_ONLY';
}

export const RealLeafletMap: React.FC<RealLeafletMapProps> = ({
  heightClassName = 'h-[640px]',
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
        setMapCenter([map.getCenter().lat, map.getCenter().lng]);
        setMapZoom(map.getZoom());
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update base tiles when satellite toggle changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const newUrl = getTileUrl(mapLayers.satellite);
    tileLayerRef.current.setUrl(newUrl);
  }, [mapLayers.satellite]);

  // Update Vectors: Cyclone Marker, Historical Track, Forecast Track, Uncertainty Cone, Threat Zones
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const map = mapInstanceRef.current;
    const lg = layerGroupRef.current;
    lg.clearLayers();

    const storm = selectedCyclone;
    const isDark = theme === 'dark';

    // 1. Coastal Risk & Impact Buffer Polygons (Citizen Safety Zone)
    if (mapLayers.coastalRiskZones) {
      const riskPolygonCoords: [number, number][] = storm.basin.includes('Bay of Bengal')
        ? [
            [21.8, 86.8], [21.5, 87.5], [20.8, 87.0], [19.8, 85.8], [19.2, 84.9], [18.2, 84.0],
            [18.0, 83.5], [19.0, 84.5], [20.0, 85.5], [21.0, 86.5]
          ]
        : [
            [25.2, 121.5], [24.8, 122.0], [24.0, 121.8], [23.0, 121.4], [22.0, 120.8],
            [22.5, 120.3], [23.8, 120.8], [25.0, 121.2]
          ];

      const riskPolygon = L.polygon(riskPolygonCoords, {
        color: '#dc2626',
        weight: 2.5,
        dashArray: '5, 5',
        fillColor: '#ef4444',
        fillOpacity: isDark ? 0.22 : 0.16
      }).addTo(lg);

      riskPolygon.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 12px; min-width: 220px;">
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; color: #dc2626; margin-bottom: 4px;">
            <span>⚠️ HIGH COASTAL RISK ZONE</span>
          </div>
          <div style="color: ${isDark ? '#e2e8f0' : '#0f172a'}; font-weight: 700;">
            ${storm.landfallLocation}
          </div>
          <div style="font-size: 11px; color: ${isDark ? '#94a3b8' : '#64748b'}; margin-top: 5px; line-height: 1.5;">
            • Expected Wind Gusts: <strong>${storm.windGustsKts} kts</strong><br/>
            • Storm Surge Risk: <strong>1.5m – 2.5m Inundation</strong><br/>
            • Advisory: <strong>Stay indoors; avoid sea coast</strong>
          </div>
        </div>
      `);
    }

    // 2. Forecast Uncertainty Cone (67% probability envelope)
    if (mapLayers.uncertaintyCone && storm.forecastTrack && storm.forecastTrack.length > 0) {
      const leftEdge: [number, number][] = [];
      const rightEdge: [number, number][] = [];

      storm.forecastTrack.forEach((pt, idx) => {
        const expansion = (idx + 1) * 0.45;
        leftEdge.push([pt.lat + expansion * 0.6, pt.lng - expansion]);
        rightEdge.unshift([pt.lat - expansion * 0.4, pt.lng + expansion * 0.8]);
      });

      const fullCone: [number, number][] = [
        [storm.currentPosition.lat, storm.currentPosition.lng],
        ...leftEdge,
        ...rightEdge
      ];

      const conePoly = L.polygon(fullCone, {
        color: '#ea580c',
        weight: 2,
        dashArray: '5, 5',
        fillColor: '#ea580c',
        fillOpacity: isDark ? 0.22 : 0.14
      }).addTo(lg);

      conePoly.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 12px;">
          <div style="font-weight: 800; color: #ea580c; margin-bottom: 3px;">
            🎯 72-HOUR FORECAST CONE
          </div>
          <div style="color: ${isDark ? '#94a3b8' : '#64748b'}; font-size: 11px; line-height: 1.4;">
            Represents the 67% probability area for cyclone movement. Severe winds & storm surge extend beyond the cone boundaries.
          </div>
        </div>
      `);
    }

    // 3. Historical Track Polyline & Waypoints
    if (mapLayers.historicalTrack && storm.trackHistory) {
      const histCoords: [number, number][] = storm.trackHistory.map(p => [p.lat, p.lng]);

      L.polyline(histCoords, {
        color: isDark ? '#00f0ff' : '#0284c7',
        weight: 3.5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(lg);

      storm.trackHistory.forEach(pt => {
        const histMarker = L.circleMarker([pt.lat, pt.lng], {
          radius: pt.status === 'LIVE' ? 0 : 5.5,
          color: isDark ? '#00f0ff' : '#0284c7',
          fillColor: isDark ? '#080c14' : '#ffffff',
          fillOpacity: 1,
          weight: 2.5
        }).addTo(lg);

        histMarker.bindPopup(`
          <div style="font-family: Inter, sans-serif; font-size: 11px; padding: 2px;">
            <div style="font-weight: 700; color: ${isDark ? '#00f0ff' : '#0284c7'};">
              ${pt.timeOffset} (${pt.status})
            </div>
            <div style="color: ${isDark ? '#e2e8f0' : '#0f172a'}; margin-top: 3px; line-height: 1.4;">
              Wind: <strong>${formatWind(pt.windKts)}</strong><br/>
              Pressure: <strong>${formatPressure(pt.pressureHpa)}</strong><br/>
              Position: <strong>${pt.lat.toFixed(1)}°N, ${pt.lng.toFixed(1)}°E</strong>
            </div>
          </div>
        `);
      });
    }

    // 4. Forecast Track Polyline & Waypoints
    if (mapLayers.forecastTrack && storm.forecastTrack) {
      const foreCoords: [number, number][] = [
        [storm.currentPosition.lat, storm.currentPosition.lng],
        ...storm.forecastTrack.map(p => [p.lat, p.lng] as [number, number])
      ];

      L.polyline(foreCoords, {
        color: '#ea580c',
        weight: 3,
        dashArray: '6, 6',
        opacity: 0.95
      }).addTo(lg);

      storm.forecastTrack.forEach(pt => {
        const foreMarker = L.circleMarker([pt.lat, pt.lng], {
          radius: 5.5,
          color: '#ea580c',
          fillColor: isDark ? '#080c14' : '#ffffff',
          fillOpacity: 1,
          weight: 2.5
        }).addTo(lg);

        foreMarker.bindPopup(`
          <div style="font-family: Inter, sans-serif; font-size: 11px;">
            <div style="font-weight: 800; color: #ea580c;">
              ⏱️ FORECAST HORIZON: ${pt.timeOffset}
            </div>
            <div style="color: ${isDark ? '#e2e8f0' : '#0f172a'}; margin-top: 3px; line-height: 1.4;">
              Category: <strong>${pt.category}</strong><br/>
              Estimated Wind: <strong>${formatWind(pt.windKts)}</strong><br/>
              Central Pressure: <strong>${formatPressure(pt.pressureHpa)}</strong><br/>
              Coordinates: <strong>${pt.lat.toFixed(1)}°N, ${pt.lng.toFixed(1)}°E</strong>
            </div>
          </div>
        `);
      });
    }

    // 5. Wind Field Buffer Circle
    if (mapLayers.windField) {
      L.circle([storm.currentPosition.lat, storm.currentPosition.lng], {
        radius: 75000,
        color: isDark ? '#38bdf8' : '#0ea5e9',
        weight: 1.5,
        dashArray: '4, 4',
        fillColor: '#0ea5e9',
        fillOpacity: isDark ? 0.12 : 0.08
      }).addTo(lg);
    }

    // 6. Current Storm Eye Beacon (Pulsing DivIcon)
    const eyeHtml = `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; transform: translate(-18px, -18px);">
        <div style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background: #ea580c; opacity: 0.35; animation: pulse-ring 2s infinite;"></div>
        <div style="position: absolute; width: 22px; height: 22px; border-radius: 50%; border: 2px solid #ffffff; background: #ea580c; box-shadow: 0 0 10px rgba(234, 88, 12, 0.8);"></div>
        <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
      </div>
    `;

    const eyeIcon = L.divIcon({
      html: eyeHtml,
      className: 'cyclone-eye-icon',
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const eyeMarker = L.marker([storm.currentPosition.lat, storm.currentPosition.lng], {
      icon: eyeIcon,
      zIndexOffset: 1000
    }).addTo(lg);

    eyeMarker.bindPopup(`
      <div style="font-family: Inter, sans-serif; font-size: 12px; min-width: 220px;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid ${isDark ? '#334155' : '#e2e8f0'}; padding-bottom: 4px; margin-bottom: 6px;">
          <span style="font-weight: 800; color: #ea580c; font-size: 13px;">${storm.name}</span>
          <span style="font-size: 10px; font-weight: 700; background: ${isDark ? '#451a03' : '#ffedd5'}; color: #ea580c; padding: 2px 6px; border-radius: 4px;">
            ${storm.category}
          </span>
        </div>
        <div style="color: ${isDark ? '#cbd5e1' : '#334155'}; font-size: 11px; line-height: 1.5;">
          • Location: <strong>${storm.currentPosition.coordinatesFormatted}</strong><br/>
          • Max Winds: <strong style="color: #ea580c;">${formatWind(storm.maxSustainedWindKts)} (Gusts ${storm.windGustsKts} kts)</strong><br/>
          • Pressure: <strong style="color: #0284c7;">${formatPressure(storm.minCentralPressureHpa)}</strong><br/>
          • Movement: <strong>${storm.movementVector.direction} at ${storm.movementVector.speedKts} kts</strong><br/>
          • Landfall: <strong style="color: #ea580c;">${storm.landfallEta} (${storm.landfallLocation})</strong>
        </div>
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid ${isDark ? '#334155' : '#e2e8f0'}; font-size: 10px; color: ${isDark ? '#94a3b8' : '#64748b'};">
          📡 Live OpenStreetMap & Satellite Tracking
        </div>
      </div>
    `).openPopup();

  }, [selectedCyclone, theme, mapLayers]);

  // View reset helpers
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

      {/* TOP LEFT: Quick Region & OpenStreetMap Status Badge */}
      <div className="absolute top-3 left-3 bg-ops-card/90 border border-ops-border rounded-xl p-3 text-xs font-mono backdrop-blur-md shadow-lg z-10">
        <div className="flex items-center gap-2 mb-1 border-b border-ops-border-subtle pb-1">
          <Crosshair className="w-3.5 h-3.5 text-ops-cyan" />
          <span className="font-bold text-ops-text uppercase tracking-wider text-[11px]">
            {selectedCyclone.name} ({selectedCyclone.code})
          </span>
        </div>
        <div className="space-y-0.5 text-[10px] text-ops-text-dim">
          <div>COORDINATES: <span className="text-ops-text font-bold">{selectedCyclone.currentPosition.coordinatesFormatted}</span></div>
          <div>CURSOR: <span className="text-ops-cyan font-bold">{mousePosition.lat}, {mousePosition.lng}</span></div>
          <div className="text-ops-green font-bold flex items-center gap-1 pt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-pulse" />
            OPENSTREETMAP TILE LAYER (FREE / OPEN-SOURCE)
          </div>
        </div>
      </div>

      {/* TOP RIGHT: Floating Map Layer Controls */}
      <div className="absolute top-3 right-3 bg-ops-card/90 border border-ops-border rounded-xl p-3 text-xs backdrop-blur-md shadow-lg z-10 w-56">
        <div className="text-[9px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-2 flex items-center justify-between">
          <span>MAP DISPLAY LAYERS</span>
          <Layers className="w-3 h-3 text-ops-cyan" />
        </div>

        <div className="space-y-1.5">
          {/* Satellite Layer */}
          <button
            onClick={() => toggleMapLayer('satellite')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
              mapLayers.satellite 
                ? 'bg-ops-cyan/20 text-ops-cyan border-ops-cyan' 
                : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Satellite className="w-3 h-3" />
              <span>SATELLITE TILES</span>
            </div>
            <span className="text-[9px] font-extrabold">{mapLayers.satellite ? 'ON' : 'OFF'}</span>
          </button>

          {/* Coastal Risk Zones */}
          <button
            onClick={() => toggleMapLayer('coastalRiskZones')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
              mapLayers.coastalRiskZones 
                ? 'bg-red-500/20 text-ops-red border-ops-red' 
                : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="w-3 h-3" />
              <span>COASTAL RISK ZONES</span>
            </div>
            <span className="text-[9px] font-extrabold">{mapLayers.coastalRiskZones ? 'ON' : 'OFF'}</span>
          </button>

          {/* Forecast Cone */}
          <button
            onClick={() => toggleMapLayer('uncertaintyCone')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
              mapLayers.uncertaintyCone 
                ? 'bg-amber-500/20 text-ops-amber border-ops-amber' 
                : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3" />
              <span>FORECAST CONE (72H)</span>
            </div>
            <span className="text-[9px] font-extrabold">{mapLayers.uncertaintyCone ? 'ON' : 'OFF'}</span>
          </button>

          {/* Wind Field */}
          <button
            onClick={() => toggleMapLayer('windField')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-colors cursor-pointer ${
              mapLayers.windField 
                ? 'bg-sky-500/20 text-ops-sky border-ops-sky' 
                : 'bg-ops-card-sub text-ops-text-muted border-ops-border hover:text-ops-text'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Wind className="w-3 h-3" />
              <span>WIND FIELD BUFFER</span>
            </div>
            <span className="text-[9px] font-extrabold">{mapLayers.windField ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* QUICK VIEW BUTTONS (Left Side) */}
      <div className="absolute left-3 bottom-16 flex flex-col gap-1.5 z-10">
        <button
          onClick={handleFocusIndia}
          title="Center on India / Bay of Bengal"
          className="px-3 py-1.5 rounded-lg bg-ops-card/95 border border-ops-border text-ops-text hover:text-ops-cyan text-xs font-mono font-bold shadow-md flex items-center gap-1.5 transition-colors backdrop-blur-md cursor-pointer"
        >
          <span>🇮🇳 Focus India</span>
        </button>
        <button
          onClick={handleFocusStorm}
          title="Center on Storm Eye"
          className="px-3 py-1.5 rounded-lg bg-ops-card/95 border border-ops-border text-ops-text hover:text-ops-amber text-xs font-mono font-bold shadow-md flex items-center gap-1.5 transition-colors backdrop-blur-md cursor-pointer"
        >
          <span>🌪️ Center Storm</span>
        </button>
      </div>

      {/* BOTTOM HUD: Temporal Timeline Simulation & Controls */}
      {showFullControls && (
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 z-10">
          {/* Timeline Scrubber */}
          <div className="flex-1 max-w-2xl bg-ops-card/95 border border-ops-border rounded-xl px-4 py-2 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between text-[9px] font-mono uppercase mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-widest text-ops-cyan">FORECAST TIMELINE SIMULATION</span>
                <button
                  onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                  className="px-2 py-0.5 rounded bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-[9px] flex items-center gap-1 border border-ops-border cursor-pointer font-bold"
                >
                  {isPlayingSimulation ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                  <span>{isPlayingSimulation ? 'PAUSE' : 'PLAY'}</span>
                </button>
              </div>
              <div className="text-ops-text-dim">
                ACTIVE STEP: <span className="text-ops-amber font-bold">{timelineStep}</span>
              </div>
            </div>

            {/* Stepper Ticks */}
            <div className="relative flex items-center justify-between pt-1 pb-0.5">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-ops-border rounded" />
              {TIMELINE_STEPS.map((step) => {
                const isSelected = timelineStep === step;
                const isLive = step.includes('LIVE');
                return (
                  <button
                    key={step}
                    onClick={() => setTimelineStep(step)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-3.5 h-3.5 rounded-full border-2 transition-transform ${
                      isSelected 
                        ? 'bg-ops-amber border-white scale-125 shadow-md shadow-amber-500' 
                        : isLive 
                        ? 'bg-ops-cyan border-ops-bg' 
                        : 'bg-ops-card border-ops-border group-hover:border-ops-cyan'
                    }`} />
                    <span className={`text-[9px] font-mono mt-1 font-semibold ${
                      isSelected ? 'text-ops-amber font-bold' : isLive ? 'text-ops-cyan' : 'text-ops-text-muted group-hover:text-ops-text'
                    }`}>
                      {step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-ops-card/95 border border-ops-border rounded-xl backdrop-blur-md shadow-md overflow-hidden">
            <button 
              onClick={() => handleZoom(1)}
              title="Zoom In"
              className="p-2.5 text-ops-text hover:text-ops-cyan hover:bg-ops-card-sub border-r border-ops-border cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleZoom(-1)}
              title="Zoom Out"
              className="p-2.5 text-ops-text hover:text-ops-cyan hover:bg-ops-card-sub cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
