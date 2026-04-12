import { fileOpen, fileSave } from 'browser-fs-access';
import { getItemFromStorage } from './localStorage';
import { htmlEncode } from './string';
import i18n from '../i18n';

export async function loadFavorites(forceRender, setMsgDialog) {
  try {
    const blob = await fileOpen({
      description: 'RadioMii Favorites File',
      extensions: ['.rmf'],
      mimeTypes: ['application/json'],
    });

    const data = await blob.text();
    const content = JSON.parse(data);

    if (content.results) {
      localStorage.setItem('favorites', data);
      forceRender();
    } else {
      throw new Error('Empty or wrong file');
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      setMsgDialog({
        show: true,
        title: i18n.t('storage.title'),
        content: i18n.t('storage.body'),
      });
    }

    console.error('loadFavorites: ', error);
  }
}

export async function saveFavorites() {
  const favorites = getItemFromStorage('favorites');
  const string = JSON.stringify(favorites);

  const blob = new Blob([string], {
    type: 'application/json',
  });

  const options = {
    fileName: `favorites.rmf`,
    description: 'RadioMii Favorites File',
    extensions: ['.rmf'],
  };

  try {
    await fileSave(blob, options);
  } catch (error) {
    console.error('saveFavorites: ', error);
  }
}

export async function savePlaylist(type) {
  let strList = '';

  const state = getItemFromStorage('favorites');

  if (type === 'm3u') {
    strList = '#EXTM3U\n';

    state &&
      state.results.map((station, idx) => {
        strList += `#EXTINF:1,${station.name}\n${station.url}\n`;
        return 1;
      });
  } else if (type === 'xspf') {
    strList =
      '<?xml version="1.0" encoding="UTF-8"?>\n<playlist version="1" xmlns="http://xspf.org/ns/0/">\n  <trackList>\n';

    state &&
      state.results.map((station, idx) => {
        strList += `    <track>\n      <location>${
          station.url
        }</location>\n      <title>${htmlEncode(
          station.name
        )}</title>\n      <info>${
          station.homepage
        }</info>\n      <image>${htmlEncode(
          station.favicon
        )}</image>\n    </track>\n`;
        return 1;
      });

    strList += '  </trackList>\n</playlist>\n';
  } else {
    console.error('savePlaylist: no mime-type');
    return;
  }

  const mimeType = type === 'm3u' ? 'audio/mpegurl' : 'application/xspf+xml';

  const blob = new Blob([strList], {
    type: mimeType,
  });

  const options = {
    fileName: 'favorites.' + type,
    description: 'RadioMii Favorites File',
    extensions: ['.' + type],
  };

  try {
    await fileSave(blob, options);
  } catch (error) {
    console.error('savePlaylist: ', error);
  }
}
