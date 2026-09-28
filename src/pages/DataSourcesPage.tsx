import React, { useState } from 'react';
import { 
  Database, 
  Satellite, 
  Radio, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Server, 
  Wifi, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { DATA_SOURCES } from '../data/mockData';
import { useCyclone } from '../context/CycloneContext';

export const DataSourcesPage: React.FC = () => {
  const { addOperationalLog } = useCyclone();
  const [isPinging, setIsPinging] = useState<string | null>(null);

  const handlePingSource = (sourceId: string, name: string) => {
    setIsPinging(sourceId);
    setTimeout(() => {
      setIsPinging(null);
      addOperationalLog(`Data feed ping verified: ${name} (24ms RTT, HTTP 200 OK)`, 'green');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5" />
            GLOBAL & REGIONAL SATELLITE DATA SOURCES
          </div>
          <h1 className="text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5">
            Multi-Source Satellite & Radar Data Ecosystem
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-ops-green font-bold">
            <span className="w-2 h-2 rounded-full bg-ops-green animate-pulse" />
            <span>5 / 5 DATA SOURCES ACTIVE</span>
          </div>
        </div>
      </div>

      {/* End-to-End Processing Architecture Flow Diagram */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-6 shadow-ops-card space-y-4">
        <div className="flex items-center justify-between border-b border-ops-border-subtle pb-3">
          <span className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
            END-TO-END DATA PROCESSING & INFERENCE PIPELINE
          </span>
          <span className="text-[10px] font-mono text-ops-cyan">
            CONTINUOUS STREAMING ARCHITECTURE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-center text-xs font-mono">
          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-cyan transition-colors">
            <Satellite className="w-5 h-5 text-ops-cyan" />
            <div className="font-bold text-ops-text text-[11px]">SATELLITE DATA</div>
            <div className="text-[9px] text-ops-text-muted">INSAT-3D / MOSDAC / Radars</div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-ops-cyan" />
          </div>

          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-purple-500 transition-colors">
            <Layers className="w-5 h-5 text-purple-600" />
            <div className="font-bold text-ops-text text-[11px]">PREPROCESSING</div>
            <div className="text-[9px] text-ops-text-muted">Radiance Calibration & GeoTIFF</div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </div>

          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-amber transition-colors">
            <Cpu className="w-5 h-5 text-ops-amber" />
            <div className="font-bold text-ops-text text-[11px]">AI/ML INFERENCE</div>
            <div className="text-[9px] text-ops-text-muted">CNN + ConvLSTM Models</div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-ops-amber" />
          </div>

          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-green transition-colors">
            <Activity className="w-5 h-5 text-ops-green" />
            <div className="font-bold text-ops-text text-[11px]">PUBLIC DASHBOARD</div>
            <div className="text-[9px] text-ops-text-muted">Live Maps & Safety Alerts</div>
          </div>
        </div>
      </div>

      {/* Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DATA_SOURCES.map((source) => (
          <div key={source.id} className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card flex flex-col justify-between hover:border-ops-border-light transition-all space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-ops-cyan uppercase">
                  {source.type}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-pulse" />
                  {source.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-ops-text font-sans">
                {source.name}
              </h3>
              <div className="text-[11px] font-mono text-ops-text-muted mt-0.5">
                {source.agency}
              </div>

              <div className="mt-4 space-y-2 text-xs font-mono text-ops-text">
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-ops-text-muted">Sensors:</span>
                  <span className="text-right truncate ml-2 font-semibold">{source.satelliteOrSensors}</span>
                </div>
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-ops-text-muted">Feed Latency:</span>
                  <span className="text-ops-cyan font-bold">{source.latencySeconds}s</span>
                </div>
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-ops-text-muted">Data Throughput:</span>
                  <span className="text-ops-green font-bold">{source.bandwidthMbps} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ops-text-muted">Coverage:</span>
                  <span className="truncate ml-2 text-[10px]">{source.coverage}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-ops-border-subtle flex items-center justify-between">
              <span className="text-[10px] font-mono text-ops-text-muted truncate max-w-[140px]">
                {source.endpoint}
              </span>
              <button
                onClick={() => handlePingSource(source.id, source.name)}
                disabled={isPinging === source.id}
                className="px-3 py-1.5 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-[10px] font-mono font-bold border border-ops-border transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isPinging === source.id ? 'animate-spin text-ops-cyan' : ''}`} />
                <span>PING FEED</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
