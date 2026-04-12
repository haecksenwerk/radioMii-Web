import { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';

import { Burger, Menu, Infobox } from '../';
import './player.css';
import Logo from '../../images/logo.png';
import {
  Wrapper,
  Content,
  LogoImg,
  InfoBoxWrap,
  IconPlay,
} from './Header.styles';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';
import {
  PiSpeakerSimpleLowFill,
  PiSpeakerSimpleHighFill,
} from 'react-icons/pi';

export default function Header({ ...props }) {
  const [open, setOpen] = useState(false);

  const activeStation = useAppStore((state) => state.activeStation);
  const setShowDialog = useAppStore((state) => state.setShowDialog);
  const system = useAppStore((state) => state.system); // Use the custom hook for all audio-related logic
  const {
    audioRef,
    audioElement,
    isPlaying,
    loadStation,
    showSongInfo,
    volume,
    metaData,
    playStation,
    handlePlay,
    handlePause,
    handleVolumeChange,
  } = useAudioPlayer();

  // Expose audio ref and playStation to parent component
  useEffect(() => {
    if (props.player && audioRef.current) {
      props.player.current = audioRef.current;
      props.player.playStation = playStation;
    }
  }, [props.player, audioRef, playStation]);

  // Custom handlers that check for active station
  const handlePlayWithStation = () => {
    if (audioRef.current && activeStation?.url) {
      handlePlay();
    }
  };

  const handlePauseWithCheck = () => {
    if (audioRef.current) {
      handlePause();
    }
  };

  return (
    <Wrapper>
      <Content>
        <Burger className='burger' open={open} setOpen={setOpen} />
        <Menu open={open} setOpen={setOpen} id={'main-menu'} />
        <LogoImg
          className='burger'
          src={Logo}
          alt='yorda-logo'
          onClick={() => {
            setShowDialog({ info: true });
          }}
        />
        <InfoBoxWrap className='info'>
          <Infobox
            metaData={metaData}
            loadStation={loadStation}
            showSongInfo={showSongInfo}
            {...props}
          />
        </InfoBoxWrap>

        <div className='controls' style={system.isTouch ? { width: 72 } : {}}>
          {audioElement}

          <div className='audio-controls'>
            <IconPlay
              onClick={isPlaying ? handlePauseWithCheck : handlePlayWithStation}
              style={isPlaying ? {} : { paddingLeft: '4px' }}
            >
              {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
            </IconPlay>

            {!system.isTouch && (
              <div className='volume-control'>
                <PiSpeakerSimpleLowFill className='speaker-icon' />
                <input
                  type='range'
                  min='0'
                  max='1'
                  step='0.1'
                  value={volume}
                  onChange={(e) =>
                    handleVolumeChange(parseFloat(e.target.value))
                  }
                  className='volume-slider'
                />
                <PiSpeakerSimpleHighFill className='speaker-icon' />
              </div>
            )}
          </div>
        </div>
      </Content>
    </Wrapper>
  );
}
