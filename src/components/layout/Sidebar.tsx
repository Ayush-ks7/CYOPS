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
  ChevronRight,
  Radio
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
  const { currentPage, setCurrentPage, alerts } = useCyclone();

  const unacknowledgedAlertsCount = alerts.filter(a => !a.isAcknowledged).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'live-map', label: 'LIVE MAP', icon: Map },
    { id: 'analysis', label: 'ANALYSIS', icon: Cpu },
    { id: 'imagery', label: 'SATELLITE IMAGERY', icon: Layers },
    { id: 'archive', label: 'CYCLONE ARCHIVE', icon: Archive },
    { 
      id: 'alerts', 
      label: 'ACTIVE ALERTS', 
      icon: AlertTriangle, 
      badge: unacknowledgedAlertsCount > 0 ? unacknowledgedAlertsCount : undefined,
      badgeColor: 'red'
    },
    { id: 'data-sources', label: 'DATA SOURCES', icon: Database },
    { id: 'models', label: 'MODEL INTELLIGENCE', icon: BrainCircuit },
    { id: 'system', label: 'SYSTEM STATUS', icon: Activity },
    { id: 'help', label: 'DOCUMENTATION', icon: HelpCircle },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-ops-sidebar border-r border-ops-border flex flex-col justify-between h-screen sticky top-0 select-none z-30 flex-shrink-0">
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-ops-border flex items-center gap-3">
          {/* Logo icon matching @reference.png */}
          <div className="w-9 h-9 rounded bg-gradient-to-br from-ops-amber to-orange-700 flex items-center justify-center shadow-lg shadow-amber-950/40 relative overflow-hidden flex-shrink-0">
            <Radio className="w-5 h-5 text-white" />
            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider text-white font-sans">
                CYCLONE<span className="text-ops-amber">OPS</span>
              </span>
            </div>
            <div className="text-[9px] font-mono tracking-widest text-ops-text-muted uppercase">
              SECURE MONITORING
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="px-3 py-1.5 text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
            OPERATIONAL DECK
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || (item.id === 'archive' && currentPage === 'archive-detail');

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs font-semibold tracking-wide transition-all group ${
                  isActive
                    ? 'bg-slate-800/80 text-ops-cyan border border-ops-cyan/30 shadow-ops-glow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? 'text-ops-cyan' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  <span className="truncate font-sans text-[11px] uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-red-950 text-red-400 border border-red-800 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-ops-cyan shadow-sm shadow-ops-cyan" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Duty Officer Profile Card */}
      <div className="p-3 border-t border-ops-border bg-ops-card-dark/70">
        <div className="flex items-center gap-3 p-2 rounded bg-ops-card border border-ops-border-subtle">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-mono font-bold text-ops-cyan overflow-hidden">
              RM
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-ops-green border-2 border-ops-sidebar" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-200 truncate font-sans tracking-tight">
              COL. R. MILLER
            </div>
            <div className="text-[10px] font-mono text-ops-text-muted truncate">
              DUTY CHIEF · DECK A
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
