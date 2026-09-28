import React, { useState } from 'react';
import { 
  InteractiveMap 
} from '../components/map/InteractiveMap';
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
  FileSpreadsheet
} from 'lucide-react';

export const LiveMapPage: React.FC = () => {
  const { selectedCyclone, formatWind, formatPressure, addOperationalLog } = useCyclone();
  const [showSideTelemetry, setShowSideTelemetry] = useState(true);

  const handleExportTrack = () => {
    addOperationalLog(`Exported GIS Shapefile & KML for ${selectedCyclone.name} track forecast`, 'cyan');
    alert(`Exporting ${selectedCyclone.name} GIS Vector Package (GeoJSON / KML / ESRI Shapefile) with 72h forecast cone.`);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-3">
      {/* Map Control Bar */}
      <div className="flex items-center justify-between bg-ops-card border border-ops-border rounded p-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-ops-cyan animate-pulse" />
            <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
              LIVE GEOSPATIAL VECTOR DISPLAY ENGINE
            </h2>
          </div>
          <span className="text-[10px] font-mono text-ops-text-dim border-l border-ops-border-subtle pl-3 hidden md:inline">
            PROJECTION: MERCATOR WGS84 · RESOLUTION 1.0 KM · MOSDAC INSAT-3DR FEED
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSideTelemetry(!showSideTelemetry)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-ops-border transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-ops-cyan" />
            <span>{showSideTelemetry ? 'HIDE TELEMETRY' : 'SHOW TELEMETRY'}</span>
          </button>
          <button
            onClick={handleExportTrack}
            className="px-2.5 py-1 rounded bg-ops-cyan/10 hover:bg-ops-cyan/20 text-xs font-mono text-ops-cyan border border-ops-cyan/40 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT GIS KML</span>
          </button>
        </div>
      </div>

      {/* Main Map Viewport with Optional Floating Telemetry Card */}
      <div className="flex-1 relative min-h-0 rounded overflow-hidden border border-ops-border">
        <InteractiveMap heightClassName="h-full" showFullControls={true} />

        {/* Floating Telemetry Box (Left Side) */}
        {showSideTelemetry && (
          <div className="absolute top-16 left-3 w-72 bg-ops-card/95 border border-ops-border rounded p-3 text-xs font-mono backdrop-blur-md shadow-2xl z-20 space-y-3 pointer-events-auto">
            <div className="flex items-center justify-between pb-1.5 border-b border-ops-border-subtle">
              <span className="font-bold text-ops-amber uppercase tracking-wider text-[11px]">
                {selectedCyclone.name}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-ops-amber border border-amber-800">
                {selectedCyclone.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-slate-900/80 p-2 rounded border border-ops-border-subtle">
                <div className="text-slate-400">MAX WINDS</div>
                <div className="text-ops-amber font-bold text-sm mt-0.5">
                  {formatWind(selectedCyclone.maxSustainedWindKts)}
                </div>
                <div className="text-[9px] text-slate-500">Gusts: {selectedCyclone.windGustsKts} kts</div>
              </div>

              <div className="bg-slate-900/80 p-2 rounded border border-ops-border-subtle">
                <div className="text-slate-400">PRESSURE</div>
                <div className="text-ops-cyan font-bold text-sm mt-0.5">
                  {formatPressure(selectedCyclone.minCentralPressureHpa)}
                </div>
                <div className="text-[9px] text-slate-500">Trend: {selectedCyclone.pressureTrendHpaHr} hPa/hr</div>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Coordinates:</span>
                <span className="text-white font-bold">{selectedCyclone.currentPosition.coordinatesFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Vector:</span>
                <span className="text-slate-200">{selectedCyclone.movementVector.direction} @ {selectedCyclone.movementVector.speedKts} kts ({selectedCyclone.movementVector.headingDegrees}°)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Landfall ETA:</span>
                <span className="text-ops-amber font-bold">{selectedCyclone.landfallEta}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Zone:</span>
                <span className="text-slate-200 truncate ml-2">{selectedCyclone.landfallLocation}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-ops-border-subtle flex items-center justify-between text-[10px] text-ops-text-dim">
              <span>EYE: {selectedCyclone.eyeWallDiameterKm}km Symmetrical</span>
              <span className="text-ops-green">CONVECTIVE MAX</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
