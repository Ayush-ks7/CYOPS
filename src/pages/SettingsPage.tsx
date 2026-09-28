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
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 flex-shrink-0" />
            <span>USER PREFERENCES & DISPLAY SETTINGS</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            System Preferences
          </h1>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 text-xs font-mono font-bold animate-pulse self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>PREFERENCES SAVED</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-4 sm:space-y-5">
        {/* Appearance & Theme Selector */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
            <Sun className="w-4 h-4 text-ops-amber flex-shrink-0" />
            <span>APPEARANCE & THEME</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-ops-cyan/10 border-ops-cyan shadow-sm font-bold text-ops-cyan ring-1 ring-ops-cyan'
                  : 'bg-ops-card-sub border-ops-border text-ops-text hover:border-ops-border-light'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500 flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="font-bold truncate">Light Theme (Default)</div>
                <div className="text-[10px] text-ops-text-muted font-normal truncate">Crisp white & oceanic slate</div>
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
              <Moon className="w-5 h-5 text-ops-cyan flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="font-bold truncate">Dark Theme</div>
                <div className="text-[10px] text-ops-text-muted font-normal truncate">Deep navy mission control</div>
              </div>
            </button>
          </div>
        </div>

        {/* Units of Measurement */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-ops-cyan flex-shrink-0" />
            <span>UNITS OF MEASUREMENT</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            {/* Wind Units */}
            <div className="space-y-1.5">
              <label className="text-ops-text-dim text-[11px] font-mono uppercase">WIND SPEED DISPLAY UNIT</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                {(['KMH', 'KTS', 'MPH', 'MS'] as WindUnit[]).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setWindUnit(unit)}
                    className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      windUnit === unit
                        ? 'bg-ops-cyan text-white border-ops-cyan shadow-sm'
                        : 'bg-ops-card-sub border-ops-border text-ops-text hover:border-ops-border-light'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Pressure Units */}
            <div className="space-y-1.5">
              <label className="text-ops-text-dim text-[11px] font-mono uppercase">BAROMETRIC PRESSURE UNIT</label>
              <div className="grid grid-cols-3 gap-2 font-mono">
                {(['HPA', 'MBAR', 'INHG'] as PressureUnit[]).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => setPressureUnit(unit)}
                    className={`py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      pressureUnit === unit
                        ? 'bg-ops-cyan text-white border-ops-cyan shadow-sm'
                        : 'bg-ops-card-sub border-ops-border text-ops-text hover:border-ops-border-light'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audio Alerts & Refresh */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
            <Bell className="w-4 h-4 text-ops-green flex-shrink-0" />
            <span>ALERT AUDIO & REFRESH INTERVAL</span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="flex items-center justify-between p-3 rounded-lg bg-ops-card-sub border border-ops-border">
              <div>
                <div className="font-semibold text-ops-text">Audio Siren on Critical Landfall Alerts</div>
                <div className="text-[11px] text-ops-text-muted">Plays audible alert when super cyclone or hurricane warnings fire</div>
              </div>
              <input
                type="checkbox"
                checked={soundAlertsEnabled}
                onChange={(e) => setSoundAlertsEnabled(e.target.checked)}
                className="w-4 h-4 accent-sky-600 rounded cursor-pointer"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-ops-card-sub border border-ops-border gap-2">
              <div>
                <div className="font-semibold text-ops-text">Automatic Telemetry Polling Rate</div>
                <div className="text-[11px] text-ops-text-muted">Background satellite stream synchronization frequency</div>
              </div>
              <select
                value={dataRefreshIntervalSec}
                onChange={(e) => setDataRefreshIntervalSec(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg bg-ops-card border border-ops-border text-ops-text font-mono text-xs focus:outline-none focus:border-ops-cyan self-start sm:self-auto cursor-pointer"
              >
                <option value={15}>15 Seconds (Rapid Scan)</option>
                <option value={30}>30 Seconds (Default)</option>
                <option value={60}>1 Minute</option>
                <option value={300}>5 Minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ops-cyan hover:bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PREFERENCES</span>
          </button>
        </div>
      </form>
    </div>
  );
};
