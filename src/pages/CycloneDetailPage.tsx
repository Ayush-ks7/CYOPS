import React from 'react';
import { 
  ArrowLeft, 
  Download, 
  MapPin, 
  ShieldAlert, 
  Calendar, 
  Clock, 
  Wind, 
  Gauge, 
  Layers, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useCyclone } from '../context/CycloneContext';
import { HISTORICAL_CYCLONES_ARCHIVE } from '../data/mockData';

export const CycloneDetailPage: React.FC = () => {
  const { setCurrentPage, detailArchiveId, formatWind, formatPressure } = useCyclone();

  const storm = HISTORICAL_CYCLONES_ARCHIVE.find(s => s.id === detailArchiveId) || HISTORICAL_CYCLONES_ARCHIVE[0];

  // Progression track timeline data
  const progressionData = [
    { step: '16 May 00Z', wind: 35, pressure: 1000, label: 'Depression Genesis' },
    { step: '16 May 18Z', wind: 55, pressure: 990, label: 'Cyclonic Storm' },
    { step: '17 May 12Z', wind: 85, pressure: 970, label: 'Severe Storm' },
    { step: '18 May 06Z', wind: 115, pressure: 940, label: 'Extremely Severe (RI)' },
    { step: '18 May 18Z', wind: 140, pressure: 907, label: 'Super Cyclone Peak' },
    { step: '19 May 12Z', wind: 125, pressure: 925, label: 'Approaching Coast' },
    { step: '20 May 12Z', wind: 85, pressure: 955, label: 'Landfall (Bakkhali)' },
    { step: '21 May 06Z', wind: 40, pressure: 992, label: 'Dissipated Inland' },
  ];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('archive')}
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-xs font-mono font-bold flex items-center gap-2 border border-ops-border transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ARCHIVE DATABASE</span>
        </button>

        <button 
          onClick={() => alert(`Downloading Best-Track Forensic Dossier for ${storm.name}`)}
          className="px-3 py-1.5 rounded bg-ops-cyan/10 hover:bg-ops-cyan/20 text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-cyan/40 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>DOWNLOAD METEOROLOGICAL DOSSIER</span>
        </button>
      </div>

      {/* Storm Overview Header Card */}
      <div className="bg-ops-card border border-ops-border rounded p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-950 text-ops-amber border border-amber-800 text-[10px] font-mono font-bold">
                {storm.peakIntensity}
              </span>
              <span className="text-xs font-mono text-slate-400">CODE: {storm.code}</span>
              <span className="text-xs font-mono text-slate-400">·</span>
              <span className="text-xs font-mono text-ops-cyan font-bold">{storm.basin}</span>
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider font-sans">
              {storm.name}
            </h1>
            <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-ops-cyan" /> {storm.dates}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-ops-cyan" /> Active for {storm.durationHours} Hours</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-ops-border px-3.5 py-2 rounded text-center">
              <div className="text-[10px] font-mono text-slate-400">PEAK WIND</div>
              <div className="text-lg font-mono font-bold text-ops-amber">{formatWind(storm.maxWindKts)}</div>
            </div>
            <div className="bg-slate-900 border border-ops-border px-3.5 py-2 rounded text-center">
              <div className="text-[10px] font-mono text-slate-400">MIN PRESSURE</div>
              <div className="text-lg font-mono font-bold text-ops-cyan">{formatPressure(storm.minPressureHpa)}</div>
            </div>
            <div className="bg-slate-900 border border-ops-border px-3.5 py-2 rounded text-center">
              <div className="text-[10px] font-mono text-slate-400">TOTAL ACE</div>
              <div className="text-lg font-mono font-bold text-white">{storm.ace}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle Progression & Intensity Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Dual Axis Wind & Pressure Curve */}
        <div className="lg:col-span-2 bg-ops-card border border-ops-border rounded p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-ops-border-subtle">
            <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-sans">
              LIFECYCLE INTENSITY PROGRESSION (WIND VS MIN PRESSURE)
            </span>
            <span className="text-xs font-mono text-ops-green font-bold">
              AI MODEL ACCURACY: {storm.aiValidationScore}%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#17243b" />
                <XAxis dataKey="step" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <YAxis yAxisId="wind" domain={[20, 160]} stroke="#f97316" tick={{ fill: '#f97316', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" kts" />
                <YAxis yAxisId="pressure" orientation="right" domain={[890, 1010]} reversed stroke="#00f0ff" tick={{ fill: '#00f0ff', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" hPa" />
                <Tooltip contentStyle={{ backgroundColor: '#090f1a', borderColor: '#1a2742', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Line yAxisId="wind" type="monotone" dataKey="wind" name="Max Wind (kts)" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line yAxisId="pressure" type="monotone" dataKey="pressure" name="Min Pressure (hPa)" stroke="#00f0ff" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Landfall & AI Verification Insights */}
        <div className="space-y-4">
          <div className="bg-ops-card border border-ops-border rounded p-4 space-y-3">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase">
              LANDFALL IMPACT & CASUALTY METRICS
            </div>
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Landfall Location:</span>
                <strong className="text-white">{storm.landfallLocation}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <strong className="text-slate-200">{storm.durationHours} Hours</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reported Fatalities:</span>
                <strong className="text-ops-red">{storm.casualties}</strong>
              </div>
            </div>
          </div>

          <div className="bg-ops-card border border-ops-border rounded p-4 space-y-2">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-green uppercase">
              MULTI-SOURCE DATA INGESTION USED
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {storm.dataSources.map((ds, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200">
                  {ds}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-ops-card border border-ops-border rounded p-3 bg-gradient-to-br from-ops-card to-[#09101d]">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase mb-1">
              AI BENCHMARK VALIDATION
            </div>
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              VortexNet and TrajectoryPINN achieved a 96.8% skill index against IMD best-track ground truth observations, correctly capturing the rapid intensification phase 18 hours prior to onset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
