export const compactFormatter = Intl.NumberFormat('en', {
  notation: 'compact',
});

export function trimString(str, len) {
  return str.length > len ? str.substring(0, len - 3) + '...' : str;
}

export function removeMarkdown(name) {
  // remove markdown
  const noMarkdown = name.replace(/__/gi, '');

  return noMarkdown;
}

export function getPlainName(name) {
  // remove meta info (like bitrate or streamtype) in [] brackets
  let plainName = name.replace(/ \[[^\]]*\]/, '');

  // remove meta info in parentheses ()
  plainName = plainName.replace(/ \([^)]*\)/g, '');

  // remove meta info appended with '|' like "RadioX | MP3 128 | POP | News"
  const parts = plainName.split('|');
  plainName = parts[0].trim();

  return plainName;
}

export function htmlEncode(string) {
  let el = document.createElement('div');

  el.innerText = el.textContent = string;
  string = el.innerHTML;

  return string;
}

export function getSongInfo(metaData) {
  if (metaData.title) {
    let title = metaData.title;

    const delimiter = ' - ';
    const cutStrings = title.split(delimiter);

    // replace 'minus' with a 'long dash'
    if (cutStrings.length >= 2) {
      title = [cutStrings.slice(0, 2).join(' – '), ...cutStrings.slice(2)].join(
        delimiter,
      );
    }

    return title;
  } else if (metaData.description) {
    return metaData.description;
  } else if (metaData.name) {
    return metaData.name;
  } else {
    return 'Live Radio';
  }
}
