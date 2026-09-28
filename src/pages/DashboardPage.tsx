import React, { useState } from 'react';
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
  ShieldCheck,
  HelpCircle,
  Clock,
  Sparkles,
  PhoneCall
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

  const [checkedSafetyItems, setCheckedSafetyItems] = useState<{ [key: string]: boolean }>({});

  const toggleSafetyItem = (key: string) => {
    setCheckedSafetyItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-5 max-w-[1600px] mx-auto pb-8">
      {/* Top Banner: Cyclone Identity & Plain-Language Risk Assessment */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors">
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-amber-500/10 text-ops-amber border border-amber-500/30 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              {selectedCyclone.category}
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-red-500/10 text-ops-red border border-red-500/30 text-[11px] sm:text-xs font-bold">
              ● LANDFALL {selectedCyclone.landfallEta}
            </span>
            <span className="text-[11px] sm:text-xs font-mono text-ops-cyan bg-sky-500/10 border border-sky-500/30 px-2 sm:px-2.5 py-0.5 rounded-full">
              📍 {selectedCyclone.currentPosition.coordinatesFormatted}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-ops-text tracking-tight font-sans uppercase break-words">
            {selectedCyclone.name} ({selectedCyclone.code})
          </h1>

          <p className="text-xs sm:text-sm text-ops-text-dim font-sans max-w-3xl leading-relaxed">
            Currently moving <strong>{selectedCyclone.movementVector.direction}</strong> towards <strong>{selectedCyclone.landfallLocation}</strong> at {formatWind(selectedCyclone.movementVector.speedKts)}. High coastal storm surge and strong gale-force winds expected.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-shrink-0 w-full lg:w-auto">
          <button
            onClick={() => setCurrentPage('live-map')}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2.5 rounded-lg bg-ops-cyan hover:bg-sky-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <span>EXPLORE LIVE MAP</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage('alerts')}
            className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-ops-amber text-xs font-mono font-bold flex items-center justify-center gap-2 border border-amber-500/30 transition-all cursor-pointer"
          >
            <span>SAFETY ADVISORIES</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* User-Centric Public Safety Action Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: What You Should Do Right Now */}
        <div className="lg:col-span-2 bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ops-border-subtle pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-ops-green flex-shrink-0" />
              <h2 className="text-xs sm:text-sm font-bold text-ops-text uppercase tracking-wider font-sans">
                COMMUNITY SAFETY CHECKLIST & ACTIONS
              </h2>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-ops-text-muted">
              OFFICIAL DISASTER ADVISORY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            {[
              { id: 'item-1', text: 'Avoid beaches, coastal promenades, and small watercraft.', tag: 'CRITICAL' },
              { id: 'item-2', text: 'Secure loose outdoor furniture, tin roofs, and window panels.', tag: 'PROPERTY' },
              { id: 'item-3', text: 'Charge mobile devices, emergency power banks, and store clean drinking water.', tag: 'SUPPLIES' },
              { id: 'item-4', text: 'Keep family emergency contacts and local district helpline numbers handy.', tag: 'SAFETY' }
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => toggleSafetyItem(item.id)}
                className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                  checkedSafetyItems[item.id]
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-ops-green'
                    : 'bg-ops-card-sub border-ops-border hover:border-ops-border-light text-ops-text'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={!!checkedSafetyItems[item.id]} 
                  onChange={() => {}}
                  className="mt-0.5 accent-emerald-600 rounded cursor-pointer flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-semibold leading-relaxed">{item.text}</div>
                  <span className="text-[10px] font-mono text-ops-text-muted mt-1 inline-block">
                    [{item.tag}]
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-ops-text-dim">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-ops-cyan flex-shrink-0" />
              <span>National Disaster Helpline: <strong className="text-ops-text font-mono">1078 / 112</strong></span>
            </div>
            <span className="text-[11px] font-mono text-ops-green font-bold">
              {Object.values(checkedSafetyItems).filter(Boolean).length}/4 Steps Checked
            </span>
          </div>
        </div>

        {/* Card 2: Threat Summary Rating */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-ops-text-muted uppercase">
              <span>LOCAL THREAT LEVEL</span>
              <AlertTriangle className="w-4 h-4 text-ops-amber" />
            </div>

            <div className="mt-2 text-xl sm:text-2xl font-black text-ops-amber font-sans">
              HIGH RISK ZONE
            </div>
            <div className="text-xs text-ops-text-dim mt-1">
              Target Landfall: <strong className="text-ops-text">{selectedCyclone.landfallLocation}</strong>
            </div>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-ops-border-subtle pb-1.5">
                <span className="text-ops-text-muted">Expected Wind:</span>
                <strong className="text-ops-amber">{formatWind(selectedCyclone.maxSustainedWindKts)} (Gusts {selectedCyclone.windGustsKts} kts)</strong>
              </div>
              <div className="flex justify-between border-b border-ops-border-subtle pb-1.5">
                <span className="text-ops-text-muted">Expected Storm Surge:</span>
                <strong className="text-ops-red">1.5m – 2.5m Inundation</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Heavy Rainfall:</span>
                <strong className="text-ops-cyan">150 – 250 mm / 24h</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('help')}
            className="w-full py-2.5 rounded-lg bg-ops-card-sub hover:bg-ops-card border border-ops-border text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>HOW TO READ CYCLONE CATEGORIES</span>
          </button>
        </div>
      </div>

      {/* Primary Key Telemetry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* 1. Maximum Wind Speed */}
        <MetricCard
          label="ESTIMATED MAX WIND"
          value={formatWind(selectedCyclone.maxSustainedWindKts)}
          highlightColor="orange"
          badge="INTENSITY"
          badgeVariant="orange"
          subtext={`Extreme gusts up to ${formatWind(selectedCyclone.windGustsKts)}`}
        />

        {/* 2. Central Barometric Pressure */}
        <MetricCard
          label="MIN CENTRAL PRESSURE"
          value={formatPressure(selectedCyclone.minCentralPressureHpa)}
          highlightColor="cyan"
          badge="BAROMETER"
          badgeVariant="cyan"
          subtext={`Pressure trend: ${selectedCyclone.pressureTrendHpaHr} hPa/hr (Intensifying)`}
        />

        {/* 3. Movement & Direction */}
        <MetricCard
          label="MOVEMENT VECTOR"
          value={`${selectedCyclone.movementVector.direction} @ ${formatWind(selectedCyclone.movementVector.speedKts)}`}
          highlightColor="neutral"
          badge="TRAJECTORY"
          badgeVariant="green"
          subtext={`Compass heading: ${selectedCyclone.movementVector.headingDegrees}° True`}
        />

        {/* 4. Eye Core Definition */}
        <MetricCard
          label="EYE WALL DIAMETER"
          value={`${selectedCyclone.eyeWallDiameterKm} KM`}
          highlightColor="neutral"
          badge="SATELLITE"
          badgeVariant="cyan"
          subtext={selectedCyclone.eyeWallStructure}
        />
      </div>

      {/* Real-time Community & Meteorological Updates Log */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-ops-border-subtle">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-ops-cyan flex-shrink-0" />
            <h2 className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
              REAL-TIME SATELLITE & COMMUNITY OBSERVATION STREAM
            </h2>
          </div>
          <span className="text-[10px] font-mono text-ops-text-muted">
            AUTO-STREAMING TELEMETRY (MOSDAC / INSAT-3DR)
          </span>
        </div>

        <div className="space-y-2 font-mono text-xs max-h-56 overflow-y-auto">
          {operationalLogs.map((log) => {
            const getDotColor = () => {
              switch (log.severity) {
                case 'red':
                  return 'bg-red-500';
                case 'amber':
                  return 'bg-ops-amber';
                case 'cyan':
                  return 'bg-ops-cyan';
                case 'green':
                default:
                  return 'bg-ops-green';
              }
            };

            return (
              <div 
                key={log.id} 
                className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 p-2.5 rounded-lg hover:bg-ops-card-hover transition-colors border-b border-ops-border-subtle"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className="text-ops-text-muted font-semibold flex-shrink-0 text-[11px]">
                    {log.timestamp}
                  </span>
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getDotColor()}`} />
                  <span className="text-ops-text text-xs leading-relaxed font-sans break-words">
                    {log.message}
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-ops-card-sub text-ops-text-muted border border-ops-border self-start sm:self-auto flex-shrink-0">
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
