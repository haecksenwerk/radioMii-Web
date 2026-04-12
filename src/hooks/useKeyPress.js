import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export function useKeyPress(keys, defKeysEnabled, callback, node = null) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event) => {
      if (!defKeysEnabled) {
        if (
          ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
            event.code
          ) > -1
        ) {
          event.preventDefault();
        }
      }

      if (keys.some((key) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [keys, defKeysEnabled]
  );

  useEffect(() => {
    const targetNode = node ?? document;

    targetNode && targetNode.addEventListener('keydown', handleKeyPress);

    return () =>
      targetNode && targetNode.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress, node]);
}
