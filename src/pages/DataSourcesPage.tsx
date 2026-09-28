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
      addOperationalLog(`Data source handshake verified: ${name} (RTT: 24ms, HTTP 200 OK)`, 'green');
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold">
            MULTI-SOURCE SATELLITE & SENSOR INGESTION ECOSYSTEM
          </div>
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            Operational Telemetry Data Streams
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-ops-green">
            <span className="w-2 h-2 rounded-full bg-ops-green animate-pulse" />
            <span>5 / 5 DATA SOURCES ACTIVE</span>
          </div>
        </div>
      </div>

      {/* End-to-End Processing Architecture Flow Diagram */}
      <div className="bg-ops-card border border-ops-border rounded p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-ops-border-subtle pb-2">
          <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-sans">
            END-TO-END DATA PROCESSING & INFERENCE PIPELINE
          </span>
          <span className="text-[10px] font-mono text-ops-cyan">
            CONTINUOUS STREAMING ARCHITECTURE
          </span>
        </div>

        {/* Pipeline Flow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-center text-xs font-mono">
          {/* Step 1: Satellite Data */}
          <div className="bg-slate-900/90 border border-ops-border rounded p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-cyan/50 transition-colors">
            <Satellite className="w-5 h-5 text-ops-cyan" />
            <div className="font-bold text-white text-[11px]">SATELLITE DATA</div>
            <div className="text-[9px] text-slate-400">INSAT-3D / MOSDAC / Radars</div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-ops-cyan" />
          </div>

          {/* Step 2: Ingestion & Preprocessing */}
          <div className="bg-slate-900/90 border border-ops-border rounded p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-cyan/50 transition-colors">
            <Layers className="w-5 h-5 text-purple-400" />
            <div className="font-bold text-white text-[11px]">PREPROCESSING</div>
            <div className="text-[9px] text-slate-400">Radiance Calibration & GeoTIFF</div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </div>

          {/* Step 3: ML Inference */}
          <div className="bg-slate-900/90 border border-ops-border rounded p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-amber transition-colors">
            <Cpu className="w-5 h-5 text-ops-amber" />
            <div className="font-bold text-white text-[11px]">ML INFERENCE</div>
            <div className="text-[9px] text-slate-400">CNN + ConvLSTM PINN</div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-ops-amber" />
          </div>

          {/* Step 4: Dashboard & Alerts */}
          <div className="bg-slate-900/90 border border-ops-border rounded p-3 flex flex-col items-center justify-center space-y-1 hover:border-ops-green transition-colors">
            <Activity className="w-5 h-5 text-ops-green" />
            <div className="font-bold text-white text-[11px]">DASHBOARD / ALERTS</div>
            <div className="text-[9px] text-slate-400">Live Telemetry Deck & Dispatch</div>
          </div>
        </div>
      </div>

      {/* Data Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DATA_SOURCES.map((source) => (
          <div key={source.id} className="bg-ops-card border border-ops-border rounded p-4 flex flex-col justify-between hover:border-ops-border-light transition-colors space-y-3">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-ops-cyan uppercase">
                  {source.type}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-ops-green border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-ops-green animate-pulse" />
                  {source.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white font-sans">
                {source.name}
              </h3>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {source.agency}
              </div>

              <div className="mt-3 space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-slate-500">Sensors:</span>
                  <span className="text-slate-200 text-right truncate ml-2">{source.satelliteOrSensors}</span>
                </div>
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-slate-500">Latency:</span>
                  <span className="text-ops-cyan font-bold">{source.latencySeconds}s</span>
                </div>
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-slate-500">Throughput:</span>
                  <span className="text-ops-green font-bold">{source.bandwidthMbps} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Observations:</span>
                  <span className="text-white font-bold">{source.observationsCount}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-ops-border-subtle flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 truncate max-w-[140px]">
                {source.endpoint}
              </span>
              <button
                onClick={() => handlePingSource(source.id, source.name)}
                disabled={isPinging === source.id}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-[10px] font-mono font-bold border border-ops-border transition-colors flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${isPinging === source.id ? 'animate-spin text-ops-cyan' : ''}`} />
                <span>PING SOURCE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
