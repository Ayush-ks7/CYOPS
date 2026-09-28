import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Bell, 
  Volume2, 
  Globe, 
  Save, 
  CheckCircle2, 
  Radio, 
  ShieldCheck,
  User
} from 'lucide-react';
import { useCyclone, WindUnit, PressureUnit } from '../context/CycloneContext';

export const SettingsPage: React.FC = () => {
  const { 
    windUnit, 
    setWindUnit, 
    pressureUnit, 
    setPressureUnit, 
    dataRefreshIntervalSec, 
    setDataRefreshIntervalSec,
    soundAlertsEnabled, 
    setSoundAlertsEnabled,
    addOperationalLog 
  } = useCyclone();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://api.ndrf.gov.in/v2/webhooks/cyclone_ops');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    addOperationalLog(`Operational display preferences & dispatch webhooks updated`, 'green');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded p-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" />
            OPERATIONAL WORKSTATION CONFIGURATION
          </div>
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            Settings & Telemetry Preferences
          </h1>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950 text-ops-green border border-emerald-800 text-xs font-mono font-bold animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>SAVED CONFIGURATION</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-4">
        {/* Unit Preferences */}
        <div className="bg-ops-card border border-ops-border rounded p-5 space-y-4">
          <div className="text-xs font-bold text-white uppercase font-sans border-b border-ops-border-subtle pb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-ops-cyan" />
            <span>METEOROLOGICAL TELEMETRY UNITS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Wind Units */}
            <div className="space-y-1.5">
              <label className="text-slate-400">Wind Velocity Standard:</label>
              <select
                value={windUnit}
                onChange={(e) => setWindUnit(e.target.value as WindUnit)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-ops-border text-slate-200 focus:outline-none focus:border-ops-cyan"
              >
                <option value="KTS">Knots (KTS) — IMD & WMO Nautical Standard</option>
                <option value="KMH">Kilometers per hour (KM/H) — Civil Disaster Scale</option>
                <option value="MS">Meters per second (M/S) — Physical SI Units</option>
                <option value="MPH">Miles per hour (MPH) — Saffir-Simpson</option>
              </select>
            </div>

            {/* Pressure Units */}
            <div className="space-y-1.5">
              <label className="text-slate-400">Central Pressure Standard:</label>
              <select
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value as PressureUnit)}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-ops-border text-slate-200 focus:outline-none focus:border-ops-cyan"
              >
                <option value="HPA">Hectopascals (hPa) — International Standard</option>
                <option value="MBAR">Millibars (mbar)</option>
                <option value="INHG">Inches of Mercury (inHg)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Polling & Audio Preferences */}
        <div className="bg-ops-card border border-ops-border rounded p-5 space-y-4">
          <div className="text-xs font-bold text-white uppercase font-sans border-b border-ops-border-subtle pb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-ops-amber" />
            <span>INGESTION INTERVALS & ALERT BROADCAST</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-400">Satellite Radiance Refresh Polling:</label>
              <select
                value={dataRefreshIntervalSec}
                onChange={(e) => setDataRefreshIntervalSec(Number(e.target.value))}
                className="w-full px-3 py-2 rounded bg-slate-900 border border-ops-border text-slate-200 focus:outline-none focus:border-ops-cyan"
              >
                <option value={10}>10 Seconds (Rapid Scan Ingestion)</option>
                <option value={30}>30 Seconds (Standard Operational Deck)</option>
                <option value={60}>60 Seconds (Bandwidth Conservative)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400">Auditory Siren Alarms:</label>
              <button
                type="button"
                onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
                className={`w-full px-3 py-2 rounded border text-left font-bold transition-colors flex items-center justify-between ${
                  soundAlertsEnabled 
                    ? 'bg-emerald-950/60 border-emerald-800 text-ops-green' 
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <span>{soundAlertsEnabled ? 'ENABLED (CRITICAL ALERTS AUDIBLE)' : 'MUTED'}</span>
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Webhook URL Input */}
          <div className="space-y-1.5 text-xs font-mono">
            <label className="text-slate-400">NDRF Emergency Dispatch Gateway Webhook:</label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-900 border border-ops-border text-slate-200 focus:outline-none focus:border-ops-cyan"
            />
          </div>
        </div>

        {/* Duty Officer Profile */}
        <div className="bg-ops-card border border-ops-border rounded p-5 space-y-4">
          <div className="text-xs font-bold text-white uppercase font-sans border-b border-ops-border-subtle pb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-ops-green" />
            <span>DUTY OFFICER STATION PROFILE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-900 p-2.5 rounded border border-ops-border-subtle">
              <div className="text-slate-500">OPERATOR NAME</div>
              <div className="text-white font-bold mt-0.5">COL. R. MILLER</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-ops-border-subtle">
              <div className="text-slate-500">ASSIGNED DECK</div>
              <div className="text-ops-cyan font-bold mt-0.5">DECK A · WATCH COMMAND</div>
            </div>
            <div className="bg-slate-900 p-2.5 rounded border border-ops-border-subtle">
              <div className="text-slate-500">TERMINAL ID</div>
              <div className="text-ops-amber font-bold mt-0.5">TER-NIO-042-ALPHA</div>
            </div>
          </div>
        </div>

        {/* Save Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded bg-ops-cyan hover:bg-cyan-400 text-slate-950 font-mono font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>SAVE OPERATIONAL CONFIGURATION</span>
          </button>
        </div>
      </form>
    </div>
  );
};
