import { useState, useRef, useMemo } from 'react';
import { useAppStore, useSettingsStore } from '../store';
import { useHotkeys } from '../hooks/useHotkeys';
import { useFetchStations } from '../hooks/useFetchStations';
import { useStoreFavorites } from '../hooks/useStoreFavorites';
import { getItemFromStorage } from '../utils/localStorage';
import { Card, ListRow, Grid } from '.';

import { EmptyState, Header, SearchBar, Footer } from '.';

const Main = ({ ...props }) => {
  const { stations, isLoading } = useFetchStations();
  const [virtualKey, setVirtualKey] = useState(false);
  const modeList = useSettingsStore((state) => state.modeList);
  const player = useRef(null);
  const cardItemsRef = useRef(null);

  // Use individual selectors to prevent object recreation
  const VIEW = useAppStore((state) => state.VIEW);
  const viewMode = useAppStore((state) => state.viewMode);
  const system = useAppStore((state) => state.system);
  const storeFavorite = useAppStore((state) => state.storeFavorite);
  const render = useAppStore((state) => state.render);

  // Re-read favorites from localStorage only when forceRender() fires
  // (i.e. when a favourite was added, removed, or reordered)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const favorites = useMemo(() => getItemFromStorage('favorites'), [render]);
  const favoriteUUIDs = useMemo(
    () => new Set(favorites?.results.map((e) => e.stationuuid)),
    [favorites],
  );

  const { setKey } = useStoreFavorites();

  const getCardRefsMap = () => {
    if (!cardItemsRef.current) {
      cardItemsRef.current = new Map();
    }

    return cardItemsRef.current;
  };

  const scrollToCard = (itemId) => {
    const map = getCardRefsMap();
    const node = map.get(itemId);

    node.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  useHotkeys(setKey, virtualKey, setVirtualKey, player, scrollToCard);

  const showEmpty =
    viewMode === VIEW.EMPTY_STATE_FAVS ||
    viewMode === VIEW.EMPTY_STATE_RESULTS ||
    viewMode === VIEW.EMPTY_STATE_ERROR;

  return (
    <>
      <Header player={player} {...props} />
      <SearchBar />
      {showEmpty ? (
        <EmptyState />
      ) : stations ? (
        <Grid isLoading={isLoading}>
          {stations.results.map((entry, idx) => {
            return (
              <div
                key={entry.stationuuid}
                ref={(node) => {
                  const map = getCardRefsMap();
                  node
                    ? map.set(entry.stationuuid, node)
                    : map.delete(entry.stationuuid);
                }}
              >
                {modeList ? (
                  <ListRow
                    id={idx}
                    player={player}
                    station={entry}
                    favorite={favoriteUUIDs.has(entry.stationuuid)}
                    favoritesLength={favorites?.results.length ?? 0}
                  />
                ) : (
                  <Card
                    id={idx}
                    player={player}
                    station={entry}
                    favorite={favoriteUUIDs.has(entry.stationuuid)}
                    favoritesLength={favorites?.results.length ?? 0}
                  />
                )}
              </div>
            );
          })}
        </Grid>
      ) : null}
      <Footer
        show={storeFavorite.move && system.isTouch}
        setVirtualKey={setVirtualKey}
      />
    </>
  );
};

export default Main;
