import Modal from '../../components/Modal';
import { useAppStore } from '../../store';
import { removeItemFromStorage } from '../../utils/localStorage';
import { IoLogoGithub, IoLogoAndroid } from 'react-icons/io5';
import TagVotes from '../../images/tag-votes.png';
import TagClicks from '../../images/tag-clicks.png';
import { useTranslation, Trans } from 'react-i18next';
import RadioSvg from '../../images/radio.svg';
import { SiKofi } from 'react-icons/si';
import gitInfo from '../../gitInfo.json';
import { IoGitCommitOutline, IoLockClosedSharp } from 'react-icons/io5';

import {
  MiiIcon,
  Icons,
  IconRow,
  Button,
  ButtonWrapper,
} from './Dialogs.styles';

export default function Dialogs() {
  const { t } = useTranslation();

  const msgDialog = useAppStore((state) => state.msgDialog);
  const setMsgDialog = useAppStore((state) => state.setMsgDialog);

  const showDialog = useAppStore((state) => state.showDialog);
  const setShowDialog = useAppStore((state) => state.setShowDialog);

  const forceRender = useAppStore((state) => state.forceRender);
  const system = useAppStore((state) => state.system);

  const VIEW = useAppStore((state) => state.VIEW);
  const setViewMode = useAppStore((state) => state.setViewMode);

  return (
    <>
      <Modal
        active={msgDialog.show}
        hideModal={() => setMsgDialog({ show: false })}
        title={msgDialog.title}
        footer={msgDialog.footer}
      >
        <>{msgDialog.content}</>
      </Modal>

      <Modal
        active={showDialog.tips}
        hideModal={() => setShowDialog({ tips: false })}
        title={t('tips.title')}
        footer=''
      >
        {!system.isTouch && (
          <p>
            <Trans i18nKey='tips.body.p1'>
              Hotkeys: <p-tag>C</p-tag> compact | <p-tag>L</p-tag> light |
              <p-tag>S</p-tag> settings -{' '}
            </Trans>
            <Trans i18nKey='tips.body.p2'>
              | <p-tag>Space</p-tag> play | <p-tag>+</p-tag> volume up |{' '}
              <p-tag>-</p-tag> volume down
            </Trans>
          </p>
        )}
        <p>
          <img
            style={{
              height: '21px',
              margin: '0px 6px -5px 0px',
            }}
            src={TagVotes}
            alt='tag-votes'
          />
          {t('tips.body.p3')}
          <br />
          <img
            style={{
              height: '21px',
              margin: '6px 6px -5px 0px',
            }}
            src={TagClicks}
            alt='tag-clicks'
          />
          {t('tips.body.p4')}
          <br />
          <div
            style={{
              height: '6px',
            }}
          />
          <l-tag>
            <IoLockClosedSharp />
          </l-tag>{' '}
          HTTPS-Stream
        </p>
        <p>{t('tips.body.p5')}</p>
        <li>
          <Trans i18nKey='tips.body.p6'>
            use <p-tag>/de</p-tag> country code
          </Trans>
        </li>
        <li>
          <Trans i18nKey='tips.body.p7'>
            use <p-tag>/votes</p-tag> most 'likes'
          </Trans>
        </li>
        <li>
          <Trans i18nKey='tips.body.p8'>
            use <p-tag>/clicks</p-tag> most played
          </Trans>
        </li>
        <p>
          {t('tips.body.p9')}{' '}
          <a
            href='https://www.radio-browser.info/add'
            title='radio-browser'
            target='_blank'
            rel='noreferrer'
          >
            radio-browser
          </a>
        </p>
      </Modal>

      <Modal
        active={showDialog.info}
        hideModal={() => setShowDialog({ info: false })}
        title={t('info.title')}
        footer={
          <>
            <IoGitCommitOutline size={16} style={{ verticalAlign: '-24%' }} />
            <small>{gitInfo}</small>
          </>
        }
      >
        <MiiIcon src={RadioSvg} alt='mii-ico' />
        <Icons>
          <IconRow
            onClick={() => {
              window.open(
                'https://ko-fi.com/haecksenwerk',
                '_blank',
                'noopener,noreferrer',
              );
            }}
          >
            <SiKofi size={20} />
            Buy me a coffee
          </IconRow>

          <IconRow
            onClick={() => {
              window.open(
                'https://github.com/haecksenwerk/radioMii-Android/releases',
                '_blank',
                'noopener,noreferrer',
              );
            }}
          >
            <IoLogoAndroid size={20} />
            Get it on Android
          </IconRow>

          <IoLogoGithub
            className='icon'
            onClick={() => {
              window.open(
                'https://github.com/haecksenwerk/radioMii-Web',
                '_blank',
                'noopener,noreferrer',
              );
            }}
          />
        </Icons>
      </Modal>

      <Modal
        active={showDialog.deleteFavs}
        hideModal={() => setShowDialog({ delFavs: false })}
        title={t('del-favs.title')}
        footer=''
      >
        <p>{t('del-favs.body')}</p>
        <ButtonWrapper>
          <Button
            onClick={() => {
              setShowDialog({ deleteFavs: false });
            }}
          >
            {t('del-favs.no')}
          </Button>
          <Button
            $focus={true}
            onClick={() => {
              removeItemFromStorage('favorites');
              setShowDialog({ deleteFavs: false });
              forceRender();
              setViewMode(VIEW.EMPTY_STATE_FAVS);
            }}
          >
            {t('del-favs.yes')}
          </Button>
        </ButtonWrapper>
      </Modal>
    </>
  );
}
