import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { CycloneProvider, useCyclone } from './context/CycloneContext';
import { Shell } from './components/layout/Shell';
import { DashboardPage } from './pages/DashboardPage';
import { LiveMapPage } from './pages/LiveMapPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ImageryPage } from './pages/ImageryPage';
import { ArchivePage } from './pages/ArchivePage';
import { CycloneDetailPage } from './pages/CycloneDetailPage';
import { AlertsPage } from './pages/AlertsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { ModelsPage } from './pages/ModelsPage';
import { SystemPage } from './pages/SystemPage';
import { HelpPage } from './pages/HelpPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { currentPage } = useCyclone();

  // Initialize Lenis + GSAP Smooth Scrolling
  useEffect(() => {
    const scrollContainer = document.getElementById('main-scroll-container');
    const lenis = new Lenis({
      wrapper: scrollContainer || window,
      content: scrollContainer ? (scrollContainer.firstElementChild as HTMLElement) || scrollContainer : document.body,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [currentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'live-map':
        return <LiveMapPage />;
      case 'analysis':
        return <AnalysisPage />;
      case 'imagery':
        return <ImageryPage />;
      case 'archive':
        return <ArchivePage />;
      case 'archive-detail':
        return <CycloneDetailPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'data-sources':
        return <DataSourcesPage />;
      case 'models':
        return <ModelsPage />;
      case 'system':
        return <SystemPage />;
      case 'help':
        return <HelpPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return <Shell>{renderCurrentPage()}</Shell>;
};

export function App() {
  return (
    <CycloneProvider>
      <AppContent />
    </CycloneProvider>
  );
}

export default App;
