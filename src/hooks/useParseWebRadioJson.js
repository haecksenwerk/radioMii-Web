import { v4 as uuidv4 } from 'uuid';

const URL_IMAGES = 'https://jcorporation.github.io/webradiodb/db/pics/';

const URL_STATIONS =
  'https://jcorporation.github.io/webradiodb/db/index/webradios.min.json';

let cachedStations = null;
let cacheTimestamp = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000;

export const fetchWebRadioStations = async (bitrateMin = 0) => {
  if (cachedStations && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedStations;
  }

  try {
    const response = await fetch(URL_STATIONS);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch WebRadioDB JSON data: ${response.statusText}`,
      );
    }

    const data = await response.json();

    const mappedData = Object.entries(data)
      .filter(([key, value]) => {
        const supportedCodecs = ['MP3', 'AAC', 'AAC+', 'MPEG'];

        if (!supportedCodecs.includes(value.Codec)) {
          return false;
        }

        if (value.Bitrate < bitrateMin) {
          return false;
        }

        return true;
      })
      .map(([key, value]) => {
        return {
          type: 'web-radio-db',
          stationuuid: uuidv4(),
          votes: 0,
          clickcount: 0,
          description: value.Description || '',
          tags: value.Genre || [],
          name: value.Name || '',
          favicon: URL_IMAGES + value.Image || '',
          homepage: value.Homepage || '',
          country: value.Country || '',
          state: value.Region || '',
          language: value.Languages || [],
          codec: value.Codec || '',
          bitrate: value.Bitrate || 0,
          lastchangetime_iso8601: value['Last-Modified']
            ? new Date(value['Last-Modified'] * 1000).toISOString()
            : null,
          url_resolved: value.StreamUri || '',
          url: value.StreamUri || '',
        };
      });

    cachedStations = mappedData;
    cacheTimestamp = Date.now();

    return mappedData;
  } catch (error) {
    console.error('Error fetching WebRadioDB JSON data:', error);
    return [];
  }
};
