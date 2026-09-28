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
  const { setCurrentPage, detailArchiveId, formatWind, formatPressure, theme } = useCyclone();

  const storm = HISTORICAL_CYCLONES_ARCHIVE.find(s => s.id === detailArchiveId) || HISTORICAL_CYCLONES_ARCHIVE[0];
  const isDark = theme === 'dark';

  const progressionData = [
    { step: '16 May 00Z', wind: 35, pressure: 1000, label: 'Depression Genesis' },
    { step: '16 May 18Z', wind: 55, pressure: 990, label: 'Cyclonic Storm' },
    { step: '17 May 12Z', wind: 85, pressure: 970, label: 'Severe Storm' },
    { step: '18 May 06Z', wind: 115, pressure: 940, label: 'Extremely Severe (RI)' },
    { step: '18 May 18Z', wind: 140, pressure: 907, label: 'Super Cyclone Peak' },
    { step: '19 May 12Z', wind: 125, pressure: 925, label: 'Approaching Coast' },
    { step: '20 May 12Z', wind: 85, pressure: 955, label: 'Landfall' },
    { step: '21 May 06Z', wind: 40, pressure: 992, label: 'Dissipated Inland' },
  ];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('archive')}
          className="px-3.5 py-2 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center gap-2 border border-ops-border transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ARCHIVE DATABASE</span>
        </button>

        <button 
          onClick={() => alert(`Downloading Best-Track Forensic Dossier for ${storm.name}`)}
          className="px-3.5 py-2 rounded-lg bg-ops-cyan/10 hover:bg-ops-cyan/20 text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-cyan/30 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>DOWNLOAD SUMMARY REPORT</span>
        </button>
      </div>

      {/* Storm Overview Header Card */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-ops-amber border border-amber-500/30 text-[10px] font-mono font-bold">
                {storm.peakIntensity}
              </span>
              <span className="text-xs font-mono text-ops-text-muted">CODE: {storm.code}</span>
              <span className="text-xs font-mono text-ops-text-muted">·</span>
              <span className="text-xs font-mono text-ops-cyan font-bold">{storm.basin}</span>
            </div>
            <h1 className="text-2xl font-black text-ops-text uppercase tracking-wider font-sans">
              {storm.name}
            </h1>
            <div className="text-xs font-mono text-ops-text-muted mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-ops-cyan" /> {storm.dates}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-ops-cyan" /> Active for {storm.durationHours} Hours</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-ops-card-sub border border-ops-border px-4 py-2.5 rounded-lg text-center">
              <div className="text-[10px] font-mono text-ops-text-muted">PEAK WIND</div>
              <div className="text-lg font-mono font-bold text-ops-amber">{formatWind(storm.maxWindKts)}</div>
            </div>
            <div className="bg-ops-card-sub border border-ops-border px-4 py-2.5 rounded-lg text-center">
              <div className="text-[10px] font-mono text-ops-text-muted">MIN PRESSURE</div>
              <div className="text-lg font-mono font-bold text-ops-cyan">{formatPressure(storm.minPressureHpa)}</div>
            </div>
            <div className="bg-ops-card-sub border border-ops-border px-4 py-2.5 rounded-lg text-center">
              <div className="text-[10px] font-mono text-ops-text-muted">TOTAL ACE</div>
              <div className="text-lg font-mono font-bold text-ops-text">{storm.ace}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lifecycle Progression & Intensity Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-ops-border-subtle">
            <span className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
              LIFECYCLE INTENSITY PROGRESSION (WIND VS MIN PRESSURE)
            </span>
            <span className="text-xs font-mono text-ops-green font-bold">
              AI MATCH ACCURACY: {storm.aiValidationScore}%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <XAxis dataKey="step" stroke={isDark ? '#94a3b8' : '#64748b'} tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <YAxis yAxisId="wind" domain={[20, 160]} stroke="#f97316" tick={{ fill: '#f97316', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" kts" />
                <YAxis yAxisId="pressure" orientation="right" domain={[890, 1010]} reversed stroke="#0284c7" tick={{ fill: '#0284c7', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" hPa" />
                <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f1726' : '#ffffff', borderColor: isDark ? '#1a2742' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                <Line yAxisId="wind" type="monotone" dataKey="wind" name="Max Wind (kts)" stroke="#ea580c" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line yAxisId="pressure" type="monotone" dataKey="pressure" name="Min Pressure (hPa)" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Landfall & AI Verification */}
        <div className="space-y-4">
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-3">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase">
              LANDFALL IMPACT SUMMARY
            </div>
            <div className="space-y-2 text-xs font-mono text-ops-text">
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Landfall Location:</span>
                <strong className="text-ops-text">{storm.landfallLocation}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Duration:</span>
                <strong>{storm.durationHours} Hours</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Impact Casualties:</span>
                <strong className="text-ops-red">{storm.casualties} reported</strong>
              </div>
            </div>
          </div>

          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-2">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-green uppercase">
              DATA SOURCES UTILIZED
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {storm.dataSources.map((ds, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-ops-card-sub border border-ops-border text-[10px] font-mono text-ops-text">
                  {ds}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
