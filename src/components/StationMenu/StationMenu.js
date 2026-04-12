import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store';
import { QRCodeSVG } from 'qrcode.react';

import {
  Wrapper,
  DotsWrap,
  Content,
  ListItem,
  Separator,
  QrWrapper,
  InputField,
  IconCopy,
} from './StationMenu.styles';

import { useTranslation } from 'react-i18next';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Bit flags — homepage: station has a URL; moveCard: >1 favourite exists to reorder
const ENABLED_BITS = { homepage: 4, moveCard: 2 };

export default function StationMenu({
  id,
  showDots,
  setWiggleCard,
  enabledItems,
  station,
}) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [menuFlip, setMenuFlip] = useState(false);

  const setMsgDialog = useAppStore((state) => state.setMsgDialog);
  const setStoreFavorite = useAppStore((state) => state.setStoreFavorite);

  const node = useRef();

  const ClassName = `wrapper-${id}`;

  function checkIfInBoundaries(e) {
    const wrapperRect = document
      .querySelector('.' + ClassName)
      .getBoundingClientRect();

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Check if the menu wrapper component would show within the viewport
    if (windowHeight - wrapperRect.bottom < 200) {
      setMenuFlip(true);
    } else {
      setMenuFlip(false);
    }
  }

  function handleClickOutside(e) {
    // inside click
    if (node.current.contains(e.target)) return;

    // outside click
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  async function copyMiiLink(miiLink) {
    await navigator.clipboard.writeText(miiLink);
  }

  function createMiiLink() {
    const locationHref = window.location.href;
    const miiLink = locationHref + '?id=' + station.stationuuid;

    setMsgDialog({
      show: true,
      title: 'Mii-Link',
      content: (
        <>
          <QrWrapper>
            <QRCodeSVG size='240' value={miiLink} />
          </QrWrapper>
          <InputField
            type='text'
            readOnly
            value={miiLink}
            onFocus={(e) => e.target.select()}
          />
          {false && (
            <IconCopy
              onClick={() => {
                copyMiiLink(miiLink);
              }}
            />
          )}
        </>
      ),
      footer: t('dropdown.dialog-footer'),
    });
  }

  return (
    <>
      {showDots && (
        <DotsWrap
          className={ClassName}
          onClick={(e) => {
            e.stopPropagation();
            checkIfInBoundaries();
            setOpen(!open);
          }}
        >
          <BsThreeDotsVertical size={20} />
        </DotsWrap>
      )}
      <Wrapper ref={node} $flip={menuFlip}>
        {open && (
          <Content>
            <ListItem
              $enabled={enabledItems & ENABLED_BITS.moveCard}
              onClick={(e) => {
                e.stopPropagation();
                setStoreFavorite({
                  move: true,
                  station: station,
                  isFavorite: undefined,
                });

                setWiggleCard(true);
                setOpen(false);
              }}
            >
              {t('dropdown.move-card')}
            </ListItem>
            <ListItem
              $enabled={true}
              onClick={(e) => {
                e.stopPropagation();
                setStoreFavorite({
                  move: false,
                  station: station,
                  isFavorite: false,
                });
              }}
            >
              {t('dropdown.remove-card')}
            </ListItem>
            <Separator />
            <ListItem
              $enabled={station.type !== 'web-radio-db'}
              onClick={(e) => {
                e.stopPropagation();
                createMiiLink(false);
                setOpen(false);
              }}
            >
              {t('dropdown.link-uuid')}
            </ListItem>
            <Separator />
            <ListItem
              $enabled={enabledItems & ENABLED_BITS.homepage}
              onClick={(e) => {
                e.stopPropagation();
                window.open(station.homepage, '_blank', 'noopener,noreferrer');
                setOpen(false);
              }}
            >
              {t('dropdown.website')}
            </ListItem>
          </Content>
        )}
      </Wrapper>
    </>
  );
}
