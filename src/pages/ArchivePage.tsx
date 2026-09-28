import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ArrowUpRight, 
  Database, 
  SlidersHorizontal,
  ChevronRight,
  Download
} from 'lucide-react';
import { useCyclone } from '../context/CycloneContext';
import { HISTORICAL_CYCLONES_ARCHIVE } from '../data/mockData';

export const ArchivePage: React.FC = () => {
  const { setCurrentPage, setDetailArchiveId, formatWind, formatPressure } = useCyclone();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBasin, setSelectedBasin] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');

  const filteredStorms = HISTORICAL_CYCLONES_ARCHIVE.filter(storm => {
    const matchesSearch = storm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          storm.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          storm.landfallLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBasin = selectedBasin === 'ALL' || storm.basin === selectedBasin;
    const matchesYear = selectedYear === 'ALL' || storm.year.toString() === selectedYear;
    return matchesSearch && matchesBasin && matchesYear;
  });

  const handleOpenDetail = (stormId: string) => {
    setDetailArchiveId(stormId);
    setCurrentPage('archive-detail');
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-8">
      {/* Header & Stats Banner */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-4 sm:p-5 shadow-ops-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 flex-shrink-0" />
            <span>HISTORICAL TROPICAL CYCLONE BEST-TRACK DATABASE</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-ops-text uppercase tracking-wider font-sans mt-0.5 break-words">
            Public Cyclone Records & Impact Catalog
          </h1>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3 text-xs font-mono">
          <div className="bg-ops-card-sub border border-ops-border px-2.5 sm:px-3 py-1.5 rounded-lg text-center sm:text-left">
            <div className="text-ops-text-muted text-[9px] sm:text-[10px]">ARCHIVED</div>
            <div className="text-ops-cyan font-bold text-xs sm:text-sm">13,500+</div>
          </div>
          <div className="bg-ops-card-sub border border-ops-border px-2.5 sm:px-3 py-1.5 rounded-lg text-center sm:text-left">
            <div className="text-ops-text-muted text-[9px] sm:text-[10px]">AI ACCURACY</div>
            <div className="text-ops-green font-bold text-xs sm:text-sm">96.8%</div>
          </div>
          <div className="bg-ops-card-sub border border-ops-border px-2.5 sm:px-3 py-1.5 rounded-lg text-center sm:text-left">
            <div className="text-ops-text-muted text-[9px] sm:text-[10px]">TRACK ERROR</div>
            <div className="text-ops-amber font-bold text-xs sm:text-sm">±34 km</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-ops-card border border-ops-border rounded-xl p-3 sm:p-3.5 shadow-ops-card flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2 flex-1 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-ops-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cyclone, basin, landfall..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-lg bg-ops-card-sub border border-ops-border text-ops-text placeholder-ops-text-muted focus:outline-none focus:border-ops-cyan transition-colors text-xs"
            />
          </div>

          {/* Basin Filter */}
          <select
            value={selectedBasin}
            onChange={(e) => setSelectedBasin(e.target.value)}
            className="px-2.5 sm:px-3 py-2 rounded-lg bg-ops-card-sub border border-ops-border text-ops-text focus:outline-none focus:border-ops-cyan text-xs cursor-pointer"
          >
            <option value="ALL">All Basins</option>
            <option value="Bay of Bengal">Bay of Bengal</option>
            <option value="Arabian Sea">Arabian Sea</option>
            <option value="Western Pacific">Western Pacific</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2.5 sm:px-3 py-2 rounded-lg bg-ops-card-sub border border-ops-border text-ops-text focus:outline-none focus:border-ops-cyan text-xs cursor-pointer"
          >
            <option value="ALL">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>

        <button 
          onClick={() => alert('Exporting full historical archive records in NetCDF / CSV format')}
          className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-ops-card-sub hover:bg-ops-card text-ops-cyan text-xs font-mono font-bold flex items-center justify-center gap-1.5 border border-ops-border transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT CSV</span>
        </button>
      </div>

      {/* Historical Records Table (Desktop Table + Mobile Cards) */}
      <div className="bg-ops-card border border-ops-border rounded-xl overflow-hidden shadow-ops-card">
        {/* Desktop / Tablet Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-ops-card-sub text-ops-text-muted border-b border-ops-border uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">CYCLONE NAME</th>
                <th className="py-3 px-4">BASIN / DATES</th>
                <th className="py-3 px-4">PEAK INTENSITY</th>
                <th className="py-3 px-4 text-right">MAX WIND</th>
                <th className="py-3 px-4 text-right">MIN PRESSURE</th>
                <th className="py-3 px-4 text-right">ACE</th>
                <th className="py-3 px-4">LANDFALL LOCATION</th>
                <th className="py-3 px-4 text-center">AI MATCH</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ops-border-subtle">
              {filteredStorms.map((storm) => (
                <tr 
                  key={storm.id}
                  onClick={() => handleOpenDetail(storm.id)}
                  className="hover:bg-ops-card-hover cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-ops-text group-hover:text-ops-cyan transition-colors">
                      {storm.name}
                    </div>
                    <div className="text-[10px] text-ops-text-muted">{storm.code}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-ops-text">{storm.basin}</div>
                    <div className="text-[10px] text-ops-text-muted">{storm.dates}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-ops-amber border border-amber-500/30 text-[10px] font-bold">
                      {storm.peakIntensity}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-ops-amber">
                    {formatWind(storm.maxWindKts)}
                  </td>

                  <td className="py-3.5 px-4 text-right font-bold text-ops-cyan">
                    {formatPressure(storm.minPressureHpa)}
                  </td>

                  <td className="py-3.5 px-4 text-right text-ops-text font-bold">
                    {storm.ace}
                  </td>

                  <td className="py-3.5 px-4 text-ops-text max-w-[180px] truncate">
                    {storm.landfallLocation}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-ops-green border border-emerald-500/30 font-bold text-[10px]">
                      {storm.aiValidationScore}%
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(storm.id);
                      }}
                      className="px-2.5 py-1 rounded bg-ops-card-sub hover:bg-ops-cyan hover:text-white text-ops-text text-[10px] font-bold border border-ops-border transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>DETAILS</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Card List (Under 768px) */}
        <div className="md:hidden divide-y divide-ops-border-subtle">
          {filteredStorms.map((storm) => (
            <div 
              key={storm.id}
              onClick={() => handleOpenDetail(storm.id)}
              className="p-4 hover:bg-ops-card-hover transition-colors space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-ops-text text-sm font-sans flex items-center gap-2">
                    <span>{storm.name}</span>
                    <span className="text-[10px] font-mono text-ops-text-muted">({storm.code})</span>
                  </div>
                  <div className="text-[10px] font-mono text-ops-cyan">{storm.basin} · {storm.dates}</div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-ops-amber border border-amber-500/30 text-[10px] font-mono font-bold">
                  {storm.peakIntensity}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-ops-card-sub p-2 rounded-lg text-center font-mono text-[10px] border border-ops-border">
                <div>
                  <div className="text-ops-text-muted text-[9px]">MAX WIND</div>
                  <div className="text-ops-amber font-bold">{formatWind(storm.maxWindKts)}</div>
                </div>
                <div>
                  <div className="text-ops-text-muted text-[9px]">PRESSURE</div>
                  <div className="text-ops-cyan font-bold">{formatPressure(storm.minPressureHpa)}</div>
                </div>
                <div>
                  <div className="text-ops-text-muted text-[9px]">AI MATCH</div>
                  <div className="text-ops-green font-bold">{storm.aiValidationScore}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-ops-text-dim pt-1">
                <span className="truncate max-w-[200px] text-[11px]">📍 {storm.landfallLocation}</span>
                <span className="text-[10px] font-mono font-bold text-ops-cyan flex items-center gap-0.5">
                  VIEW DOSSIER <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
