import { useEffect, useMemo } from 'react';
import { Spinner } from '../';
import { useAppStore } from '../../store';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { trimString, getSongInfo, getPlainName } from '../../utils/string';

import {
  Wrapper,
  Content,
  ImgStation,
  NameStation,
  NowPlayingWrap,
  NowPlaying,
  BoxSpinner,
  EmptyState,
} from './Infobox.styles';

export default function Infobox({ metaData, loadStation, showSongInfo }) {
  const activeStation = useAppStore((state) => state.activeStation);
  const station = trimString(getPlainName(activeStation.name), 30);
  const songInfo = useMemo(() => getSongInfo(metaData), [metaData]);
  const tickerMode = songInfo.length > 50;

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: songInfo,
        album: activeStation.name,
        artwork: [{ src: activeStation.image }],
      });
    }
  }, [songInfo, activeStation.name, activeStation.image]);

  return (
    <Wrapper>
      <Content>
        <ImgStation
          $visible={activeStation.image}
          src={activeStation.image}
          alt='station-image'
        />
        {activeStation.name === '' && (
          <EmptyState>
            <IoMusicalNotesSharp
              size={30}
              style={{ margin: 'auto', verticalAlign: 'middle' }}
            />
          </EmptyState>
        )}
        {showSongInfo ? (
          <NameStation>{station}</NameStation>
        ) : (
          <NameStation $noInfo>{station}</NameStation>
        )}

        {showSongInfo && (
          <NowPlayingWrap>
            {tickerMode ? (
              <NowPlaying $ticker>{songInfo}</NowPlaying>
            ) : (
              <NowPlaying>{songInfo}</NowPlaying>
            )}
          </NowPlayingWrap>
        )}
        <BoxSpinner>
          <Spinner $play $visible={loadStation} />
        </BoxSpinner>
      </Content>
    </Wrapper>
  );
}
