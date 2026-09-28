import React from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { AlertMarquee } from './AlertMarquee';
import { useCyclone } from '../../context/CycloneContext';

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-ops-bg text-ops-text overflow-hidden font-sans transition-colors">
      {/* Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopHeader />
        <AlertMarquee />

        {/* Scrollable Viewport with Hidden Scrollbar & Smooth Scroll */}
        <main 
          id="main-scroll-container" 
          className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-ops-bg relative transition-colors"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
