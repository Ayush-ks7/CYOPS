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
  User,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { useCyclone, WindUnit, PressureUnit } from '../context/CycloneContext';

export const SettingsPage: React.FC = () => {
  const { 
    theme,
    setTheme,
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
  const [notificationEmail, setNotificationEmail] = useState('community-alerts@cycloneops.org');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    addOperationalLog(`Application display and telemetry preferences saved`, 'green');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5" />
            USER PREFERENCES & DISPLAY SETTINGS
          </div>
          <h1 className="text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5">
            System Preferences
          </h1>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 text-xs font-mono font-bold animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PREFERENCES SAVED</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5">
        {/* Appearance & Theme Selector */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-ops-amber" />
            <span>APPEARANCE & THEME</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-ops-cyan/10 border-ops-cyan shadow-sm font-bold text-ops-cyan ring-1 ring-ops-cyan'
                  : 'bg-ops-card-sub border-ops-border text-ops-text hover:border-ops-border-light'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <div className="text-left">
                <div className="font-bold">Light Theme (Default)</div>
                <div className="text-[10px] text-ops-text-muted font-normal">Crisp white & oceanic slate</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-ops-cyan/10 border-ops-cyan shadow-sm font-bold text-ops-cyan ring-1 ring-ops-cyan'
                  : 'bg-ops-card-sub border-ops-border text-ops-text hover:border-ops-border-light'
              }`}
            >
              <Moon className="w-5 h-5 text-ops-cyan" />
              <div className="text-left">
                <div className="font-bold">Dark Theme</div>
                <div className="text-[10px] text-ops-text-muted font-normal">Deep navy & midnight charcoal</div>
              </div>
            </button>
          </div>
        </div>

        {/* Unit Preferences */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-ops-cyan" />
            <span>MEASUREMENT UNITS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-ops-text-muted font-medium">Wind Speed Unit:</label>
              <select
                value={windUnit}
                onChange={(e) => setWindUnit(e.target.value as WindUnit)}
                className="w-full px-3 py-2 rounded-lg bg-ops-card-sub border border-ops-border text-ops-text focus:outline-none focus:border-ops-cyan"
              >
                <option value="KMH">Kilometers per hour (km/h) — Standard Civilian</option>
                <option value="KTS">Knots (kts) — Maritime & Aviation</option>
                <option value="MS">Meters per second (m/s) — Scientific</option>
                <option value="MPH">Miles per hour (mph)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-ops-text-muted font-medium">Barometric Pressure Unit:</label>
              <select
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value as PressureUnit)}
                className="w-full px-3 py-2 rounded-lg bg-ops-card-sub border border-ops-border text-ops-text focus:outline-none focus:border-ops-cyan"
              >
                <option value="HPA">Hectopascals (hPa) — Standard</option>
                <option value="MBAR">Millibars (mbar)</option>
                <option value="INHG">Inches of Mercury (inHg)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Polling & Alerts */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-ops-amber" />
            <span>REFRESH INTERVALS & ALERTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-ops-text-muted font-medium">Satellite Data Refresh Rate:</label>
              <select
                value={dataRefreshIntervalSec}
                onChange={(e) => setDataRefreshIntervalSec(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-ops-card-sub border border-ops-border text-ops-text focus:outline-none focus:border-ops-cyan"
              >
                <option value={10}>10 Seconds (Rapid Mode)</option>
                <option value={30}>30 Seconds (Default)</option>
                <option value={60}>60 Seconds (Bandwidth Saver)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-ops-text-muted font-medium">Sound Alerts for Severe Warnings:</label>
              <button
                type="button"
                onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
                className={`w-full px-3 py-2 rounded-lg border text-left font-bold transition-colors flex items-center justify-between cursor-pointer ${
                  soundAlertsEnabled 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-ops-green' 
                    : 'bg-ops-card-sub border-ops-border text-ops-text-muted'
                }`}
              >
                <span>{soundAlertsEnabled ? 'ENABLED (AUDIBLE)' : 'MUTED'}</span>
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-ops-cyan hover:bg-sky-600 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PREFERENCES</span>
          </button>
        </div>
      </form>
    </div>
  );
};
