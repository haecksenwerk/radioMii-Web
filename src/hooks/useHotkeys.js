import { useEffect } from 'react';
import { useAppStore, useSettingsStore } from '../store';
import { useKeyPress } from './useKeyPress';

const HOTKEYS = [
  'c',
  'd',
  'g',
  'l',
  'n',
  's',
  '+',
  '-',
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'Enter',
  'Escape',
  ' ',
];

export const useHotkeys = (
  setKey,
  virtualKey,
  setVirtualKey,
  player,
  scrollToCard,
) => {
  const storeFavorite = useAppStore((state) => state.storeFavorite);
  const defKeysEnabled = useAppStore((state) => state.defKeysEnabled);

  const setStoreFavorite = useAppStore((state) => state.setStoreFavorite);
  const toggleShowSettings = useAppStore((state) => state.toggleShowSettings);

  const setSearchOptions = useAppStore((state) => state.setSearchOptions);

  const toggleLight = useSettingsStore((state) => state.toggleLight);
  const toggleCompact = useSettingsStore((state) => state.toggleCompact);

  const modeList = useSettingsStore((state) => state.modeList);
  const setModeList = useSettingsStore((state) => state.setModeList);

  function onKeyPress(event) {
    if (
      this !== event.target &&
      (/textarea|select/i.test(event.target.nodeName) ||
        event.target.type === 'text')
    ) {
      return;
    }

    const path = player.current;
    const volume = player.current.volume;

    switch (event.key) {
      case 'c':
        toggleCompact();
        break;
      case 'd':
        setModeList(!modeList);
        break;
      case 'g':
        setSearchOptions({ searchMode: 'genre' });
        break;
      case 'l':
        toggleLight();
        break;
      case 'n':
        setSearchOptions({ searchMode: 'name' });
        break;
      case 's':
        toggleShowSettings();
        break;
      case '+':
        if (volume <= 0.9) {
          path.volume = volume + 0.1;
        } else {
          path.volume = 1;
        }
        break;
      case '-':
        if (volume >= 0.1) {
          path.volume = volume - 0.1;
        } else {
          path.volume = 0;
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'ArrowDown':
        setKey(event.key);

        if (storeFavorite.move) {
          scrollToCard(storeFavorite.station.stationuuid);
        }
        break;
      case ' ':
        if (path.src) {
          path.paused ? path.play() : path.pause();
        }
        break;
      case 'Escape':
      case 'Enter':
        setStoreFavorite({ move: false });
        break;
      default:
    }
  }

  useKeyPress(HOTKEYS, defKeysEnabled, onKeyPress);

  useEffect(() => {
    if (!virtualKey) return;

    setKey(virtualKey);

    if (storeFavorite.move) {
      scrollToCard(storeFavorite.station.stationuuid);
    }

    setVirtualKey(false);
  }, [virtualKey]); // eslint-disable-line react-hooks/exhaustive-deps
};
