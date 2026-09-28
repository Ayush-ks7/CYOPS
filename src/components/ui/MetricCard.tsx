import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  highlightColor?: 'orange' | 'cyan' | 'green' | 'red' | 'neutral';
  badge?: string;
  badgeVariant?: 'orange' | 'cyan' | 'green' | 'red';
  className?: string;
  children?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subtext,
  highlightColor = 'neutral',
  badge,
  badgeVariant = 'cyan',
  className = '',
  children
}) => {
  const getValColor = () => {
    switch (highlightColor) {
      case 'orange':
        return 'text-ops-amber';
      case 'cyan':
        return 'text-ops-cyan';
      case 'green':
        return 'text-ops-green';
      case 'red':
        return 'text-ops-red';
      default:
        return 'text-slate-100';
    }
  };

  const getBadgeClasses = () => {
    switch (badgeVariant) {
      case 'orange':
        return 'bg-amber-950/80 text-ops-amber border-ops-amber/30';
      case 'red':
        return 'bg-red-950/80 text-ops-red border-ops-red/30';
      case 'green':
        return 'bg-emerald-950/80 text-ops-green border-ops-green/30';
      case 'cyan':
      default:
        return 'bg-cyan-950/80 text-ops-cyan border-ops-cyan/30';
    }
  };

  return (
    <div className={`bg-ops-card border border-ops-border rounded-sm p-4 relative flex flex-col justify-between hover:border-ops-border-light transition-colors ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold tracking-wider text-ops-text-muted uppercase">
          {label}
        </span>
        {badge && (
          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-sm border ${getBadgeClasses()}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="my-1">
        <div className="flex items-baseline gap-1.5">
          <span className={`text-3xl font-extrabold tracking-tight font-sans ${getValColor()}`}>
            {value}
          </span>
          {unit && (
            <span className="text-xs font-mono font-medium text-ops-text-dim uppercase">
              {unit}
            </span>
          )}
        </div>
      </div>

      {subtext && (
        <div className="text-[11px] text-ops-text-dim mt-1 font-sans leading-tight">
          {subtext}
        </div>
      )}

      {children && (
        <div className="mt-3 pt-2 border-t border-ops-border-subtle">
          {children}
        </div>
      )}
    </div>
  );
};
