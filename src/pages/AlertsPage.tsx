import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Send, 
  Copy, 
  Download, 
  Clock, 
  MapPin, 
  Radio, 
  Info,
  X
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';
import { OperationalAlert } from '../types/cyclone';

export const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, selectedCyclone, addOperationalLog } = useCyclone();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [dispatchModalAlert, setDispatchModalAlert] = useState<OperationalAlert | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const filteredAlerts = alerts.filter(a => {
    if (selectedSeverity === 'ALL') return true;
    return a.severity === selectedSeverity;
  });

  const handleAcknowledge = (alertId: string) => {
    acknowledgeAlert(alertId);
    addOperationalLog(`Operational Alert ${alertId} formally acknowledged by Duty Chief`, 'green');
  };

  const generateBulletinText = (alert: OperationalAlert) => {
    return `================================================================================
CYCLONEOPS EMERGENCY METEOROLOGICAL WARNING BULLETIN
ISSUED BY: NATIONAL CYCLONE MONITORING MISSION DECK
TIMESTAMP: ${alert.timestamp}
================================================================================
ALERT LEVEL: ${alert.severity} (PORT WARNING SIGNAL: ${alert.portWarningSignal || 'LC-III'})
CYCLONE NAME: ${alert.cycloneName}
THREAT REGION: ${alert.location}

HEADLINE:
${alert.headline}

SITUATION & METEOROLOGICAL TELEMETRY:
${alert.description}

TRIGGER CONDITION:
${alert.triggerCondition}

MANDATORY DIRECTIVE / ACTION REQUIRED:
${alert.actionRequired}

DISTRIBUTION:
-> National Disaster Response Force (NDRF) Command
-> Indian Coast Guard (ICG) Maritime Operations Center
-> State Disaster Management Authority (SDMA)
-> Port Authorities & Fisheries Directorate
================================================================================`;
  };

  const handleCopyBulletin = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-amber uppercase font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ops-amber animate-ping" />
            OPERATIONAL ALERT & EARLY WARNING DISPATCH ENGINE
          </div>
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            Mission Control Emergency Bulletins
          </h1>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded border border-ops-border text-xs font-mono">
          {(['ALL', 'CRITICAL', 'WARNING', 'ADVISORY', 'INFO'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                selectedSeverity === sev
                  ? 'bg-slate-800 text-ops-cyan border border-ops-cyan/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const getSeverityStyle = () => {
            switch (alert.severity) {
              case 'CRITICAL':
                return {
                  card: 'border-red-900/60 bg-red-950/10 hover:border-red-600',
                  badge: 'bg-red-950 text-red-400 border-red-800',
                  dot: 'bg-red-500',
                  accent: 'text-red-400'
                };
              case 'WARNING':
                return {
                  card: 'border-amber-900/60 bg-amber-950/10 hover:border-ops-amber',
                  badge: 'bg-amber-950 text-ops-amber border-amber-800',
                  dot: 'bg-ops-amber',
                  accent: 'text-ops-amber'
                };
              case 'ADVISORY':
                return {
                  card: 'border-cyan-900/60 bg-cyan-950/10 hover:border-ops-cyan',
                  badge: 'bg-cyan-950 text-ops-cyan border-cyan-800',
                  dot: 'bg-ops-cyan',
                  accent: 'text-ops-cyan'
                };
              case 'INFO':
              default:
                return {
                  card: 'border-slate-800 bg-slate-900/40 hover:border-slate-700',
                  badge: 'bg-slate-800 text-slate-300 border-slate-700',
                  dot: 'bg-slate-400',
                  accent: 'text-slate-300'
                };
            }
          };

          const style = getSeverityStyle();

          return (
            <div 
              key={alert.id}
              className={`border rounded p-4 transition-all duration-200 ${style.card} relative`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${style.badge}`}>
                      {alert.severity}
                    </span>
                    {alert.portWarningSignal && (
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 border border-slate-700 text-[10px] font-bold">
                        PORT SIGNAL {alert.portWarningSignal}
                      </span>
                    )}
                    <span className="text-slate-400">·</span>
                    <span className="text-ops-cyan font-bold">{alert.cycloneName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {alert.timestamp}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans">
                    {alert.headline}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                    <div className="bg-slate-900/80 p-2 rounded border border-ops-border-subtle">
                      <span className="text-slate-400">TRIGGER: </span>
                      <span className="text-slate-200">{alert.triggerCondition}</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded border border-ops-border-subtle">
                      <span className="text-slate-400">DIRECTIVE: </span>
                      <span className="text-ops-amber">{alert.actionRequired}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {!alert.isAcknowledged ? (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="px-3 py-1.5 rounded bg-ops-amber hover:bg-orange-500 text-slate-950 text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACKNOWLEDGE</span>
                    </button>
                  ) : (
                    <div className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-ops-green text-[10px] font-mono font-bold flex items-center gap-1.5 justify-center">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ACKNOWLEDGED</span>
                    </div>
                  )}

                  <button
                    onClick={() => setDispatchModalAlert(alert)}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-1.5 border border-ops-border transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>DISPATCH BULLETIN</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Bulletin Modal */}
      {dispatchModalAlert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-ops-card border border-ops-border rounded-lg max-w-2xl w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ops-border pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-ops-cyan" />
                <h3 className="text-sm font-bold text-white uppercase font-sans tracking-wider">
                  OFFICIAL EARLY WARNING DISPATCH BULLETIN
                </h3>
              </div>
              <button 
                onClick={() => setDispatchModalAlert(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-black/80 border border-ops-border rounded p-3 text-xs font-mono text-ops-green overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96">
              {generateBulletinText(dispatchModalAlert)}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-400">
                Authorized for NDRF / IMD / Coast Guard Transmission
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyBulletin(generateBulletinText(dispatchModalAlert))}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-border transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSuccess ? 'COPIED TO CLIPBOARD!' : 'COPY BULLETIN'}</span>
                </button>
                <button
                  onClick={() => {
                    alert('Emergency warning bulletin broadcasted across all coastal telemetry gateways.');
                    setDispatchModalAlert(null);
                  }}
                  className="px-3 py-1.5 rounded bg-ops-cyan hover:bg-cyan-400 text-slate-950 text-xs font-mono font-extrabold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>BROADCAST BULLETIN</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
