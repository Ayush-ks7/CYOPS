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
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the automated AI Dvorak technique work?',
      a: 'CycloneOps utilizes CyDvorak-Deep, a dual-stream neural network trained on over 32,000 multi-spectral satellite granules. It calculates the brightness temperature difference between the warm eye core and the surrounding cold dense overcast (CDO), matching standard enhanced patterns to estimate intensity with an error margin under 5.2 knots.'
    },
    {
      q: 'What does the Cone of Uncertainty mean for my safety?',
      a: 'The Cone of Uncertainty represents the 67% (two-thirds) historical probability area of where the cyclone center may travel over the next 12 to 72 hours. Important: Strong gale-force winds, heavy rain bands, and storm surges frequently extend tens of kilometers outside the cone boundary.'
    },
    {
      q: 'How frequently does satellite data update?',
      a: 'In standard mode, INSAT-3DR and regional satellites provide half-hourly (30-minute) full scans. When an active cyclone triggers Rapid Scanning Mode (RSM), imagery updates every 6 to 10 minutes.'
    },
    {
      q: 'What should coastal communities do during a Category 3+ warning?',
      a: 'Stay indoors away from windows, move to designated high-ground storm shelters if in coastal flood zones, avoid beaches, and follow official evacuation orders from local authorities and the National Disaster Response Force.'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
            <span>PUBLIC CYCLONE GUIDE & KNOWLEDGE BASE</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            Understanding Cyclones, Maps & Safety Alerts
          </h1>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IMD Classification Matrix */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-3">
          <div className="text-xs font-bold text-ops-text uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-3">
            <Compass className="w-4 h-4 text-ops-cyan flex-shrink-0" />
            <span>TROPICAL CYCLONE SCALE CLASSIFICATION</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] min-w-[320px]">
              <thead>
                <tr className="text-ops-text-muted border-b border-ops-border-subtle">
                  <th className="pb-2 font-normal">CATEGORY</th>
                  <th className="pb-2 font-normal">SUSTAINED WIND</th>
                  <th className="pb-2 font-normal">EQUIVALENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ops-border-subtle text-ops-text">
                <tr>
                  <td className="py-2 font-bold text-ops-text-muted">Depression (D)</td>
                  <td className="py-2">31 – 49 km/h (17–27 kts)</td>
                  <td className="py-2 text-ops-text-muted">Tropical Depression</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-ops-text">Deep Depression (DD)</td>
                  <td className="py-2">50 – 61 km/h (28–33 kts)</td>
                  <td className="py-2 text-ops-text-muted">Deep Depression</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-ops-cyan">Cyclonic Storm (CS)</td>
                  <td className="py-2">62 – 88 km/h (34–47 kts)</td>
                  <td className="py-2 text-ops-cyan">Tropical Storm</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-yellow-500">Severe Cyclonic Storm (SCS)</td>
                  <td className="py-2">89 – 117 km/h (48–63 kts)</td>
                  <td className="py-2 text-yellow-500">Cat 1 Equivalent</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-ops-amber">Very Severe (VSCS)</td>
                  <td className="py-2">118 – 166 km/h (64–89 kts)</td>
                  <td className="py-2 text-ops-amber">Cat 2 – Cat 3</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-red-500">Extremely Severe (ESCS)</td>
                  <td className="py-2">167 – 221 km/h (90–119 kts)</td>
                  <td className="py-2 text-red-500">Cat 4 Equivalent</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-purple-600">Super Cyclone (SuCS)</td>
                  <td className="py-2">≥ 222 km/h (≥ 120 kts)</td>
                  <td className="py-2 text-purple-600 font-bold">Cat 5 Superstorm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Community Emergency Protocols */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card space-y-4">
          <div className="text-xs font-bold text-ops-text uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-3">
            <ShieldAlert className="w-4 h-4 text-ops-amber flex-shrink-0" />
            <span>COMMUNITY SAFETY & EVACUATION PROTOCOLS</span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-ops-text space-y-1">
              <div className="font-bold text-red-600 uppercase font-mono text-[10px]">
                PHASE 1: CYCLONE WARNING (24H BEFORE LANDFALL)
              </div>
              <p className="text-ops-text-dim text-[11px] leading-relaxed">
                Move cattle and livestock to high ground. Fishermen must immediately cease all marine operations and anchor vessels safely inland.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-ops-text space-y-1">
              <div className="font-bold text-ops-amber uppercase font-mono text-[10px]">
                PHASE 2: LANDFALL ONSET (0H – 12H)
              </div>
              <p className="text-ops-text-dim text-[11px] leading-relaxed">
                Remain indoors away from glass windows. Beware of the "Calm Eye" trap — winds will reverse direction rapidly with greater ferocity once the eye passes.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-ops-text space-y-1">
              <div className="font-bold text-ops-green uppercase font-mono text-[10px]">
                PHASE 3: POST-LANDFALL RECOVERY
              </div>
              <p className="text-ops-text-dim text-[11px] leading-relaxed">
                Do not touch downed power lines or enter standing floodwaters. Drink boiled or purified water to prevent waterborne infections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-6 shadow-ops-card space-y-4">
        <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-ops-cyan flex-shrink-0" />
          <span>FREQUENTLY ASKED QUESTIONS & SCIENTIFIC METHODOLOGY</span>
        </div>

        <div className="space-y-2 font-sans text-xs">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div 
                key={index}
                className="border border-ops-border rounded-lg overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full text-left p-3.5 sm:p-4 bg-ops-card-sub/50 hover:bg-ops-card-sub flex items-center justify-between gap-3 font-semibold text-ops-text transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-sans">{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-ops-cyan flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ops-text-muted flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3.5 sm:p-4 bg-ops-card text-ops-text-dim text-xs leading-relaxed border-t border-ops-border">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
