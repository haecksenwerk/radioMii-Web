import { useAppStore } from '../../store';
import { Wrapper, Content, LogoImg, Heart } from './EmptyState.styles';

import { useTranslation } from 'react-i18next';

import Radio from '../../images/radio.svg';

export default function EmptyState() {
  const VIEW = useAppStore((state) => state.VIEW);
  const viewMode = useAppStore((state) => state.viewMode);
  const searchTerm = useAppStore((state) => state.searchTerm);
  const error = useAppStore((state) => state.error);

  const { t } = useTranslation();

  let body = null;

  switch (viewMode) {
    case VIEW.EMPTY_STATE_FAVS:
      body = (
        <>
          <LogoImg className='logo' src={Radio} alt='radio-icon' />
          <h3>
            {t('empty-state.body-favs')}
            <Heart />
          </h3>
        </>
      );
      break;
    case VIEW.EMPTY_STATE_RESULTS:
      body = <h3>{t('empty-state.body-results') + '"' + searchTerm + '"'}</h3>;
      break;
    case VIEW.EMPTY_STATE_ERROR:
      body = (
        <>
          <h1> {error.title} </h1>
          <h3> {error.msg} </h3>
        </>
      );
      break;
    default:
      body = <h3>Please refresh browser</h3>;
  }

  return (
    <Wrapper>
      <Content>{body}</Content>
    </Wrapper>
  );
}
