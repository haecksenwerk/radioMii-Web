import { useState, useRef } from 'react';
import {
  loadFavorites,
  saveFavorites,
  savePlaylist,
} from '../../utils/fileStorage';
import { useAppStore } from '../../store';
import { useSettingsStore } from '../../store';
import { getItemFromStorage, storeItem } from '../../utils/localStorage';
import { SegControl, LangSelect, ToggleSwitch, Tooltip } from '../';
import { useTranslation } from 'react-i18next';
import { RiPlayListFill } from 'react-icons/ri';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { BsGrid, BsSquare, BsListUl } from 'react-icons/bs';
import { IoHeartDislikeOutline, IoLogoAndroid } from 'react-icons/io5';

import {
  FiMoon,
  FiSun,
  FiDownload,
  FiUpload,
  FiTerminal,
  FiInfo,
  FiHeart,
  FiSettings,
} from 'react-icons/fi';

import {
  StyledMenu,
  StyledSubMenu,
  MenuItem,
  Separator,
  ItemWrapper,
  AndroidIconWrapper,
} from './Menu.styles';

export default function Menu({ open, setOpen }) {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const [menuFavsOpen, setMenuFavsOpen] = useState(false);
  const [menuPlistOpen, setMenuPlistOpen] = useState(false);
  const [menuSettingsOpen, setMenuSettingsOpen] = useState(false);
  const [androidClicked, setAndroidClicked] = useState(
    () => getItemFromStorage('androidLinkClicked') === true,
  );

  const setMsgDialog = useAppStore((state) => state.setMsgDialog);
  const setShowDialog = useAppStore((state) => state.setShowDialog);
  const searchOptions = useAppStore((state) => state.searchOptions);
  const setSearchOptions = useAppStore((state) => state.setSearchOptions);
  const light = useSettingsStore((state) => state.light);
  const toggleLight = useSettingsStore((state) => state.toggleLight);
  const compactCard = useSettingsStore((state) => state.compactCard);
  const modeList = useSettingsStore((state) => state.modeList);
  const setModeList = useSettingsStore((state) => state.setModeList);
  const toggleCompact = useSettingsStore((state) => state.toggleCompact);
  const showTooltips = useSettingsStore((state) => state.showTooltips);
  const setShowTooltips = useSettingsStore((state) => state.setShowTooltips);
  const hqBitrate = useSettingsStore((state) => state.hqBitrate);
  const setHqBitrate = useSettingsStore((state) => state.setHqBitrate);
  const hideBroken = useSettingsStore((state) => state.hideBroken);
  const setHideBroken = useSettingsStore((state) => state.setHideBroken);
  const forceRender = useAppStore((state) => state.forceRender);
  const system = useAppStore((state) => state.system);

  const { t } = useTranslation();

  function handleAndroidClick() {
    storeItem('androidLinkClicked', true);
    setAndroidClicked(true);
    window.open(
      'https://github.com/haecksenwerk/radioMii-Android',
      '_blank',
      'noopener,noreferrer',
    );
  }

  if (!open && menuFavsOpen) setMenuFavsOpen(false);
  if (!open && menuPlistOpen) setMenuPlistOpen(false);
  if (!open && menuSettingsOpen) setMenuSettingsOpen(false);

  const enabled = {
    backupFavs: 0b00000001,
    exportM3u: 0b00000010,
    exportXspf: 0b00000100,
  };

  function getEnabledItems() {
    let array = getItemFromStorage('favorites');

    if (array)
      if (array.results.length) {
        return enabled.backupFavs | enabled.exportM3u | enabled.exportXspf;
      }

    return 0;
  }

  const enabledItems = getEnabledItems();

  return (
    <>
      <StyledMenu open={open}>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            toggleCompact();
            setOpen(false);
          }}
        >
          {compactCard ? (
            <BsSquare className='menu-icon' />
          ) : (
            <BsGrid className='menu-icon' />
          )}
          {compactCard ? t('menu.standard-view') : t('menu.compact-view')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            toggleLight();
            setOpen(false);
          }}
        >
          {light ? (
            <FiMoon className='menu-icon' />
          ) : (
            <FiSun className='menu-icon' />
          )}
          {light ? t('menu.light-off') : t('menu.light-on')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setMenuFavsOpen(true);
          }}
        >
          <FiHeart className='menu-icon' />
          {t('menu.open-menu-fav')}
          <MdArrowForwardIos className='submenu-icon' />
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setMenuPlistOpen(true);
          }}
        >
          <RiPlayListFill className='menu-icon' />
          {t('menu.open-menu-plist')}
          <MdArrowForwardIos className='submenu-icon' />
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setMenuSettingsOpen(true);
          }}
        >
          <FiSettings className='menu-icon' />
          {t('menu.open-menu-settings')}
          <MdArrowForwardIos className='submenu-icon' />
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setShowDialog({ tips: true });
            setOpen(false);
          }}
        >
          <FiTerminal className='menu-icon' />
          {t('menu.tips')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setShowDialog({ info: true });
            setOpen(false);
          }}
        >
          <FiInfo className='menu-icon' />
          {t('menu.about')}
        </MenuItem>
        <Tooltip
          content='Get radioMii for Android'
          direction='right'
          bgColor='#3ddc84'
          fgColor='#000'
        >
          <AndroidIconWrapper
            $open={open}
            $visible={!androidClicked}
            onClick={handleAndroidClick}
          >
            <IoLogoAndroid />
          </AndroidIconWrapper>
        </Tooltip>
      </StyledMenu>
      {/* ### Submenu Favorites */}
      <StyledSubMenu open={menuFavsOpen}>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setMenuFavsOpen(false);
          }}
        >
          <MdArrowBackIosNew className='menu-icon' />
          {t('menu.back')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            loadFavorites(forceRender, setMsgDialog);
            setOpen(false);
          }}
        >
          <FiUpload className='menu-icon' />
          {t('menu.restore-favs')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={enabledItems & enabled.backupFavs}
          onClick={() => {
            saveFavorites();
            setOpen(false);
          }}
        >
          <FiDownload className='menu-icon' />
          {t('menu.backup-favs')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={enabledItems & enabled.backupFavs}
          onClick={() => {
            setOpen(false);
            setShowDialog({ deleteFavs: true });
          }}
        >
          <IoHeartDislikeOutline className='menu-icon' />
          {t('menu.delete-favs')}
        </MenuItem>
      </StyledSubMenu>
      {/* ### Submenu Playlist */}
      <StyledSubMenu open={menuPlistOpen}>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setMenuPlistOpen(false);
          }}
        >
          <MdArrowBackIosNew className='menu-icon' />
          {t('menu.back')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={enabledItems & enabled.exportM3u}
          onClick={() => {
            savePlaylist('m3u');
            setOpen(false);
          }}
        >
          <RiPlayListFill className='menu-icon' />
          {t('menu.export-m3u')}
        </MenuItem>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={enabledItems & enabled.exportXspf}
          onClick={() => {
            savePlaylist('xspf');
            setOpen(false);
          }}
        >
          <RiPlayListFill className='menu-icon' />
          {t('menu.export-xspf')}
        </MenuItem>
      </StyledSubMenu>
      {/* ### Submenu Settings */}
      <StyledSubMenu open={menuSettingsOpen}>
        <MenuItem
          tabIndex={tabIndex}
          $enabled={true}
          onClick={() => {
            setMenuSettingsOpen(false);
          }}
        >
          <MdArrowBackIosNew className='menu-icon' />
          {t('menu.back')}
        </MenuItem>
        <ItemWrapper>
          <label-switch>{t('menu.layout')}</label-switch>
          <SegControl
            name='layout'
            segWidth='44px'
            fontSize='14px'
            $bgColor='var(--miiGreyLight)'
            fontColor='var(--miiGrey)'
            index={modeList ? 1 : 0}
            cbSelect={(val, index) => {
              setModeList(val);
            }}
            controlRef={useRef()}
            segments={[
              {
                label: <BsGrid />,
                value: false,
                ref: useRef(),
              },
              {
                label: <BsListUl />,
                value: true,
                ref: useRef(),
              },
            ]}
          />
        </ItemWrapper>
        {!system.isTouch && (
          <ItemWrapper>
            <label-switch>{t('settings.tooltips')}</label-switch>
            <ToggleSwitch
              id='ts'
              defaultChecked={showTooltips}
              onChange={(e) => setShowTooltips(e.target.checked)}
            />
          </ItemWrapper>
        )}
        <ItemWrapper>
          <label-switch>{t('settings.quality')}</label-switch>
          <SegControl
            name='bitrate'
            segWidth='44px'
            fontSize='14px'
            $bgColor='var(--miiGreyLight)'
            fontColor='var(--miiGrey)'
            index={[128, 192, 256].indexOf(hqBitrate)}
            cbSelect={(val, index) => {
              setHqBitrate(val);

              setSearchOptions({
                ...searchOptions,
                bitrateMin: val,
              });
            }}
            controlRef={useRef()}
            segments={[
              {
                label: <div>128</div>,
                value: 128,
                ref: useRef(),
              },
              {
                label: <div>192</div>,
                value: 192,
                ref: useRef(),
              },
              {
                label: <div>256</div>,
                value: 256,
                ref: useRef(),
              },
            ]}
          />
        </ItemWrapper>
        <ItemWrapper>
          <label-switch>{t('settings.broken')}</label-switch>
          <ToggleSwitch
            id='bs'
            defaultChecked={hideBroken}
            onChange={(e) => setHideBroken(e.target.checked)}
          />
        </ItemWrapper>
        <Separator />
        <ItemWrapper>
          <label-switch> {t('menu.language')}</label-switch>
          <LangSelect />
        </ItemWrapper>
      </StyledSubMenu>
    </>
  );
}
