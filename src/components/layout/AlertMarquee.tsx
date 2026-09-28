import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { useCyclone } from '../../context/CycloneContext';

export const AlertMarquee: React.FC = () => {
  const { selectedCyclone, setCurrentPage, alerts, formatWind } = useCyclone();

  const activeAlert = alerts.find(a => !a.isAcknowledged) || alerts[0];

  if (!activeAlert) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 px-3 sm:px-4 py-1.5 flex items-center justify-between text-xs select-none transition-colors gap-2 overflow-hidden">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden">
        <span className="w-2 h-2 rounded-full bg-ops-amber animate-ping flex-shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-ops-amber uppercase flex-shrink-0">
          SAFETY ADVISORY:
        </span>
        <span className="text-ops-text text-xs truncate">
          <strong>{selectedCyclone.name}</strong> ({selectedCyclone.category}) approaching landfall <strong>{selectedCyclone.landfallEta}</strong> · Winds <strong>{formatWind(selectedCyclone.maxSustainedWindKts)}</strong> · Safety protocols for <strong>{selectedCyclone.landfallLocation}</strong>
        </span>
      </div>

      <button
        onClick={() => setCurrentPage('alerts')}
        className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-mono font-bold text-ops-amber hover:underline flex-shrink-0 cursor-pointer whitespace-nowrap"
      >
        <span>VIEW ADVISORY</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
