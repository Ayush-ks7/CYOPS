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
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5" />
            AI & MACHINE LEARNING PREDICTIVE MODELS
          </div>
          <h1 className="text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5">
            Model Architectures & Validation Accuracy
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="bg-ops-card-sub border border-ops-border px-3.5 py-2 rounded-lg flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-ops-amber" />
            <span className="text-ops-text font-bold">TensorRT AI Acceleration Active</span>
          </div>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Model 1 Tab */}
        <button
          onClick={() => setSelectedModelTab('identification')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedModelTab === 'identification'
              ? 'bg-ops-cyan/10 border-ops-cyan shadow-sm ring-1 ring-ops-cyan'
              : 'bg-ops-card border-ops-border hover:border-ops-border-light'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-cyan font-bold">1. IDENTIFICATION</span>
            <span className="text-ops-green font-bold">● ONLINE</span>
          </div>
          <div className="text-base font-bold text-ops-text font-sans">
            {ML_MODELS_SPECS.identification.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans">
            Vortex center localization & eye detection network
          </div>
        </button>

        {/* Model 2 Tab */}
        <button
          onClick={() => setSelectedModelTab('classification')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedModelTab === 'classification'
              ? 'bg-amber-500/10 border-ops-amber shadow-sm ring-1 ring-amber-500'
              : 'bg-ops-card border-ops-border hover:border-ops-border-light'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-ops-amber font-bold">2. CLASSIFICATION</span>
            <span className="text-ops-green font-bold">● ONLINE</span>
          </div>
          <div className="text-base font-bold text-ops-text font-sans">
            {ML_MODELS_SPECS.classification.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans">
            Automated Dvorak T-number & wind intensity estimation
          </div>
        </button>

        {/* Model 3 Tab */}
        <button
          onClick={() => setSelectedModelTab('prediction')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            selectedModelTab === 'prediction'
              ? 'bg-purple-500/10 border-purple-500 shadow-sm ring-1 ring-purple-500'
              : 'bg-ops-card border-ops-border hover:border-ops-border-light'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
            <span className="text-purple-600 font-bold">3. PREDICTION</span>
            <span className="text-ops-green font-bold">● ONLINE</span>
          </div>
          <div className="text-base font-bold text-ops-text font-sans">
            {ML_MODELS_SPECS.prediction.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans">
            Physics-Informed ConvLSTM multi-horizon trajectory
          </div>
        </button>
      </div>

      {/* Model Deep Dive Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-4">
            <div className="flex items-center justify-between border-b border-ops-border-subtle pb-3">
              <span className="text-xs font-bold tracking-wider text-ops-text uppercase font-sans">
                NEURAL NETWORK ARCHITECTURE & TRAINING DATA
              </span>
              <span className="text-xs font-mono text-ops-cyan font-bold">
                {activeModel.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-ops-card-sub p-3.5 rounded-lg border border-ops-border">
                <div className="text-ops-text-muted text-[10px]">BACKBONE & TOPOLOGY</div>
                <div className="text-ops-text font-bold mt-1 text-[11px]">{activeModel.architecture}</div>
              </div>

              <div className="bg-ops-card-sub p-3.5 rounded-lg border border-ops-border">
                <div className="text-ops-text-muted text-[10px]">INPUT TENSORS & SATELLITE CHANNELS</div>
                <div className="text-ops-cyan font-bold mt-1 text-[11px]">{activeModel.inputData}</div>
              </div>
            </div>

            {/* Performance Benchmark Matrix */}
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-2">
                ACCURACY BENCHMARKS (TEST DATASET)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                {Object.entries(activeModel.performance).map(([key, val]) => (
                  <div key={key} className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
                    <div className="text-ops-text-muted text-[10px] uppercase truncate">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-ops-amber font-bold text-sm mt-0.5">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Attention Heatmap Simulation */}
        <div className="space-y-4">
          <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-ops-cyan uppercase">
                SPATIAL ATTENTION FOCUS
              </span>
              <button
                onClick={() => setShowAttentionHeatmap(!showAttentionHeatmap)}
                className="text-[10px] font-mono text-ops-cyan underline cursor-pointer"
              >
                {showAttentionHeatmap ? 'HIDE OVERLAY' : 'SHOW OVERLAY'}
              </button>
            </div>

            <div className="relative h-44 bg-slate-900 rounded-lg border border-ops-border overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 radar-grid opacity-30" />
              {showAttentionHeatmap ? (
                <div 
                  className="w-32 h-32 rounded-full opacity-70 filter blur-md animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, #ef4444 0%, #ea580c 40%, #0284c7 75%, transparent 100%)'
                  }}
                />
              ) : (
                <div className="text-xs font-mono text-ops-text-muted">Attention mask hidden</div>
              )}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full border border-white/60" />
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-ops-text-dim">
              Spatial attention focal weights concentrate on eyewall convection and feeder bands for maximum intensity precision.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
