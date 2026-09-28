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
      <div className="bg-ops-card border border-ops-border rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-ops-cyan uppercase font-bold">
            HISTORICAL TROPICAL CYCLONE BEST-TRACK ARCHIVE (IBTrACS & IMD)
          </div>
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider font-sans mt-0.5">
            Operational Cyclone Intelligence Database
          </h2>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-slate-900/90 border border-ops-border px-3 py-1.5 rounded">
            <div className="text-slate-400 text-[10px]">TOTAL ARCHIVED</div>
            <div className="text-ops-cyan font-bold text-sm">13,500+</div>
          </div>
          <div className="bg-slate-900/90 border border-ops-border px-3 py-1.5 rounded">
            <div className="text-slate-400 text-[10px]">AI VALIDATION SCORE</div>
            <div className="text-ops-green font-bold text-sm">96.8%</div>
          </div>
          <div className="bg-slate-900/90 border border-ops-border px-3 py-1.5 rounded">
            <div className="text-slate-400 text-[10px]">TRACK ERROR (24H)</div>
            <div className="text-ops-amber font-bold text-sm">±34 km</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-ops-card border border-ops-border rounded p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[300px]">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cyclone name, basin, or landfall..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded bg-slate-900 border border-ops-border text-slate-200 placeholder-slate-500 focus:outline-none focus:border-ops-cyan"
            />
          </div>

          {/* Basin Filter */}
          <select
            value={selectedBasin}
            onChange={(e) => setSelectedBasin(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-slate-900 border border-ops-border text-slate-300 focus:outline-none focus:border-ops-cyan"
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
            className="px-2.5 py-1.5 rounded bg-slate-900 border border-ops-border text-slate-300 focus:outline-none focus:border-ops-cyan"
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
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-ops-border transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT BEST-TRACK CSV</span>
        </button>
      </div>

      {/* Historical Records Table */}
      <div className="bg-ops-card border border-ops-border rounded overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-ops-border uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">CYCLONE IDENTIFIER</th>
                <th className="py-2.5 px-3">BASIN / DATES</th>
                <th className="py-2.5 px-3">PEAK INTENSITY</th>
                <th className="py-2.5 px-3 text-right">MAX WIND</th>
                <th className="py-2.5 px-3 text-right">MIN PRESSURE</th>
                <th className="py-2.5 px-3 text-right">ACE</th>
                <th className="py-2.5 px-3">LANDFALL TARGET</th>
                <th className="py-2.5 px-3 text-center">AI SCORE</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ops-border-subtle">
              {filteredStorms.map((storm) => (
                <tr 
                  key={storm.id}
                  onClick={() => handleOpenDetail(storm.id)}
                  className="hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  {/* Cyclone Name & Code */}
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-100 group-hover:text-ops-cyan transition-colors">
                      {storm.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{storm.code}</div>
                  </td>

                  {/* Basin & Dates */}
                  <td className="py-3 px-3">
                    <div className="text-slate-200">{storm.basin}</div>
                    <div className="text-[10px] text-slate-400">{storm.dates}</div>
                  </td>

                  {/* Peak Intensity */}
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 text-ops-amber border border-ops-amber/30 text-[10px] font-bold">
                      {storm.peakIntensity}
                    </span>
                  </td>

                  {/* Max Wind */}
                  <td className="py-3 px-3 text-right font-bold text-ops-amber">
                    {formatWind(storm.maxWindKts)}
                  </td>

                  {/* Min Pressure */}
                  <td className="py-3 px-3 text-right font-bold text-ops-cyan">
                    {formatPressure(storm.minPressureHpa)}
                  </td>

                  {/* ACE */}
                  <td className="py-3 px-3 text-right text-slate-300 font-bold">
                    {storm.ace}
                  </td>

                  {/* Landfall */}
                  <td className="py-3 px-3 text-slate-300 max-w-[180px] truncate">
                    {storm.landfallLocation}
                  </td>

                  {/* AI Validation Score */}
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-ops-green border border-emerald-800 font-bold text-[10px]">
                      {storm.aiValidationScore}%
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(storm.id);
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-ops-cyan hover:text-slate-950 text-slate-300 text-[10px] font-bold transition-colors inline-flex items-center gap-1"
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
      </div>
    </div>
  );
};
