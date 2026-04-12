import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const useFetchMetaData = () => {
  const [metaData, setMetaData] = useState([]);
  const [url, setUrl] = useState();
  const [getMetaIsActive, setGetMetaActive] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (!getMetaIsActive || !url) {
      setMetaData([]);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      // Abort any previously in-flight request before starting a new one
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const result = await axios({
          method: 'POST',
          baseURL: 'https://service.radiomii.com/?',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: new URLSearchParams({ url }).toString(),
          signal: controller.signal,
          timeout: 50000,
        });

        if (!cancelled) setMetaData(result.data);
      } catch (error) {
        if (!cancelled && !axios.isCancel(error)) {
          setGetMetaActive(false);
          setMetaData([]);
        }
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      abortControllerRef.current?.abort();
      abortControllerRef.current = null;
    };
  }, [url, getMetaIsActive]); // eslint-disable-line react-hooks/exhaustive-deps

  return { metaData, setGetMetaActive, setUrl };
};
