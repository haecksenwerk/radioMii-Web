import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { getItemFromStorage, storeItem } from '../utils/localStorage';

export function useStoreFavorites() {
  const [key, setKey] = useState('');

  const forceRender = useAppStore((state) => state.forceRender);
  const setStoreFavorite = useAppStore((state) => state.setStoreFavorite);
  const storeFavorite = useAppStore((state) => state.storeFavorite);

  useEffect(() => {
    if (!storeFavorite.move && storeFavorite.isFavorite === undefined && !key)
      return;

    const initialState = {
      results: [],
    };

    let array = getItemFromStorage('favorites');

    if (!array) {
      array = initialState;
    }

    // change favorites order
    if (storeFavorite.move) {
      const found = array.results.findIndex(
        (fav) => fav.stationuuid === storeFavorite.station.stationuuid,
      );
      const position = found === -1 ? 0 : found;

      array.results.splice(position, 1);

      switch (key) {
        case 'ArrowUp':
          array.results.splice(0, 0, storeFavorite.station);
          break;
        case 'ArrowLeft':
          if (position >= 1) {
            array.results.splice(position - 1, 0, storeFavorite.station);
          } else {
            array.results.splice(position, 0, storeFavorite.station);
          }
          break;
        case 'ArrowRight':
          array.results.splice(position + 1, 0, storeFavorite.station);
          break;
        case 'ArrowDown':
          array.results.push(storeFavorite.station);
          break;
        default:
          array.results.splice(position, 0, storeFavorite.station);
      }

      setKey('');
    } else {
      if (storeFavorite.isFavorite !== undefined) {
        // remove favorite from local storage
        if (!storeFavorite.isFavorite) {
          array.results = array.results.filter(
            (fav) => fav.stationuuid !== storeFavorite.station.stationuuid,
          );
        }

        // add favorite and avoid storing duplicates
        if (
          storeFavorite.isFavorite &&
          !array.results.some(
            (e) => e.stationuuid === storeFavorite.station.stationuuid,
          )
        ) {
          array.results.push(storeFavorite.station);
        }

        setStoreFavorite({
          isFavorite: undefined,
        });
      }
    }

    storeItem('favorites', array);

    if (storeFavorite.isFavorite !== undefined || key) {
      forceRender();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeFavorite, key]);

  return { setKey };
}
