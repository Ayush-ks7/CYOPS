import React, { useState, useRef } from 'react';
import { 
  Layers, 
  Upload, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  Sparkles, 
  Crosshair, 
  Maximize2, 
  Download, 
  Play, 
  Pause,
  CheckCircle2,
  FileImage,
  RefreshCw
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';

export const ImageryPage: React.FC = () => {
  const { selectedCyclone, addOperationalLog } = useCyclone();
  const [activeBand, setActiveBand] = useState<'IR1' | 'IR2' | 'WV' | 'VIS' | 'ENHANCED_BD'>('ENHANCED_BD');
  const [showDetectionOverlay, setShowDetectionOverlay] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [contrastLevel, setContrastLevel] = useState(100);
  const [brightnessLevel, setBrightnessLevel] = useState(100);
  const [isDraggingUpload, setIsDraggingUpload] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    addOperationalLog('Executing VortexNet-Detect & CyDvorak-Deep neural inference on satellite frame', 'cyan');
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowDetectionOverlay(true);
      addOperationalLog(`Inference complete: Eye center localized at (${selectedCyclone.currentPosition.coordinatesFormatted}), Dvorak T6.0 (125 kts)`, 'green');
    }, 1400);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      addOperationalLog(`Ingested custom satellite granule: ${file.name} (Size: ${(file.size / 1024).toFixed(1)} KB)`, 'cyan');
      handleRunAnalysis();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingUpload(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      addOperationalLog(`Ingested custom satellite granule: ${file.name}`, 'cyan');
      handleRunAnalysis();
    }
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-8">
      {/* Header Controls */}
      <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold">
            SATELLITE REMOTE SENSING DECK · MULTI-SPECTRAL IMAGER
          </div>
          <h2 className="text-base font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            INSAT-3DR / MOSDAC High-Resolution Radiance Viewer
          </h2>
        </div>

        {/* Multi-spectral Band Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1 rounded border border-ops-border text-xs font-mono">
          <button
            onClick={() => setActiveBand('ENHANCED_BD')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
              activeBand === 'ENHANCED_BD' ? 'bg-ops-amber text-slate-950 font-extrabold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ENHANCED BD-CURVE
          </button>
          <button
            onClick={() => setActiveBand('IR1')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
              activeBand === 'IR1' ? 'bg-slate-800 text-ops-cyan border border-ops-cyan/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            IR1 (10.8µm)
          </button>
          <button
            onClick={() => setActiveBand('WV')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
              activeBand === 'WV' ? 'bg-slate-800 text-purple-400 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            WV (6.7µm)
          </button>
          <button
            onClick={() => setActiveBand('VIS')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-colors ${
              activeBand === 'VIS' ? 'bg-slate-800 text-slate-200 border border-slate-600' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            VIS (0.65µm)
          </button>
        </div>
      </div>

      {/* Main Imagery Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left 3 Cols: Satellite Frame Viewport with AI Bounding Box */}
        <div className="lg:col-span-3 space-y-3">
          <div className="relative h-[540px] bg-[#05080f] border border-ops-border rounded overflow-hidden select-none flex items-center justify-center">
            {/* Background Radar Grid */}
            <div className="absolute inset-0 radar-grid opacity-20 pointer-events-none" />

            {/* Simulated Satellite Image Matrix (Procedural Multi-Spectral Rendering) */}
            <div 
              className="w-full h-full relative transition-all duration-300 flex items-center justify-center"
              style={{
                filter: `contrast(${contrastLevel}%) brightness(${brightnessLevel}%)`
              }}
            >
              {/* Dynamic CSS / SVG Spiral Hurricane Canvas */}
              <svg className="w-full h-full" viewBox="0 0 800 540">
                <defs>
                  {/* BD-Curve Thermal Gradient */}
                  <radialGradient id="bdCurveEye" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="8%" stopColor="#ef4444" />
                    <stop offset="18%" stopColor="#f97316" />
                    <stop offset="35%" stopColor="#eab308" />
                    <stop offset="55%" stopColor="#06b6d4" />
                    <stop offset="80%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#080c14" />
                  </radialGradient>

                  {/* IR Grayscale Gradient */}
                  <radialGradient id="irGrayscale" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#18181b" />
                    <stop offset="12%" stopColor="#ffffff" />
                    <stop offset="30%" stopColor="#d4d4d8" />
                    <stop offset="60%" stopColor="#71717a" />
                    <stop offset="100%" stopColor="#09090b" />
                  </radialGradient>

                  {/* Water Vapour Gradient */}
                  <radialGradient id="wvGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b0764" />
                    <stop offset="15%" stopColor="#a855f7" />
                    <stop offset="40%" stopColor="#38bdf8" />
                    <stop offset="70%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>
                </defs>

                {/* Hurricane Cloud Mass */}
                <circle 
                  cx="400" 
                  cy="270" 
                  r="240" 
                  fill={
                    activeBand === 'ENHANCED_BD' 
                      ? 'url(#bdCurveEye)' 
                      : activeBand === 'WV' 
                      ? 'url(#wvGradient)' 
                      : 'url(#irGrayscale)'
                  } 
                  opacity="0.85"
                />

                {/* Spiral Feeder Bands */}
                <g stroke={activeBand === 'ENHANCED_BD' ? '#f97316' : '#d4d4d8'} strokeWidth="16" fill="none" strokeLinecap="round" opacity="0.4">
                  <path d="M 400,270 Q 560,180 580,340 Q 520,480 340,460 Q 200,420 220,240 Q 260,120 440,110" />
                  <path d="M 400,270 Q 260,320 250,180 Q 320,80 480,90" strokeWidth="24" stroke="#00f0ff" opacity="0.3" />
                </g>

                {/* Eye Core */}
                <circle cx="400" cy="270" r="22" fill="#080c14" stroke="#00f0ff" strokeWidth="1.5" />
                <circle cx="400" cy="270" r="3" fill="#f97316" />

                {/* AI Detection Overlay (Bounding Box + Eyewall Ring + Dvorak Tag) */}
                {showDetectionOverlay && (
                  <g>
                    {/* Bounding Box */}
                    <rect 
                      x="270" 
                      y="140" 
                      width="260" 
                      height="260" 
                      fill="rgba(0, 240, 255, 0.05)" 
                      stroke="#00f0ff" 
                      strokeWidth="1.5" 
                      strokeDasharray="5,4"
                    />

                    {/* Corner Reticles */}
                    <path d="M 270,160 L 270,140 L 290,140" fill="none" stroke="#00f0ff" strokeWidth="3" />
                    <path d="M 510,140 L 530,140 L 530,160" fill="none" stroke="#00f0ff" strokeWidth="3" />
                    <path d="M 270,380 L 270,400 L 290,400" fill="none" stroke="#00f0ff" strokeWidth="3" />
                    <path d="M 510,400 L 530,400 L 530,380" fill="none" stroke="#00f0ff" strokeWidth="3" />

                    {/* Eye Marker */}
                    <circle cx="400" cy="270" r="28" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="3,3" className="pulse-animation" />
                    <line x1="400" y1="230" x2="400" y2="310" stroke="#f97316" strokeWidth="1" />
                    <line x1="360" y1="270" x2="440" y2="270" stroke="#f97316" strokeWidth="1" />

                    {/* AI Tag Chip */}
                    <rect x="270" y="112" width="220" height="24" rx="2" fill="#080c14" stroke="#00f0ff" strokeWidth="1" />
                    <text x="278" y="128" fill="#00f0ff" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      ● EYE LOCALIZED: 98.4% CONF
                    </text>
                    <text x="415" y="128" fill="#f97316" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                      T6.0
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Top Viewport Metadata Overlay */}
            <div className="absolute top-3 left-3 bg-ops-card/90 border border-ops-border rounded p-2 text-xs font-mono backdrop-blur-md">
              <div className="text-ops-cyan font-bold">SENSOR: INSAT-3DR IMAGER (SAC/ISRO)</div>
              <div className="text-[10px] text-slate-400">RESOLUTION: 1.0 km nadir · BAND: {activeBand}</div>
              <div className="text-[10px] text-slate-400">TIMESTAMP: 2026-09-29 00:30:00 UTC</div>
            </div>

            {/* Run Analysis Action Button (Floating on Bottom Left) */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="px-3 py-1.5 rounded bg-ops-cyan hover:bg-cyan-400 text-slate-950 text-xs font-mono font-extrabold flex items-center gap-1.5 shadow-lg shadow-cyan-950/40 transition-all disabled:opacity-50"
              >
                {isAnalyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isAnalyzing ? 'RUNNING AI INFERENCE...' : 'RUN AI ANALYSIS'}</span>
              </button>

              <button
                onClick={() => setShowDetectionOverlay(!showDetectionOverlay)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-colors ${
                  showDetectionOverlay ? 'bg-slate-800 text-ops-cyan border-ops-cyan/40' : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                AI BOUNDING BOX: {showDetectionOverlay ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Adjustments Tool Box (Bottom Right) */}
            <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-ops-card/90 border border-ops-border rounded p-2 text-[10px] font-mono backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">CONTRAST:</span>
                <input 
                  type="range" 
                  min="50" 
                  max="180" 
                  value={contrastLevel} 
                  onChange={(e) => setContrastLevel(Number(e.target.value))}
                  className="w-16 accent-cyan-400"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">BRIGHT:</span>
                <input 
                  type="range" 
                  min="50" 
                  max="160" 
                  value={brightnessLevel} 
                  onChange={(e) => setBrightnessLevel(Number(e.target.value))}
                  className="w-16 accent-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Drag-and-Drop Ingestion & Frame Telemetry */}
        <div className="space-y-4">
          {/* Drag and Drop Satellite Ingestion Box */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDraggingUpload(true); }}
            onDragLeave={() => setIsDraggingUpload(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition-colors ${
              isDraggingUpload ? 'border-ops-cyan bg-cyan-950/20' : 'border-ops-border bg-ops-card hover:border-slate-500'
            }`}
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              accept=".geotiff,.tif,.nc,.hdf5,.png,.jpg" 
              className="hidden" 
              onChange={handleFileUpload}
            />
            <Upload className="w-6 h-6 text-ops-cyan mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-200 font-sans">
              INGEST SATELLITE GRANULE
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              Drag & Drop NetCDF-4, GeoTIFF, or HDF5
            </div>
            {uploadedFileName && (
              <div className="mt-2 text-[10px] font-mono text-ops-green truncate bg-emerald-950/60 border border-emerald-800 py-1 px-2 rounded">
                ✓ Loaded: {uploadedFileName}
              </div>
            )}
          </div>

          {/* AI Model Inferred Telemetry */}
          <div className="bg-ops-card border border-ops-border rounded p-3 text-xs font-mono space-y-2">
            <div className="text-[10px] font-bold tracking-wider text-ops-text-muted uppercase border-b border-ops-border-subtle pb-1">
              FRAME ML INFERENCE SUMMARY
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Eye Center:</span>
                <span className="text-white font-bold">{selectedCyclone.currentPosition.coordinatesFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Dvorak Intensity:</span>
                <span className="text-ops-amber font-bold">CI 6.0 / 125 KTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Central Brightness:</span>
                <span className="text-ops-cyan font-bold">198.4 K (-74.7°C)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Eye Wall Symmetry:</span>
                <span className="text-ops-green font-bold">94.8% (Near Perfect)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Surrounding Cloud Top:</span>
                <span className="text-purple-400 font-bold">206.2 K (Cold Ring)</span>
              </div>
            </div>
          </div>

          {/* Dvorak BD-Curve Legend */}
          <div className="bg-ops-card border border-ops-border rounded p-3 text-xs font-mono">
            <div className="text-[10px] font-bold tracking-wider text-ops-text-muted uppercase mb-2">
              DVORAK BD-CURVE COLOR ENHANCEMENT
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-red-600" />
                  <span className="text-slate-300">CDG (Cold Dark Gray)</span>
                </div>
                <span className="text-slate-400">&lt; -75°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-orange-500" />
                  <span className="text-slate-300">CMG (Cold Med Gray)</span>
                </div>
                <span className="text-slate-400">-70°C to -75°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-yellow-500" />
                  <span className="text-slate-300">W (Warm / Eye)</span>
                </div>
                <span className="text-slate-400">-64°C to -69°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-cyan-500" />
                  <span className="text-slate-300">B (Black Ring)</span>
                </div>
                <span className="text-slate-400">-54°C to -63°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
