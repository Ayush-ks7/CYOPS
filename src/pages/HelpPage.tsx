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
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            PUBLIC CYCLONE GUIDE & KNOWLEDGE BASE
          </div>
          <h1 className="text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5">
            Understanding Cyclones, Maps & Safety Alerts
          </h1>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IMD Classification Matrix */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-3">
          <div className="text-xs font-bold text-ops-text uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-3">
            <Compass className="w-4 h-4 text-ops-cyan" />
            <span>TROPICAL CYCLONE SCALE CLASSIFICATION</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px]">
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
                  <td className="py-2 text-red-500">Cat 4</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-red-600">Super Cyclonic Storm (SuCS)</td>
                  <td className="py-2">222+ km/h (120+ kts)</td>
                  <td className="py-2 text-red-600">Cat 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Satellite Multi-spectral Band Guide */}
        <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card space-y-3">
          <div className="text-xs font-bold text-ops-text uppercase font-sans flex items-center gap-2 border-b border-ops-border-subtle pb-3">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>HOW SATELLITE BANDS WORK</span>
          </div>

          <div className="space-y-2.5 text-xs font-sans text-ops-text">
            <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
              <div className="font-bold text-ops-cyan font-mono text-[11px]">IR1 CLEAN INFRARED (10.8 µm)</div>
              <div className="text-[11px] text-ops-text-dim mt-0.5">Measures cloud-top temperatures 24/7. Colder tops indicate tall thunderstorm clouds driving cyclone strength.</div>
            </div>

            <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
              <div className="font-bold text-purple-600 font-mono text-[11px]">WV WATER VAPOUR (6.7 µm)</div>
              <div className="text-[11px] text-ops-text-dim mt-0.5">Detects moisture in the upper atmosphere, helping track wind currents that push the cyclone forward.</div>
            </div>

            <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
              <div className="font-bold text-ops-amber font-mono text-[11px]">ENHANCED BD-CURVE (THERMAL HIGHLIGHT)</div>
              <div className="text-[11px] text-ops-text-dim mt-0.5">Color-codes cloud temperatures to clearly highlight the eye center and the most intense feeder bands.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable FAQs Section */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-6 shadow-ops-card space-y-4">
        <div className="text-xs font-bold text-ops-text uppercase font-sans border-b border-ops-border-subtle pb-3">
          COMMONLY ASKED QUESTIONS
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div key={idx} className="border border-ops-border rounded-lg bg-ops-card-sub/60 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full text-left p-3.5 flex items-center justify-between text-xs font-bold text-ops-text hover:text-ops-cyan transition-colors cursor-pointer"
                >
                  <span className="font-sans">{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-ops-cyan" /> : <ChevronDown className="w-4 h-4 text-ops-text-muted" />}
                </button>
                {isExpanded && (
                  <div className="p-3.5 pt-0 text-xs text-ops-text-dim font-sans leading-relaxed border-t border-ops-border-subtle">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Helpline Contacts */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-5 shadow-ops-card text-xs font-mono">
        <div className="text-[10px] font-bold tracking-widest text-ops-text-muted uppercase mb-2.5 flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-ops-green" />
          <span>EMERGENCY DISASTER HELPLINES</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-ops-text">
          <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
            <div className="text-ops-cyan font-bold">National Emergency Helpline</div>
            <div className="text-[11px] text-ops-text-muted mt-0.5 font-bold">112 (Toll Free)</div>
          </div>
          <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
            <div className="text-ops-amber font-bold">National Disaster Response (NDRF)</div>
            <div className="text-[11px] text-ops-text-muted mt-0.5 font-bold">1078 / 011-24363260</div>
          </div>
          <div className="bg-ops-card-sub p-3 rounded-lg border border-ops-border">
            <div className="text-ops-green font-bold">Cyclone Warning Division (IMD)</div>
            <div className="text-[11px] text-ops-text-muted mt-0.5">011-24652484</div>
          </div>
        </div>
      </div>
    </div>
  );
};
