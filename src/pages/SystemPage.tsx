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
    <div className="space-y-4 sm:space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 flex-shrink-0" />
            <span>PIPELINE STATUS & CLUSTER MONITORING</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            CycloneOps Cloud Microservice Cluster
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono self-start md:self-auto">
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-ops-green px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ops-green animate-pulse" />
            <span className="font-bold text-[10px] sm:text-xs">ALL SERVICES OPERATIONAL (99.98% UPTIME)</span>
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
                <span className="text-[9px] font-mono uppercase text-ops-text-muted truncate">
                  {node.serviceCategory}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 font-bold flex-shrink-0">
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

              <div className="mt-3 pt-2.5 border-t border-ops-border-subtle grid grid-cols-3 gap-1 text-[10px] font-mono text-ops-text-muted text-center">
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

      {/* Node Detail Console */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-6 shadow-ops-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ops-border-subtle pb-3">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-ops-cyan flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold text-ops-text font-sans uppercase truncate">
                {activeServiceNode.name} — Service Health & Logs
              </div>
              <div className="text-[10px] font-mono text-ops-text-muted truncate">
                Technology: {activeServiceNode.technology} · Node: {activeServiceNode.id}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleRestartService(activeServiceNode.id, activeServiceNode.name)}
            disabled={isRestartingService === activeServiceNode.id}
            className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-1.5 border border-ops-border transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRestartingService === activeServiceNode.id ? 'animate-spin' : ''}`} />
            <span>{isRestartingService === activeServiceNode.id ? 'RECHECKING...' : 'RUN HEALTHCHECK'}</span>
          </button>
        </div>

        {/* Real-time Daemon Log Stream Terminal */}
        <div className="bg-slate-950 text-slate-200 font-mono text-xs p-4 rounded-xl border border-slate-800 space-y-1.5 overflow-x-auto max-h-56">
          <div className="text-emerald-400 font-bold text-[11px] mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TELEMETRY STREAM & CONTAINER HEALTH
          </div>
          <div className="text-slate-400 text-[11px]">
            [12:00:01 UTC] [INFO] Service {activeServiceNode.id} active and healthy
          </div>
          <div className="text-slate-400 text-[11px]">
            [12:00:03 UTC] [INFO] Ingest throughput: 28.4 MB/s · Zero dropped packets
          </div>
          <div className="text-emerald-400 text-[11px]">
            [12:00:08 UTC] [HEALTH] Heartbeat ACK received (2ms) — Node healthy
          </div>
          <div className="text-slate-400 text-[11px]">
            [12:00:15 UTC] [INFO] Garbage collection completed · Freed 48.2 MB heap memory
          </div>
          <div className="text-cyan-400 text-[11px]">
            [12:00:22 UTC] [METRICS] CPU: {activeServiceNode.cpuUsagePct}% | Memory: {activeServiceNode.memoryUsagePct}% | Latency: {activeServiceNode.avgLatencyMs}ms
          </div>
        </div>
      </div>
    </div>
  );
};
