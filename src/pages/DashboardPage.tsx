import React from 'react';
import { 
  Wind, 
  Gauge, 
  Compass, 
  Eye, 
  Thermometer, 
  Activity, 
  ShieldAlert, 
  MapPin, 
  Radio, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';
import { MetricCard } from '../components/ui/MetricCard';

export const DashboardPage: React.FC = () => {
  const { 
    selectedCyclone, 
    setCurrentPage, 
    operationalLogs, 
    formatWind, 
    formatPressure 
  } = useCyclone();

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-6">
      {/* Top Banner: Category & Cyclone Identification Header (Matching @reference.png left panel) */}
      <div className="bg-ops-card border border-ops-border rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-amber-950/90 text-ops-amber border border-ops-amber/40 font-mono text-xs font-bold uppercase tracking-wider">
            {selectedCyclone.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-sans uppercase">
            {selectedCyclone.name} ({selectedCyclone.code})
          </h2>
          <span className="text-xs font-mono text-ops-cyan bg-cyan-950/60 border border-ops-cyan/30 px-2 py-0.5 rounded">
            LOC: {selectedCyclone.currentPosition.coordinatesFormatted} · LIVE RECONNAISSANCE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage('live-map')}
            className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-border transition-colors"
          >
            <span>EXPAND FULL MAP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentPage('analysis')}
            className="px-3 py-1.5 rounded bg-ops-amber/20 hover:bg-ops-amber/30 text-ops-amber text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-amber/40 transition-colors"
          >
            <span>ML ANALYSIS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary Telemetry Grid (Matching @reference.png: Max Wind, Pressure, Movement, Eyewall + Mini Radar View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Max Sustained Wind */}
        <MetricCard
          label="MAX SUSTAINED WIND"
          value={selectedCyclone.maxSustainedWindKts}
          unit="KTS"
          highlightColor="orange"
          subtext={`Gusting to ${selectedCyclone.windGustsKts} kts (extreme)`}
        />

        {/* 2. Min Central Pressure */}
        <MetricCard
          label="MIN CENTRAL PRESSURE"
          value={selectedCyclone.minCentralPressureHpa}
          unit="hPa"
          highlightColor="cyan"
          subtext={`Pressure dropping ${selectedCyclone.pressureTrendHpaHr}hPa/hr`}
        />

        {/* 3. Movement Vector */}
        <MetricCard
          label="MOVEMENT VECTOR"
          value={`${selectedCyclone.movementVector.direction} @ ${selectedCyclone.movementVector.speedKts}`}
          unit="KTS"
          highlightColor="neutral"
          subtext={`Heading ${selectedCyclone.movementVector.headingDegrees}° True`}
        />

        {/* 4. Eye Wall Diameter */}
        <MetricCard
          label="EYE WALL DIAMETER"
          value={selectedCyclone.eyeWallDiameterKm}
          unit="KM"
          highlightColor="neutral"
          subtext={selectedCyclone.eyeWallStructure}
        />
      </div>

      {/* Middle Telemetry Row: Embedded Radar Path View + Ocean Dynamics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Embedded Radar Path View (Matching @reference.png: EMBEDDED RADAR PATH VIEW) */}
        <div className="lg:col-span-1 bg-ops-card border border-ops-border rounded p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-ops-text-muted uppercase">
              EMBEDDED RADAR PATH VIEW
            </span>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-950/80 text-ops-amber border border-ops-amber/30">
              RADAR ACTV
            </span>
          </div>

          {/* Mini Vector Trajectory Graphic */}
          <div className="relative h-32 bg-[#070b13] border border-ops-border-subtle rounded flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 radar-grid opacity-40" />
            <svg className="w-full h-full" viewBox="0 0 300 120">
              <path d="M 40,90 L 120,65 L 200,30 L 260,20" fill="none" stroke="#00f0ff" strokeWidth="2.5" />
              <circle cx="40" cy="90" r="3" fill="#00f0ff" />
              <circle cx="120" cy="65" r="3" fill="#00f0ff" />
              <circle cx="200" cy="30" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="260" cy="20" r="3" fill="#ea580c" />
              <text x="210" y="32" fill="#22c55e" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
                ISLAND GATEWAY
              </text>
            </svg>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-ops-text-dim">
            <span>RADAR REFLECTIVITY: <strong className="text-slate-200">54 dBZ</strong></span>
            <span className="text-ops-cyan">DOPPLER SWEEP OK</span>
          </div>
        </div>

        {/* Environmental Dynamics: Sea Surface Temp, Wind Shear, ACE, Forecast Cone */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Sea Surface Temp */}
          <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-col justify-between">
            <div className="text-[9px] font-bold tracking-wider text-ops-text-muted uppercase">
              SEA SURFACE TEMP (SST)
            </div>
            <div className="my-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-100">{selectedCyclone.seaSurfaceTempC}°C</span>
              <span className="text-xs font-mono font-bold text-ops-amber">+{selectedCyclone.seaSurfaceAnomalyC}°C anomaly</span>
            </div>
            <div className="text-[10px] text-ops-text-dim leading-tight">
              Thermal limit exceeded for storm intensification
            </div>
          </div>

          {/* Wind Shear */}
          <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-col justify-between">
            <div className="text-[9px] font-bold tracking-wider text-ops-text-muted uppercase">
              WIND SHEAR INDEX
            </div>
            <div className="my-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-100">{selectedCyclone.windShearKts}</span>
              <span className="text-xs font-mono text-ops-green font-bold">kts Low Shear (favorable)</span>
            </div>
            <div className="text-[10px] text-ops-text-dim leading-tight">
              Favorable upper-level environment remains stable
            </div>
          </div>

          {/* Accumulated Cyclone Energy (ACE) */}
          <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-col justify-between">
            <div className="text-[9px] font-bold tracking-wider text-ops-text-muted uppercase">
              ACCUM. CYCLONE ENERGY
            </div>
            <div className="my-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-100">{selectedCyclone.accumulatedCycloneEnergyACE}</span>
              <span className="text-xs font-mono text-ops-amber font-bold">{selectedCyclone.acePercentageOfNormal}% of seasonal normal</span>
            </div>
            <div className="text-[10px] text-ops-text-dim leading-tight">
              Highly active developmental corridor
            </div>
          </div>

          {/* Forecast Cone Uncertainty */}
          <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-col justify-between">
            <div className="text-[9px] font-bold tracking-wider text-ops-text-muted uppercase">
              FORECAST CONE UNCERTAINTY
            </div>
            <div className="my-1.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-100">{selectedCyclone.forecastConeUncertaintyPct}%</span>
              <span className="text-xs font-mono text-ops-cyan font-bold">Confidence: HIGH</span>
            </div>
            <div className="text-[10px] text-ops-text-dim leading-tight">
              Ensemble paths converge heavily on land vectors
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Operational Log Deck (Matching @reference.png: REAL-TIME OPERATIONAL LOG) */}
      <div className="bg-ops-card border border-ops-border rounded p-4">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-ops-border-subtle">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-ops-cyan" />
            <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-sans">
              REAL-TIME OPERATIONAL LOG
            </span>
          </div>
          <span className="text-[10px] font-mono text-ops-text-muted">
            AUTO-STREAM ACTIVE · 20 LATEST TELEMETRY EVENTS
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto">
          {operationalLogs.map((log) => {
            const getDotColor = () => {
              switch (log.severity) {
                case 'red':
                  return 'bg-ops-red text-ops-red';
                case 'amber':
                  return 'bg-ops-amber text-ops-amber';
                case 'cyan':
                  return 'bg-ops-cyan text-ops-cyan';
                case 'green':
                default:
                  return 'bg-ops-green text-ops-green';
              }
            };

            return (
              <div 
                key={log.id} 
                className="flex items-start justify-between gap-3 p-1.5 rounded hover:bg-slate-900/80 transition-colors border-b border-ops-border-subtle/50"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-slate-400 font-semibold flex-shrink-0 text-[11px]">
                    {log.timestamp}
                  </span>
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${getDotColor()}`} />
                  <span className="text-slate-200 text-[11px] leading-tight font-sans">
                    {log.message}
                  </span>
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 flex-shrink-0">
                  {log.source}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
