import { useEffect } from 'react';
import { useAppStore, useSettingsStore } from './store';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import Main from './components/Main';
import Dialogs from './components/Dialogs/Dialogs';
import { isDevelop, isSafari, isTouch } from './utils/system';

export default function App() {
  // Use individual selectors to prevent object recreation
  const system = useAppStore((state) => state.system);
  const setSystem = useAppStore((state) => state.setSystem);
  const setStationId = useAppStore((state) => state.setStationId);
  const VIEW = useAppStore((state) => state.VIEW);
  const setViewMode = useAppStore((state) => state.setViewMode);
  const error = useAppStore((state) => state.error);
  const setCountries = useAppStore((state) => state.setCountries);

  // Use individual selectors for settings too
  const light = useSettingsStore((state) => state.light);
  const setModeList = useSettingsStore((state) => state.setModeList);
  const initialStart = useSettingsStore((state) => state.initialStart);
  const setInitialStart = useSettingsStore((state) => state.setInitialStart);
  const setShowTooltips = useSettingsStore((state) => state.setShowTooltips);

  useEffect(() => {
    setSystem({
      isTouch: isTouch(),
      isDevelop: isDevelop(),
      isSafari: isSafari(),
    });

    setCountries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- one-time init; setSystem and setCountries are stable Zustand actions

  useEffect(() => {
    if (system.isTouch) {
      setShowTooltips(false);

      if (initialStart) {
        setModeList(true);
        setInitialStart(false);
      }
    }
  }, [system.isTouch]); // eslint-disable-line react-hooks/exhaustive-deps -- intentional: only re-run on isTouch change; setters and initialStart are read once at touch-init

  useEffect(() => {
    // search for URI stationUUID param like:
    // .../?id=963ccae5-0601-11e8-ae97-52543be04c81

    const query = new URLSearchParams(window.location.search);
    const uuid = query.get('id');

    if (uuid) {
      setStationId(uuid);

      const url = new URL(window.location);
      url.searchParams.delete('id');
      window.history.replaceState(null, null, url);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- one-time URL param read on mount; setStationId is a stable Zustand action

  useEffect(() => {
    if (error.set) {
      setViewMode(VIEW.EMPTY_STATE_ERROR);
    }
  }, [error.set]); // eslint-disable-line react-hooks/exhaustive-deps -- intentional: only error.set is the signal; VIEW and setViewMode are stable constants/actions

  return (
    <div className='App'>
      <ThemeProvider theme={light ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Main />
        <Dialogs />
      </ThemeProvider>
    </div>
  );
}
