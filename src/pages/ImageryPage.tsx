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
  RefreshCw, 
  Info, 
  Satellite 
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';
import { RealLeafletMap } from '../components/map/RealLeafletMap';

export const ImageryPage: React.FC = () => {
  const { selectedCyclone, addOperationalLog, mapLayers, toggleMapLayer } = useCyclone();
  const [activeBand, setActiveBand] = useState<'IR1' | 'IR2' | 'WV' | 'VIS' | 'ENHANCED_BD'>('ENHANCED_BD');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDraggingUpload, setIsDraggingUpload] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    addOperationalLog('Executing VortexNet-Detect & CyDvorak-Deep neural inference on satellite frame', 'cyan');
    setTimeout(() => {
      setIsAnalyzing(false);
      addOperationalLog(`Inference complete: Eye center localized at (${selectedCyclone.currentPosition.coordinatesFormatted}), Dvorak T6.0 / CI 6.0`, 'green');
    }, 1200);
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
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 flex-shrink-0" />
            <span>MULTI-SPECTRAL SATELLITE RADIANCE VIEWER</span>
          </div>
          <h1 className="text-sm sm:text-base font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            High-Resolution Satellite Layer & Cyclone Diagnostics
          </h1>
        </div>

        {/* Multi-spectral Band Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-ops-card-sub p-1 rounded-lg border border-ops-border text-xs font-mono self-start md:self-auto">
          <button
            onClick={() => setActiveBand('ENHANCED_BD')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeBand === 'ENHANCED_BD' ? 'bg-ops-amber text-white font-extrabold shadow-sm' : 'text-ops-text-muted hover:text-ops-text'
            }`}
          >
            ENHANCED BD
          </button>
          <button
            onClick={() => setActiveBand('IR1')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeBand === 'IR1' ? 'bg-ops-cyan text-white shadow-sm' : 'text-ops-text-muted hover:text-ops-text'
            }`}
          >
            IR1 (10.8µ)
          </button>
          <button
            onClick={() => setActiveBand('WV')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeBand === 'WV' ? 'bg-purple-600 text-white shadow-sm' : 'text-ops-text-muted hover:text-ops-text'
            }`}
          >
            WV (6.7µ)
          </button>
          <button
            onClick={() => setActiveBand('VIS')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase transition-all cursor-pointer ${
              activeBand === 'VIS' ? 'bg-slate-700 text-white shadow-sm' : 'text-ops-text-muted hover:text-ops-text'
            }`}
          >
            VIS (0.65µ)
          </button>
        </div>
      </div>

      {/* Main Satellite Workspace with Real Leaflet Map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left 3 Cols: Interactive Satellite Map (Shared Leaflet State with Live Map) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="h-[420px] sm:h-[500px] lg:h-[560px] rounded-xl overflow-hidden border border-ops-border shadow-ops-card relative">
            <RealLeafletMap heightClassName="h-full" showFullControls={true} />
          </div>

          <div className="bg-ops-card border border-ops-border rounded-xl p-3.5 shadow-ops-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] text-ops-text-dim">
              <span>BAND: <strong className="text-ops-cyan">{activeBand}</strong></span>
              <span>•</span>
              <span className="truncate">INGEST: <strong className="text-ops-text">INSAT-3DR 30-MIN</strong></span>
              <span>•</span>
              <span>RES: <strong className="text-ops-text">1.0 KM NADIR</strong></span>
            </div>

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-ops-cyan hover:bg-sky-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'PROCESSING AI...' : 'RUN AI EYE DETECTION'}</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Drag-and-Drop Ingestion & Satellite Spectral Guides */}
        <div className="space-y-4">
          {/* Drag & Drop Satellite Granule Ingestion */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDraggingUpload(true); }}
            onDragLeave={() => setIsDraggingUpload(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-colors shadow-sm ${
              isDraggingUpload ? 'border-ops-cyan bg-sky-500/10' : 'border-ops-border bg-ops-card hover:border-ops-cyan'
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
            <div className="text-xs font-bold text-ops-text font-sans">
              INGEST SATELLITE GRANULE
            </div>
            <div className="text-[11px] font-mono text-ops-text-muted mt-1">
              Drag & Drop NetCDF-4, GeoTIFF, or HDF5
            </div>
            {uploadedFileName && (
              <div className="mt-2 text-[11px] font-mono text-ops-green truncate bg-emerald-500/10 border border-emerald-500/30 py-1 px-2 rounded">
                ✓ Ingested: {uploadedFileName}
              </div>
            )}
          </div>

          {/* AI Inference Diagnostic Card */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-4 shadow-ops-card text-xs font-mono space-y-2.5">
            <div className="text-[10px] font-bold tracking-wider text-ops-text-muted uppercase border-b border-ops-border-subtle pb-1.5 flex items-center justify-between">
              <span>SATELLITE AI DIAGNOSTICS</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-ops-green" />
            </div>

            <div className="space-y-1.5 text-ops-text text-[11px]">
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Eye Center:</span>
                <span className="font-bold truncate ml-1">{selectedCyclone.currentPosition.coordinatesFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Dvorak Intensity:</span>
                <span className="text-ops-amber font-bold">{selectedCyclone.mlMetrics.dvorakTNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Brightness Temp:</span>
                <span className="text-ops-cyan font-bold">198.4 K (-74.7°C)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Eye Wall:</span>
                <span className="text-ops-green font-bold">94.8% Symmetrical</span>
              </div>
            </div>
          </div>

          {/* Clear Explanation Guide for Citizens */}
          <div className="bg-ops-card border border-ops-border rounded-xl p-4 shadow-ops-card text-xs space-y-2">
            <div className="text-[10px] font-mono font-bold tracking-wider text-ops-text-muted uppercase mb-1">
              WHAT DOES THIS BAND SHOW?
            </div>
            <p className="text-[11px] text-ops-text-dim leading-relaxed font-sans">
              <strong>Enhanced BD-Curve</strong> applies an infrared color filter to highlight the coldest, highest cloud tops in deep red/orange rings, pinpointing the cyclone's powerful core thunderstorms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
