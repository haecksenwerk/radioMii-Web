import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  fetchCountries,
  searchStations,
  getStationById,
  getStationsMostVoted,
  getStationsMostClicked,
  getStationsRecentlyClicked,
  abortCurrentRequest,
} from './RadioBrowserApi';
import { clearStorage } from './utils/localStorage';

// Constants for view modes - moved outside store for better performance
export const VIEW_MODES = Object.freeze({
  EMPTY_STATE_FAVS: 0,
  EMPTY_STATE_RESULTS: 1,
  EMPTY_STATE_ERROR: 2,
  FAVORITES: 3,
  RESULTS: 4,
  UUID: 5,
});

// Initial state objects for better maintainability
const INITIAL_SYSTEM = {
  isTouch: false,
  isMobile: false,
  isSafari: false,
  isDevelop: false,
};

const INITIAL_MSG_DIALOG = {
  show: false,
  title: '',
  content: null,
  footer: '',
};

const INITIAL_SHOW_DIALOG = {
  tips: false,
  info: false,
  deleteFavs: false,
};

const INITIAL_ACTIVE_STATION = {
  image: '',
  name: '',
  url: '',
  uuid: '',
};

const INITIAL_STORE_FAVORITE = {
  move: false,
  station: null,
  isFavorite: undefined,
};

const INITIAL_ERROR = {
  set: false,
  title: '',
  msg: '',
  action: '',
};

const INITIAL_SEARCH_OPTIONS = {
  searchMode: 'name',
  country: '',
  order: 'clickcount',
  orderIndex: 1,
  bitrateMin: 0,
  bitrateMax: '',
  reverse: true,
  reverseIndex: 1,
};

// Module-level counter to detect stale async completions (aborted fetches clearing loading state)
let activeFetchId = 0;

// App store with immer for cleaner immutable updates
const appStore = immer((set, get) => ({
  // System information
  system: { ...INITIAL_SYSTEM },
  setSystem: (input) =>
    set((state) => {
      Object.assign(state.system, input);
    }),

  // Dialog states
  msgDialog: { ...INITIAL_MSG_DIALOG },
  setMsgDialog: (input) =>
    set((state) => {
      Object.assign(state.msgDialog, input);
    }),
  resetMsgDialog: () =>
    set((state) => {
      state.msgDialog = { ...INITIAL_MSG_DIALOG };
    }),

  showDialog: { ...INITIAL_SHOW_DIALOG },
  setShowDialog: (input) =>
    set((state) => {
      Object.assign(state.showDialog, input);
    }),
  resetDialogs: () =>
    set((state) => {
      state.showDialog = { ...INITIAL_SHOW_DIALOG };
    }),

  // Active station
  activeStation: { ...INITIAL_ACTIVE_STATION },
  setActiveStation: (input) =>
    set((state) => {
      Object.assign(state.activeStation, input);
    }),
  clearActiveStation: () =>
    set((state) => {
      state.activeStation = { ...INITIAL_ACTIVE_STATION };
    }),

  // Favorites management
  storeFavorite: { ...INITIAL_STORE_FAVORITE },
  setStoreFavorite: (input) =>
    set((state) => {
      Object.assign(state.storeFavorite, input);
    }),

  // Error handling
  error: { ...INITIAL_ERROR },
  setError: (input) =>
    set((state) => {
      Object.assign(state.error, input);
    }),
  clearError: () =>
    set((state) => {
      state.error = { ...INITIAL_ERROR };
    }),

  // View constants and state
  VIEW: VIEW_MODES,
  viewMode: VIEW_MODES.EMPTY_STATE_FAVS,
  setViewMode: (mode) =>
    set((state) => {
      state.viewMode = mode;
    }),

  // Search configuration
  searchOptions: { ...INITIAL_SEARCH_OPTIONS },
  setSearchOptions: (input) =>
    set((state) => {
      Object.assign(state.searchOptions, input);
    }),
  resetSearchOptions: () =>
    set((state) => {
      state.searchOptions = { ...INITIAL_SEARCH_OPTIONS };
    }),

  // Countries data
  countries: [],
  setCountries: async () => {
    try {
      const result = await fetchCountries();
      set((state) => {
        state.countries = result || [];
      });
    } catch (error) {
      console.error('Error fetching countries:', error);
      set((state) => {
        state.countries = [];
      });
    }
  },
  clearCountries: () =>
    set((state) => {
      state.countries = [];
    }),

  // Stations management
  stations: null,
  lastFetched: null,
  stationsIsLoading: false,
  hasMoreStations: false,
  lastSearchContext: null,
  currentPage: 0,
  setStations: (stations) =>
    set((state) => {
      state.stations = stations;
      state.lastFetched = Date.now();
    }),
  clearStations: () =>
    set((state) => {
      state.stations = null;
      state.lastFetched = null;
    }),
  // Add stations to existing list (for pagination)
  appendStations: (newStations) =>
    set((state) => {
      if (state.stations && newStations) {
        state.stations.results.push(...newStations.results);
      } else {
        state.stations = newStations;
      }
      state.lastFetched = Date.now();
    }),

  // Load more functionality
  loadMore: false,
  toggleLoadMore: () =>
    set((state) => {
      state.loadMore = !state.loadMore;
    }),

  // Fetch stations and handle all search modes
  fetchStations: async (page, searchTerm, searchOptions) => {
    abortCurrentRequest();
    const fetchId = ++activeFetchId;

    const { hideBroken, compactCard } = useSettingsStore.getState();
    const maxStationsPage = compactCard ? 50 : 30;

    const VIEW = VIEW_MODES;

    const parseSearchCommand = (term) => {
      if (term.charAt(0) !== '/') {
        return { mode: 'regular', countryCode: null };
      }
      const commandMap = {
        '/votes': 'most_voted',
        '/clicks': 'most_clicked',
        '/recent': 'recently_clicked',
        '/webrad': 'web_radio',
      };
      if (commandMap[term]) {
        return { mode: commandMap[term], countryCode: null };
      }
      if (term.length === 3) {
        return { mode: 'country_code', countryCode: term.substring(1, 3) };
      }
      return { mode: 'regular', countryCode: null };
    };

    const buildQuery = (term, countryCode, options) => {
      if (countryCode) return { countrycode: countryCode, ...options };
      const searchMode = searchOptions.searchMode;
      return {
        name: searchMode === 'name' ? term : '',
        tag: searchMode === 'genre' ? term : '',
        ...options,
      };
    };

    set((state) => {
      state.stationsIsLoading = true;
      if (page === 0) state.hasMoreStations = false;
    });

    try {
      let stationResults = null;
      const stationId = get().stationId;
      const { mode, countryCode } = parseSearchCommand(searchTerm);

      if (stationId) {
        stationResults = await getStationById([stationId]);
      } else {
        if (
          process.env.NODE_ENV === 'development' &&
          searchTerm === '/clstor'
        ) {
          clearStorage();
          set((state) => {
            state.stationsIsLoading = false;
          });
          return;
        }

        const options = {
          country: searchOptions.country,
          bitrateMin: searchOptions.bitrateMin,
          bitrateMax: searchOptions.bitrateMax,
          order: searchOptions.order,
          reverse: searchOptions.reverse,
          hidebroken: hideBroken,
          limit: maxStationsPage,
          offset: page,
        };

        const query = buildQuery(searchTerm, countryCode, options);

        const fetchMethods = {
          // eslint-disable-next-line global-require
          web_radio: () =>
            require('./hooks/useParseWebRadioJson').fetchWebRadioStations(
              searchOptions.bitrateMin,
            ),
          recently_clicked: () => getStationsRecentlyClicked(query),
          most_clicked: () => getStationsMostClicked(query),
          most_voted: () => getStationsMostVoted(query),
          country_code: () => searchStations(query),
          regular: () => searchStations(query),
        };

        stationResults = await (fetchMethods[mode] ?? fetchMethods.regular)();
      }

      // Guard against stale results if a newer fetch was triggered while awaiting
      if (activeFetchId !== fetchId) return;

      // Handle pagination
      const hasMore =
        stationResults.length >= maxStationsPage && mode !== 'web_radio';
      set((state) => {
        state.hasMoreStations = hasMore;
        state.currentPage = hasMore ? page + maxStationsPage : page;
      });

      // Update stations
      set((state) => {
        if (page > 0) {
          if (state.stations) {
            state.stations.results.push(...stationResults);
          } else {
            state.stations = { results: stationResults };
          }
        } else {
          state.stations = { results: stationResults };
        }
        state.lastFetched = Date.now();
      });

      // Set view mode
      if (get().stationId && stationResults.length) {
        set((state) => {
          state.viewMode = VIEW.UUID;
        });
      } else if (stationResults.length) {
        set((state) => {
          state.viewMode = VIEW.RESULTS;
        });
      } else {
        set((state) => {
          state.viewMode = VIEW.EMPTY_STATE_RESULTS;
        });
      }
    } catch (error) {
      if (activeFetchId !== fetchId) return;
      if (error && error.name !== 'AbortError') {
        set((state) => {
          state.error = {
            set: true,
            title: 'Fetch stations',
            msg: 'An error occurred - please refresh the browser',
            action: '',
          };
        });
      }
    } finally {
      if (activeFetchId === fetchId) {
        set((state) => {
          state.stationsIsLoading = false;
        });
      }
    }
  },

  // Trigger next page load using current stored page offset
  loadNextPage: () => {
    const { currentPage, searchTerm, fetchStations, hasMoreStations } = get();
    if (!hasMoreStations || !searchTerm) return;
    const { searchOptions } = get();
    fetchStations(currentPage, searchTerm, searchOptions);
  },

  // Search functionality
  searchTerm: '',
  setSearchTerm: (term) =>
    set((state) => {
      state.searchTerm = typeof term === 'string' ? term : '';
    }),
  clearSearchTerm: () =>
    set((state) => {
      state.searchTerm = '';
    }),

  // UI state
  settingsUnfold: false,
  toggleShowSettings: () =>
    set((state) => {
      state.settingsUnfold = !state.settingsUnfold;
    }),

  defKeysEnabled: false,
  setDefKeysEnabled: (enabled) =>
    set((state) => {
      state.defKeysEnabled = Boolean(enabled);
    }),

  // Station ID for direct access
  stationId: '',
  setStationId: (id) =>
    set((state) => {
      state.stationId = id || '';
    }),
  clearStationId: () =>
    set((state) => {
      state.stationId = '';
    }),

  // Force re-render trigger
  render: 0,
  forceRender: () =>
    set((state) => {
      state.render += 1;
    }),

  // Song info display
  showSongInfo: false,
  setShowSongInfo: (show) =>
    set((state) => {
      state.showSongInfo = Boolean(show);
    }),

  // Metadata fetching
  fetchMetadata: false,
  setFetchMetadata: (fetch) =>
    set((state) => {
      state.fetchMetadata = Boolean(fetch);
    }),

  // Info spinner
  showInfoSpinner: false,
  setShowInfoSpinner: (show) =>
    set((state) => {
      state.showInfoSpinner = Boolean(show);
    }),

  // Batch operations for better performance
  resetAppState: () =>
    set((state) => {
      state.msgDialog = { ...INITIAL_MSG_DIALOG };
      state.showDialog = { ...INITIAL_SHOW_DIALOG };
      state.error = { ...INITIAL_ERROR };
      state.searchTerm = '';
      state.stationId = '';
      state.showSongInfo = false;
      state.fetchMetadata = false;
      state.showInfoSpinner = false;
    }),

  // Toggle multiple UI states at once
  toggleUIStates: (states) =>
    set((state) => {
      if (states.settingsUnfold !== undefined) {
        state.settingsUnfold = states.settingsUnfold;
      }
      if (states.showSongInfo !== undefined) {
        state.showSongInfo = states.showSongInfo;
      }
      if (states.fetchMetadata !== undefined) {
        state.fetchMetadata = states.fetchMetadata;
      }
    }),
}));

// Settings store with persistence and immer
const settingsStore = persist(
  immer((set) => ({
    initialStart: true,
    setInitialStart: (value) =>
      set((state) => {
        state.initialStart = Boolean(value);
      }),

    hqBitrate: 128,
    setHqBitrate: (bitrate) =>
      set((state) => {
        const validBitrates = [128, 192, 256];
        state.hqBitrate = validBitrates.includes(bitrate) ? bitrate : 128;
      }),

    hideBroken: false,
    setHideBroken: (hide) =>
      set((state) => {
        state.hideBroken = Boolean(hide);
      }),

    showTooltips: true,
    setShowTooltips: (show) =>
      set((state) => {
        state.showTooltips = Boolean(show);
      }),

    modeList: false,
    setModeList: (list) =>
      set((state) => {
        state.modeList = Boolean(list);
      }),

    light: true,
    toggleLight: () =>
      set((state) => {
        state.light = !state.light;
      }),
    setLight: (isLight) =>
      set((state) => {
        state.light = Boolean(isLight);
      }),

    compactCard: false,
    toggleCompact: () =>
      set((state) => {
        state.compactCard = !state.compactCard;
      }),
    setCompactCard: (compact) =>
      set((state) => {
        state.compactCard = Boolean(compact);
      }),
  })),
  {
    name: 'mii_settings',
    version: 1, // Add versioning for future migrations
  },
);

export const useAppStore = create(appStore);
export const useSettingsStore = create(settingsStore);

// Optimized selectors to prevent unnecessary re-renders
export const useViewMode = () => useAppStore((state) => state.viewMode);
export const useActiveStation = () =>
  useAppStore((state) => state.activeStation);
export const useSearchTerm = () => useAppStore((state) => state.searchTerm);
export const useSearchOptions = () =>
  useAppStore((state) => state.searchOptions);
export const useStations = () => useAppStore((state) => state.stations);
export const useError = () =>
  useAppStore(
    (state) => state.error,
    // Add shallow comparison to prevent unnecessary re-renders
    (a, b) =>
      a.set === b.set &&
      a.title === b.title &&
      a.msg === b.msg &&
      a.action === b.action,
  );
export const useSystem = () => useAppStore((state) => state.system);

// Settings selectors
export const useTheme = () => useSettingsStore((state) => state.light);
export const useCompactMode = () =>
  useSettingsStore((state) => state.compactCard);
export const useTooltips = () =>
  useSettingsStore((state) => state.showTooltips);

// Combined selectors for related data
export const useDialogStates = () =>
  useAppStore(
    (state) => ({
      msgDialog: state.msgDialog,
      showDialog: state.showDialog,
    }),
    // Add shallow comparison
    (a, b) => a.msgDialog === b.msgDialog && a.showDialog === b.showDialog,
  );

export const useStationData = () =>
  useAppStore(
    (state) => ({
      stations: state.stations,
      lastFetched: state.lastFetched,
      activeStation: state.activeStation,
    }),
    // Add shallow comparison to prevent unnecessary re-renders
    (a, b) =>
      a.stations === b.stations &&
      a.lastFetched === b.lastFetched &&
      a.activeStation === b.activeStation,
  );
