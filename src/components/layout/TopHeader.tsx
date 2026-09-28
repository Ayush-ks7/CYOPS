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
  CheckCircle2
} from 'lucide-react';
import { useCyclone } from '../../context/CycloneContext';

export const TopHeader: React.FC = () => {
  const { 
    selectedCyclone, 
    setSelectedCyclone, 
    allActiveCyclones, 
    utcTimeString, 
    soundAlertsEnabled, 
    setSoundAlertsEnabled,
    addOperationalLog
  } = useCyclone();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    addOperationalLog('Manual telemetry synchronization request broadcasted to MOSDAC & IMD radars', 'cyan');
    setTimeout(() => {
      setIsSyncing(false);
      addOperationalLog('Telemetry data sync verified: 100% frame integrity', 'green');
    }, 1200);
  };

  return (
    <header className="h-14 bg-ops-header border-b border-ops-border px-4 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Monitoring Region Header */}
      <div className="flex items-center gap-4 min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-wider text-slate-100 uppercase font-sans">
              {selectedCyclone.basin === 'Western Pacific' ? 'WESTERN PACIFIC MONITORING AREA (WPAC)' : 'NORTH INDIAN OCEAN MONITORING DECK (NIO-BOB)'}
            </h1>
          </div>
          <div className="text-[10px] font-mono tracking-wider text-ops-text-dim flex items-center gap-2 truncate">
            <span className="text-ops-amber font-semibold">
              STATUS: {selectedCyclone.categoryNumber >= 4 ? '1 ACTIVE SUPER STORM CRITICAL LEVEL' : '1 ACTIVE CYCLONIC THREAT'}
            </span>
            <span className="text-slate-600">·</span>
            <span>LIVE TELEMETRY DECK</span>
            <span className="text-slate-600">·</span>
            <span className="text-ops-cyan font-mono">INSAT-3DR MOSDAC INGEST</span>
          </div>
        </div>

        {/* Quick Storm Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1 rounded bg-ops-card border border-ops-border text-xs font-mono text-slate-200 hover:border-ops-cyan/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-ops-amber animate-pulse" />
            <span className="font-bold text-ops-cyan">{selectedCyclone.name}</span>
            <span className="text-[10px] text-slate-400">({selectedCyclone.code})</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-ops-card border border-ops-border rounded shadow-xl py-1 z-50">
              <div className="px-3 py-1 text-[9px] font-mono uppercase tracking-wider text-slate-400 border-b border-ops-border-subtle">
                Active Tracking Targets
              </div>
              {allActiveCyclones.map((cyclone) => (
                <button
                  key={cyclone.id}
                  onClick={() => {
                    setSelectedCyclone(cyclone);
                    setIsDropdownOpen(false);
                    addOperationalLog(`Active monitoring focus switched to ${cyclone.name} (${cyclone.code})`, 'cyan');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    cyclone.id === selectedCyclone.id ? 'bg-slate-800 text-ops-cyan font-bold' : 'text-slate-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{cyclone.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{cyclone.basin}</div>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-ops-amber border border-amber-800">
                    {cyclone.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Telemetry Status Pills */}
      <div className="flex items-center gap-3">
        {/* Manual Refresh Action */}
        <button
          onClick={handleManualSync}
          title="Force Telemetry Sync"
          className="p-1.5 rounded bg-ops-card border border-ops-border text-slate-400 hover:text-ops-cyan hover:border-ops-cyan/30 transition-all text-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-ops-cyan' : ''}`} />
        </button>

        {/* Audio Siren Toggle */}
        <button
          onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
          title={soundAlertsEnabled ? 'Telemetry Audio Active' : 'Telemetry Audio Muted'}
          className="p-1.5 rounded bg-ops-card border border-ops-border text-slate-400 hover:text-slate-200 transition-colors text-xs"
        >
          {soundAlertsEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-ops-cyan" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          )}
        </button>

        {/* Server Status Pill (Matching @reference.png: ● SERVER ONLINE) */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/90 border border-emerald-500/30 text-ops-green text-[10px] font-mono font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-ops-green animate-pulse" />
          <span>SERVER ONLINE</span>
        </div>

        {/* Digital UTC Clock (Matching @reference.png: UTC 14:48:02) */}
        <div className="px-2.5 py-1 rounded bg-ops-card border border-ops-border text-slate-200 font-mono text-xs font-bold tracking-wider">
          {utcTimeString}
        </div>
      </div>
    </header>
  );
};
