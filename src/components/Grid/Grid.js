import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAppStore, useSettingsStore } from '../../store';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../';

import { Wrapper, Header, Content, Button } from './Grid.styles';

const GRID_HEADER = [
  { title: 'grid.empty-state' },
  { title: 'grid.empty-state' },
  { title: 'grid.empty-state' },
  { title: 'grid.favorites' },
  { title: 'grid.results' },
  { title: 'grid.uuid' },
];

export default function Grid({ isLoading, children }) {
  const [lastBottom, setLastBottom] = useState(0);

  const VIEW = useAppStore((state) => state.VIEW);
  const viewMode = useAppStore((state) => state.viewMode);
  const forceRender = useAppStore((state) => state.forceRender);
  const settingsUnfold = useAppStore((state) => state.settingsUnfold);
  const toggleLoadMore = useAppStore((state) => state.loadNextPage);
  const modeList = useSettingsStore((state) => state.modeList);
  const msgDialogShow = useAppStore((state) => state.msgDialog.show);
  const showDialog = useAppStore((state) => state.showDialog);

  const { t } = useTranslation();

  const node = useRef();
  const topRef = useRef();

  const modalActive = msgDialogShow || Object.values(showDialog).some(Boolean);

  useEffect(() => {
    topRef.current.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [viewMode]);

  const onScroll = useCallback(() => {
    if (node.current) {
      const { scrollTop, scrollHeight, clientHeight } = node.current;

      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        // 'lastBottom' prevents Safari from triggering 'toggleLoadMore' several times,
        // since Safari's 'scrollTop' value follows the elastic scroll bouncing
        if (lastBottom !== scrollHeight) {
          toggleLoadMore();
          setLastBottom(scrollHeight);
        }
      }
    }
  }, [lastBottom, toggleLoadMore]);

  return (
    <Wrapper
      onScroll={onScroll}
      ref={node}
      $unfold={settingsUnfold}
      style={{ filter: modalActive ? 'blur(4px)' : 'none' }}
    >
      <Header>
        <h1 ref={topRef}>{t(GRID_HEADER[viewMode].title)}</h1>
        {viewMode === VIEW.UUID && (
          <Button
            onClick={() => {
              forceRender();
            }}
          />
        )}
      </Header>
      <Content $modeList={modeList}>{children}</Content>
      <Spinner $visible={isLoading} />
    </Wrapper>
  );
}

Grid.propTypes = {
  header: PropTypes.string,
  children: PropTypes.array,
};
