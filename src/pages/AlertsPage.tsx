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
  X, 
  Share2 
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';
import { OperationalAlert } from '../types/cyclone';

export const AlertsPage: React.FC = () => {
  const { alerts, acknowledgeAlert, selectedCyclone, addOperationalLog, formatWind } = useCyclone();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [dispatchModalAlert, setDispatchModalAlert] = useState<OperationalAlert | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const filteredAlerts = alerts.filter(a => {
    if (selectedSeverity === 'ALL') return true;
    return a.severity === selectedSeverity;
  });

  const handleAcknowledge = (alertId: string) => {
    acknowledgeAlert(alertId);
    addOperationalLog(`Safety Advisory ${alertId} acknowledged`, 'green');
  };

  const generateBulletinText = (alert: OperationalAlert) => {
    return `================================================================================
CYCLONEOPS PUBLIC CYCLONE SAFETY & EARLY WARNING ADVISORY
ISSUED BY: NATIONAL CYCLONE MONITORING & PUBLIC SAFETY SYSTEM
TIMESTAMP: ${alert.timestamp}
================================================================================
ALERT LEVEL: ${alert.severity}
CYCLONE: ${alert.cycloneName}
TARGET REGION: ${alert.location}

HEADLINE:
${alert.headline}

SITUATION & IMPACT OVERVIEW:
${alert.description}

RECOMMENDED SAFETY ACTIONS:
${alert.actionRequired}

EMERGENCY CONTACTS:
-> National Disaster Helpline: 1078 / 112
-> State Disaster Management Authority (SDMA)
-> Local Coastal Police & District Control Room
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
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-amber uppercase font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ops-amber animate-ping flex-shrink-0" />
            <span>OFFICIAL EARLY WARNING & COMMUNITY BULLETINS</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            Active Cyclone Alerts & Safety Bulletins
          </h1>
        </div>

        {/* Severity Filter */}
        <div className="flex flex-wrap items-center gap-1 bg-ops-card-sub p-1 rounded-lg border border-ops-border text-xs font-mono self-start md:self-auto">
          {(['ALL', 'CRITICAL', 'WARNING', 'ADVISORY', 'INFO'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSelectedSeverity(sev)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase transition-all cursor-pointer ${
                selectedSeverity === sev
                  ? 'bg-ops-cyan text-white shadow-sm font-extrabold'
                  : 'text-ops-text-muted hover:text-ops-text'
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
                  card: 'border-red-500/40 bg-red-500/5 hover:border-red-500',
                  badge: 'bg-red-500/10 text-red-600 border-red-500/30',
                  dot: 'bg-red-500'
                };
              case 'WARNING':
                return {
                  card: 'border-amber-500/40 bg-amber-500/5 hover:border-ops-amber',
                  badge: 'bg-amber-500/10 text-ops-amber border-amber-500/30',
                  dot: 'bg-ops-amber'
                };
              case 'ADVISORY':
                return {
                  card: 'border-sky-500/40 bg-sky-500/5 hover:border-ops-cyan',
                  badge: 'bg-sky-500/10 text-ops-cyan border-sky-500/30',
                  dot: 'bg-ops-cyan'
                };
              case 'INFO':
              default:
                return {
                  card: 'border-ops-border bg-ops-card-sub/30 hover:border-ops-border-light',
                  badge: 'bg-ops-card-sub text-ops-text-muted border-ops-border',
                  dot: 'bg-slate-400'
                };
            }
          };

          const style = getSeverityStyle();

          return (
            <div 
              key={alert.id}
              className={`border rounded-xl p-4 sm:p-5 transition-all shadow-sm ${style.card}`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-mono">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${style.badge}`}>
                      {alert.severity}
                    </span>
                    {alert.portWarningSignal && (
                      <span className="px-2.5 py-0.5 rounded-full bg-ops-card-sub text-ops-text border border-ops-border text-[10px] font-bold">
                        PORT SIGNAL {alert.portWarningSignal}
                      </span>
                    )}
                    <span className="text-ops-text-muted hidden xs:inline">·</span>
                    <span className="text-ops-cyan font-bold">{alert.cycloneName}</span>
                    <span className="text-ops-text-muted hidden xs:inline">·</span>
                    <span className="text-ops-text-muted flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 flex-shrink-0" /> {alert.timestamp}
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-ops-text font-sans break-words">
                    {alert.headline}
                  </h2>

                  <p className="text-xs text-ops-text-dim font-sans leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                    <div className="bg-ops-card-sub/80 p-2 sm:p-2.5 rounded-lg border border-ops-border">
                      <span className="text-ops-text-muted">LOCATION: </span>
                      <span className="text-ops-text font-bold">{alert.location}</span>
                    </div>
                    <div className="bg-ops-card-sub/80 p-2 sm:p-2.5 rounded-lg border border-ops-border">
                      <span className="text-ops-text-muted">ACTION: </span>
                      <span className="text-ops-amber font-bold">{alert.actionRequired}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-row md:flex-col gap-2 flex-shrink-0 w-full md:w-auto">
                  {!alert.isAcknowledged ? (
                    <button
                      onClick={() => handleAcknowledge(alert.id)}
                      className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg bg-ops-amber hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACKNOWLEDGE</span>
                    </button>
                  ) : (
                    <div className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-ops-green text-[10px] font-mono font-bold flex items-center gap-1.5 justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ACKNOWLEDGED</span>
                    </div>
                  )}

                  <button
                    onClick={() => setDispatchModalAlert(alert)}
                    className="flex-1 md:flex-initial px-3.5 py-2 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-1.5 border border-ops-border transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>SHARE</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share / Bulletin Modal */}
      {dispatchModalAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-ops-card border border-ops-border rounded-xl max-w-2xl w-full p-4 sm:p-6 space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-ops-border pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-ops-cyan" />
                <h3 className="text-xs sm:text-sm font-bold text-ops-text uppercase font-sans tracking-wider">
                  COMMUNITY CYCLONE SAFETY BULLETIN
                </h3>
              </div>
              <button 
                onClick={() => setDispatchModalAlert(null)}
                className="text-ops-text-muted hover:text-ops-text cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 sm:p-4 text-[11px] sm:text-xs font-mono text-ops-text overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-80 sm:max-h-96">
              {generateBulletinText(dispatchModalAlert)}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <span className="text-[10px] sm:text-[11px] font-mono text-ops-text-muted">
                Official Public Safety Broadcast Format
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyBulletin(generateBulletinText(dispatchModalAlert))}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-1.5 border border-ops-border transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedSuccess ? 'COPIED!' : 'COPY'}</span>
                </button>
                <button
                  onClick={() => {
                    alert('Advisory bulletin shared successfully.');
                    setDispatchModalAlert(null);
                  }}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-lg bg-ops-cyan hover:bg-sky-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>SHARE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
