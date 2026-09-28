import React, { createContext, useContext, useState, useEffect } from 'react';
import { CycloneData, OperationalAlert, OperationalLogEvent } from '../types/cyclone';
import { 
  PRIMARY_ACTIVE_CYCLONE, 
  SECONDARY_ACTIVE_CYCLONE, 
  ALL_CYCLONES, 
  OPERATIONAL_ALERTS, 
  REALTIME_OPERATIONAL_LOGS 
} from '../data/mockData';

export type ActivePage = 
  | 'dashboard'
  | 'live-map'
  | 'analysis'
  | 'imagery'
  | 'archive'
  | 'archive-detail'
  | 'alerts'
  | 'data-sources'
  | 'models'
  | 'system'
  | 'help'
  | 'settings';

export type WindUnit = 'KTS' | 'KMH' | 'MS' | 'MPH';
export type PressureUnit = 'HPA' | 'MBAR' | 'INHG';

export interface MapLayerConfig {
  infrared: boolean;
  waterVapour: boolean;
  radarMatrix: boolean;
  windField: boolean;
  forecastTrack: boolean;
  historicalTrack: boolean;
  uncertaintyCone: boolean;
  coastalStations: boolean;
}

interface CycloneContextType {
  currentPage: ActivePage;
  setCurrentPage: (page: ActivePage) => void;
  selectedCyclone: CycloneData;
  setSelectedCyclone: (cyclone: CycloneData) => void;
  allActiveCyclones: CycloneData[];
  
  // Temporal simulation
  timelineStep: string; // 'T-48h' | 'T-24h' | 'T-12h' | 'LIVE (T+0h)' | 'T+12h' | 'T+24h' | 'T+48h' | 'T+72h'
  setTimelineStep: (step: string) => void;
  isPlayingSimulation: boolean;
  setIsPlayingSimulation: (playing: boolean) => void;
  
  // Map layers
  mapLayers: MapLayerConfig;
  toggleMapLayer: (layerKey: keyof MapLayerConfig) => void;
  
  // Alerts & logs
  alerts: OperationalAlert[];
  acknowledgeAlert: (alertId: string) => void;
  operationalLogs: OperationalLogEvent[];
  addOperationalLog: (message: string, severity: 'red' | 'amber' | 'cyan' | 'green') => void;
  
  // Archive drill-down target
  detailArchiveId: string | null;
  setDetailArchiveId: (id: string | null) => void;

  // Settings
  windUnit: WindUnit;
  setWindUnit: (unit: WindUnit) => void;
  pressureUnit: PressureUnit;
  setPressureUnit: (unit: PressureUnit) => void;
  dataRefreshIntervalSec: number;
  setDataRefreshIntervalSec: (sec: number) => void;
  soundAlertsEnabled: boolean;
  setSoundAlertsEnabled: (enabled: boolean) => void;
  
  // Real-time UTC clock string
  utcTimeString: string;

  // Helpers
  formatWind: (kts: number) => string;
  formatPressure: (hpa: number) => string;
}

const CycloneContext = createContext<CycloneContextType | undefined>(undefined);

export const TIMELINE_STEPS = [
  'T-48h',
  'T-24h',
  'T-12h',
  'LIVE (T+0h)',
  'T+12h',
  'T+24h',
  'T+48h',
  'T+72h'
];

export const CycloneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<ActivePage>('dashboard');
  const [selectedCyclone, setSelectedCyclone] = useState<CycloneData>(PRIMARY_ACTIVE_CYCLONE);
  const [allActiveCyclones] = useState<CycloneData[]>(ALL_CYCLONES);
  const [detailArchiveId, setDetailArchiveId] = useState<string | null>('amphan-2020');

  // Timeline
  const [timelineStep, setTimelineStep] = useState<string>('LIVE (T+0h)');
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);

  // Map Layers
  const [mapLayers, setMapLayers] = useState<MapLayerConfig>({
    infrared: true,
    waterVapour: false,
    radarMatrix: true,
    windField: true,
    forecastTrack: true,
    historicalTrack: true,
    uncertaintyCone: true,
    coastalStations: true,
  });

  const toggleMapLayer = (layerKey: keyof MapLayerConfig) => {
    setMapLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  // Alerts & Logs
  const [alerts, setAlerts] = useState<OperationalAlert[]>(OPERATIONAL_ALERTS);
  const [operationalLogs, setOperationalLogs] = useState<OperationalLogEvent[]>(REALTIME_OPERATIONAL_LOGS);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a =>
        a.id === alertId
          ? { ...a, isAcknowledged: true, acknowledgedBy: 'DUTY CHIEF (DECK A)' }
          : a
      )
    );
  };

  const addOperationalLog = (message: string, severity: 'red' | 'amber' | 'cyan' | 'green') => {
    const now = new Date();
    const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
    const newLog: OperationalLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      severity,
      message,
      source: 'SYSTEM_OK'
    };
    setOperationalLogs(prev => [newLog, ...prev.slice(0, 19)]);
  };

  // Settings
  const [windUnit, setWindUnit] = useState<WindUnit>('KTS');
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>('HPA');
  const [dataRefreshIntervalSec, setDataRefreshIntervalSec] = useState<number>(30);
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState<boolean>(true);

  // Clock
  const [utcTimeString, setUtcTimeString] = useState<string>('UTC 14:48:02');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTimeString(`UTC ${hours}:${mins}:${secs}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timeline auto-player
  useEffect(() => {
    if (!isPlayingSimulation) return;
    const timer = setInterval(() => {
      setTimelineStep(prev => {
        const currentIndex = TIMELINE_STEPS.indexOf(prev);
        const nextIndex = (currentIndex + 1) % TIMELINE_STEPS.length;
        return TIMELINE_STEPS[nextIndex];
      });
    }, 2200);
    return () => clearInterval(timer);
  }, [isPlayingSimulation]);

  // Unit conversion helpers
  const formatWind = (kts: number) => {
    switch (windUnit) {
      case 'KMH':
        return `${Math.round(kts * 1.852)} KM/H`;
      case 'MS':
        return `${Math.round(kts * 0.514444)} M/S`;
      case 'MPH':
        return `${Math.round(kts * 1.15078)} MPH`;
      case 'KTS':
      default:
        return `${kts} KTS`;
    }
  };

  const formatPressure = (hpa: number) => {
    switch (pressureUnit) {
      case 'INHG':
        return `${(hpa * 0.02953).toFixed(2)} inHg`;
      case 'MBAR':
        return `${hpa} mbar`;
      case 'HPA':
      default:
        return `${hpa} hPa`;
    }
  };

  return (
    <CycloneContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCyclone,
        setSelectedCyclone,
        allActiveCyclones,
        timelineStep,
        setTimelineStep,
        isPlayingSimulation,
        setIsPlayingSimulation,
        mapLayers,
        toggleMapLayer,
        alerts,
        acknowledgeAlert,
        operationalLogs,
        addOperationalLog,
        detailArchiveId,
        setDetailArchiveId,
        windUnit,
        setWindUnit,
        pressureUnit,
        setPressureUnit,
        dataRefreshIntervalSec,
        setDataRefreshIntervalSec,
        soundAlertsEnabled,
        setSoundAlertsEnabled,
        utcTimeString,
        formatWind,
        formatPressure
      }}
    >
      {children}
    </CycloneContext.Provider>
  );
};

export const useCyclone = () => {
  const context = useContext(CycloneContext);
  if (!context) {
    throw new Error('useCyclone must be used within a CycloneProvider');
  }
  return context;
};
