import { 
  CycloneData, 
  OperationalAlert, 
  OperationalLogEvent, 
  DataSourceStatus, 
  SystemServiceNode 
} from '../types/cyclone';

export const PRIMARY_ACTIVE_CYCLONE: CycloneData = {
  id: 'wpac-03-gaemi',
  name: 'TYPHOON GAEMI',
  code: 'WPAC-03',
  basin: 'Western Pacific',
  category: 'Category 4',
  categoryNumber: 4,
  isActive: true,
  status: 'ACTIVE_RECONNAISSANCE',
  currentPosition: {
    lat: 23.4,
    lng: 122.1,
    coordinatesFormatted: '23.4°N, 122.1°E'
  },
  landfallEta: 'ETA 18h',
  landfallLocation: 'Taiwan East Coast / Yilan County',
  maxSustainedWindKts: 125,
  windGustsKts: 150,
  minCentralPressureHpa: 930,
  pressureTrendHpaHr: -3,
  movementVector: {
    direction: 'NW',
    speedKts: 12,
    headingDegrees: 305
  },
  eyeWallDiameterKm: 28,
  eyeWallStructure: 'Highly defined, symmetrical eye with stadium effect',
  seaSurfaceTempC: 29.8,
  seaSurfaceAnomalyC: 1.2,
  windShearKts: 8.4,
  windShearFavourability: 'Low Shear (favorable)',
  accumulatedCycloneEnergyACE: 184.2,
  acePercentageOfNormal: 142,
  forecastConeUncertaintyPct: 22.5,
  forecastConfidence: 'HIGH',

  trackHistory: [
    {
      id: 'pt-t-48',
      timestamp: '2026-09-27T00:00:00Z',
      timeOffset: 'T-48h',
      lat: 17.5,
      lng: 126.8,
      windKts: 65,
      pressureHpa: 985,
      category: 'Category 1',
      status: 'HISTORICAL',
      radiusKm: 25
    },
    {
      id: 'pt-t-36',
      timestamp: '2026-09-27T12:00:00Z',
      timeOffset: 'T-36h',
      lat: 19.1,
      lng: 125.4,
      windKts: 85,
      pressureHpa: 970,
      category: 'Category 2',
      status: 'HISTORICAL',
      radiusKm: 28
    },
    {
      id: 'pt-t-24',
      timestamp: '2026-09-28T00:00:00Z',
      timeOffset: 'T-24h',
      lat: 20.8,
      lng: 124.2,
      windKts: 105,
      pressureHpa: 952,
      category: 'Category 3',
      status: 'HISTORICAL',
      radiusKm: 32
    },
    {
      id: 'pt-t-12',
      timestamp: '2026-09-28T12:00:00Z',
      timeOffset: 'T-12h',
      lat: 22.1,
      lng: 123.1,
      windKts: 118,
      pressureHpa: 940,
      category: 'Category 4',
      status: 'HISTORICAL',
      radiusKm: 35
    },
    {
      id: 'pt-t-0',
      timestamp: '2026-09-29T00:00:00Z',
      timeOffset: 'LIVE (T+0h)',
      lat: 23.4,
      lng: 122.1,
      windKts: 125,
      pressureHpa: 930,
      category: 'Category 4',
      status: 'LIVE',
      confidence: 0.984,
      radiusKm: 38
    }
  ],

  forecastTrack: [
    {
      id: 'pt-t-12-f',
      timestamp: '2026-09-29T12:00:00Z',
      timeOffset: 'T+12h',
      lat: 24.3,
      lng: 121.2,
      windKts: 130,
      pressureHpa: 925,
      category: 'Category 4',
      status: 'FORECAST',
      confidence: 0.92,
      radiusKm: 65
    },
    {
      id: 'pt-t-24-f',
      timestamp: '2026-09-30T00:00:00Z',
      timeOffset: 'T+24h',
      lat: 25.1,
      lng: 119.8,
      windKts: 110,
      pressureHpa: 948,
      category: 'Category 3',
      status: 'FORECAST',
      confidence: 0.88,
      radiusKm: 110
    },
    {
      id: 'pt-t-48-f',
      timestamp: '2026-10-01T00:00:00Z',
      timeOffset: 'T+48h',
      lat: 26.5,
      lng: 117.9,
      windKts: 60,
      pressureHpa: 988,
      category: 'Category 1',
      status: 'FORECAST',
      confidence: 0.79,
      radiusKm: 185
    },
    {
      id: 'pt-t-72-f',
      timestamp: '2026-10-02T00:00:00Z',
      timeOffset: 'T+72h',
      lat: 28.2,
      lng: 116.5,
      windKts: 35,
      pressureHpa: 1002,
      category: 'Depression',
      status: 'FORECAST',
      confidence: 0.68,
      radiusKm: 260
    }
  ],

  ensembleModels: [
    {
      modelName: 'GFS (Global Forecast System)',
      weight: 0.35,
      predictedWindKts: 130,
      trackErrorKm: 15,
      description: 'NOAA operational global NWP model with 13km horizontal grid resolution.',
      points: [
        { timeOffset: 'T-36h', windKts: 82, pressureHpa: 972, lat: 19.0, lng: 125.3 },
        { timeOffset: 'T-24h', windKts: 102, pressureHpa: 955, lat: 20.7, lng: 124.1 },
        { timeOffset: 'T-12h', windKts: 116, pressureHpa: 942, lat: 22.0, lng: 123.0 },
        { timeOffset: 'T-0h', windKts: 125, pressureHpa: 930, lat: 23.4, lng: 122.1 },
        { timeOffset: 'T+12h', windKts: 132, pressureHpa: 923, lat: 24.5, lng: 121.0 },
        { timeOffset: 'T+24h', windKts: 112, pressureHpa: 946, lat: 25.3, lng: 119.6 },
        { timeOffset: 'T+48h', windKts: 65, pressureHpa: 985, lat: 26.8, lng: 117.6 }
      ]
    },
    {
      modelName: 'ECMWF (European Center)',
      weight: 0.40,
      predictedWindKts: 125,
      trackErrorKm: 12,
      description: 'Integrated Forecasting System (IFS) 9km deterministic run; highest historical skill score.',
      points: [
        { timeOffset: 'T-36h', windKts: 85, pressureHpa: 970, lat: 19.1, lng: 125.4 },
        { timeOffset: 'T-24h', windKts: 104, pressureHpa: 953, lat: 20.8, lng: 124.2 },
        { timeOffset: 'T-12h', windKts: 119, pressureHpa: 939, lat: 22.1, lng: 123.1 },
        { timeOffset: 'T-0h', windKts: 125, pressureHpa: 930, lat: 23.4, lng: 122.1 },
        { timeOffset: 'T+12h', windKts: 129, pressureHpa: 927, lat: 24.3, lng: 121.2 },
        { timeOffset: 'T+24h', windKts: 108, pressureHpa: 950, lat: 25.1, lng: 119.8 },
        { timeOffset: 'T+48h', windKts: 58, pressureHpa: 990, lat: 26.4, lng: 117.9 }
      ]
    },
    {
      modelName: 'HWRF (Hurricane Weather Research)',
      weight: 0.15,
      predictedWindKts: 140,
      trackErrorKm: 25,
      description: 'High-resolution vortex-following nested mesoscale model specialized for core thermodynamics.',
      points: [
        { timeOffset: 'T-36h', windKts: 88, pressureHpa: 968, lat: 19.2, lng: 125.5 },
        { timeOffset: 'T-24h', windKts: 109, pressureHpa: 948, lat: 20.9, lng: 124.3 },
        { timeOffset: 'T-12h', windKts: 124, pressureHpa: 935, lat: 22.2, lng: 123.2 },
        { timeOffset: 'T-0h', windKts: 125, pressureHpa: 930, lat: 23.4, lng: 122.1 },
        { timeOffset: 'T+12h', windKts: 140, pressureHpa: 918, lat: 24.2, lng: 121.4 },
        { timeOffset: 'T+24h', windKts: 118, pressureHpa: 942, lat: 25.0, lng: 120.1 },
        { timeOffset: 'T+48h', windKts: 62, pressureHpa: 986, lat: 26.2, lng: 118.2 }
      ]
    },
    {
      modelName: 'HMON (Hurricane Multi-model)',
      weight: 0.10,
      predictedWindKts: 115,
      trackErrorKm: 30,
      description: 'Coupled ocean-atmosphere mesoscale operational numerical suite.',
      points: [
        { timeOffset: 'T-36h', windKts: 80, pressureHpa: 975, lat: 18.9, lng: 125.2 },
        { timeOffset: 'T-24h', windKts: 98, pressureHpa: 960, lat: 20.5, lng: 124.0 },
        { timeOffset: 'T-12h', windKts: 112, pressureHpa: 946, lat: 21.8, lng: 122.9 },
        { timeOffset: 'T-0h', windKts: 125, pressureHpa: 930, lat: 23.4, lng: 122.1 },
        { timeOffset: 'T+12h', windKts: 115, pressureHpa: 938, lat: 24.1, lng: 121.5 },
        { timeOffset: 'T+24h', windKts: 95, pressureHpa: 962, lat: 24.9, lng: 120.3 },
        { timeOffset: 'T+48h', windKts: 50, pressureHpa: 994, lat: 26.0, lng: 118.5 }
      ]
    }
  ],

  mlMetrics: {
    identificationConfidence: 0.984,
    classificationConfidence: 0.942,
    eyeLocalizationIoU: 0.89,
    dvorakTNo: 'T6.0 / CI 6.0',
    modelAgreement: {
      cat5Probability: 0.22,
      cat4Probability: 0.68,
      cat3Probability: 0.10,
      cat2Probability: 0.00
    },
    inferenceTimeMs: 42.8
  },

  satelliteFrames: [
    {
      id: 'frame-ir-01',
      satellite: 'INSAT-3DR',
      band: 'IR1 (10.8µm)',
      timestamp: '2026-09-29T00:30:00Z',
      coverage: 'North Indian Ocean & West Pacific',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      hasEyeDetected: true,
      eyeCoordinates: { lat: 23.4, lng: 122.1 },
      boundingBox: { x: 380, y: 220, width: 240, height: 240 },
      dvorakTNumber: 'T6.0',
      centralTempKelvin: 198.4
    },
    {
      id: 'frame-wv-02',
      satellite: 'INSAT-3D',
      band: 'WV (6.7µm)',
      timestamp: '2026-09-29T00:15:00Z',
      coverage: 'West Pacific & South China Sea',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      hasEyeDetected: true,
      eyeCoordinates: { lat: 23.3, lng: 122.2 },
      boundingBox: { x: 375, y: 215, width: 245, height: 245 },
      dvorakTNumber: 'T5.8',
      centralTempKelvin: 212.1
    },
    {
      id: 'frame-vis-03',
      satellite: 'MOSDAC',
      band: 'VIS (0.65µm)',
      timestamp: '2026-09-28T23:45:00Z',
      coverage: 'Eastern Asian Seaboard',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      hasEyeDetected: true,
      eyeCoordinates: { lat: 23.1, lng: 122.4 },
      boundingBox: { x: 370, y: 210, width: 250, height: 250 },
      dvorakTNumber: 'T5.5',
      centralTempKelvin: 220.0
    }
  ],

  chiefMeteorologistAssessment: 'Ensemble consensus remains exceptionally high regarding the Taiwan landfall track. GFS and ECMWF are in near-perfect agreement on the NW landfall coordinate. Low wind shear and extreme 29.8°C SST thermal reservoirs continue to fuel rapid intensification. Emergency protocols should prepare for sustained Category 4 impacts at landfall, with the potential of borderline Category 5 gusts upon extreme shoreline impact.'
};

export const SECONDARY_ACTIVE_CYCLONE: CycloneData = {
  id: 'nio-bob-04-dana',
  name: 'SEVERE CYCLONIC STORM DANA',
  code: 'NIO-BOB-04',
  basin: 'North Indian Ocean (Bay of Bengal)',
  category: 'Severe Cyclonic Storm',
  categoryNumber: 3,
  isActive: true,
  status: 'LANDFALL_WARNING',
  currentPosition: {
    lat: 18.6,
    lng: 88.2,
    coordinatesFormatted: '18.6°N, 88.2°E'
  },
  landfallEta: 'ETA 24h',
  landfallLocation: 'Dhamra Port / Puri, Odisha Coast',
  maxSustainedWindKts: 95,
  windGustsKts: 115,
  minCentralPressureHpa: 962,
  pressureTrendHpaHr: -2,
  movementVector: {
    direction: 'NNW',
    speedKts: 10,
    headingDegrees: 330
  },
  eyeWallDiameterKm: 34,
  eyeWallStructure: 'Ragged, developing pin-hole eye with intense convective banding',
  seaSurfaceTempC: 30.4,
  seaSurfaceAnomalyC: 1.6,
  windShearKts: 11.2,
  windShearFavourability: 'Low Shear (favorable)',
  accumulatedCycloneEnergyACE: 92.4,
  acePercentageOfNormal: 118,
  forecastConeUncertaintyPct: 18.0,
  forecastConfidence: 'HIGH',

  trackHistory: [
    {
      id: 'dana-t-48',
      timestamp: '2026-09-27T06:00:00Z',
      timeOffset: 'T-48h',
      lat: 13.8,
      lng: 90.5,
      windKts: 45,
      pressureHpa: 994,
      category: 'Cyclonic Storm',
      status: 'HISTORICAL',
      radiusKm: 22
    },
    {
      id: 'dana-t-24',
      timestamp: '2026-09-28T06:00:00Z',
      timeOffset: 'T-24h',
      lat: 16.2,
      lng: 89.4,
      windKts: 70,
      pressureHpa: 980,
      category: 'Severe Cyclonic Storm',
      status: 'HISTORICAL',
      radiusKm: 28
    },
    {
      id: 'dana-t-0',
      timestamp: '2026-09-29T00:00:00Z',
      timeOffset: 'LIVE (T+0h)',
      lat: 18.6,
      lng: 88.2,
      windKts: 95,
      pressureHpa: 962,
      category: 'Severe Cyclonic Storm',
      status: 'LIVE',
      confidence: 0.965,
      radiusKm: 32
    }
  ],

  forecastTrack: [
    {
      id: 'dana-f-12',
      timestamp: '2026-09-29T12:00:00Z',
      timeOffset: 'T+12h',
      lat: 19.8,
      lng: 87.5,
      windKts: 105,
      pressureHpa: 954,
      category: 'Very Severe Cyclonic Storm',
      status: 'FORECAST',
      confidence: 0.91,
      radiusKm: 55
    },
    {
      id: 'dana-f-24',
      timestamp: '2026-09-30T00:00:00Z',
      timeOffset: 'T+24h',
      lat: 20.9,
      lng: 86.8,
      windKts: 90,
      pressureHpa: 968,
      category: 'Severe Cyclonic Storm',
      status: 'FORECAST',
      confidence: 0.86,
      radiusKm: 85
    },
    {
      id: 'dana-f-48',
      timestamp: '2026-10-01T00:00:00Z',
      timeOffset: 'T+48h',
      lat: 22.4,
      lng: 85.2,
      windKts: 40,
      pressureHpa: 996,
      category: 'Cyclonic Storm',
      status: 'FORECAST',
      confidence: 0.74,
      radiusKm: 140
    }
  ],

  ensembleModels: [
    {
      modelName: 'IMD-MME (Multi-Model Ensemble)',
      weight: 0.45,
      predictedWindKts: 100,
      trackErrorKm: 14,
      description: 'Consensus suite of NCMRWF Unified Model, ECMWF, and GFS for North Indian Ocean.',
      points: [
        { timeOffset: 'T-24h', windKts: 70, pressureHpa: 980, lat: 16.2, lng: 89.4 },
        { timeOffset: 'T-0h', windKts: 95, pressureHpa: 962, lat: 18.6, lng: 88.2 },
        { timeOffset: 'T+12h', windKts: 102, pressureHpa: 956, lat: 19.8, lng: 87.5 },
        { timeOffset: 'T+24h', windKts: 88, pressureHpa: 970, lat: 20.9, lng: 86.8 }
      ]
    },
    {
      modelName: 'ECMWF (HRES-IFS)',
      weight: 0.35,
      predictedWindKts: 95,
      trackErrorKm: 16,
      description: 'European high-resolution 9km model tracking Bay of Bengal cyclogenesis.',
      points: [
        { timeOffset: 'T-24h', windKts: 68, pressureHpa: 982, lat: 16.3, lng: 89.5 },
        { timeOffset: 'T-0h', windKts: 95, pressureHpa: 962, lat: 18.6, lng: 88.2 },
        { timeOffset: 'T+12h', windKts: 98, pressureHpa: 960, lat: 19.9, lng: 87.6 },
        { timeOffset: 'T+24h', windKts: 85, pressureHpa: 972, lat: 21.0, lng: 86.9 }
      ]
    }
  ],

  mlMetrics: {
    identificationConfidence: 0.976,
    classificationConfidence: 0.928,
    eyeLocalizationIoU: 0.86,
    dvorakTNo: 'T4.5 / CI 4.5',
    modelAgreement: {
      cat5Probability: 0.05,
      cat4Probability: 0.35,
      cat3Probability: 0.55,
      cat2Probability: 0.05
    },
    inferenceTimeMs: 38.4
  },

  satelliteFrames: [],
  chiefMeteorologistAssessment: 'Cyclone DANA is undergoing steady intensification over central Bay of Bengal. High ocean thermal energy (OHC > 100 kJ/cm²) supports peak intensity of Very Severe Cyclonic Storm prior to landfall near Dhamra/Bhitarkanika. Storm surge of 1.5–2.0 meters expected in coastal Kendrapara and Bhadrak.'
};

export const ALL_CYCLONES: CycloneData[] = [
  PRIMARY_ACTIVE_CYCLONE,
  SECONDARY_ACTIVE_CYCLONE
];

export const REALTIME_OPERATIONAL_LOGS: OperationalLogEvent[] = [
  {
    id: 'log-1',
    timestamp: '14:32:10 UTC',
    severity: 'red',
    message: 'Category upgrade: Typhoon Gaemi upgraded to CATEGORY 4 extreme threat',
    source: 'SYSTEM_OK'
  },
  {
    id: 'log-2',
    timestamp: '14:15:00 UTC',
    severity: 'green',
    message: 'Radar sweep completed at Ishigakijima (Japan). Eye wall structure matches Cat 4',
    source: 'SYSTEM_OK'
  },
  {
    id: 'log-3',
    timestamp: '13:58:24 UTC',
    severity: 'amber',
    message: 'Forecast model consensus shifts landfall path 15km North-West',
    source: 'SYSTEM_OK'
  },
  {
    id: 'log-4',
    timestamp: '13:22:15 UTC',
    severity: 'cyan',
    message: 'C-130 storm chaser reconnaissance aircraft reports central pressure drop below 935 hPa',
    source: 'SYSTEM_OK'
  },
  {
    id: 'log-5',
    timestamp: '12:55:40 UTC',
    severity: 'green',
    message: 'INSAT-3DR Rapid-Scan infrared channel 10.8µm imagery ingested via MOSDAC',
    source: 'SYSTEM_OK'
  },
  {
    id: 'log-6',
    timestamp: '12:10:04 UTC',
    severity: 'amber',
    message: 'NDRF Command Battalion alerted for coastal evacuation in Sector B-4',
    source: 'SYSTEM_OK'
  },
  {
    id: 'log-7',
    timestamp: '11:40:18 UTC',
    severity: 'cyan',
    message: 'ConvLSTM Multi-Horizon Track model completed 72h trajectory simulation (Loss: 0.014)',
    source: 'SYSTEM_OK'
  }
];

export const HISTORICAL_CYCLONES_ARCHIVE = [
  {
    id: 'amphan-2020',
    name: 'SUPER CYCLONE AMPHAN',
    code: 'BOB-01-2020',
    basin: 'Bay of Bengal',
    year: 2020,
    dates: '16 May – 21 May 2020',
    peakIntensity: 'Super Cyclonic Storm (Cat 5)',
    maxWindKts: 140,
    minPressureHpa: 907,
    ace: 24.8,
    durationHours: 120,
    landfallLocation: 'Bakkhali, West Bengal / Bangladesh',
    casualties: 128,
    status: 'HISTORICAL_BEST_TRACK',
    dataSources: ['INSAT-3D', 'MOSDAC', 'IBTrACS', 'IMD Doppler Kolkata'],
    aiValidationScore: 97.4
  },
  {
    id: 'biparjoy-2023',
    name: 'VERY SEVERE CYCLONE BIPARJOY',
    code: 'ARB-01-2023',
    basin: 'Arabian Sea',
    year: 2023,
    dates: '06 Jun – 19 Jun 2023',
    peakIntensity: 'Extremely Severe (Cat 3)',
    maxWindKts: 105,
    minPressureHpa: 954,
    ace: 38.6,
    durationHours: 312,
    landfallLocation: 'Jakhau Port, Gujarat',
    casualties: 17,
    status: 'HISTORICAL_BEST_TRACK',
    dataSources: ['INSAT-3DR', 'MOSDAC', 'ECMWF GTS', 'Bhuj Radar'],
    aiValidationScore: 95.8
  },
  {
    id: 'mocha-2023',
    name: 'EXTREMELY SEVERE CYCLONE MOCHA',
    code: 'BOB-02-2023',
    basin: 'Bay of Bengal',
    year: 2023,
    dates: '09 May – 15 May 2023',
    peakIntensity: 'Super Cyclone Equivalent (Cat 5)',
    maxWindKts: 150,
    minPressureHpa: 918,
    ace: 28.2,
    durationHours: 144,
    landfallLocation: 'Sittwe, Rakhine State, Myanmar',
    casualties: 463,
    status: 'HISTORICAL_BEST_TRACK',
    dataSources: ['INSAT-3D', 'Himawari-9', 'MOSDAC', 'IBTrACS'],
    aiValidationScore: 98.1
  },
  {
    id: 'fani-2019',
    name: 'EXTREMELY SEVERE CYCLONE FANI',
    code: 'BOB-02-2019',
    basin: 'Bay of Bengal',
    year: 2019,
    dates: '26 Apr – 04 May 2019',
    peakIntensity: 'Extremely Severe (Cat 4)',
    maxWindKts: 130,
    minPressureHpa: 932,
    ace: 26.4,
    durationHours: 192,
    landfallLocation: 'Puri, Odisha',
    casualties: 89,
    status: 'HISTORICAL_BEST_TRACK',
    dataSources: ['INSAT-3D', 'MOSDAC', 'Paradip Radar', 'GTS'],
    aiValidationScore: 96.9
  },
  {
    id: 'tauktae-2021',
    name: 'EXTREMELY SEVERE CYCLONE TAUKTAE',
    code: 'ARB-01-2021',
    basin: 'Arabian Sea',
    year: 2021,
    dates: '14 May – 19 May 2021',
    peakIntensity: 'Extremely Severe (Cat 4)',
    maxWindKts: 120,
    minPressureHpa: 950,
    ace: 21.0,
    durationHours: 126,
    landfallLocation: 'Saurashtra Coast, Gujarat',
    casualties: 118,
    status: 'HISTORICAL_BEST_TRACK',
    dataSources: ['INSAT-3D', 'INSAT-3DR', 'MOSDAC', 'Goa Radar'],
    aiValidationScore: 94.7
  },
  {
    id: 'gaemi-2024',
    name: 'SUPER TYPHOON GAEMI',
    code: 'WPAC-03-2024',
    basin: 'Western Pacific',
    year: 2024,
    dates: '19 Jul – 27 Jul 2024',
    peakIntensity: 'Super Typhoon (Cat 4)',
    maxWindKts: 130,
    minPressureHpa: 935,
    ace: 32.1,
    durationHours: 190,
    landfallLocation: 'Yilan County, Taiwan & Fujian, China',
    casualties: 126,
    status: 'HISTORICAL_BEST_TRACK',
    dataSources: ['Himawari-9', 'NOAA-20', 'JTWC', 'IBTrACS'],
    aiValidationScore: 98.4
  }
];

export const OPERATIONAL_ALERTS: OperationalAlert[] = [
  {
    id: 'alt-01',
    timestamp: '2026-09-29T00:32:00Z',
    severity: 'CRITICAL',
    cycloneName: 'TYPHOON GAEMI',
    cycloneId: 'wpac-03-gaemi',
    headline: 'CATEGORY 4 LANDFALL ALERT: Extreme wind gusts (150 kts) within 18h',
    description: 'Core eyewall approaching eastern maritime quadrant. Rapid barometric fall observed (-3 hPa/hr). Widespread catastrophic coastal surge (>3.5m) and destructive wind damage expected in sectors 1 to 4.',
    location: 'Eastern Seaboard / Yilan Coast (24.3°N, 121.8°E)',
    triggerCondition: 'Vmax sustained wind exceeds 120 kts within 200km of coastline',
    actionRequired: 'Execute Stage-4 mandatory coastal evacuation. Suspend all port crane operations. Activate emergency radio beacons.',
    isAcknowledged: false,
    portWarningSignal: 10
  },
  {
    id: 'alt-02',
    timestamp: '2026-09-29T00:15:00Z',
    severity: 'WARNING',
    cycloneName: 'SEVERE CYCLONE DANA',
    cycloneId: 'nio-bob-04-dana',
    headline: 'STORM SURGE WARNING: 1.5–2.0m inundation predicted for North Odisha ports',
    description: 'Astronomical high tide coinciding with cyclone landfall. Heavy to very heavy precipitation band detected on Chandbali radar sweep.',
    location: 'Dhamra & Paradip Ports, Odisha Coast',
    triggerCondition: 'Model ensemble storm surge prediction exceeds 1.5m at high tide',
    actionRequired: 'Hoist Local Cautionary Signal LC-III at Paradip Port. Position NDRF teams in low-lying coastal blocks.',
    isAcknowledged: true,
    acknowledgedBy: 'DUTY CHIEF A. ROY (DECK B)',
    portWarningSignal: 8
  },
  {
    id: 'alt-03',
    timestamp: '2026-09-28T22:40:00Z',
    severity: 'ADVISORY',
    cycloneName: 'TYPHOON GAEMI',
    cycloneId: 'wpac-03-gaemi',
    headline: 'SATELLITE TELEMETRY NOTICE: Secondary outer eyewall replacement cycle (ERC) detected',
    description: 'Microwave 89GHz imagery from NOAA-20 indicates concentric eyewall formation. Wind field radius expanding by 35% over next 12 hours.',
    location: 'Maritime Zone Alpha (22.5°N, 123.5°E)',
    triggerCondition: 'Spatial attention heatmap shows dual concentric ring intensity structure',
    actionRequired: 'Update gale wind boundary radius in coastal warning bulletin GIS feeds.',
    isAcknowledged: true,
    acknowledgedBy: 'COL. R. MILLER (DECK A)'
  },
  {
    id: 'alt-04',
    timestamp: '2026-09-28T19:05:00Z',
    severity: 'INFO',
    cycloneName: 'SYSTEM PIPELINE',
    cycloneId: 'sys-core',
    headline: 'INSAT-3DR Sounder radiometric calibration cycle completed successfully',
    description: 'Atmospheric stability indices (CAPE, Lifted Index) and vertical moisture profiles updated in PostGIS datastore.',
    location: 'MOSDAC Ground Station, SAC Ahmedabad',
    triggerCondition: 'Automated 6-hour satellite radiance cross-calibration validation',
    actionRequired: 'No operator action required. Routine operational telemetry.',
    isAcknowledged: true
  }
];

export const DATA_SOURCES: DataSourceStatus[] = [
  {
    id: 'ds-mosdac',
    name: 'MOSDAC / SAC Ahmedabad (ISRO)',
    agency: 'Indian Space Research Organisation',
    type: 'Satellite Constellation',
    satelliteOrSensors: 'INSAT-3D / 3DR Imager (TIR1, TIR2, MIR, WV, VIS)',
    status: 'ONLINE',
    latencySeconds: 14,
    lastIngestionTime: '2026-09-29T00:54:12Z',
    bandwidthMbps: 450,
    coverage: 'Indian Ocean, Bay of Bengal, Arabian Sea, South Asia (40°E–120°E)',
    observationsCount: '1,428,900 frames / yr',
    endpoint: 'https://mosdac.gov.in/live/insat3dr/geotiff'
  },
  {
    id: 'ds-imd-radar',
    name: 'IMD Doppler Weather Radar Network',
    agency: 'India Meteorological Department',
    type: 'Doppler Weather Radar',
    satelliteOrSensors: 'S-band DWR (Chennai, Visakhapatnam, Paradip, Kolkata, Machilipatnam)',
    status: 'ONLINE',
    latencySeconds: 8,
    lastIngestionTime: '2026-09-29T00:55:00Z',
    bandwidthMbps: 120,
    coverage: 'East & West Coast Coastal Radar Belt (500 km radius per station)',
    observationsCount: '48 volume scans / hr',
    endpoint: 'https://mausam.imd.gov.in/api/dwr/reflectivity'
  },
  {
    id: 'ds-ibtracs',
    name: 'IBTrACS (International Best Track Archive)',
    agency: 'NOAA NCEI & WMO',
    type: 'Historical Best Track',
    satelliteOrSensors: 'Global Tropical Cyclone 6-hourly best-track archive (1848–Present)',
    status: 'ONLINE',
    latencySeconds: 120,
    lastIngestionTime: '2026-09-28T18:00:00Z',
    bandwidthMbps: 50,
    coverage: 'Global Ocean Basins (NIO, WPAC, EPAC, NATL, SIO, SPAC)',
    observationsCount: '13,500+ Historical Storms',
    endpoint: 'https://www.ncei.noaa.gov/data/ibtracs/v04r00'
  },
  {
    id: 'ds-incois',
    name: 'INCOIS Ocean Observation System',
    agency: 'MoES / INCOIS Hyderabad',
    type: 'Ocean Buoys & Argo',
    satelliteOrSensors: 'Omini Moored Ocean Buoy Array, Argo Floats & Wave Rider Buoys',
    status: 'ONLINE',
    latencySeconds: 45,
    lastIngestionTime: '2026-09-29T00:45:00Z',
    bandwidthMbps: 35,
    coverage: 'North Indian Ocean Upper Ocean Thermal & Salinity Profiles (0–2000m)',
    observationsCount: '340 Active Sensor Nodes',
    endpoint: 'https://incois.gov.in/portal/ocean_telemetry'
  },
  {
    id: 'ds-ecmwf',
    name: 'ECMWF GTS Numerical Weather Feed',
    agency: 'European Centre for Medium-Range Weather Forecasts',
    type: 'Dynamical Numerical Models',
    satelliteOrSensors: 'IFS 9km Atmospheric & Ocean Wave Coupling (WAM)',
    status: 'ONLINE',
    latencySeconds: 180,
    lastIngestionTime: '2026-09-29T00:00:00Z',
    bandwidthMbps: 200,
    coverage: 'Global High-Resolution GRIB2 atmospheric grid fields',
    observationsCount: '4 Cycles / Day (00, 06, 12, 18 UTC)',
    endpoint: 'https://api.ecmwf.int/v1/gts/cyclone'
  }
];

export const SYSTEM_SERVICES: SystemServiceNode[] = [
  {
    id: 'node-satellite-ingest',
    name: 'Satellite Ingest Daemon',
    serviceCategory: 'Ingestion',
    technology: 'Kafka + MOSDAC Push Gateway',
    status: 'ONLINE',
    uptimePercentage: 99.98,
    cpuUsagePct: 24,
    memoryUsagePct: 42,
    avgLatencyMs: 18,
    recentEvents: [
      'Ingested 10.8µm IR GeoTIFF from INSAT-3DR (Payload size: 48.2 MB)',
      'Ingested Doppler Reflectivity scan from Visakhapatnam Station (6.4 MB)',
      'Heartbeat check: MOSDAC FTPS link healthy (ping 22ms)'
    ]
  },
  {
    id: 'node-airflow',
    name: 'Airflow Pipeline Orchestrator',
    serviceCategory: 'Pipeline',
    technology: 'Apache Airflow 2.9 + CeleryExecutor',
    status: 'ONLINE',
    uptimePercentage: 99.95,
    cpuUsagePct: 35,
    memoryUsagePct: 58,
    avgLatencyMs: 65,
    recentEvents: [
      'DAG run: cyclone_multispectral_preprocess_v4 succeeded in 4.2s',
      'DAG run: trajectory_convlstm_ensemble_v2 triggered on new IR frame',
      'Scheduled hourly quality-assurance data integrity check'
    ]
  },
  {
    id: 'node-storage',
    name: 'Object Storage & Tile Cache',
    serviceCategory: 'Storage',
    technology: 'MinIO S3 High-IOPS Cluster',
    status: 'ONLINE',
    uptimePercentage: 100.0,
    cpuUsagePct: 15,
    memoryUsagePct: 38,
    avgLatencyMs: 6,
    recentEvents: [
      'Cached 1,280 map tiles for zoom levels 4-9 (Western Pacific & Bay of Bengal)',
      'Archived raw NetCDF-4 radiance granule to cold storage partition',
      'S3 bucket read/write IOPS nominal at 4,800 op/s'
    ]
  },
  {
    id: 'node-ai-inference',
    name: 'PyTorch / TensorRT Inference Core',
    serviceCategory: 'AI Inference Core',
    technology: 'NVIDIA TensorRT 10.0 + CUDA 12.4 (2x H100 SXM5)',
    status: 'ONLINE',
    uptimePercentage: 99.99,
    cpuUsagePct: 48,
    memoryUsagePct: 62,
    gpuUsagePct: 78,
    avgLatencyMs: 42,
    recentEvents: [
      'VortexNet-Detect localized eye at (23.4°N, 122.1°E) in 38ms (IoU: 0.89)',
      'CyDvorak-Deep estimated CI 6.0 / 125 kts in 42ms',
      'TrajectoryPINN generated 72h physics-guided cone in 84ms'
    ]
  },
  {
    id: 'node-queue',
    name: 'Redis Queue & Celery Workers',
    serviceCategory: 'Queue',
    technology: 'Redis 7.2 Cluster + 16 Worker Nodes',
    status: 'ONLINE',
    uptimePercentage: 99.99,
    cpuUsagePct: 18,
    memoryUsagePct: 31,
    avgLatencyMs: 2,
    recentEvents: [
      'Processed 420 telemetry tasks in past 10 minutes (Queue depth: 0)',
      'Celery worker pool autoscale nominal at 16 threads',
      'Redis persistence snapshot RDB saved cleanly'
    ]
  },
  {
    id: 'node-api',
    name: 'FastAPI Telemetry Gateway',
    serviceCategory: 'API Gateway',
    technology: 'FastAPI (Python 3.12) + Uvicorn ASGI',
    status: 'ONLINE',
    uptimePercentage: 99.96,
    cpuUsagePct: 22,
    memoryUsagePct: 34,
    avgLatencyMs: 12,
    recentEvents: [
      'GET /api/v1/cyclone/active returned 200 OK (1.2ms)',
      'GET /api/v1/satellite/spectral/latest returned 200 OK (8.4ms)',
      'Active HTTP connection pool: 142 clients'
    ]
  },
  {
    id: 'node-spatial-db',
    name: 'PostgreSQL + PostGIS Datastore',
    serviceCategory: 'Spatial Database',
    technology: 'PostgreSQL 16 + PostGIS 3.4 + TimescaleDB',
    status: 'ONLINE',
    uptimePercentage: 99.99,
    cpuUsagePct: 30,
    memoryUsagePct: 52,
    avgLatencyMs: 14,
    recentEvents: [
      'ST_Buffer spatial query computed 58nm gale radius polygon in 4ms',
      'Ingested 1,200 observation points from INCOIS ocean buoys',
      'Database connection pool: 24 active / 100 max'
    ]
  },
  {
    id: 'node-websocket',
    name: 'WebSocket Live Telemetry Broadcaster',
    serviceCategory: 'Telemetry Broadcast',
    technology: 'AsyncIO WebSocket Hub',
    status: 'ONLINE',
    uptimePercentage: 99.97,
    cpuUsagePct: 12,
    memoryUsagePct: 20,
    avgLatencyMs: 4,
    recentEvents: [
      'Broadcasting live UTC telemetry to 8 mission control workstations',
      'Broadcast frame payload: 1.4 KB / 1000ms',
      'Zero dropped frames in past 24 hours'
    ]
  }
];

export const ML_MODELS_SPECS = {
  identification: {
    name: 'VortexNet-Detect v3.2',
    type: 'Vortex Center & Eye Localization Network',
    architecture: 'Custom ResNet-50 Feature Pyramid Network (FPN) + Spatial Attention Heads',
    inputData: 'Multi-spectral INSAT-3D/3DR (IR 10.8µm + WV 6.7µm + VIS 0.65µm)',
    inputDimensions: '512 x 512 x 3 GeoTIFF Grayscale/Normalized Matrix',
    performance: {
      mAP50: '94.7%',
      iouAccuracy: '0.892',
      eyeDetectionPrecision: '96.8%',
      eyeDetectionRecall: '95.2%',
      inferenceSpeed: '38 ms / frame (NVIDIA H100)',
      f1Score: '0.960'
    },
    trainingDataset: '48,000 labeled multi-spectral satellite granules from MOSDAC & NOAA (2000–2024)',
    hyperparameters: {
      optimizer: 'AdamW (lr=3e-4, weight_decay=1e-2)',
      batchSize: 64,
      lossFunction: 'CIoU Loss + Focal Binary Cross-Entropy',
      epochs: 150
    }
  },
  classification: {
    name: 'CyDvorak-Deep v4.0',
    type: 'Automated Dvorak T-Number & Wind Intensity Estimator',
    architecture: 'Dual-Stream DenseNet-161 with Polar Coordinate Spiral Convolutions',
    inputData: 'Cropped 256x256 vortex core centered on detected eye + Sea Surface Temperature (SST)',
    performance: {
      windSpeedRMSE: '5.2 kts (vs JTWC/IMD Best Track)',
      centralPressureRMSE: '3.8 hPa',
      tNumberAccuracy: '±0.25 T-number in 91.4% of cases',
      categoryClassificationAccuracy: '94.2%',
      inferenceSpeed: '42 ms / frame'
    },
    trainingDataset: '32,000 storm timesteps coupled with aircraft reconnaissance & microwave sounder data',
    hyperparameters: {
      optimizer: 'CosineAnnealingLR with Warm Restarts',
      lossFunction: 'Smooth L1 Loss (Intensity) + Cross-Entropy (Category)',
      dvorakLUT: 'Automated Enhanced BD-Curve Mapping'
    }
  },
  prediction: {
    name: 'TrajectoryPINN-Seq v2.5',
    type: 'Physics-Informed ConvLSTM Multi-Horizon Track & Intensity Predictor',
    architecture: 'Bidirectional ConvLSTM + Physics Loss Constraints (Advection-Vorticity & Beta-Drift equations)',
    inputData: 'Temporal sequence of 6 past satellite frames (T-24h to T-0h) + GFS 500hPa geopotential steering vectors + SST fields',
    performance: {
      trackError12h: '28.4 km',
      trackError24h: '48.2 km (IMD Operational Baseline: 72 km)',
      trackError48h: '96.5 km',
      trackError72h: '162.0 km',
      rapidIntensificationRecall: '88.4%',
      inferenceSpeed: '84 ms / trajectory sequence'
    },
    physicsConstraints: [
      'Hydrostatic & Geostrophic Balance Penalties',
      'Conservation of Potential Vorticity (PV)',
      'SST-limited maximum potential intensity (MPI) bounding constraint'
    ]
  }
};
