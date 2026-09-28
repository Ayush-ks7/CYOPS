import React, { useState } from 'react';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Satellite, 
  RefreshCw, 
  ChevronDown, 
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sun,
  Moon,
  Compass
} from 'lucide-react';
import { useCyclone } from '../../context/CycloneContext';

export const TopHeader: React.FC = () => {
  const { 
    theme,
    toggleTheme,
    selectedCyclone, 
    setSelectedCyclone, 
    allActiveCyclones, 
    utcTimeString, 
    soundAlertsEnabled, 
    setSoundAlertsEnabled,
    windUnit,
    setWindUnit,
    addOperationalLog
  } = useCyclone();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    addOperationalLog('Manual telemetry synchronization request broadcasted to satellite feeds & coastal radars', 'cyan');
    setTimeout(() => {
      setIsSyncing(false);
      addOperationalLog('Satellite & radar stream verified: 100% feed integrity', 'green');
    }, 1000);
  };

  const toggleWindUnit = () => {
    const nextUnit = windUnit === 'KMH' ? 'KTS' : windUnit === 'KTS' ? 'MPH' : 'KMH';
    setWindUnit(nextUnit);
    addOperationalLog(`Wind display unit set to ${nextUnit}`, 'cyan');
  };

  return (
    <header className="h-14 bg-ops-header border-b border-ops-border px-4 flex items-center justify-between sticky top-0 z-30 select-none shadow-sm transition-colors">
      {/* Monitoring Region Header & Active Cyclone Selector */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wider text-ops-text uppercase font-sans">
              {selectedCyclone.basin === 'Western Pacific' ? 'WESTERN PACIFIC MONITORING AREA (WPAC)' : 'NORTH INDIAN OCEAN & BAY OF BENGAL'}
            </h1>
          </div>
          <div className="text-[10px] font-mono tracking-wider text-ops-text-muted flex items-center gap-2 truncate">
            <span className="text-ops-amber font-semibold">
              ACTIVE STORM: {selectedCyclone.name} ({selectedCyclone.category})
            </span>
            <span className="text-slate-400">·</span>
            <span>PUBLIC SAFETY FEED</span>
          </div>
        </div>

        {/* Quick Storm Switcher Dropdown */}
        <div className="relative hidden sm:block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1 rounded bg-ops-card-sub border border-ops-border text-xs font-mono text-ops-text hover:border-ops-cyan transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-ops-amber animate-pulse" />
            <span className="font-bold text-ops-cyan">{selectedCyclone.name}</span>
            <span className="text-[10px] text-ops-text-muted">({selectedCyclone.code})</span>
            <ChevronDown className="w-3.5 h-3.5 text-ops-text-muted" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-1 w-72 bg-ops-card border border-ops-border rounded-md shadow-xl py-1 z-50">
              <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider text-ops-text-muted border-b border-ops-border-subtle">
                Active Tropical Cyclones
              </div>
              {allActiveCyclones.map((cyclone) => (
                <button
                  key={cyclone.id}
                  onClick={() => {
                    setSelectedCyclone(cyclone);
                    setIsDropdownOpen(false);
                    addOperationalLog(`Focus switched to ${cyclone.name} (${cyclone.code})`, 'cyan');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-ops-card-hover transition-colors ${
                    cyclone.id === selectedCyclone.id ? 'bg-ops-card-sub text-ops-cyan font-bold' : 'text-ops-text'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{cyclone.name}</div>
                    <div className="text-[10px] font-mono text-ops-text-muted">{cyclone.basin}</div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-ops-amber border border-amber-500/30">
                    {cyclone.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions: Compact Light/Dark Switch, Unit Toggle, Clock, Refresh */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* COMPACT LIGHT / DARK MODE TOGGLE (Light Mode Default) */}
        <button
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          className="p-1.5 rounded-md bg-ops-card-sub border border-ops-border text-ops-text hover:text-ops-cyan hover:border-ops-cyan transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
        >
          {theme === 'light' ? (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-700" />
              <span className="hidden md:inline text-[11px] text-slate-600">DARK</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline text-[11px] text-amber-300">LIGHT</span>
            </>
          )}
        </button>

        {/* Quick Unit Switcher */}
        <button
          onClick={toggleWindUnit}
          title="Click to toggle wind speed units (km/h, kts, mph)"
          className="px-2 py-1 rounded bg-ops-card-sub border border-ops-border text-ops-cyan font-mono text-[11px] font-bold hover:border-ops-cyan transition-colors"
        >
          UNIT: {windUnit}
        </button>

        {/* Manual Refresh Action */}
        <button
          onClick={handleManualSync}
          title="Refresh Satellite & Telemetry Data"
          className="p-1.5 rounded bg-ops-card-sub border border-ops-border text-ops-text-muted hover:text-ops-cyan hover:border-ops-cyan transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-ops-cyan' : ''}`} />
        </button>

        {/* Audio Siren Toggle */}
        <button
          onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
          title={soundAlertsEnabled ? 'Alert Audio Active' : 'Alert Audio Muted'}
          className="p-1.5 rounded bg-ops-card-sub border border-ops-border text-ops-text-muted hover:text-ops-text transition-colors"
        >
          {soundAlertsEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-ops-cyan" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {/* Server / Ingest Status */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-ops-green text-[10px] font-mono font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-pulse" />
          <span>SATELLITE FEED LIVE</span>
        </div>

        {/* Live Digital Clock */}
        <div className="px-2.5 py-1 rounded bg-ops-card-sub border border-ops-border text-ops-text font-mono text-xs font-bold tracking-wider">
          {utcTimeString}
        </div>
      </div>
    </header>
  );
};
