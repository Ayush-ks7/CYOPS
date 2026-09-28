import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Layers, 
  Activity, 
  Zap, 
  Sparkles, 
  Server, 
  CheckCircle2, 
  ShieldCheck,
  Eye,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { ML_MODELS_SPECS } from '../data/mockData';
import { useCyclone } from '../context/CycloneContext';

export const ModelsPage: React.FC = () => {
  const { addOperationalLog } = useCyclone();
  const [selectedModelTab, setSelectedModelTab] = useState<'identification' | 'classification' | 'prediction'>('identification');
  const [showAttentionHeatmap, setShowAttentionHeatmap] = useState(true);

  const activeModel = ML_MODELS_SPECS[selectedModelTab];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5" />
            AI / MACHINE LEARNING CORE ENGINES
          </div>
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            Model Architecture & Quantitative Benchmarks
          </h1>
        </div>

        {/* Hardware Acceleration Status */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-slate-900 border border-ops-border px-3 py-1.5 rounded flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-ops-amber" />
            <span className="text-slate-300">NVIDIA TensorRT 10.0 (FP16 Active)</span>
          </div>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Model 1 Tab */}
        <button
          onClick={() => setSelectedModelTab('identification')}
          className={`p-4 rounded border text-left transition-all ${
            selectedModelTab === 'identification'
              ? 'bg-slate-800/80 border-ops-cyan shadow-ops-glow'
              : 'bg-ops-card border-ops-border hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-cyan font-bold">1. IDENTIFICATION</span>
            <span className="text-ops-green font-bold">● ONLINE</span>
          </div>
          <div className="text-base font-bold text-white font-sans">
            {ML_MODELS_SPECS.identification.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans">
            Vortex center localization & eye detection network
          </div>
        </button>

        {/* Model 2 Tab */}
        <button
          onClick={() => setSelectedModelTab('classification')}
          className={`p-4 rounded border text-left transition-all ${
            selectedModelTab === 'classification'
              ? 'bg-slate-800/80 border-ops-amber shadow-ops-amber'
              : 'bg-ops-card border-ops-border hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-amber font-bold">2. CLASSIFICATION</span>
            <span className="text-ops-green font-bold">● ONLINE</span>
          </div>
          <div className="text-base font-bold text-white font-sans">
            {ML_MODELS_SPECS.classification.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans">
            Automated Dvorak T-number & wind intensity estimation
          </div>
        </button>

        {/* Model 3 Tab */}
        <button
          onClick={() => setSelectedModelTab('prediction')}
          className={`p-4 rounded border text-left transition-all ${
            selectedModelTab === 'prediction'
              ? 'bg-slate-800/80 border-purple-500 shadow-ops-glow'
              : 'bg-ops-card border-ops-border hover:border-slate-600'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-purple-400 font-bold">3. PREDICTION</span>
            <span className="text-ops-green font-bold">● ONLINE</span>
          </div>
          <div className="text-base font-bold text-white font-sans">
            {ML_MODELS_SPECS.prediction.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans">
            Physics-Informed ConvLSTM multi-horizon trajectory
          </div>
        </button>
      </div>

      {/* Active Model Deep Dive Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Architecture Specs & Performance Benchmarks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-ops-card border border-ops-border rounded p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-ops-border-subtle pb-2">
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase font-sans">
                NEURAL NETWORK ARCHITECTURE SPECIFICATIONS
              </span>
              <span className="text-xs font-mono text-ops-cyan font-bold">
                {activeModel.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-900/80 p-3 rounded border border-ops-border-subtle">
                <div className="text-slate-400 text-[10px]">BACKBONE & TOPOLOGY</div>
                <div className="text-white font-bold mt-1 text-[11px]">{activeModel.architecture}</div>
              </div>

              <div className="bg-slate-900/80 p-3 rounded border border-ops-border-subtle">
                <div className="text-slate-400 text-[10px]">INPUT TENSOR SHAPE & RADIANCE</div>
                <div className="text-ops-cyan font-bold mt-1 text-[11px]">{activeModel.inputData}</div>
              </div>
            </div>

            {/* Performance Benchmark Matrix */}
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-2">
                EMPIRICAL VALIDATION METRICS (TEST BENCHMARK)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                {Object.entries(activeModel.performance).map(([key, val]) => (
                  <div key={key} className="bg-slate-900/60 p-2.5 rounded border border-ops-border-subtle">
                    <div className="text-slate-400 text-[10px] uppercase truncate">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-ops-amber font-bold text-sm mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Spatial Attention & Inference Simulator */}
        <div className="space-y-4">
          <div className="bg-ops-card border border-ops-border rounded p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase">
                GRAD-CAM SPATIAL ATTENTION
              </span>
              <button
                onClick={() => setShowAttentionHeatmap(!showAttentionHeatmap)}
                className="text-[10px] font-mono text-ops-cyan underline"
              >
                {showAttentionHeatmap ? 'HIDE MASK' : 'SHOW MASK'}
              </button>
            </div>

            {/* Simulated Attention Heatmap Graphic */}
            <div className="relative h-44 bg-[#070b13] rounded border border-ops-border-subtle overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 radar-grid opacity-30" />
              {showAttentionHeatmap ? (
                <div 
                  className="w-32 h-32 rounded-full opacity-70 filter blur-md animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, #ef4444 0%, #f97316 40%, #00f0ff 75%, transparent 100%)'
                  }}
                />
              ) : (
                <div className="text-xs font-mono text-slate-500">Grad-CAM overlay disabled</div>
              )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-white/60" />
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-300">
              Spatial attention focal weights concentrate 92.4% gradient energy on eyewall cloud top boundary.
            </div>
          </div>

          <div className="bg-ops-card border border-ops-border rounded p-4 space-y-2">
            <div className="text-[10px] font-mono font-bold tracking-widest text-ops-green uppercase">
              HARDWARE INFERENCE PIPELINE
            </div>
            <div className="space-y-1 text-xs font-mono text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Cluster Node:</span>
                <span className="text-white font-bold">2x NVIDIA H100 SXM5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">GPU VRAM Allocated:</span>
                <span className="text-ops-cyan font-bold">14.2 GB / 80 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Batch Size:</span>
                <span className="text-slate-200">1 (Real-time Streaming)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
