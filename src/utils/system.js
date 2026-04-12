export function isDevelop() {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  return false;
}

export function isMobile() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (
    /windows phone/i.test(userAgent) ||
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    return true;
  }

  return false;
}

export function isSafari() {
  let userAgent = navigator.userAgent;

  if (userAgent.includes('Safari')) {
    return true;
  }

  return false;
}

export function isTouch() {
  if ('ontouchstart' in document.documentElement) {
    return true;
  }

  return false;
}

export function isHttps(url) {
  try {
    const link = new URL(url);
    return link.protocol === 'https:';
  } catch (e) {
    return false;
  }
}
