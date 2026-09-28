import React, { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  ShieldAlert, 
  Info, 
  Compass, 
  Phone, 
  Mail,
  ExternalLink
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the automated AI Dvorak technique work?',
      a: 'CycloneOps utilizes CyDvorak-Deep, a dual-stream DenseNet-161 neural network trained on over 32,000 multi-spectral satellite granules. It calculates the brightness temperature difference between the warm eye core and the surrounding cold dense overcast (CDO), matching standard BD-curve enhanced patterns to output a continuous T-number (e.g. T6.0) with an intensity error margin under 5.2 knots.'
    },
    {
      q: 'What is the physical meaning of the Cone of Uncertainty?',
      a: 'The Cone of Uncertainty represents the 67% (two-thirds) historical probability envelope of the cyclone center position over the forecast timeline (12h, 24h, 48h, 72h). It expands over time to reflect atmospheric steering flow chaos. Critical impacts (destructive gales and surge) routinely extend well beyond the boundary of the cone.'
    },
    {
      q: 'How frequently does MOSDAC / INSAT-3DR satellite data ingest?',
      a: 'In standard mode, INSAT-3DR provides half-hourly (30-minute) full-disk scans. When an active cyclone triggers Rapid Scanning Mode (RSM), the imager sweeps the target North Indian Ocean / Western Pacific sector every 6 to 10 minutes.'
    },
    {
      q: 'How do Port Warning Signals 1 through 11 correspond to storm severity?',
      a: 'Signals 1 to 3 indicate distant cautionary and squally winds. Signals 4 to 7 indicate local warning of moderate-to-severe cyclonic impact. Signals 8 through 10 denote severe to super cyclonic threats directly striking the port. Signal 11 signifies total communication breakdown with impending catastrophic conditions.'
    }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            OPERATIONAL DOCUMENTATION & METEOROLOGICAL GUIDE
          </div>
          <h1 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            CycloneOps Mission Control Knowledge Base
          </h1>
        </div>
      </div>

      {/* Guide Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IMD Classification Matrix */}
        <div className="bg-ops-card border border-ops-border rounded p-4 space-y-3">
          <div className="text-xs font-bold text-white uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-2">
            <Compass className="w-4 h-4 text-ops-cyan" />
            <span>IMD / WMO TROPICAL CYCLONE SCALE CLASSIFICATION</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
              <thead>
                <tr className="text-slate-500 border-b border-ops-border-subtle">
                  <th className="pb-1.5 font-normal">CATEGORY</th>
                  <th className="pb-1.5 font-normal">SUSTAINED WIND</th>
                  <th className="pb-1.5 font-normal">SAFFIR-SIMPSON</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ops-border-subtle text-slate-300">
                <tr>
                  <td className="py-1.5 font-bold text-slate-400">Depression (D)</td>
                  <td className="py-1.5">17 – 27 kts</td>
                  <td className="py-1.5 text-slate-500">Tropical Depression</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold text-slate-300">Deep Depression (DD)</td>
                  <td className="py-1.5">28 – 33 kts</td>
                  <td className="py-1.5 text-slate-500">Tropical Depression</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold text-ops-cyan">Cyclonic Storm (CS)</td>
                  <td className="py-1.5">34 – 47 kts</td>
                  <td className="py-1.5 text-ops-cyan">Tropical Storm</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold text-yellow-400">Severe Cyclonic Storm (SCS)</td>
                  <td className="py-1.5">48 – 63 kts</td>
                  <td className="py-1.5 text-yellow-400">Cat 1</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold text-ops-amber">Very Severe (VSCS)</td>
                  <td className="py-1.5">64 – 89 kts</td>
                  <td className="py-1.5 text-ops-amber">Cat 2 – Cat 3</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold text-red-400">Extremely Severe (ESCS)</td>
                  <td className="py-1.5">90 – 119 kts</td>
                  <td className="py-1.5 text-red-400">Cat 4</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold text-red-500">Super Cyclonic Storm (SuCS)</td>
                  <td className="py-1.5">120+ kts</td>
                  <td className="py-1.5 text-red-500">Cat 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Multi-Spectral Band Guide */}
        <div className="bg-ops-card border border-ops-border rounded p-4 space-y-3">
          <div className="text-xs font-bold text-white uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>SATELLITE SPECTRAL BANDS INTERPRETATION</span>
          </div>

          <div className="space-y-2 text-xs font-sans text-slate-300">
            <div className="bg-slate-900/80 p-2.5 rounded border border-ops-border-subtle">
              <div className="font-bold text-ops-cyan font-mono text-[11px]">IR1 CLEAN INFRARED (10.8 µm)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Measures cloud-top brightness temperatures day and night. Coldest tops (below -75°C) signify deepest eyewall updrafts.</div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded border border-ops-border-subtle">
              <div className="font-bold text-purple-400 font-mono text-[11px]">WV UPPER TROPOSPHERE WATER VAPOUR (6.7 µm)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Captures mid-to-upper level atmospheric moisture and outflow jets, revealing synoptic dry air intrusions and steering troughs.</div>
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded border border-ops-border-subtle">
              <div className="font-bold text-ops-amber font-mono text-[11px]">ENHANCED BD-CURVE (DVORAK COLOR SCALE)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Step-wise thermal color ramp isolating the warm eye center against cold convection banding for precise intensity estimation.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable FAQs Section */}
      <div className="bg-ops-card border border-ops-border rounded p-5 space-y-3">
        <div className="text-xs font-bold text-white uppercase font-sans border-b border-ops-border-subtle pb-2">
          FREQUENTLY ASKED OPERATIONAL QUESTIONS
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div key={idx} className="border border-ops-border rounded bg-slate-900/60 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full text-left p-3 flex items-center justify-between text-xs font-bold text-slate-200 hover:text-ops-cyan transition-colors"
                >
                  <span className="font-sans">{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-ops-cyan" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isExpanded && (
                  <div className="p-3 pt-0 text-xs text-slate-300 font-sans leading-relaxed border-t border-ops-border-subtle/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Operational Contacts */}
      <div className="bg-ops-card border border-ops-border rounded p-4 text-xs font-mono">
        <div className="text-[10px] font-bold tracking-widest text-ops-text-muted uppercase mb-2">
          EMERGENCY MISSION CONTROL HOTLINES
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
          <div className="bg-slate-900 p-2.5 rounded border border-ops-border-subtle">
            <div className="text-ops-cyan font-bold">IMD Cyclone Warning Division</div>
            <div className="text-[10px] text-slate-400 mt-0.5">+91-11-24652484 · cwd@imd.gov.in</div>
          </div>
          <div className="bg-slate-900 p-2.5 rounded border border-ops-border-subtle">
            <div className="text-ops-amber font-bold">NDRF Control Room HQ</div>
            <div className="text-[10px] text-slate-400 mt-0.5">+91-11-24363260 · hq.ndrf@nic.in</div>
          </div>
          <div className="bg-slate-900 p-2.5 rounded border border-ops-border-subtle">
            <div className="text-ops-green font-bold">MOSDAC SAC / ISRO Support</div>
            <div className="text-[10px] text-slate-400 mt-0.5">+91-79-26916000 · helpdesk@mosdac.gov.in</div>
          </div>
        </div>
      </div>
    </div>
  );
};
