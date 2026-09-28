import React, { useState } from 'react';
import { 
  Database, 
  Satellite, 
  Radio, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown,
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
    <div className="space-y-4 sm:space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 flex-shrink-0" />
            <span>GLOBAL & REGIONAL SATELLITE DATA SOURCES</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            Multi-Source Satellite & Radar Data Ecosystem
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-ops-green font-bold text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-ops-green animate-pulse" />
            <span>5 / 5 DATA SOURCES ACTIVE</span>
          </div>
        </div>
      </div>

      {/* End-to-End Processing Architecture Flow Diagram */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-6 shadow-ops-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ops-border-subtle pb-3">
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

          <div className="flex items-center justify-center py-1 md:py-0">
            <ArrowRight className="w-4 h-4 text-ops-cyan hidden md:block" />
            <ArrowDown className="w-4 h-4 text-ops-cyan md:hidden" />
          </div>

          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-purple-500 transition-colors">
            <Layers className="w-5 h-5 text-purple-600" />
            <div className="font-bold text-ops-text text-[11px]">PREPROCESSING</div>
            <div className="text-[9px] text-ops-text-muted">Radiance Calibration & GeoTIFF</div>
          </div>

          <div className="flex items-center justify-center py-1 md:py-0">
            <ArrowRight className="w-4 h-4 text-purple-600 hidden md:block" />
            <ArrowDown className="w-4 h-4 text-purple-600 md:hidden" />
          </div>

          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-amber transition-colors">
            <Cpu className="w-5 h-5 text-ops-amber" />
            <div className="font-bold text-ops-text text-[11px]">AI/ML INFERENCE</div>
            <div className="text-[9px] text-ops-text-muted">CNN + ConvLSTM Models</div>
          </div>

          <div className="flex items-center justify-center py-1 md:py-0">
            <ArrowRight className="w-4 h-4 text-ops-amber hidden md:block" />
            <ArrowDown className="w-4 h-4 text-ops-amber md:hidden" />
          </div>

          <div className="bg-ops-card-sub border border-ops-border rounded-lg p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-green transition-colors">
            <Activity className="w-5 h-5 text-ops-green" />
            <div className="font-bold text-ops-text text-[11px]">PUBLIC DASHBOARD</div>
            <div className="text-[9px] text-ops-text-muted">Live Maps & Safety Alerts</div>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DATA_SOURCES.map((source) => (
          <div 
            key={source.id} 
            className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col justify-between space-y-4 hover:border-ops-border-light transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-ops-card-sub text-ops-cyan border border-ops-border font-bold truncate">
                  {source.type}
                </span>
                <span className="flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 font-bold flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-ops-green" />
                  {source.status}
                </span>
              </div>

              <div className="text-base font-bold text-ops-text font-sans">
                {source.name}
              </div>
              <div className="text-xs text-ops-text-dim font-sans leading-relaxed">
                {source.satelliteOrSensors}
              </div>

              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-ops-border-subtle">
                <div className="flex justify-between">
                  <span className="text-ops-text-muted">Agency:</span>
                  <span className="text-ops-text font-bold truncate ml-1">{source.agency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ops-text-muted">Coverage:</span>
                  <span className="text-ops-amber truncate ml-1">{source.coverage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ops-text-muted">Bandwidth:</span>
                  <span className="text-ops-text">{source.bandwidthMbps} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ops-text-muted">Volume:</span>
                  <span className="text-ops-cyan truncate ml-1">{source.observationsCount}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-ops-border-subtle">
              <span className="text-[10px] font-mono text-ops-text-muted">
                Latency: ~{source.latencySeconds}s
              </span>

              <button
                onClick={() => handlePingSource(source.id, source.name)}
                disabled={isPinging === source.id}
                className="px-3 py-1.5 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-border transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isPinging === source.id ? 'animate-spin' : ''}`} />
                <span>{isPinging === source.id ? 'PINGING...' : 'TEST FEED'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
