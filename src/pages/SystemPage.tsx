import React, { useState } from 'react';
import { 
  Activity, 
  Server, 
  Cpu, 
  Database, 
  Layers, 
  Wifi, 
  Terminal, 
  CheckCircle2, 
  RefreshCw, 
  Play, 
  Pause,
  AlertCircle
} from 'lucide-react';
import { SYSTEM_SERVICES } from '../data/mockData';
import { useCyclone } from '../context/CycloneContext';

export const SystemPage: React.FC = () => {
  const { addOperationalLog } = useCyclone();
  const [selectedService, setSelectedService] = useState<string>(SYSTEM_SERVICES[0].id);
  const [isRestartingService, setIsRestartingService] = useState<string | null>(null);

  const activeServiceNode = SYSTEM_SERVICES.find(s => s.id === selectedService) || SYSTEM_SERVICES[0];

  const handleRestartService = (serviceId: string, name: string) => {
    setIsRestartingService(serviceId);
    setTimeout(() => {
      setIsRestartingService(null);
      addOperationalLog(`Microservice daemon ${name} healthcheck refreshed (Status: Online)`, 'green');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            PIPELINE STATUS & CLUSTER MONITORING
          </div>
          <h1 className="text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5">
            CycloneOps Cloud Microservice Cluster
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-ops-green px-3.5 py-2 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ops-green animate-pulse" />
            <span className="font-bold">ALL SERVICES OPERATIONAL (99.98% UPTIME)</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SYSTEM_SERVICES.map((node) => {
          const isSelected = selectedService === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedService(node.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-ops-cyan/10 border-ops-cyan shadow-sm ring-1 ring-ops-cyan' 
                  : 'bg-ops-card border-ops-border hover:border-ops-border-light'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[9px] font-mono uppercase text-ops-text-muted">
                  {node.serviceCategory}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-ops-green" />
                  {node.status}
                </span>
              </div>

              <div className="text-xs font-bold text-ops-text font-sans truncate">
                {node.name}
              </div>
              <div className="text-[10px] font-mono text-ops-text-muted truncate">
                {node.technology}
              </div>

              <div className="mt-3 pt-2.5 border-t border-ops-border-subtle grid grid-cols-3 gap-1 text-[10px] font-mono text-ops-text-muted">
                <div>
                  <div>CPU</div>
                  <div className="text-ops-text font-bold">{node.cpuUsagePct}%</div>
                </div>
                <div>
                  <div>MEM</div>
                  <div className="text-ops-text font-bold">{node.memoryUsagePct}%</div>
                </div>
                <div>
                  <div>LATENCY</div>
                  <div className="text-ops-cyan font-bold">{node.avgLatencyMs}ms</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Node Telemetry & Event Stream Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-4">
          <div className="flex items-center justify-between border-b border-ops-border-subtle pb-3">
            <span className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
              SERVICE TELEMETRY
            </span>
            <span className="text-xs font-mono text-ops-cyan font-bold">
              {activeServiceNode.name}
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono text-ops-text">
            <div className="flex justify-between border-b border-ops-border-subtle pb-1">
              <span className="text-ops-text-muted">Category:</span>
              <strong>{activeServiceNode.serviceCategory}</strong>
            </div>
            <div className="flex justify-between border-b border-ops-border-subtle pb-1">
              <span className="text-ops-text-muted">Technology:</span>
              <strong>{activeServiceNode.technology}</strong>
            </div>
            <div className="flex justify-between border-b border-ops-border-subtle pb-1">
              <span className="text-ops-text-muted">Uptime:</span>
              <strong className="text-ops-green">{activeServiceNode.uptimePercentage}%</strong>
            </div>
            <div className="flex justify-between border-b border-ops-border-subtle pb-1">
              <span className="text-ops-text-muted">Response Latency:</span>
              <strong className="text-ops-cyan">{activeServiceNode.avgLatencyMs} ms</strong>
            </div>
          </div>

          <button
            onClick={() => handleRestartService(activeServiceNode.id, activeServiceNode.name)}
            disabled={isRestartingService === activeServiceNode.id}
            className="w-full py-2 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-2 border border-ops-border transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRestartingService === activeServiceNode.id ? 'animate-spin' : ''}`} />
            <span>{isRestartingService === activeServiceNode.id ? 'CHECKING HEALTH...' : 'PROBE SERVICE HEALTH'}</span>
          </button>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-ops-border rounded-xl p-5 shadow-ops-card flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-ops-green" />
              <span className="text-xs font-mono font-bold text-slate-200">
                LIVE STDOUT LOG STREAM · {activeServiceNode.name}
              </span>
            </div>
            <span className="text-[10px] font-mono text-ops-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-ping" />
              STREAMING
            </span>
          </div>

          <div className="bg-black/90 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-ops-green space-y-2 h-64 overflow-y-auto leading-relaxed">
            <div className="text-slate-500 text-[10px]">
              [INFO] Attached to stream for service '{activeServiceNode.name}'...
            </div>
            {activeServiceNode.recentEvents.map((evt, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-slate-500 text-[10px] select-none">&gt;</span>
                <span className="text-slate-200 text-[11px]">{evt}</span>
              </div>
            ))}
            <div className="text-ops-cyan text-[10px]">
              [INFO] Healthcheck probe status 200 OK (Ping: {activeServiceNode.avgLatencyMs}ms)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
