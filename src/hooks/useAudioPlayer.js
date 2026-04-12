import { useRef, useCallback, useState } from 'react';
import { useAppStore } from '../store';
import { useFetchMetaData } from './useFetchMetaData';
import { sendStationClick } from '../RadioBrowserApi';

export function useAudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadStation, setLoadStation] = useState(false);
  const [showSongInfo, setShowSongInfo] = useState(false);
  const [volume, setVolume] = useState(1.0);

  const setActiveStation = useAppStore((state) => state.setActiveStation);
  const { metaData, setGetMetaActive, setUrl } = useFetchMetaData();

  /**
   * playStation — single entry point for starting a stream.
   *
   * Consolidates what was previously split between startAudio() in Card/ListRow
   * and a useEffect watching activeStation. The old split caused a race condition:
   * startAudio attached a `canplay` listener and called audio.load(), then
   * setActiveStation triggered a useEffect that called audio.load() again, aborting
   * the pending canplay event so play() was never called.
   *
   * Now: one .load() call, one canplay listener, then setActiveStation last so the
   * store reflects the new station only after playback has been initiated.
   */
  const pendingPlayRef = useRef(null);

  const playStation = useCallback(
    (url, stationData) => {
      if (!url || !audioRef.current) return;

      const audio = audioRef.current;

      // Remove any stale canplay listener from a previous rapid-click call
      if (pendingPlayRef.current) {
        audio.removeEventListener('canplay', pendingPlayRef.current);
        pendingPlayRef.current = null;
      }

      if (!audio.paused) {
        audio.pause();
      }

      audio.src = url;
      audio.load();

      const playAudio = () => {
        pendingPlayRef.current = null;
        audio.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      };

      pendingPlayRef.current = playAudio;
      audio.addEventListener('canplay', playAudio, { once: true });

      if (stationData.type !== 'web-radio-db') {
        sendStationClick(stationData.uuid);
      }

      setActiveStation({
        name: stationData.name,
        url,
        uuid: stationData.uuid,
        image: stationData.image,
      });
    },
    [setActiveStation],
  );

  const handlePlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const handleVolumeChange = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const audioElement = (
    <audio
      ref={audioRef}
      preload='none'
      onLoadStart={() => {
        setLoadStation(true);
        setShowSongInfo(false);
        setGetMetaActive(false);
        setUrl(audioRef.current?.src);
      }}
      onPlaying={() => {
        setIsPlaying(true);
        setLoadStation(false);
        setShowSongInfo(true);
        setGetMetaActive(true);
      }}
      onPause={() => {
        setIsPlaying(false);
        setShowSongInfo(false);
        setGetMetaActive(false);
      }}
      onVolumeChange={(e) => {
        setVolume(e.target.volume);
      }}
      onError={(e) => console.log('Audioplayer: onError', e)}
    />
  );

  return {
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
  };
}
