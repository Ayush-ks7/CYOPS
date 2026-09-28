export type CycloneCategory = 
  | 'Depression'
  | 'Deep Depression'
  | 'Cyclonic Storm'
  | 'Severe Cyclonic Storm'
  | 'Very Severe Cyclonic Storm'
  | 'Extremely Severe Cyclonic Storm'
  | 'Super Cyclonic Storm'
  | 'Category 1'
  | 'Category 2'
  | 'Category 3'
  | 'Category 4'
  | 'Category 5';

export interface CycloneTrackPoint {
  id: string;
  timestamp: string; // ISO or UTC string
  timeOffset: string; // e.g. "T-48h", "T-24h", "LIVE (T+0h)", "T+12h", "T+24h", "T+48h", "T+72h"
  lat: number;
  lng: number;
  windKts: number;
  pressureHpa: number;
  category: CycloneCategory;
  status: 'HISTORICAL' | 'OBSERVED' | 'LIVE' | 'FORECAST';
  confidence?: number;
  radiusKm?: number;
}

export interface EnsembleModelForecast {
  modelName: string; // "GFS", "ECMWF", "HWRF", "HMON", "IMD-MME", "VortexPINN"
  weight: number; // e.g. 0.40
  predictedWindKts: number;
  trackErrorKm: number;
  description: string;
  points: { timeOffset: string; windKts: number; pressureHpa: number; lat: number; lng: number }[];
}

export interface SatelliteFrame {
  id: string;
  satellite: 'INSAT-3D' | 'INSAT-3DR' | 'MOSDAC' | 'HIMAWARI-9' | 'NOAA-20';
  band: 'IR1 (10.8µm)' | 'IR2 (12.0µm)' | 'WV (6.7µm)' | 'VIS (0.65µm)' | 'Enhanced Thermal' | 'Doppler Radar';
  timestamp: string;
  coverage: string; // "North Indian Ocean (NIO)", "West Pacific (WPAC)"
  imageUrl: string;
  hasEyeDetected: boolean;
  eyeCoordinates?: { lat: number; lng: number };
  boundingBox?: { x: number; y: number; width: number; height: number };
  dvorakTNumber: string; // e.g. "T5.5"
  centralTempKelvin: number;
}

export interface CycloneData {
  id: string;
  name: string;
  code: string; // e.g. "WPAC-03" or "NIO-BOB-02"
  basin: 'North Indian Ocean (Bay of Bengal)' | 'North Indian Ocean (Arabian Sea)' | 'Western Pacific' | 'South Indian Ocean';
  category: CycloneCategory;
  categoryNumber: 1 | 2 | 3 | 4 | 5;
  isActive: boolean;
  status: 'ACTIVE_RECONNAISSANCE' | 'RAPID_INTENSIFICATION' | 'LANDFALL_WARNING' | 'POST_TROPICAL' | 'DISSIPATED';
  currentPosition: {
    lat: number;
    lng: number;
    coordinatesFormatted: string; // "23.4°N, 122.1°E"
  };
  landfallEta: string; // "ETA 18h"
  landfallLocation: string; // "Taiwan East Coast / Ishigakijima" or "Odisha-West Bengal Border"
  maxSustainedWindKts: number;
  windGustsKts: number;
  minCentralPressureHpa: number;
  pressureTrendHpaHr: number; // e.g. -3
  movementVector: {
    direction: string; // "NW"
    speedKts: number; // 12
    headingDegrees: number; // 305
  };
  eyeWallDiameterKm: number;
  eyeWallStructure: string; // "Highly defined, symmetrical eye"
  seaSurfaceTempC: number;
  seaSurfaceAnomalyC: number;
  windShearKts: number;
  windShearFavourability: 'Low Shear (favorable)' | 'Moderate Shear' | 'High Shear (hostile)';
  accumulatedCycloneEnergyACE: number;
  acePercentageOfNormal: number;
  forecastConeUncertaintyPct: number;
  forecastConfidence: 'HIGH' | 'MEDIUM' | 'LOW';
  
  // Track data
  trackHistory: CycloneTrackPoint[];
  forecastTrack: CycloneTrackPoint[];
  ensembleModels: EnsembleModelForecast[];

  // ML Analysis
  mlMetrics: {
    identificationConfidence: number; // 0.984
    classificationConfidence: number; // 0.942
    eyeLocalizationIoU: number; // 0.89
    dvorakTNo: string; // "T5.5 / CI 5.5"
    modelAgreement: {
      cat5Probability: number;
      cat4Probability: number;
      cat3Probability: number;
      cat2Probability: number;
    };
    inferenceTimeMs: number;
  };

  satelliteFrames: SatelliteFrame[];
  chiefMeteorologistAssessment: string;
}

export interface OperationalAlert {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'INFO';
  cycloneName: string;
  cycloneId: string;
  headline: string;
  description: string;
  location: string;
  triggerCondition: string;
  actionRequired: string;
  isAcknowledged: boolean;
  acknowledgedBy?: string;
  portWarningSignal?: number; // 1 to 11
}

export interface OperationalLogEvent {
  id: string;
  timestamp: string; // "14:32:10 UTC"
  severity: 'red' | 'amber' | 'cyan' | 'green';
  message: string;
  source: string; // "SYSTEM_OK", "RADAR_SWEEP", "NOAA_FEED", "RECON_AIRCRAFT"
}

export interface DataSourceStatus {
  id: string;
  name: string;
  agency: string; // "ISRO / MOSDAC", "IMD", "NOAA", "ECMWF", "INCOIS"
  type: 'Satellite Constellation' | 'Doppler Weather Radar' | 'Ocean Buoys & Argo' | 'Dynamical Numerical Models' | 'Historical Best Track';
  satelliteOrSensors: string;
  status: 'ONLINE' | 'DEGRADED' | 'MAINTENANCE';
  latencySeconds: number;
  lastIngestionTime: string;
  bandwidthMbps: number;
  coverage: string;
  observationsCount: string;
  endpoint: string;
}

export interface SystemServiceNode {
  id: string;
  name: string;
  serviceCategory: 'Ingestion' | 'Pipeline' | 'Storage' | 'AI Inference Core' | 'Queue' | 'API Gateway' | 'Spatial Database' | 'Telemetry Broadcast';
  technology: string; // "Airflow DAG", "MinIO S3", "PyTorch / TensorRT", "Redis / Celery", "FastAPI", "PostGIS", "WebSocket"
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  uptimePercentage: number;
  cpuUsagePct: number;
  memoryUsagePct: number;
  gpuUsagePct?: number;
  avgLatencyMs: number;
  recentEvents: string[];
}
