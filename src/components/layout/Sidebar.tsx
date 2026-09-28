import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Cpu, 
  Layers, 
  Archive, 
  AlertTriangle, 
  Database, 
  BrainCircuit, 
  Activity, 
  HelpCircle, 
  Settings,
  Radio,
  ShieldCheck,
  X
} from 'lucide-react';
import { useCyclone, ActivePage } from '../../context/CycloneContext';

interface NavItem {
  id: ActivePage;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: 'red' | 'cyan' | 'amber';
}

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, alerts, isMobileMenuOpen, setIsMobileMenuOpen } = useCyclone();

  const unacknowledgedAlertsCount = alerts.filter(a => !a.isAcknowledged).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'OVERVIEW & SAFETY', icon: LayoutDashboard },
    { id: 'live-map', label: 'LIVE CYCLONE MAP', icon: Map },
    { id: 'analysis', label: 'AI/ML ANALYSIS', icon: Cpu },
    { id: 'imagery', label: 'SATELLITE IMAGERY', icon: Layers },
    { id: 'archive', label: 'CYCLONE ARCHIVE', icon: Archive },
    { 
      id: 'alerts', 
      label: 'SAFETY ALERTS', 
      icon: AlertTriangle, 
      badge: unacknowledgedAlertsCount > 0 ? unacknowledgedAlertsCount : undefined,
      badgeColor: 'red'
    },
    { id: 'data-sources', label: 'DATA SOURCES', icon: Database },
    { id: 'models', label: 'AI MODELS', icon: BrainCircuit },
    { id: 'system', label: 'PIPELINE STATUS', icon: Activity },
    { id: 'help', label: 'HELP & GUIDES', icon: HelpCircle },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  const handleNavClick = (id: ActivePage) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Content (Desktop Static + Mobile Drawer) */}
      <aside 
        className={`
          w-64 bg-ops-sidebar border-r border-ops-border flex flex-col justify-between h-screen sticky top-0 select-none z-50 flex-shrink-0 transition-all duration-300 shadow-sm
          max-lg:fixed max-lg:top-0 max-lg:bottom-0 max-lg:left-0 max-lg:z-50 max-lg:h-full
          ${isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div>
          <div className="p-4 border-b border-ops-border flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ops-amber to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 relative overflow-hidden flex-shrink-0">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-wider text-ops-text font-sans">
                    CYCLONE<span className="text-ops-amber">OPS</span>
                  </span>
                </div>
                <div className="text-[9px] font-mono tracking-widest text-ops-text-muted uppercase truncate">
                  CYCLONE INTELLIGENCE & SAFETY
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-ops-text-muted hover:text-ops-text hover:bg-ops-card-sub lg:hidden cursor-pointer"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation List */}
          <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-145px)]">
            <div className="px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest text-ops-text-muted uppercase">
              NAVIGATION
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || (item.id === 'archive' && currentPage === 'archive-detail');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-semibold tracking-wide transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-ops-cyan/10 text-ops-cyan border border-ops-cyan/30 shadow-sm font-bold'
                      : 'text-ops-text-muted hover:text-ops-text hover:bg-ops-card-hover border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      isActive ? 'text-ops-cyan' : 'text-ops-text-muted group-hover:text-ops-text'
                    }`} />
                    <span className="truncate font-sans text-[11px] uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-red-500/10 text-red-500 border border-red-500/30 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-ops-cyan" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Community Station Footer Card */}
        <div className="p-3 border-t border-ops-border bg-ops-card-sub/60">
          <div className="flex items-center gap-3 p-2.5 rounded-md bg-ops-card border border-ops-border shadow-sm">
            <div className="w-8 h-8 rounded-full bg-ops-cyan/10 border border-ops-cyan/30 flex items-center justify-center text-xs font-mono font-bold text-ops-cyan flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-ops-cyan" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-ops-text truncate font-sans tracking-tight">
                PUBLIC MONITORING
              </div>
              <div className="text-[10px] font-mono text-ops-text-muted truncate">
                BAY OF BENGAL · INDIA REGION
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
