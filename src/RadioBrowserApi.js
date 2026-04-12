import axios from 'axios';

let radioBrowserUrl = undefined;
let radioBrowserUrlTimestamp = 0;
let currentAbortController = null;

const URL_HTTP = 'http://all.api.radio-browser.info/json';
const URL_HTTPS = 'https://all.api.radio-browser.info/json';

const TIMEOUTS = {
  BASE_URL: 10000,
  DEFAULT: 15000,
  EXTENDED: 20000,
};

// Re-resolve server after 1 hour to recover from dead servers
const BASE_URL_TTL = 60 * 60 * 1000;

let fixedServer = URL_HTTPS;

if (window.location.protocol === 'http:') {
  fixedServer = URL_HTTP;
}

export const abortCurrentRequest = () => {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }
};

function handleError(error) {
  if (axios.isCancel(error)) {
    const abortError = new Error('Request aborted');
    abortError.name = 'AbortError';
    throw abortError;
  }

  if (error.response) {
    console.error('Server Error:', {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
      url: error.config?.url,
    });
  } else {
    console.error('Network Error:', {
      message: error.message,
      url: error.config?.url || 'unknown',
    });
  }

  throw error;
}

async function fetchBaseUrls() {
  try {
    const result = await axios({
      method: 'GET',
      baseURL: fixedServer,
      url: '/servers',
      timeout: TIMEOUTS.BASE_URL,
    });

    const servers = result.data;
    if (!servers || servers.length === 0) {
      throw new Error('No servers available');
    }

    return servers.map((server) => `https://${server.name}/json`);
  } catch (error) {
    console.warn('Failed to fetch dynamic servers, using fallback', error);
    return [
      'https://de1.api.radio-browser.info/json',
      'https://de2.api.radio-browser.info/json',
    ];
  }
}

async function getBaseUrl() {
  const baseUrls = await fetchBaseUrls();
  return baseUrls[Math.floor(Math.random() * baseUrls.length)];
}

function invalidateBaseUrl() {
  radioBrowserUrl = undefined;
  radioBrowserUrlTimestamp = 0;
}

function isBaseUrlExpired() {
  return Date.now() - radioBrowserUrlTimestamp > BASE_URL_TTL;
}

async function createExtRequest(url, queryParams) {
  // Abort any previous request
  if (currentAbortController) {
    currentAbortController.abort();
  }

  // Create a new AbortController for this request
  const abortController = new AbortController();
  currentAbortController = abortController;

  let baseUrl;
  if (radioBrowserUrl === undefined || isBaseUrlExpired()) {
    radioBrowserUrl = getBaseUrl();
    radioBrowserUrlTimestamp = Date.now();
  }

  try {
    baseUrl = await radioBrowserUrl;
  } catch (error) {
    invalidateBaseUrl();
    if (currentAbortController === abortController) {
      currentAbortController = null;
    }
    throw error;
  }

  // Check if request was aborted while waiting for base URL
  if (abortController.signal.aborted) {
    if (currentAbortController === abortController) {
      currentAbortController = null;
    }
    const abortError = new Error('Request aborted');
    abortError.name = 'AbortError';
    throw abortError;
  }

  try {
    const result = await axios({
      method: 'POST',
      baseURL: baseUrl,
      url,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams(queryParams).toString(),
      signal: abortController.signal,
      timeout: TIMEOUTS.EXTENDED,
    });

    return result.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      invalidateBaseUrl();
    }
    handleError(error);
  } finally {
    // Only clear if this is still the current controller
    if (currentAbortController === abortController) {
      currentAbortController = null;
    }
  }
}

export async function searchStations(queryParams) {
  return createExtRequest('/stations/search', queryParams);
}

export async function getStationsMostClicked(queryParams) {
  return createExtRequest('/stations/topclick', queryParams);
}

export async function getStationsMostVoted(queryParams) {
  return createExtRequest('/stations/topvote', queryParams);
}

export async function getStationsRecentlyClicked(queryParams) {
  return createExtRequest('/stations/lastclick', queryParams);
}

async function createRequest(url, isOptional = false) {
  let baseUrl;
  if (radioBrowserUrl === undefined || isBaseUrlExpired()) {
    radioBrowserUrl = getBaseUrl();
    radioBrowserUrlTimestamp = Date.now();
  }

  try {
    baseUrl = await radioBrowserUrl;
  } catch (error) {
    invalidateBaseUrl();
    throw error;
  }

  try {
    const result = await axios({
      method: 'GET',
      baseURL: baseUrl,
      url,
      timeout: TIMEOUTS.DEFAULT,
    });

    return result.data;
  } catch (error) {
    if (!axios.isCancel(error)) {
      invalidateBaseUrl();
    }
    if (isOptional) {
      console.warn(`Optional request failed for ${url}:`, error.message);
    }
    handleError(error);
  }
}

export function fetchCountries() {
  return createRequest('/countries?order=name');
}

export function fetchLanguages() {
  return createRequest('/languages');
}

export function getStationById(stationId) {
  return createRequest(`/stations/byuuid?uuids=${stationId}`);
}

export function sendStationClick(stationId) {
  return createRequest(`/url/${stationId}`, true)
    .then((result) => {
      return { success: true, data: result };
    })
    .catch((error) => {
      console.warn(
        'Failed to send station click (playback will continue):',
        error.message,
      );
      return { success: false, error };
    });
}

export function voteForStation(stationId) {
  return createRequest(`/vote/${stationId}`, true)
    .then((result) => {
      return { success: true, data: result };
    })
    .catch((error) => {
      console.warn('Failed to vote for station:', error.message);
      return { success: false, error };
    });
}
