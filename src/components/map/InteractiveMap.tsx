import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  Radio, 
  Compass, 
  Wind, 
  Eye, 
  Navigation,
  Crosshair,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useCyclone, TIMELINE_STEPS } from '../../context/CycloneContext';

interface InteractiveMapProps {
  heightClassName?: string;
  showFullControls?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  heightClassName = 'h-[620px]',
  showFullControls = true
}) => {
  const { 
    selectedCyclone, 
    timelineStep, 
    setTimelineStep, 
    isPlayingSimulation, 
    setIsPlayingSimulation,
    mapLayers,
    toggleMapLayer,
    formatWind,
    formatPressure
  } = useCyclone();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const [mouseCoords, setMouseCoords] = useState<{ lat: string; lng: string }>({ lat: '23.4° N', lng: '122.1° E' });

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse drag panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      // Approximate coordinates based on active cyclone basin
      const baseLat = selectedCyclone.basin === 'Western Pacific' ? 24 : 18;
      const baseLng = selectedCyclone.basin === 'Western Pacific' ? 122 : 88;
      
      const calcLat = (baseLat + (0.5 - relY) * 15).toFixed(1);
      const calcLng = (baseLng + (relX - 0.5) * 15).toFixed(1);
      setMouseCoords({
        lat: `${Math.abs(Number(calcLat))}° ${Number(calcLat) >= 0 ? 'N' : 'S'}`,
        lng: `${Math.abs(Number(calcLng))}° ${Number(calcLng) >= 0 ? 'E' : 'W'}`
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.max(0.7, Math.min(2.5, prev + delta)));
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Coords mapping for SVG based on basin
  const isWPAC = selectedCyclone.basin === 'Western Pacific';

  return (
    <div 
      ref={containerRef}
      className={`relative bg-[#070b13] border border-ops-border rounded overflow-hidden select-none cursor-crosshair ${heightClassName}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Radar / Lat-Long Grid */}
      <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />

      {/* Satellite Imagery / Multi-Spectral Simulation Texture */}
      {mapLayers.infrared && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-screen pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(circle at ${50 + panOffset.x * 0.05}% ${45 + panOffset.y * 0.05}%, rgba(249, 115, 22, 0.35) 0%, rgba(2, 132, 199, 0.25) 35%, rgba(8, 12, 20, 0) 70%)`
          }}
        />
      )}

      {mapLayers.waterVapour && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-color-dodge pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage: `radial-gradient(ellipse at 52% 42%, rgba(168, 85, 247, 0.4) 0%, rgba(56, 189, 248, 0.2) 40%, transparent 75%)`
          }}
        />
      )}

      {/* SVG GIS Layer (Landmasses, Lat/Long Lines, Tracks, Cones, Eyewall) */}
      <svg 
        className="w-full h-full absolute inset-0 pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center'
        }}
        viewBox="0 0 1000 600"
      >
        <defs>
          {/* Probability Cone Gradient */}
          <linearGradient id="coneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.08" />
          </linearGradient>

          {/* Radar Sweep Pattern */}
          <radialGradient id="radarSweepGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
          </radialGradient>

          {/* Filter for glowing tracks */}
          <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Latitude / Longitude Grid Markings (Matching @reference.png: 120°E, 125°E, 130°E, 20°N, 25°N) */}
        <g stroke="#1a2b48" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.65">
          <line x1="200" y1="0" x2="200" y2="600" />
          <line x1="450" y1="0" x2="450" y2="600" />
          <line x1="700" y1="0" x2="700" y2="600" />
          <line x1="950" y1="0" x2="950" y2="600" />
          
          <line x1="0" y1="120" x2="1000" y2="120" />
          <line x1="0" y1="300" x2="1000" y2="300" />
          <line x1="0" y1="480" x2="1000" y2="480" />
        </g>

        {/* Coordinate Labels */}
        <g fill="#475569" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
          <text x="205" y="585">120°E</text>
          <text x="455" y="585">125°E</text>
          <text x="705" y="585">130°E</text>
          <text x="955" y="585">135°E</text>

          <text x="10" y="115">30°N</text>
          <text x="10" y="295">25°N</text>
          <text x="10" y="475">20°N</text>
        </g>

        {/* Vector Coastlines & Island Outlines */}
        {isWPAC ? (
          <g fill="#0b172a" stroke="#22395d" strokeWidth="1.2" opacity="0.9">
            {/* Taiwan Island */}
            <path d="M 480,240 Q 510,260 500,320 Q 480,360 460,340 Q 450,290 480,240 Z" />
            <text x="510" y="290" fill="#64748b" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">TAIWAN</text>

            {/* Luzon / Philippines */}
            <path d="M 430,420 Q 470,440 480,510 Q 460,560 430,580 Q 410,520 415,450 Z" />
            <text x="440" y="480" fill="#475569" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">LUZON</text>
            <text x="420" y="530" fill="#334155" fontSize="12" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">PHILIPPINES</text>

            {/* Okinawa & Ryukyu Chain */}
            <path d="M 680,180 Q 690,185 685,195 Z M 640,210 Q 650,215 645,225 Z M 600,235 Q 610,240 605,248 Z" />
            <text x="690" y="195" fill="#475569" fontSize="9" fontFamily="sans-serif">OKINAWA</text>
            <text x="605" y="260" fill="#475569" fontSize="8" fontFamily="sans-serif">MIYAKO</text>
            <text x="730" y="130" fill="#334155" fontSize="9" fontFamily="sans-serif">KYUSHU</text>

            {/* Sea Regions */}
            <text x="350" y="470" fill="#1e293b" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">SOUTH CHINA SEA</text>
            <text x="650" y="440" fill="#1e293b" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">PHILIPPINE SEA</text>
          </g>
        ) : (
          <g fill="#0b172a" stroke="#22395d" strokeWidth="1.2" opacity="0.9">
            {/* Indian East Coast / Odisha / Bengal / Andhra */}
            <path d="M 150,100 L 250,150 L 320,240 L 380,310 L 400,380 L 430,480 L 390,560 L 300,590 L 100,590 Z" />
            <text x="240" y="240" fill="#64748b" fontSize="12" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">ODISHA</text>
            <text x="320" y="160" fill="#64748b" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1.5">WEST BENGAL</text>
            <text x="280" y="380" fill="#475569" fontSize="10" fontFamily="sans-serif" fontWeight="bold">ANDHRA COAST</text>
            <text x="560" y="360" fill="#1e293b" fontSize="12" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">BAY OF BENGAL</text>
          </g>
        )}

        {/* Coastal Recon & Fleet Markers (CVN-76, PLAAF, RADAR ACTV) */}
        <g fill="#00f0ff" fontSize="9" fontFamily="JetBrains Mono" opacity="0.8">
          <circle cx="680" cy="460" r="3" fill="#00f0ff" />
          <text x="690" y="463">CVN-76</text>

          <circle cx="490" cy="380" r="2.5" fill="#f97316" />
          <text x="498" y="383" fill="#94a3b8">PLAAF</text>

          <circle cx="460" cy="235" r="3" fill="#22c55e" />
          <text x="470" y="238" fill="#22c55e">ISLAND GATEWAY</text>
        </g>

        {/* Wind Field Vectors Overlay (Matching @reference.png: WIND FIELD) */}
        {mapLayers.windField && (
          <g stroke="#0284c7" strokeWidth="0.8" opacity="0.45" strokeLinecap="round">
            {/* Swirling wind vectors around eye */}
            <path d="M 540,290 Q 560,250 510,220" markerEnd="url(#arrow)" />
            <path d="M 510,220 Q 450,230 440,280" />
            <path d="M 440,280 Q 450,340 500,340" />
            <path d="M 500,340 Q 570,330 550,270" />
            <path d="M 580,310 Q 610,230 520,190" />
            <path d="M 420,260 Q 430,380 520,380" />
          </g>
        )}

        {/* Probability Forecast Cone of Uncertainty (Matching @reference.png) */}
        {mapLayers.uncertaintyCone && (
          <g>
            <path 
              d="M 510,280 L 440,160 Q 400,120 340,90 L 290,140 Q 380,210 470,285 Z"
              fill="url(#coneGradient)"
              stroke="#ea580c"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.8"
            />
            <text x="460" y="170" fill="#ea580c" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
              PROBABILITY FORECAST CONE
            </text>
          </g>
        )}

        {/* Landfall Target Zone & Range Buffers (Matching @reference.png: LANDFALL TARGET ZONE ETA 18h) */}
        <g>
          {/* Threat circles */}
          <circle 
            cx="480" 
            cy="210" 
            r="45" 
            fill="none" 
            stroke="#f97316" 
            strokeWidth="1.5" 
            strokeDasharray="4,4"
            className="pulse-animation"
          />
          <circle cx="480" cy="210" r="75" fill="rgba(249,115,22,0.06)" stroke="#ea580c" strokeWidth="0.8" strokeDasharray="2,3" />
          
          <circle cx="480" cy="210" r="4" fill="#f97316" />
          <text x="495" y="213" fill="#f97316" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
            ● LANDFALL TARGET ZONE (ETA 18h)
          </text>
          <text x="495" y="225" fill="#94a3b8" fontSize="8" fontFamily="JetBrains Mono">
            R: 50km Severe Winds Buffer
          </text>
        </g>

        {/* Historical Track (Cyan Solid Path with Waypoints T-48h, T-24h) */}
        {mapLayers.historicalTrack && (
          <g filter="url(#glowCyan)">
            <path 
              d="M 680,480 L 590,390 L 510,280" 
              fill="none" 
              stroke="#00f0ff" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Waypoints */}
            <g>
              {/* T-48h point */}
              <circle 
                cx="680" 
                cy="480" 
                r="4.5" 
                fill="#080c14" 
                stroke="#00f0ff" 
                strokeWidth="2" 
                className="pointer-events-auto cursor-pointer hover:r-6"
                onMouseEnter={() => setHoveredPoint({ label: 'T-48h Point', wind: '65 KTS', pressure: '985 hPa', pos: '17.5°N, 126.8°E' })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <text x="692" y="484" fill="#00f0ff" fontSize="9" fontFamily="JetBrains Mono">T-48h</text>

              {/* T-24h point */}
              <circle 
                cx="590" 
                cy="390" 
                r="4.5" 
                fill="#080c14" 
                stroke="#00f0ff" 
                strokeWidth="2"
                className="pointer-events-auto cursor-pointer hover:r-6"
                onMouseEnter={() => setHoveredPoint({ label: 'T-24h Point', wind: '105 KTS', pressure: '952 hPa', pos: '20.8°N, 124.2°E' })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <text x="602" y="394" fill="#00f0ff" fontSize="9" fontFamily="JetBrains Mono">T-24h</text>
            </g>
          </g>
        )}

        {/* Future Forecast Track (Orange Dashed Path with Waypoints T+12h, T+24h, T+48h) */}
        {mapLayers.forecastTrack && (
          <g>
            <path 
              d="M 510,280 L 450,190 L 390,130 L 330,80" 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="2" 
              strokeDasharray="5,4" 
            />

            {/* Forecast Waypoints */}
            <circle cx="450" cy="190" r="4" fill="#080c14" stroke="#f97316" strokeWidth="2" />
            <text x="460" y="190" fill="#f97316" fontSize="9" fontFamily="JetBrains Mono">T+12h</text>

            <circle cx="390" cy="130" r="3.5" fill="#080c14" stroke="#f97316" strokeWidth="1.5" />
            <text x="400" y="130" fill="#f97316" fontSize="8" fontFamily="JetBrains Mono">T+24h</text>

            <circle cx="330" cy="80" r="3" fill="#080c14" stroke="#ea580c" strokeWidth="1.5" />
            <text x="340" y="80" fill="#ea580c" fontSize="8" fontFamily="JetBrains Mono">T+48h</text>
          </g>
        )}

        {/* Current Active Cyclone Eye Location (Pulsing Radar Target at 510, 280) */}
        <g className="pointer-events-auto cursor-pointer" onClick={() => resetView()}>
          {/* Eyewall radius circle */}
          <circle cx="510" cy="280" r="28" fill="rgba(0, 240, 255, 0.08)" stroke="#00f0ff" strokeWidth="1.2" />
          
          {/* Target crosshairs */}
          <line x1="510" y1="245" x2="510" y2="315" stroke="#f97316" strokeWidth="1.5" />
          <line x1="475" y1="280" x2="545" y2="280" stroke="#f97316" strokeWidth="1.5" />

          {/* Eye center beacon */}
          <circle cx="510" cy="280" r="6" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="510" cy="280" r="14" fill="none" stroke="#f97316" strokeWidth="1" className="pulse-animation" />

          {/* Eye Tag Label */}
          <rect x="525" y="270" width="165" height="24" rx="2" fill="#090f1a" stroke="#1d2f4e" strokeWidth="1" />
          <text x="532" y="284" fill="#ffffff" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
            {selectedCyclone.name} ({selectedCyclone.code})
          </text>
          <text x="532" y="291" fill="#00f0ff" fontSize="8" fontFamily="JetBrains Mono">
            {selectedCyclone.currentPosition.coordinatesFormatted} · {selectedCyclone.maxSustainedWindKts} KTS
          </text>
        </g>
      </svg>

      {/* TOP LEFT HUD: Region Coordinates & Status (Matching @reference.png) */}
      <div className="absolute top-3 left-3 bg-ops-card/90 border border-ops-border rounded p-2.5 text-xs font-mono backdrop-blur-md shadow-xl z-10 select-none">
        <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-ops-border-subtle">
          <Crosshair className="w-3.5 h-3.5 text-ops-cyan" />
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            REGION: {isWPAC ? 'WEST PACIFIC (WPAC)' : 'BAY OF BENGAL (BOB)'}
          </span>
        </div>
        <div className="space-y-0.5 text-[10px] text-ops-text-dim">
          <div>LAT: <span className="text-slate-200 font-bold">{isWPAC ? '20°N - 30°N' : '12°N - 24°N'}</span></div>
          <div>LONG: <span className="text-slate-200 font-bold">{isWPAC ? '120°E - 130°E' : '80°E - 95°E'}</span></div>
          <div className="flex items-center gap-1.5 pt-0.5">
            <span>STATUS:</span>
            <span className="text-ops-cyan font-bold tracking-widest animate-pulse">ACTIVE SCAN</span>
          </div>
          <div className="text-[9px] text-slate-500 pt-0.5">
            CURSOR: {mouseCoords.lat}, {mouseCoords.lng}
          </div>
        </div>
      </div>

      {/* TOP RIGHT HUD: Map Layer Controls Index (Matching @reference.png: MAP SAT-LAYER INDEX) */}
      <div className="absolute top-3 right-3 bg-ops-card/90 border border-ops-border rounded p-2.5 text-xs backdrop-blur-md shadow-xl z-10 w-52 select-none">
        <div className="text-[9px] font-mono font-bold tracking-widest text-ops-text-muted uppercase mb-2">
          MAP SAT-LAYER INDEX
        </div>
        <div className="space-y-1.5">
          {/* Infrared IR */}
          <button
            onClick={() => toggleMapLayer('infrared')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[10px] font-mono font-bold border transition-colors ${
              mapLayers.infrared 
                ? 'bg-slate-800 text-ops-cyan border-ops-cyan/40' 
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Eye className="w-3 h-3" />
              <span>INFRARED (IR)</span>
            </div>
            <span className={`text-[9px] px-1 py-0.2 rounded ${mapLayers.infrared ? 'bg-cyan-950 text-ops-cyan' : 'text-slate-600'}`}>
              {mapLayers.infrared ? 'ACTIVE' : 'OFF'}
            </span>
          </button>

          {/* Water Vapour WV */}
          <button
            onClick={() => toggleMapLayer('waterVapour')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[10px] font-mono font-bold border transition-colors ${
              mapLayers.waterVapour 
                ? 'bg-slate-800 text-purple-400 border-purple-500/40' 
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Layers className="w-3 h-3" />
              <span>WATER VAPOUR (WV)</span>
            </div>
            <span className={`text-[9px] px-1 py-0.2 rounded ${mapLayers.waterVapour ? 'bg-purple-950 text-purple-400' : 'text-slate-600'}`}>
              {mapLayers.waterVapour ? 'ACTIVE' : 'OFF'}
            </span>
          </button>

          {/* Doppler Radar Matrix */}
          <button
            onClick={() => toggleMapLayer('radarMatrix')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[10px] font-mono font-bold border transition-colors ${
              mapLayers.radarMatrix 
                ? 'bg-slate-800 text-ops-cyan border-ops-cyan/40' 
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Radio className="w-3 h-3" />
              <span>RADAR MATRIX</span>
            </div>
            <span className={`text-[9px] px-1 py-0.2 rounded ${mapLayers.radarMatrix ? 'bg-cyan-950 text-ops-cyan' : 'text-slate-600'}`}>
              {mapLayers.radarMatrix ? 'ACTIVE' : 'OFF'}
            </span>
          </button>

          {/* Wind Field Vectors */}
          <button
            onClick={() => toggleMapLayer('windField')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[10px] font-mono font-bold border transition-colors ${
              mapLayers.windField 
                ? 'bg-slate-800 text-sky-400 border-sky-500/40' 
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Wind className="w-3 h-3" />
              <span>WIND FIELD</span>
            </div>
            <span className={`text-[9px] px-1 py-0.2 rounded ${mapLayers.windField ? 'bg-sky-950 text-sky-400' : 'text-slate-600'}`}>
              {mapLayers.windField ? 'ACTIVE' : 'OFF'}
            </span>
          </button>

          {/* Forecast Cone */}
          <button
            onClick={() => toggleMapLayer('uncertaintyCone')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-[10px] font-mono font-bold border transition-colors ${
              mapLayers.uncertaintyCone 
                ? 'bg-slate-800 text-ops-amber border-ops-amber/40' 
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3" />
              <span>FORECAST CONE</span>
            </div>
            <span className={`text-[9px] px-1 py-0.2 rounded ${mapLayers.uncertaintyCone ? 'bg-amber-950 text-ops-amber' : 'text-slate-600'}`}>
              {mapLayers.uncertaintyCone ? 'ACTIVE' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Hover Waypoint Tooltip Popup */}
      {hoveredPoint && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-ops-card/95 border border-ops-cyan p-2.5 rounded shadow-2xl text-xs font-mono z-20 pointer-events-none">
          <div className="font-bold text-ops-cyan mb-1">{hoveredPoint.label}</div>
          <div className="text-slate-300">Position: <span className="text-white font-bold">{hoveredPoint.pos}</span></div>
          <div className="text-slate-300">Wind: <span className="text-ops-amber font-bold">{hoveredPoint.wind}</span></div>
          <div className="text-slate-300">Pressure: <span className="text-ops-cyan font-bold">{hoveredPoint.pressure}</span></div>
        </div>
      )}

      {/* BOTTOM HUD: System Status, Temporal Simulation Bar, Alert Level (Matching @reference.png center panel) */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-4 z-10">
        {/* Left Status */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-ops-card/90 border border-ops-border rounded text-[10px] font-mono font-bold backdrop-blur-md">
          <span className="text-slate-400">SYSTEM STATUS:</span>
          <span className="text-ops-green font-bold">ONLINE</span>
        </div>

        {/* Center Temporal Simulation Mode Bar (Matching @reference.png) */}
        {showFullControls && (
          <div className="flex-1 max-w-2xl bg-ops-card/95 border border-ops-border rounded-md px-3 py-2 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between text-[9px] font-mono uppercase mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-widest text-ops-cyan">TEMPORAL SIMULATION MODE</span>
                <button
                  onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-ops-cyan text-[9px] flex items-center gap-1 border border-slate-700"
                >
                  {isPlayingSimulation ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
                  <span>{isPlayingSimulation ? 'PAUSE' : 'PLAY'}</span>
                </button>
              </div>
              <div className="text-slate-400">
                CURRENT TIMESTEP: <span className="text-ops-amber font-bold">{timelineStep} (REAL-TIME DATA)</span>
              </div>
            </div>

            {/* Stepper Ticks */}
            <div className="relative flex items-center justify-between pt-1 pb-0.5">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 rounded" />
              {TIMELINE_STEPS.map((step) => {
                const isSelected = timelineStep === step;
                const isLive = step.includes('LIVE');
                return (
                  <button
                    key={step}
                    onClick={() => setTimelineStep(step)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-3 h-3 rounded-full border-2 transition-transform ${
                      isSelected 
                        ? 'bg-ops-amber border-white scale-125 shadow-sm shadow-amber-500' 
                        : isLive 
                        ? 'bg-ops-cyan border-slate-900' 
                        : 'bg-slate-800 border-slate-600 group-hover:border-slate-400'
                    }`} />
                    <span className={`text-[9px] font-mono mt-1 font-semibold ${
                      isSelected ? 'text-ops-amber font-bold' : isLive ? 'text-ops-cyan' : 'text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Alert Level & Zoom Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-ops-card/90 border border-ops-border rounded text-[10px] font-mono font-bold backdrop-blur-md">
            <span className="text-slate-400">ALERT LEVEL:</span>
            <span className="text-ops-amber font-bold">DEFCON 3 / SEVERE</span>
          </div>

          <div className="flex items-center bg-ops-card/90 border border-ops-border rounded backdrop-blur-md">
            <button 
              onClick={() => handleZoom(0.2)}
              title="Zoom In"
              className="p-1.5 text-slate-300 hover:text-ops-cyan hover:bg-slate-800 rounded-l border-r border-ops-border-subtle"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => handleZoom(-0.2)}
              title="Zoom Out"
              className="p-1.5 text-slate-300 hover:text-ops-cyan hover:bg-slate-800 rounded-r"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
