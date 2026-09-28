import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { AlertMarquee } from './AlertMarquee';
import { useCyclone } from '../../context/CycloneContext';

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedCyclone } = useCyclone();

  return (
    <div className="flex h-screen w-screen bg-ops-bg text-slate-100 overflow-hidden font-sans">
      {/* Left Mission Control Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopHeader />
        <AlertMarquee />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-[#080c14] relative">
          {children}
        </main>
      </div>
    </div>
  );
};
