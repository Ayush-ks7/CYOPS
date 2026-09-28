import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';
import { 
  Cpu, 
  CheckCircle, 
  ShieldAlert, 
  BrainCircuit, 
  TrendingUp, 
  ArrowRight, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';

export const AnalysisPage: React.FC = () => {
  const { selectedCyclone, formatWind, formatPressure } = useCyclone();
  const [activePipelineStage, setActivePipelineStage] = useState<'ALL' | 'IDENTIFICATION' | 'CLASSIFICATION' | 'PREDICTION'>('ALL');

  // Chart data: Wind Speed vs Time 72h Window (Matching @reference.png: INTENSITY TREND)
  const intensityTrendData = [
    { time: 'T-36h', observed: 85, gfs: 82, ecmwf: 85, hwrf: 88, hmon: 80 },
    { time: 'T-24h', observed: 105, gfs: 102, ecmwf: 104, hwrf: 109, hmon: 98 },
    { time: 'T-12h', observed: 118, gfs: 116, ecmwf: 119, hwrf: 124, hmon: 112 },
    { time: 'T-0h (LIVE)', observed: 125, gfs: 125, ecmwf: 125, hwrf: 125, hmon: 125 },
    { time: 'T+12h', observed: null, gfs: 132, ecmwf: 129, hwrf: 140, hmon: 115 },
    { time: 'T+24h', observed: null, gfs: 112, ecmwf: 108, hwrf: 118, hmon: 95 },
    { time: 'T+48h', observed: null, gfs: 65, ecmwf: 58, hwrf: 62, hmon: 50 },
  ];

  // Pressure inverse trend data
  const pressureTrendData = [
    { time: 'T-36h', pressure: 970 },
    { time: 'T-24h', pressure: 952 },
    { time: 'T-12h', pressure: 940 },
    { time: 'T-0h (LIVE)', pressure: 930 },
    { time: 'T+12h', pressure: 925 },
    { time: 'T+24h', pressure: 948 },
    { time: 'T+48h', pressure: 988 },
  ];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-8">
      {/* Top Mission Header */}
      <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold">
            AI / ML INFERENCE DECK · 3-STAGE QUANTITATIVE PIPELINE
          </div>
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            {selectedCyclone.name} ({selectedCyclone.code}) — ML TELEMETRY & ENSEMBLE CONSENSUS
          </h2>
        </div>

        {/* Pipeline Stage Filter Switcher */}
        <div className="flex items-center bg-slate-900 p-1 rounded border border-ops-border text-xs font-mono">
          {(['ALL', 'IDENTIFICATION', 'CLASSIFICATION', 'PREDICTION'] as const).map((stage) => (
            <button
              key={stage}
              onClick={() => setActivePipelineStage(stage)}
              className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
                activePipelineStage === stage
                  ? 'bg-slate-800 text-ops-cyan border border-ops-cyan/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Stage Pipeline Overview Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Stage 1: Identification */}
        <div className={`bg-ops-card border rounded p-3 transition-colors ${
          activePipelineStage === 'IDENTIFICATION' || activePipelineStage === 'ALL' ? 'border-ops-cyan/40 bg-ops-card' : 'border-ops-border opacity-60'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-cyan font-bold">1. IDENTIFICATION</span>
            <span className="text-ops-green font-bold">● DETECTED</span>
          </div>
          <div className="text-sm font-bold text-slate-100 font-sans">
            VortexNet Center Localization
          </div>
          <div className="mt-2 space-y-1 text-[11px] font-mono text-ops-text-dim">
            <div className="flex justify-between">
              <span>Eye Coordinates:</span>
              <strong className="text-white">{selectedCyclone.currentPosition.coordinatesFormatted}</strong>
            </div>
            <div className="flex justify-between">
              <span>IoU Overlap Accuracy:</span>
              <strong className="text-ops-cyan">{(selectedCyclone.mlMetrics.eyeLocalizationIoU * 100).toFixed(1)}%</strong>
            </div>
            <div className="flex justify-between">
              <span>Detection Confidence:</span>
              <strong className="text-ops-green">{(selectedCyclone.mlMetrics.identificationConfidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>

        {/* Stage 2: Classification */}
        <div className={`bg-ops-card border rounded p-3 transition-colors ${
          activePipelineStage === 'CLASSIFICATION' || activePipelineStage === 'ALL' ? 'border-ops-amber/40 bg-ops-card' : 'border-ops-border opacity-60'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-amber font-bold">2. CLASSIFICATION</span>
            <span className="text-ops-amber font-bold">● {selectedCyclone.category}</span>
          </div>
          <div className="text-sm font-bold text-slate-100 font-sans">
            CyDvorak-Deep Intensity Engine
          </div>
          <div className="mt-2 space-y-1 text-[11px] font-mono text-ops-text-dim">
            <div className="flex justify-between">
              <span>Automated Dvorak T-No:</span>
              <strong className="text-white">{selectedCyclone.mlMetrics.dvorakTNo}</strong>
            </div>
            <div className="flex justify-between">
              <span>Estimated Max Wind:</span>
              <strong className="text-ops-amber">{selectedCyclone.maxSustainedWindKts} KTS (Gusts 150)</strong>
            </div>
            <div className="flex justify-between">
              <span>Classification Confidence:</span>
              <strong className="text-ops-cyan">{(selectedCyclone.mlMetrics.classificationConfidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>

        {/* Stage 3: Prediction */}
        <div className={`bg-ops-card border rounded p-3 transition-colors ${
          activePipelineStage === 'PREDICTION' || activePipelineStage === 'ALL' ? 'border-purple-500/40 bg-ops-card' : 'border-ops-border opacity-60'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-purple-400 font-bold">3. PREDICTION</span>
            <span className="text-ops-cyan font-bold">● 72H MULTI-HORIZON</span>
          </div>
          <div className="text-sm font-bold text-slate-100 font-sans">
            TrajectoryPINN Physics-Informed Seq
          </div>
          <div className="mt-2 space-y-1 text-[11px] font-mono text-ops-text-dim">
            <div className="flex justify-between">
              <span>24h Landfall Track Error:</span>
              <strong className="text-ops-green">±12 km (High Skill)</strong>
            </div>
            <div className="flex justify-between">
              <span>Inference Computation Time:</span>
              <strong className="text-white">{selectedCyclone.mlMetrics.inferenceTimeMs} ms</strong>
            </div>
            <div className="flex justify-between">
              <span>Ensemble Spread:</span>
              <strong className="text-ops-amber">Convergent on Taiwan Coast</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Workspace (Matching @reference.png Right Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Intensity Trend Charts & Pressure Inverse Trend */}
        <div className="lg:col-span-2 space-y-4">
          {/* Intensity Trend Chart (Wind Speed vs Time 72h Window) */}
          <div className="bg-ops-card border border-ops-border rounded p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-ops-border-subtle">
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-sans">
                INTENSITY TREND (WIND SPEED VS TIME 72H WINDOW)
              </span>
              <div className="flex items-center gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ops-cyan" />
                  <span className="text-slate-300">● OBSERVED</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ops-amber" />
                  <span className="text-slate-300">● SPAGHETTI ENSEMBLE</span>
                </div>
              </div>
            </div>

            {/* Recharts Intensity Trend Line Graph */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={intensityTrendData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#17243b" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  />
                  <YAxis 
                    domain={[40, 160]} 
                    stroke="#64748b" 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                    unit=" kts"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090f1a', borderColor: '#1a2742', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                    itemStyle={{ color: '#00f0ff' }}
                  />

                  {/* Horizontal Threshold Lines (Matching @reference.png: CAT 5, CAT 4, CAT 3) */}
                  <ReferenceLine y={137} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'CAT 5 (137+ kts)', fill: '#ef4444', fontSize: 9, position: 'right' }} />
                  <ReferenceLine y={113} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'CAT 4 (113 kts)', fill: '#f97316', fontSize: 9, position: 'right' }} />
                  <ReferenceLine y={96} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'CAT 3 (96 kts)', fill: '#eab308', fontSize: 9, position: 'right' }} />

                  {/* Observed Trajectory (Cyan) */}
                  <Line type="monotone" dataKey="observed" stroke="#00f0ff" strokeWidth={3} dot={{ r: 4, fill: '#00f0ff' }} activeDot={{ r: 6 }} />
                  
                  {/* Ensemble Trajectories (GFS, ECMWF, HWRF, HMON) */}
                  <Line type="monotone" dataKey="ecmwf" stroke="#f97316" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="gfs" stroke="#ea580c" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="hwrf" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="2 2" dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="hmon" stroke="#38bdf8" strokeWidth={1.2} strokeDasharray="4 4" dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Central Pressure Inverse Trend (Matching @reference.png: CENTRAL PRESSURE INVERSE TREND) */}
          <div className="bg-ops-card border border-ops-border rounded p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-ops-border-subtle">
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-sans">
                CENTRAL PRESSURE INVERSE TREND
              </span>
              <span className="text-xs font-mono text-ops-cyan font-bold">
                930 hPa Minimum
              </span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pressureTrendData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#17243b" />
                  <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                  <YAxis domain={[910, 1000]} reversed stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" hPa" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090f1a', borderColor: '#1a2742', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Line type="monotone" dataKey="pressure" stroke="#00f0ff" strokeWidth={2.5} dot={{ r: 3.5, fill: '#00f0ff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Classification Confidence & Consensus Table (Matching @reference.png) */}
        <div className="space-y-4">
          {/* Classification Confidence (Model Agreement) (Matching @reference.png) */}
          <div className="bg-ops-card border border-ops-border rounded p-4">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-3">
              CLASSIFICATION CONFIDENCE (MODEL AGREEMENT)
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Cat 4 */}
              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span className="font-bold">Cat 4: Extreme Threat</span>
                  <span className="text-ops-amber font-bold">68%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div className="bg-ops-amber h-full rounded-full transition-all duration-1000" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Cat 5 */}
              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span className="font-bold">Cat 5: Super Typhoon</span>
                  <span className="text-red-400 font-bold">22%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: '22%' }} />
                </div>
              </div>

              {/* Cat 3 */}
              <div>
                <div className="flex justify-between text-slate-200 mb-1">
                  <span className="font-bold">Cat 3: Major Storm</span>
                  <span className="text-yellow-400 font-bold">10%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamical Model Run Consensus Table (Matching @reference.png) */}
          <div className="bg-ops-card border border-ops-border rounded p-4">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-3">
              DYNAMICAL MODEL RUN CONSENSUS
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="text-slate-500 border-b border-ops-border-subtle pb-1">
                    <th className="pb-1.5 font-normal">MODEL</th>
                    <th className="pb-1.5 font-normal text-right">INTENSITY</th>
                    <th className="pb-1.5 font-normal text-right">TRACK ERR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ops-border-subtle">
                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-slate-200">GFS (Global Forecast System)</div>
                      <div className="text-[9px] text-slate-500">Weight: 35% (HIGH)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">130 kts</td>
                    <td className="py-2 text-right text-slate-400">±15 km</td>
                  </tr>

                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-slate-200">ECMWF (European Center)</div>
                      <div className="text-[9px] text-slate-500">Weight: 40% (HIGH)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">125 kts</td>
                    <td className="py-2 text-right text-slate-400">±12 km</td>
                  </tr>

                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-slate-200">HWRF (Hurricane Weather Research)</div>
                      <div className="text-[9px] text-slate-500">Weight: 15% (MID)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">140 kts</td>
                    <td className="py-2 text-right text-slate-400">±25 km</td>
                  </tr>

                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-slate-200">HMON (Hurricane Multi-model)</div>
                      <div className="text-[9px] text-slate-500">Weight: 10% (LOW)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">115 kts</td>
                    <td className="py-2 text-right text-slate-400">±30 km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Chief Meteorologist Assessment Narrative Card (Matching @reference.png) */}
          <div className="bg-ops-card border border-ops-border rounded p-4 bg-gradient-to-br from-ops-card to-[#09101d]">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase mb-2">
              CHIEF METEOROLOGIST ASSESSMENT
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {selectedCyclone.chiefMeteorologistAssessment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
