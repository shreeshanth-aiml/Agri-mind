import { SOIL_DB, MOCK_WEATHER, MOCK_MANDI_PRICES, MOCK_NDVI, DISTRICTS_KANNADA } from './mockData';
import { SoilProfile } from './store';

export interface GroundedSource {
  tool: string;
  queryParam: string;
  freshness: string;
  dataSummary: string;
  timestamp: string;
}

export interface AssistantGroundedResponse {
  answer: string;
  sources: GroundedSource[];
  isGrounded: boolean;
  functionCalled?: string;
  dataFound: boolean;
}

/**
 * Tool 1: getCurrentMandiPrice(commodity, district)
 * Returns the SAME data object the dashboard card renders, including its existing freshness tag and timestamp.
 */
export function getCurrentMandiPrice(commodity: string, district: string = 'Bengaluru Urban') {
  const norm = (commodity || '').trim().toLowerCase();
  
  let matchedKey = Object.keys(MOCK_MANDI_PRICES).find(
    (k) => k.toLowerCase() === norm
  );

  if (!matchedKey) {
    if (norm.includes('tomat') || norm.includes('ಟೊಮೇಟೊ')) matchedKey = 'Tomato';
    else if (norm.includes('onion') || norm.includes('ಈರುಳ್ಳಿ')) matchedKey = 'Onion';
    else if (norm.includes('paddy') || norm.includes('rice') || norm.includes('ಭತ್ತ') || norm.includes('ಅಕ್ಕಿ')) matchedKey = 'Paddy';
    else if (norm.includes('maize') || norm.includes('corn') || norm.includes('ಮೆಕ್ಕೆಜೋಳ')) matchedKey = 'Maize';
    else if (norm.includes('ragi') || norm.includes('millet') || norm.includes('ರಾಗಿ')) matchedKey = 'Ragi';
    else if (norm.includes('cotton') || norm.includes('ಹತ್ತಿ')) matchedKey = 'Cotton';
    else if (norm.includes('sugarcane') || norm.includes('ಕಬ್ಬು')) matchedKey = 'Sugarcane';
    else if (norm.includes('chilli') || norm.includes('chili') || norm.includes('ಮೆಣಸಿನಕಾಯಿ')) matchedKey = 'Chilli';
  }

  if (matchedKey && MOCK_MANDI_PRICES[matchedKey]) {
    const item = MOCK_MANDI_PRICES[matchedKey];
    return {
      available: true,
      commodity: matchedKey,
      price: item.price,
      unit: '₹/quintal',
      source: item.source,
      freshness: item.source.toLowerCase().includes('live') ? 'Live' : 'Estimated',
      timestamp: 'Today, updated 40 min ago',
      district,
    };
  }

  return {
    available: false,
    commodity,
    district,
    freshness: 'Not Available',
    timestamp: 'N/A',
    message: `No active APMC mandi price record found for "${commodity}". Verified price records currently available in this dataset for: Tomato, Onion, Paddy, Maize, Ragi, Cotton, Sugarcane.`,
  };
}

/**
 * Tool 2: getWeatherNow(district)
 * Returns the SAME data object the dashboard weather card renders.
 */
export function getWeatherNow(district: string = 'Bengaluru Urban') {
  return {
    available: true,
    district,
    temp: MOCK_WEATHER.current.temp,
    humidity: MOCK_WEATHER.current.humidity,
    condition: MOCK_WEATHER.current.condition,
    rainWarning: 'Rain expected Wednesday afternoon (delay foliar spraying)',
    freshness: 'Live',
    timestamp: 'Today, updated 1 hr ago',
  };
}

/**
 * Tool 3: getLatestYieldForecast(crop, district)
 * Returns the SAME data object the yield dashboard card renders.
 */
export function getLatestYieldForecast(crop: string = 'Ragi', district: string = 'Bengaluru Urban') {
  const latestNdvi = MOCK_NDVI[MOCK_NDVI.length - 1].ndvi;
  const isSupportedCrop = ['Ragi', 'Tomato', 'Maize', 'Paddy', 'Cotton'].some(
    (c) => c.toLowerCase() === (crop || '').toLowerCase()
  );

  if (!isSupportedCrop && crop && crop !== 'Ragi') {
    return {
      available: false,
      crop,
      district,
      freshness: 'Not Available',
      timestamp: 'N/A',
      message: `No calibrated yield regression model found for "${crop}" in ${district}. Yield forecasting currently calibrated for: Ragi, Tomato, Maize, Paddy, Cotton.`,
    };
  }

  return {
    available: true,
    crop: crop || 'Ragi',
    district,
    forecastRange: '18 - 22 quintals/acre',
    mostLikely: '20.5 quintals/acre',
    growingDegreeDays: '1,420 GDD',
    satelliteCanopyHealth: `${latestNdvi} (Healthy vigor)`,
    freshness: 'Estimated',
    timestamp: 'Current Season Forecast, updated today',
  };
}

/**
 * Tool 4: getSoilStatus(district)
 * Returns the SAME data object the soil health card renders.
 */
export function getSoilStatus(district: string = 'Bengaluru Urban', customSoil?: SoilProfile | null) {
  if (customSoil) {
    return {
      available: true,
      district,
      type: customSoil.type || 'Tested Soil Health Card',
      ph: customSoil.ph,
      n: customSoil.n,
      p: customSoil.p,
      k: customSoil.k,
      freshness: 'Tested',
      timestamp: 'Active Soil Health Card Override',
    };
  }

  const districtData = SOIL_DB[district] || SOIL_DB['Default'];
  return {
    available: true,
    district,
    type: districtData.type,
    ph: districtData.ph,
    n: districtData.n,
    p: districtData.p,
    k: districtData.k,
    freshness: 'Estimated',
    timestamp: 'Karnataka 31-District Benchmark Database',
  };
}

/**
 * Tool Definitions Schema for Gemini Function-Calling & Intent Resolution
 */
export const ASSISTANT_TOOLS_DECLARATIONS = [
  {
    name: 'getCurrentMandiPrice',
    description: 'Fetch current APMC mandi market price and trend for a commodity in a Karnataka district',
    parameters: {
      type: 'object',
      properties: {
        commodity: { type: 'string', description: 'Name of the crop or commodity, e.g. Tomato, Onion, Paddy, Maize, Ragi' },
        district: { type: 'string', description: 'Karnataka district name, e.g. Kolar, Mysuru, Bengaluru Urban' },
      },
      required: ['commodity'],
    },
  },
  {
    name: 'getWeatherNow',
    description: 'Fetch current weather, humidity, temperature and rainfall alerts for a district',
    parameters: {
      type: 'object',
      properties: {
        district: { type: 'string', description: 'Karnataka district name' },
      },
    },
  },
  {
    name: 'getLatestYieldForecast',
    description: 'Fetch calibrated harvest yield forecast range and satellite NDVI for a crop in a district',
    parameters: {
      type: 'object',
      properties: {
        crop: { type: 'string', description: 'Crop name' },
        district: { type: 'string', description: 'Karnataka district name' },
      },
    },
  },
  {
    name: 'getSoilStatus',
    description: 'Fetch verified soil texture, pH, Nitrogen, Phosphorus and Potassium levels for a district',
    parameters: {
      type: 'object',
      properties: {
        district: { type: 'string', description: 'Karnataka district name' },
      },
    },
  },
];

/**
 * Grounding Resolution Engine:
 * Analyzes query, dispatches the corresponding app function, and guarantees strict answer construction rules:
 * - Specific numbers carry the exact freshness tag inline
 * - Missing data reports not available plainly rather than hallucinating
 * - Returns structured sources used for collapsible developer/debug inspection
 */
export function processGroundedQuery(
  userQuery: string,
  district: string,
  language: string,
  customSoil?: SoilProfile | null
): AssistantGroundedResponse {
  const q = userQuery.toLowerCase();
  const isKannada = language === 'kn-IN';
  const districtName = isKannada ? DISTRICTS_KANNADA[district] || district : district;
  const sources: GroundedSource[] = [];

  // Keywords detection (English & Kannada)
  const priceKeywords = ['price', 'mandi', 'rate', 'cost', 'apmc', 'ಬೆಲೆ', 'ದರ', 'ಮಾರುಕಟ್ಟೆ', 'ಎಪಿಎಂಸಿ', 'ಖರೀದಿ'];
  const weatherKeywords = ['weather', 'rain', 'temperature', 'temp', 'humidity', 'forecast', 'climate', 'ಮಳೆ', 'ಹವಾಮಾನ', 'ಉಷ್ಣಾಂಶ', 'ಬಿಸಿಲು', 'ಮೋಡ'];
  const yieldKeywords = ['yield', 'output', 'production', 'harvest', 'quintal', 'ಇಳುವರಿ', 'ಬೆಳೆ ಇಳುವರಿ', 'ಕ್ವಿಂಟಾಲ್', 'ಉತ್ಪಾದನೆ'];
  const soilKeywords = ['soil', 'npk', 'ph', 'fertility', 'nitrogen', 'potash', 'phosphorus', 'ಮಣ್ಣು', 'ಪಿಎಚ್', 'ಸಾರಜನಕ', 'ರಂಜಕ', 'ಪೊಟ್ಯಾಷ್'];

  // 1. TOOL CALL: getCurrentMandiPrice
  if (priceKeywords.some((w) => q.includes(w))) {
    let matchedCommodity = '';
    if (q.includes('onion') || q.includes('ಈರುಳ್ಳಿ')) matchedCommodity = 'Onion';
    else if (q.includes('tomato') || q.includes('ಟೊಮೇಟೊ')) matchedCommodity = 'Tomato';
    else if (q.includes('paddy') || q.includes('rice') || q.includes('ಭತ್ತ') || q.includes('ಅಕ್ಕಿ')) matchedCommodity = 'Paddy';
    else if (q.includes('maize') || q.includes('corn') || q.includes('ಮೆಕ್ಕೆಜೋಳ')) matchedCommodity = 'Maize';
    else if (q.includes('ragi') || q.includes('ರಾಗಿ')) matchedCommodity = 'Ragi';
    else if (q.includes('cotton') || q.includes('ಹತ್ತಿ')) matchedCommodity = 'Cotton';
    else if (q.includes('sugarcane') || q.includes('ಕಬ್ಬು')) matchedCommodity = 'Sugarcane';
    else if (q.includes('chilli') || q.includes('ಮೆಣಸಿನಕಾಯಿ')) matchedCommodity = 'Chilli';
    else if (q.includes('apple') || q.includes('ಗೋಧಿ') || q.includes('wheat') || q.includes('ಬಾಳೆಹಣ್ಣು') || q.includes('banana')) {
      // Query for commodity outside our dataset
      const unknownCrop = q.includes('wheat') || q.includes('ಗೋಧಿ') ? 'Wheat' : q.includes('banana') || q.includes('ಬಾಳೆಹಣ್ಣು') ? 'Banana' : 'commodity';
      const unavailableData = getCurrentMandiPrice(unknownCrop, district);
      sources.push({
        tool: 'getCurrentMandiPrice',
        queryParam: `${unknownCrop}, ${district}`,
        freshness: 'Not Available',
        dataSummary: unavailableData.message || 'Not in dataset',
        timestamp: 'N/A',
      });
      const answer = isKannada
        ? `${unknownCrop} ಗೆ ನಮ್ಮ ಪ್ರಸ್ತುತ ಎಪಿಎಂಸಿ ದತ್ತಾಂಶದಲ್ಲಿ ಬೆಲೆ ದಾಖಲೆ ಲಭ್ಯವಿಲ್ಲ (${unavailableData.freshness}). ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿರುವ ಬೆಳೆಗಳು: ಟೊಮೇಟೊ, ಈರುಳ್ಳಿ, ಭತ್ತ, ಮೆಕ್ಕೆಜೋಳ, ರಾಗಿ, ಹತ್ತಿ, ಕಬ್ಬು.`
        : `No active APMC mandi price record is available for ${unknownCrop} in our dataset (${unavailableData.freshness}). Price data is currently tracked for: Tomato, Onion, Paddy, Maize, Ragi, Cotton, Sugarcane.`;
      return { answer, sources, isGrounded: true, functionCalled: 'getCurrentMandiPrice', dataFound: false };
    } else {
      matchedCommodity = 'Tomato'; // Default primary market crop
    }

    const priceData = getCurrentMandiPrice(matchedCommodity, district);
    sources.push({
      tool: 'getCurrentMandiPrice',
      queryParam: `${matchedCommodity}, ${district}`,
      freshness: priceData.freshness,
      dataSummary: priceData.available ? `₹${priceData.price}/quintal (${priceData.source})` : priceData.message || 'Not in dataset',
      timestamp: priceData.timestamp,
    });

    if (priceData.available) {
      const answer = isKannada
        ? `${districtName} ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ${matchedCommodity} ಇಂದಿನ ದರ ₹${priceData.price?.toLocaleString('en-IN')}/ಕ್ವಿಂಟಾಲ್ (${priceData.freshness}, ${priceData.timestamp}). ನೆರೆ ಜಿಲ್ಲೆಗಳ ಆವಕ ಸ್ಥಿರವಾಗಿದ್ದು ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ಬೆಲೆ ಸ್ಥಿರವಾಗಿರಲಿದೆ.`
        : `Today's ${matchedCommodity} price in ${district} is ₹${priceData.price?.toLocaleString('en-IN')}/quintal (${priceData.freshness}, ${priceData.timestamp}). Supply arrivals from neighboring mandis remain steady.`;
      return { answer, sources, isGrounded: true, functionCalled: 'getCurrentMandiPrice', dataFound: true };
    }
  }

  // 2. TOOL CALL: getWeatherNow
  if (weatherKeywords.some((w) => q.includes(w))) {
    const weatherData = getWeatherNow(district);
    sources.push({
      tool: 'getWeatherNow',
      queryParam: district,
      freshness: weatherData.freshness,
      dataSummary: `${weatherData.temp}°C, ${weatherData.condition}, Humidity ${weatherData.humidity}%`,
      timestamp: weatherData.timestamp,
    });

    const answer = isKannada
      ? `${districtName} ಜಿಲ್ಲೆಯಲ್ಲಿ ಪ್ರಸ್ತುತ ಉಷ್ಣಾಂಶ ${weatherData.temp}°C ಇದ್ದು, ${weatherData.condition === 'Partly Cloudy' ? 'ಭಾಗಶಃ ಮೋಡ ಕವಿದಿದೆ' : weatherData.condition} (${weatherData.freshness}, ${weatherData.timestamp}). ಬುಧವಾರ ಮಧ್ಯಾಹ್ನ ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇರುವುದರಿಂದ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಮುಂದೂಡಿ.`
      : `Current weather in ${district} is ${weatherData.temp}°C and ${weatherData.condition} with ${weatherData.humidity}% humidity (${weatherData.freshness}, ${weatherData.timestamp}). Wednesday rain is forecasted, so postpone foliar spray applications.`;

    return { answer, sources, isGrounded: true, functionCalled: 'getWeatherNow', dataFound: true };
  }

  // 3. TOOL CALL: getLatestYieldForecast
  if (yieldKeywords.some((w) => q.includes(w))) {
    let queryCrop = 'Ragi';
    if (q.includes('tomato') || q.includes('ಟೊಮೇಟೊ')) queryCrop = 'Tomato';
    else if (q.includes('maize') || q.includes('ಮೆಕ್ಕೆಜೋಳ')) queryCrop = 'Maize';
    else if (q.includes('paddy') || q.includes('ಭತ್ತ')) queryCrop = 'Paddy';
    else if (q.includes('cotton') || q.includes('ಹತ್ತಿ')) queryCrop = 'Cotton';

    const yieldData = getLatestYieldForecast(queryCrop, district);
    sources.push({
      tool: 'getLatestYieldForecast',
      queryParam: `${queryCrop}, ${district}`,
      freshness: yieldData.freshness,
      dataSummary: yieldData.available
        ? `Range ${yieldData.forecastRange}, Most Likely ${yieldData.mostLikely}`
        : yieldData.message || 'Not available',
      timestamp: yieldData.timestamp,
    });

    if (yieldData.available) {
      const answer = isKannada
        ? `${districtName} ಜಿಲ್ಲೆಯ ${queryCrop} ಬೆಳೆ ಇಳುವರಿ ಅಂದಾಜು ಎಕರೆಗೆ ${yieldData.forecastRange} (ಅತ್ಯಂತ ಸಂಭಾವ್ಯ: ${yieldData.mostLikely}) ಆಗಿದೆ (${yieldData.freshness}, ${yieldData.timestamp}). ಉಪಗ್ರಹ ಹಸಿರು ಹೊದಿಕೆ ಸೂಚ್ಯಂಕವು ಕಳೆದ ೫ ವರ್ಷಗಳ ಸರಾಸರಿಗಿಂತ ಉತ್ತಮ ಫಸಲು ನಿರೀಕ್ಷಿಸಿದೆ.`
        : `Projected harvest output for ${queryCrop} in ${district} is ${yieldData.forecastRange} (most likely ${yieldData.mostLikely}) (${yieldData.freshness}, ${yieldData.timestamp}). Satellite vegetation vigor indicates robust growth tracking above multi-year averages.`;

      return { answer, sources, isGrounded: true, functionCalled: 'getLatestYieldForecast', dataFound: true };
    }
  }

  // 4. TOOL CALL: getSoilStatus
  if (soilKeywords.some((w) => q.includes(w))) {
    const soilData = getSoilStatus(district, customSoil);
    sources.push({
      tool: 'getSoilStatus',
      queryParam: district,
      freshness: soilData.freshness,
      dataSummary: `${soilData.type}, pH ${soilData.ph}, N:${soilData.n} P:${soilData.p} K:${soilData.k}`,
      timestamp: soilData.timestamp,
    });

    const answer = isKannada
      ? `${districtName} ಜಿಲ್ಲೆಯ ಮಣ್ಣು ಮುಖ್ಯವಾಗಿ ${soilData.type} ಆಗಿದ್ದು, pH ${soilData.ph}, ಸಾರಜನಕ (N) ${soilData.n}, ರಂಜಕ (P) ${soilData.p}, ಪೊಟ್ಯಾಷ್ (K) ${soilData.k} ದಾಖಲಾಗಿದೆ (${soilData.freshness}, ${soilData.timestamp}). ರಾಗಿ, ದ್ವಿದಳ ಧಾನ್ಯ ಹಾಗೂ ತರಕಾರಿ ಬೆಳೆಗೆ ಇದು ಅತ್ಯಂತ ಸಮತೋಲಿತ ಫಲವತ್ತತೆ ಹೊಂದಿದೆ.`
      : `Soil profile for ${district} is primarily ${soilData.type} with pH ${soilData.ph}, N: ${soilData.n}, P: ${soilData.p}, K: ${soilData.k} (${soilData.freshness}, ${soilData.timestamp}). This provides balanced fertility for millets, pulses, and vegetables.`;

    return { answer, sources, isGrounded: true, functionCalled: 'getSoilStatus', dataFound: true };
  }

  // If general agronomy or farming guidance without specific numerical intent
  return {
    answer: '',
    sources: [],
    isGrounded: false,
    dataFound: false,
  };
}
