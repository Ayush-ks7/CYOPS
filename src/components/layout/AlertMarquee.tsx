import React from 'react';
import { AlertTriangle, ChevronRight, X } from 'lucide-react';
import { useCyclone } from '../../context/CycloneContext';

export const AlertMarquee: React.FC = () => {
  const { selectedCyclone, setCurrentPage, alerts } = useCyclone();

  const activeAlert = alerts.find(a => !a.isAcknowledged) || alerts[0];

  if (!activeAlert) return null;

  return (
    <div className="bg-amber-950/40 border-b border-ops-amber/40 px-4 py-1.5 flex items-center justify-between text-xs select-none">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span className="w-2 h-2 rounded-full bg-ops-amber animate-ping flex-shrink-0" />
        <span className="text-[11px] font-mono font-bold tracking-wider text-ops-amber uppercase flex-shrink-0">
          CYCLONE WARNING:
        </span>
        <span className="text-slate-200 text-xs truncate">
          {selectedCyclone.category} - {selectedCyclone.name} approaching landfall {selectedCyclone.landfallEta} · Max winds {selectedCyclone.maxSustainedWindKts} kts · Evacuation protocols initiated for coastal zones
        </span>
      </div>

      <button
        onClick={() => setCurrentPage('alerts')}
        className="flex items-center gap-1 text-[11px] font-mono text-ops-amber hover:text-white underline-offset-2 hover:underline ml-4 flex-shrink-0"
      >
        <span>DISPATCH BULLETIN</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
