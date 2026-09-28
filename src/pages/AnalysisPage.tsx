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
  Info,
  HelpCircle
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';

export const AnalysisPage: React.FC = () => {
  const { selectedCyclone, formatWind, formatPressure, theme } = useCyclone();
  const [activePipelineStage, setActivePipelineStage] = useState<'ALL' | 'IDENTIFICATION' | 'CLASSIFICATION' | 'PREDICTION'>('ALL');

  const isDark = theme === 'dark';

  // Chart data: Wind Speed vs Time 72h Window
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
      {/* Top Header */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 shadow-ops-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5" />
            AI & MACHINE LEARNING CYCLONE PREDICTION SUITE
          </div>
          <h1 className="text-base font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5">
            {selectedCyclone.name} ({selectedCyclone.code}) — Scientific Forecast & Model Consensus
          </h1>
        </div>

        {/* Pipeline Stage Switcher */}
        <div className="flex items-center bg-ops-card-sub p-1 rounded-lg border border-ops-border text-xs font-mono">
          {(['ALL', 'IDENTIFICATION', 'CLASSIFICATION', 'PREDICTION'] as const).map((stage) => (
            <button
              key={stage}
              onClick={() => setActivePipelineStage(stage)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                activePipelineStage === stage
                  ? 'bg-ops-cyan text-white shadow-sm font-extrabold'
                  : 'text-ops-text-muted hover:text-ops-text'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Stage Pipeline Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Stage 1: Identification */}
        <div className={`bg-ops-card border rounded-xl p-4 shadow-ops-card transition-all ${
          activePipelineStage === 'IDENTIFICATION' || activePipelineStage === 'ALL' ? 'border-ops-cyan/50 ring-1 ring-ops-cyan/20' : 'opacity-60'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-cyan font-bold">1. IDENTIFICATION</span>
            <span className="text-ops-green font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ops-green" />
              DETECTED
            </span>
          </div>
          <div className="text-sm font-bold text-ops-text font-sans">
            Vortex Center Localization
          </div>
          <div className="mt-2 space-y-1 text-[11px] font-mono text-ops-text-dim">
            <div className="flex justify-between">
              <span>Eye Coordinates:</span>
              <strong className="text-ops-text">{selectedCyclone.currentPosition.coordinatesFormatted}</strong>
            </div>
            <div className="flex justify-between">
              <span>Detection Confidence:</span>
              <strong className="text-ops-green">{(selectedCyclone.mlMetrics.identificationConfidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>

        {/* Stage 2: Classification */}
        <div className={`bg-ops-card border rounded-xl p-4 shadow-ops-card transition-all ${
          activePipelineStage === 'CLASSIFICATION' || activePipelineStage === 'ALL' ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'opacity-60'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-amber font-bold">2. CLASSIFICATION</span>
            <span className="text-ops-amber font-bold">● {selectedCyclone.category}</span>
          </div>
          <div className="text-sm font-bold text-ops-text font-sans">
            Automated Dvorak Intensity
          </div>
          <div className="mt-2 space-y-1 text-[11px] font-mono text-ops-text-dim">
            <div className="flex justify-between">
              <span>Estimated Max Wind:</span>
              <strong className="text-ops-amber">{formatWind(selectedCyclone.maxSustainedWindKts)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Classification Score:</span>
              <strong className="text-ops-cyan">{(selectedCyclone.mlMetrics.classificationConfidence * 100).toFixed(1)}%</strong>
            </div>
          </div>
        </div>

        {/* Stage 3: Prediction */}
        <div className={`bg-ops-card border rounded-xl p-4 shadow-ops-card transition-all ${
          activePipelineStage === 'PREDICTION' || activePipelineStage === 'ALL' ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'opacity-60'
        }`}>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-purple-600 font-bold">3. PREDICTION</span>
            <span className="text-ops-cyan font-bold">● 72H TRAJECTORY</span>
          </div>
          <div className="text-sm font-bold text-ops-text font-sans">
            Physics-Guided ConvLSTM Model
          </div>
          <div className="mt-2 space-y-1 text-[11px] font-mono text-ops-text-dim">
            <div className="flex justify-between">
              <span>24h Landfall Track Skill:</span>
              <strong className="text-ops-green">±12 km Margin</strong>
            </div>
            <div className="flex justify-between">
              <span>Computation Speed:</span>
              <strong className="text-ops-text">{selectedCyclone.mlMetrics.inferenceTimeMs} ms</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Consensus Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Recharts Intensity Trend Charts */}
        <div className="lg:col-span-2 space-y-4">
          {/* Intensity Trend Chart */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-ops-border-subtle">
              <span className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
                INTENSITY TREND (WIND SPEED OVER 72H WINDOW)
              </span>
              <div className="flex items-center gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ops-cyan" />
                  <span className="text-ops-text">● OBSERVED</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-ops-amber" />
                  <span className="text-ops-text">● MULTI-MODEL ENSEMBLE</span>
                </div>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={intensityTrendData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="time" stroke={isDark ? '#94a3b8' : '#64748b'} tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                  <YAxis domain={[40, 160]} stroke={isDark ? '#94a3b8' : '#64748b'} tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" kts" />
                  <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f1726' : '#ffffff', borderColor: isDark ? '#1a2742' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                  <ReferenceLine y={137} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'CAT 5 (137+ kts)', fill: '#ef4444', fontSize: 9, position: 'right' }} />
                  <ReferenceLine y={113} stroke="#ea580c" strokeDasharray="3 3" label={{ value: 'CAT 4 (113 kts)', fill: '#ea580c', fontSize: 9, position: 'right' }} />
                  <ReferenceLine y={96} stroke="#eab308" strokeDasharray="3 3" label={{ value: 'CAT 3 (96 kts)', fill: '#eab308', fontSize: 9, position: 'right' }} />
                  <Line type="monotone" dataKey="observed" stroke="#0284c7" strokeWidth={3} dot={{ r: 4, fill: '#0284c7' }} />
                  <Line type="monotone" dataKey="ecmwf" stroke="#ea580c" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="gfs" stroke="#f97316" strokeWidth={1.5} strokeDasharray="3 3" dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="hwrf" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="2 2" dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="hmon" stroke="#0ea5e9" strokeWidth={1.2} strokeDasharray="4 4" dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Central Pressure Inverse Trend */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-ops-border-subtle">
              <span className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
                CENTRAL BAROMETRIC PRESSURE TREND (INVERSE STRENGTH)
              </span>
              <span className="text-xs font-mono text-ops-cyan font-bold">
                {selectedCyclone.minCentralPressureHpa} hPa Minimum
              </span>
            </div>

            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pressureTrendData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                  <XAxis dataKey="time" stroke={isDark ? '#94a3b8' : '#64748b'} tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                  <YAxis domain={[910, 1000]} reversed stroke={isDark ? '#94a3b8' : '#64748b'} tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" hPa" />
                  <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f1726' : '#ffffff', borderColor: isDark ? '#1a2742' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                  <Line type="monotone" dataKey="pressure" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 3.5, fill: '#0284c7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Classification Confidence & Consensus Table */}
        <div className="space-y-4">
          {/* Classification Confidence */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-3">
              MODEL AGREEMENT PROBABILITY
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-ops-text mb-1">
                  <span className="font-bold">Severe Storm Threat</span>
                  <span className="text-ops-amber font-bold">68%</span>
                </div>
                <div className="w-full bg-ops-card-sub rounded-full h-2.5 overflow-hidden border border-ops-border">
                  <div className="bg-ops-amber h-full rounded-full transition-all duration-1000" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ops-text mb-1">
                  <span className="font-bold">Super Cyclone Potential</span>
                  <span className="text-red-500 font-bold">22%</span>
                </div>
                <div className="w-full bg-ops-card-sub rounded-full h-2.5 overflow-hidden border border-ops-border">
                  <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-ops-text mb-1">
                  <span className="font-bold">Moderate Tropical Storm</span>
                  <span className="text-yellow-500 font-bold">10%</span>
                </div>
                <div className="w-full bg-ops-card-sub rounded-full h-2.5 overflow-hidden border border-ops-border">
                  <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Model Consensus Table */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-3">
              GLOBAL MODEL CONSENSUS RUN
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="text-ops-text-muted border-b border-ops-border-subtle pb-1">
                    <th className="pb-1.5 font-normal">MODEL</th>
                    <th className="pb-1.5 font-normal text-right">INTENSITY</th>
                    <th className="pb-1.5 font-normal text-right">MARGIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ops-border-subtle">
                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-ops-text">IMD-MME Ensemble</div>
                      <div className="text-[9px] text-ops-text-muted">Weight: 45% (HIGH)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">100 kts</td>
                    <td className="py-2 text-right text-ops-text-muted">±14 km</td>
                  </tr>

                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-ops-text">ECMWF (European)</div>
                      <div className="text-[9px] text-ops-text-muted">Weight: 35% (HIGH)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">95 kts</td>
                    <td className="py-2 text-right text-ops-text-muted">±16 km</td>
                  </tr>

                  <tr>
                    <td className="py-2">
                      <div className="font-bold text-ops-text">GFS (Global System)</div>
                      <div className="text-[9px] text-ops-text-muted">Weight: 20% (MID)</div>
                    </td>
                    <td className="py-2 text-right font-bold text-ops-amber">102 kts</td>
                    <td className="py-2 text-right text-ops-text-muted">±20 km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Meteorologist Assessment */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase mb-2">
              EXPERT METEOROLOGICAL SUMMARY
            </div>
            <p className="text-xs text-ops-text-dim font-sans leading-relaxed">
              {selectedCyclone.chiefMeteorologistAssessment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
