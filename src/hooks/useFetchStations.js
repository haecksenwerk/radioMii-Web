import { useEffect, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAppStore, useSettingsStore } from '../store';
import { getItemFromStorage } from '../utils/localStorage';
import { abortCurrentRequest } from '../RadioBrowserApi';

export function useFetchStations() {
  const { stations, isLoading } = useAppStore(
    useShallow((state) => ({
      stations: state.stations,
      isLoading: state.stationsIsLoading,
    })),
  );

  const loadNextPage = useAppStore((state) => state.loadNextPage);
  const searchTerm = useAppStore((state) => state.searchTerm);
  const render = useAppStore((state) => state.render);

  const searchOptions = useAppStore(useShallow((state) => state.searchOptions));
  const hideBroken = useSettingsStore((state) => state.hideBroken);

  // Skip debounce on very first mount so the UI populates immediately
  const isFirstLoad = useRef(true);
  const debounceTimer = useRef(null);

  // Stable cache key — only changes when search parameters actually change.
  // Stored in Zustand so the guard survives component unmount/remount (e.g. tab switches).
  const searchContextKey = useMemo(
    () =>
      `${searchTerm}|${searchTerm ? searchOptions.searchMode : ''}|${searchOptions.country}|${searchOptions.order}|${searchOptions.reverse}|${searchOptions.bitrateMin}|${searchOptions.bitrateMax}|${hideBroken}`,
    [
      searchTerm,
      searchOptions.searchMode,
      searchOptions.country,
      searchOptions.order,
      searchOptions.reverse,
      searchOptions.bitrateMin,
      searchOptions.bitrateMax,
      hideBroken,
    ],
  );

  // Fetch favorites / clear state when there is no active search
  useEffect(() => {
    if (searchTerm) return;

    const VIEW = useAppStore.getState().VIEW;
    const setViewMode = useAppStore.getState().setViewMode;

    const favoritesState = getItemFromStorage('favorites');

    if (favoritesState !== null) {
      useAppStore.setState((s) => {
        s.stations = favoritesState;
      });
      favoritesState.results.length
        ? setViewMode(VIEW.FAVORITES)
        : setViewMode(VIEW.EMPTY_STATE_FAVS);
    } else {
      useAppStore.setState((s) => {
        s.stations = { results: [] };
      });
    }

    useAppStore.setState((s) => {
      s.lastSearchContext = null;
      s.currentPage = 0;
      s.hasMoreStations = false;
    });
  }, [searchTerm, render]); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger a fresh page-0 fetch whenever search parameters change.
  // Debounced at 400 ms to absorb rapid option-toggle changes; bypassed on first mount.
  useEffect(() => {
    if (!searchTerm) return;

    const delay = isFirstLoad.current ? 0 : 400;
    isFirstLoad.current = false;

    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const { lastSearchContext, fetchStations } = useAppStore.getState();

      if (lastSearchContext === searchContextKey) return;

      // Stamp the new context before fetching to prevent re-entrant duplicate calls
      useAppStore.setState((s) => {
        s.lastSearchContext = searchContextKey;
        s.stationId = '';
      });

      fetchStations(0, searchTerm, searchOptions);
    }, delay);

    return () => clearTimeout(debounceTimer.current);
  }, [searchContextKey, render]); // eslint-disable-line react-hooks/exhaustive-deps

  // Abort any in-flight request when this hook unmounts
  useEffect(() => {
    return () => abortCurrentRequest();
  }, []);

  // Force a fresh fetch regardless of cached context (e.g. manual refresh)
  const refresh = () => {
    useAppStore.setState((s) => {
      s.lastSearchContext = null;
    });
    const {
      fetchStations,
      searchTerm: term,
      searchOptions,
    } = useAppStore.getState();
    fetchStations(0, term, searchOptions);
  };

  return {
    stations: stations ?? { results: [] },
    isLoading,
    loadNextPage,
    refresh,
  };
}
