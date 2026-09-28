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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => setCurrentPage('archive')}
          className="px-3.5 py-2 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center gap-2 border border-ops-border transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ARCHIVE</span>
        </button>

        <button 
          onClick={() => alert(`Downloading Best-Track Forensic Dossier for ${storm.name}`)}
          className="px-3.5 py-2 rounded-lg bg-ops-cyan/10 hover:bg-ops-cyan/20 text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-cyan/30 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>DOWNLOAD REPORT</span>
        </button>
      </div>

      {/* Storm Overview Header Card */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-ops-amber border border-amber-500/30 text-[10px] font-mono font-bold">
                {storm.peakIntensity}
              </span>
              <span className="text-xs font-mono text-ops-text-muted">CODE: {storm.code}</span>
              <span className="text-xs font-mono text-ops-text-muted">·</span>
              <span className="text-xs font-mono text-ops-cyan font-bold">{storm.basin}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-ops-text uppercase tracking-wider font-sans break-words">
              {storm.name}
            </h1>
            <div className="text-xs font-mono text-ops-text-muted mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-ops-cyan flex-shrink-0" /> {storm.dates}</span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-ops-cyan flex-shrink-0" /> Active {storm.durationHours}h</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3">
            <div className="bg-ops-card-sub border border-ops-border px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-center">
              <div className="text-[9px] sm:text-[10px] font-mono text-ops-text-muted">PEAK WIND</div>
              <div className="text-sm sm:text-lg font-mono font-bold text-ops-amber">{formatWind(storm.maxWindKts)}</div>
            </div>
            <div className="bg-ops-card-sub border border-ops-border px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-center">
              <div className="text-[9px] sm:text-[10px] font-mono text-ops-text-muted">PRESSURE</div>
              <div className="text-sm sm:text-lg font-mono font-bold text-ops-cyan">{formatPressure(storm.minPressureHpa)}</div>
            </div>
            <div className="bg-ops-card-sub border border-ops-border px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-center">
              <div className="text-[9px] sm:text-[10px] font-mono text-ops-text-muted">ACE</div>
              <div className="text-sm sm:text-lg font-mono font-bold text-ops-text">{storm.ace}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Lifecycle Progression Chart */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ops-border-subtle pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-ops-cyan flex-shrink-0" />
            <h2 className="text-xs sm:text-sm font-bold text-ops-text uppercase font-sans tracking-wider">
              CYCLONE LIFECYCLE INTENSITY & PRESSURE PROGRESSION
            </h2>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-ops-text-muted">
            IMD / JTWC BEST TRACK DATA
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressionData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="step" stroke={isDark ? '#94a3b8' : '#64748b'} tick={{ fill: isDark ? '#cbd5e1' : '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
              <YAxis yAxisId="left" domain={[30, 160]} stroke="#ea580c" tick={{ fill: '#ea580c', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" kts" />
              <YAxis yAxisId="right" orientation="right" domain={[890, 1010]} reversed stroke="#0284c7" tick={{ fill: '#0284c7', fontSize: 10, fontFamily: 'JetBrains Mono' }} unit=" hPa" />
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#0f1726' : '#ffffff', borderColor: isDark ? '#1a2742' : '#e2e8f0', color: isDark ? '#f8fafc' : '#0f172a', borderRadius: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
              <Line yAxisId="left" type="monotone" dataKey="wind" name="Wind Speed (kts)" stroke="#ea580c" strokeWidth={3} dot={{ r: 4, fill: '#ea580c' }} />
              <Line yAxisId="right" type="monotone" dataKey="pressure" name="Pressure (hPa)" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4, fill: '#0284c7' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forensic Intelligence Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Landfall & Impact Profile */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-3">
          <div className="text-xs font-bold text-ops-text uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-3">
            <MapPin className="w-4 h-4 text-ops-amber flex-shrink-0" />
            <span>LANDFALL & SOCIO-ECONOMIC IMPACT</span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <div className="flex justify-between border-b border-ops-border-subtle pb-1.5">
              <span className="text-ops-text-muted">Landfall Coordinates:</span>
              <strong className="text-ops-text font-mono truncate ml-1">{storm.landfallLocation}</strong>
            </div>
            <div className="flex justify-between border-b border-ops-border-subtle pb-1.5">
              <span className="text-ops-text-muted">Peak Category at Landfall:</span>
              <strong className="text-ops-amber">{storm.peakIntensity}</strong>
            </div>
            <div className="flex justify-between border-b border-ops-border-subtle pb-1.5">
              <span className="text-ops-text-muted">Associated Storm Surge:</span>
              <strong className="text-ops-red">4.5m – 5.5m Inundation</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-ops-text-muted">AI Post-Analysis Match:</span>
              <strong className="text-ops-green font-mono">{storm.aiValidationScore}% Accuracy</strong>
            </div>
          </div>
        </div>

        {/* Forensic Model Audit */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-3">
          <div className="text-xs font-bold text-ops-text uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-3">
            <FileCheck className="w-4 h-4 text-ops-green flex-shrink-0" />
            <span>AI MODEL FORENSIC RETROSPECTIVE</span>
          </div>

          <p className="text-xs text-ops-text-dim leading-relaxed font-sans">
            Retrospective neural re-analysis demonstrates that <strong>CycloneOps ConvLSTM-Deep</strong> successfully predicted the rapid intensification phase 18 hours earlier than legacy statistical guidance models, with a track error of just <strong>±18.4 km</strong> at 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};
