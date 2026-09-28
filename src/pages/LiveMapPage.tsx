import React, { useState } from 'react';
import { RealLeafletMap } from '../components/map/RealLeafletMap';
import { useCyclone } from '../context/CycloneContext';
import { 
  Compass, 
  Wind, 
  Gauge, 
  ShieldAlert, 
  Clock, 
  Download, 
  Layers,
  Crosshair,
  Radio,
  FileSpreadsheet,
  AlertTriangle,
  Info,
  MapPin
} from 'lucide-react';

export const LiveMapPage: React.FC = () => {
  const { selectedCyclone, formatWind, formatPressure, addOperationalLog } = useCyclone();
  const [showSideTelemetry, setShowSideTelemetry] = useState(false);

  const handleExportTrack = () => {
    addOperationalLog(`Exported GIS vector coordinates for ${selectedCyclone.name}`, 'cyan');
    alert(`Exporting ${selectedCyclone.name} GIS Vector Package (GeoJSON / KML / ESRI Shapefile) with 72-hour forecast trajectory.`);
  };

  return (
    <div className="h-[calc(100vh-125px)] sm:h-[calc(100vh-130px)] flex flex-col gap-2 sm:gap-3">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between bg-ops-card border border-ops-border rounded-xl p-2.5 sm:p-3 shadow-ops-card gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Radio className="w-4 h-4 text-ops-cyan animate-pulse flex-shrink-0" />
            <h1 className="text-xs sm:text-sm font-bold text-ops-text font-sans uppercase tracking-wider truncate">
              INTERACTIVE CYCLONE TRACK & RISK MAP
            </h1>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-ops-text-muted border-l border-ops-border-subtle pl-2 sm:pl-3 hidden md:inline truncate">
            REGION: INDIA / BAY OF BENGAL · GLOBAL MERCATOR
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowSideTelemetry(!showSideTelemetry)}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-ops-card-sub hover:bg-ops-card text-[11px] sm:text-xs font-mono text-ops-text border border-ops-border transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-ops-cyan flex-shrink-0" />
            <span>{showSideTelemetry ? 'HIDE INTEL' : 'SHOW INTEL'}</span>
          </button>
          <button
            onClick={handleExportTrack}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-ops-cyan/10 hover:bg-ops-cyan/20 text-[11px] sm:text-xs font-mono font-bold text-ops-cyan border border-ops-cyan/30 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden xs:inline">EXPORT GEOJSON</span>
            <span className="xs:hidden">GEOJSON</span>
          </button>
        </div>
      </div>

      {/* Main Map Viewport with Leaflet + Floating Risk Summary */}
      <div className="flex-1 relative min-h-0 rounded-xl overflow-hidden border border-ops-border shadow-ops-card">
        <RealLeafletMap heightClassName="h-full" showFullControls={true} />

        {/* Floating Quick Summary Card (Left Side) */}
        {showSideTelemetry && (
          <div className="absolute top-16 left-2.5 sm:left-3 w-72 sm:w-80 max-w-[calc(100vw-24px)] bg-ops-card/95 border border-ops-border rounded-xl p-3 sm:p-4 text-xs font-mono backdrop-blur-md shadow-2xl z-20 space-y-3 pointer-events-auto transition-colors">
            <div className="flex items-center justify-between pb-2 border-b border-ops-border-subtle">
              <span className="font-bold text-ops-amber uppercase tracking-wider text-xs sm:text-[12px]">
                {selectedCyclone.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-ops-amber border border-amber-500/30 font-bold">
                {selectedCyclone.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-ops-card-sub p-2 sm:p-2.5 rounded-lg border border-ops-border">
                <div className="text-ops-text-muted text-[10px]">MAX WINDS</div>
                <div className="text-ops-amber font-bold text-xs sm:text-sm mt-0.5 font-sans truncate">
                  {formatWind(selectedCyclone.maxSustainedWindKts)}
                </div>
                <div className="text-[10px] text-ops-text-dim truncate">Gusts: {formatWind(selectedCyclone.windGustsKts)}</div>
              </div>

              <div className="bg-ops-card-sub p-2 sm:p-2.5 rounded-lg border border-ops-border">
                <div className="text-ops-text-muted text-[10px]">PRESSURE</div>
                <div className="text-ops-cyan font-bold text-xs sm:text-sm mt-0.5 font-sans truncate">
                  {formatPressure(selectedCyclone.minCentralPressureHpa)}
                </div>
                <div className="text-[10px] text-ops-text-dim truncate">Trend: {selectedCyclone.pressureTrendHpaHr} hPa/hr</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-ops-text">
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Eye Coordinates:</span>
                <span className="font-bold font-mono truncate">{selectedCyclone.currentPosition.coordinatesFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Movement:</span>
                <span className="truncate">{selectedCyclone.movementVector.direction} @ {formatWind(selectedCyclone.movementVector.speedKts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Landfall ETA:</span>
                <span className="text-ops-amber font-bold truncate">{selectedCyclone.landfallEta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Threat Area:</span>
                <span className="truncate ml-2 font-semibold">{selectedCyclone.landfallLocation}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-ops-border-subtle flex items-center justify-between text-[10px] sm:text-[11px] text-ops-text-muted">
              <span className="truncate">EYE: {selectedCyclone.eyeWallDiameterKm}km Symmetrical</span>
              <span className="text-ops-green font-bold flex items-center gap-1 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-pulse" />
                ACTIVE
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
