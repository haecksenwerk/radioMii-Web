import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { useAppStore, useSettingsStore } from '../../store';
import { removeMarkdown, getPlainName } from '../../utils/string';
import RadioSvg from '../../images/radio.svg';
import RadioPng from '../../images/radio.png';
import { StationMenu, ToggleHeart, StationLabels } from '..';

import {
  Wrapper,
  Content,
  IconStation,
  NameStation,
  Footer,
  ButtonWrap,
} from './ListRow.styles';

export default memo(
  function ListRow(props) {
    const [showImg, setShowImg] = useState(true);
    const [wiggleCard, setWiggleCard] = useState(false);

    const VIEW = useAppStore((state) => state.VIEW);
    const viewMode = useAppStore((state) => state.viewMode);
    const compactCard = useSettingsStore((state) => state.compactCard);
    const storeFavorite = useAppStore((state) => state.storeFavorite);
    const setStoreFavorite = useAppStore((state) => state.setStoreFavorite);

    // Stop wiggling when drag-to-reorder ends — moved out of render phase
    useEffect(() => {
      if (!storeFavorite.move) setWiggleCard(false);
    }, [storeFavorite.move]);

    const stationMenuVisible =
      viewMode === VIEW.FAVORITES && !storeFavorite.move;

    const name = useMemo(
      () => removeMarkdown(props.station.name),
      [props.station.name],
    );

    const tags = useMemo(
      () =>
        props.station.tags
          .toString()
          .split(',')
          .filter((tag) => tag.length > 0 && tag.length < 16),
      [props.station.tags],
    );

    const enabledItems = useMemo(() => {
      const hasHomepage = props.station.homepage ? 4 : 0;
      const hasMoreFavorites = props.favoritesLength > 1 ? 2 : 0;
      return hasHomepage + hasMoreFavorites;
    }, [props.station.homepage, props.favoritesLength]);

    const handlePlay = useCallback(() => {
      props.player.playStation(props.station.url_resolved, {
        name,
        uuid: props.station.stationuuid,
        type: props.station.type,
        image: showImg ? props.station.favicon : RadioPng,
      });
    }, [props.player, props.station, name, showImg]);

    const handleStoreFavorite = useCallback(
      (checked) => {
        setStoreFavorite({
          move: false,
          station: props.station,
          isFavorite: checked,
        });
      },
      [setStoreFavorite, props.station],
    );

    return (
      <Wrapper
        $compactCard={compactCard}
        $move={storeFavorite.move}
        $wiggle={wiggleCard}
        onClick={handlePlay}
      >
        <Content>
          {showImg ? (
            <IconStation
              src={props.station.favicon}
              alt='station-image'
              onError={() => setShowImg(false)}
            />
          ) : (
            <IconStation src={RadioSvg} alt='station-image' />
          )}
          <NameStation $compactCard={compactCard}>
            {getPlainName(name)}
          </NameStation>
          <ButtonWrap>
            {stationMenuVisible && (
              <StationMenu
                id={props.id}
                showDots={true}
                setWiggleCard={setWiggleCard}
                enabledItems={enabledItems}
                station={props.station}
              />
            )}
            {viewMode !== VIEW.FAVORITES && (
              <ToggleHeart
                checked={props.favorite}
                cbClicked={handleStoreFavorite}
              />
            )}
          </ButtonWrap>
          {!compactCard && (
            <Footer $compactCard={compactCard}>
              <StationLabels
                station={props.station}
                viewMode={viewMode}
                VIEW={VIEW}
                tags={tags}
                maxTags={1}
              />
            </Footer>
          )}
        </Content>
      </Wrapper>
    );
  },
  (prev, next) =>
    prev.station.stationuuid === next.station.stationuuid &&
    prev.favorite === next.favorite &&
    prev.id === next.id &&
    prev.favoritesLength === next.favoritesLength,
);
