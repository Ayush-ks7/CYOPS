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

  const activeModel = ML_MODELS_SPECS[selectedModelTab];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 flex-shrink-0" />
            <span>AI & MACHINE LEARNING PREDICTIVE MODELS</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            Model Architectures & Validation Accuracy
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono self-start md:self-auto">
          <div className="bg-ops-card-sub border border-ops-border px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-ops-amber flex-shrink-0" />
            <span className="text-ops-text font-bold text-[11px] sm:text-xs">TensorRT Acceleration Active</span>
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
          <div className="text-base font-bold text-ops-text font-sans break-words">
            {ML_MODELS_SPECS.identification.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans leading-relaxed">
            {ML_MODELS_SPECS.identification.type}
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
          <div className="text-base font-bold text-ops-text font-sans break-words">
            {ML_MODELS_SPECS.classification.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans leading-relaxed">
            {ML_MODELS_SPECS.classification.type}
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
          <div className="text-base font-bold text-ops-text font-sans break-words">
            {ML_MODELS_SPECS.prediction.name}
          </div>
          <div className="text-xs text-ops-text-dim mt-1 font-sans leading-relaxed">
            {ML_MODELS_SPECS.prediction.type}
          </div>
        </button>
      </div>

      {/* Selected Model Deep Dive Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Architectural Specs & Pipeline Stages */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ops-border-subtle pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-ops-text-muted">MODEL DETAILS</span>
                <h2 className="text-lg font-bold text-ops-text font-sans">
                  {activeModel.name}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-ops-cyan/10 text-ops-cyan border border-ops-cyan/30 text-xs font-mono font-bold">
                {activeModel.architecture}
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                <span className="text-ops-text-muted">Task Purpose:</span>
                <span className="text-ops-text font-bold">{activeModel.type}</span>
              </div>
              <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                <span className="text-ops-text-muted">Input Features:</span>
                <span className="text-ops-cyan truncate ml-1">{activeModel.inputData}</span>
              </div>
              {'trainingDataset' in activeModel && (
                <div className="flex justify-between border-b border-ops-border-subtle pb-1">
                  <span className="text-ops-text-muted">Training Corpus:</span>
                  <span className="text-ops-text truncate ml-1">{activeModel.trainingDataset}</span>
                </div>
              )}
            </div>

            {/* Benchmark Performance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {'mAP50' in activeModel.performance && (
                <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border text-center">
                  <div className="text-[10px] font-mono text-ops-text-muted uppercase">mAP@50 SCORE</div>
                  <div className="text-sm sm:text-base font-mono font-bold text-ops-green mt-0.5">{activeModel.performance.mAP50}</div>
                </div>
              )}
              {'iouAccuracy' in activeModel.performance && (
                <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border text-center">
                  <div className="text-[10px] font-mono text-ops-text-muted uppercase">IoU ACCURACY</div>
                  <div className="text-sm sm:text-base font-mono font-bold text-ops-cyan mt-0.5">{activeModel.performance.iouAccuracy}</div>
                </div>
              )}
              {'windSpeedRMSE' in activeModel.performance && (
                <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border text-center">
                  <div className="text-[10px] font-mono text-ops-text-muted uppercase">WIND SPEED RMSE</div>
                  <div className="text-sm sm:text-base font-mono font-bold text-ops-amber mt-0.5">{activeModel.performance.windSpeedRMSE}</div>
                </div>
              )}
              {'categoryClassificationAccuracy' in activeModel.performance && (
                <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border text-center">
                  <div className="text-[10px] font-mono text-ops-text-muted uppercase">CAT ACCURACY</div>
                  <div className="text-sm sm:text-base font-mono font-bold text-ops-green mt-0.5">{activeModel.performance.categoryClassificationAccuracy}</div>
                </div>
              )}
              {'trackError24h' in activeModel.performance && (
                <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border text-center">
                  <div className="text-[10px] font-mono text-ops-text-muted uppercase">24H TRACK ERROR</div>
                  <div className="text-sm sm:text-base font-mono font-bold text-ops-amber mt-0.5">{activeModel.performance.trackError24h}</div>
                </div>
              )}
              <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border text-center">
                <div className="text-[10px] font-mono text-ops-text-muted uppercase">INFERENCE SPEED</div>
                <div className="text-sm sm:text-base font-mono font-bold text-ops-cyan mt-0.5">{activeModel.performance.inferenceSpeed}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Hyperparameters & Input Tensors */}
        <div className="space-y-4">
          <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-3">
            <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3">
              INPUT TENSORS & SPECIFICATIONS
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Architecture:</span>
                <strong className="text-ops-text truncate ml-1">{activeModel.architecture}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Inference Target:</span>
                <strong className="text-ops-cyan">H100 TensorRT FP16</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-ops-text-muted">Pipeline Stage:</span>
                <strong className="text-ops-green">Real-time Online</strong>
              </div>
            </div>
          </div>

          <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-2 text-xs font-sans">
            <div className="font-bold text-ops-text uppercase text-[11px] font-mono text-ops-text-muted">
              SCIENTIFIC RIGOR & VALIDATION
            </div>
            <p className="text-[11px] text-ops-text-dim leading-relaxed">
              All models undergo continuous validation against operational best-track archives published by the India Meteorological Department (IMD) and JTWC to safeguard prediction precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
