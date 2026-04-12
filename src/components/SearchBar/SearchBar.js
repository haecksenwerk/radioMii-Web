import { useState, useEffect, useRef } from 'react';

import { useAppStore, useSettingsStore } from '../../store';
import { useTranslation } from 'react-i18next';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

import {
  BsGlobe2,
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
  BsSortDown,
  BsSortDownAlt,
} from 'react-icons/bs';

import {
  IoSettingsSharp,
  IoLanguageSharp,
  IoThumbsUpSharp,
  IoPlaySharp,
} from 'react-icons/io5';

import {
  Wrapper,
  SearchWrapper,
  SettingsWrapper,
  Content,
  InputField,
  IconSearch,
  IconClear,
  SelectCountry,
} from './SearchBar.styles';

import { SegControl, ToggleButton, Tooltip } from '../';

export default function SearchBar() {
  const [inputState, setInputState] = useState('');
  const [hideTooltip, setHideTooltip] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);

  const initial = useRef(true);
  const inputRef = useRef(null);

  const { t } = useTranslation();

  const setDefKeysEnabled = useAppStore((state) => state.setDefKeysEnabled);
  const setSearchTerm = useAppStore((state) => state.setSearchTerm);
  const searchOptions = useAppStore((state) => state.searchOptions);
  const setSearchOptions = useAppStore((state) => state.setSearchOptions);

  const settingsUnfold = useAppStore((state) => state.settingsUnfold);
  const toggleShowSettings = useAppStore((state) => state.toggleShowSettings);
  const countries = useAppStore((state) => state.countries);
  const hqBitrate = useSettingsStore((state) => state.hqBitrate);

  const orderCaptions = [
    { caption: 'tooltip.sort-votes' },
    { caption: 'tooltip.sort-clicks' },
    { caption: 'tooltip.sort-name' },
    { caption: 'tooltip.sort-country' },
    { caption: 'tooltip.sort-language' },
    { caption: 'tooltip.sort-bitrate' },
  ];

  const [reverseAmount, setReverseAmount] = useState(
    searchOptions.orderIndex === 0 ||
      searchOptions.orderIndex === 1 ||
      searchOptions.orderIndex === 5
  );

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(inputState.toLowerCase());
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, inputState]);

  function selectCountryChange(e) {
    setSearchOptions({
      ...searchOptions,
      country: e.target.value,
    });
  }

  return (
    <Wrapper $unfold={settingsUnfold}>
      <IconContext.Provider
        value={{ size: '16px', style: { verticalAlign: '-16%' } }}
      >
        <SearchWrapper>
          <Content>
            <IconSearch />
            <InputField
              ref={inputRef}
              id={'search'}
              type='text'
              placeholder={
                searchOptions.searchMode === 'name'
                  ? t('searchbar.placeholder-name')
                  : t('searchbar.placeholder-genre')
              }
              onChange={(e) => setInputState(e.currentTarget.value)}
              onFocus={(e) => setDefKeysEnabled(true)}
              onBlur={(e) => setDefKeysEnabled(false)}
              value={inputState}
              inputMode='search'
              enterKeyHint='search'
            />
            {inputState && (
              <IconClear
                onClick={(e) => {
                  setInputState('');
                  inputRef.current.focus();
                }}
              />
            )}
          </Content>
          <Tooltip
            content={t('tooltip.toggle-options')}
            direction='left'
            margin='10px'
          >
            <ToggleButton
              IconOutline={IoSettingsSharp}
              IconFilled={IoSettingsSharp}
              size={24}
              checked={settingsUnfold}
              cbClicked={() => {
                toggleShowSettings();
              }}
            />
          </Tooltip>
        </SearchWrapper>
        <SettingsWrapper $unfold={settingsUnfold}>
          <div className='ctrl_search_mode'>
            <Tooltip
              content={t('tooltip.search-mode')}
              direction='top'
              margin='30px'
            >
              <SegControl
                name='search-mode'
                segWidth='60px'
                fontSize='14px'
                bgColor='var(--miiGreyDark)'
                fontColor='var(--miiGrey)'
                index={searchOptions.searchMode === 'name' ? 0 : 1}
                cbSelect={(val, index) =>
                  setSearchOptions({
                    ...searchOptions,
                    searchMode: val,
                  })
                }
                controlRef={useRef()}
                segments={[
                  {
                    label: t('searchbar.name'),
                    value: 'name',
                    ref: useRef(),
                  },
                  {
                    label: t('searchbar.genre'),
                    value: 'genre',
                    ref: useRef(),
                  },
                ]}
              />
            </Tooltip>
          </div>
          <div className='ctrl_order'>
            <Tooltip
              content={t(orderCaptions[captionIndex].caption)}
              direction='top'
              margin='30px'
            >
              <SegControl
                name='order'
                segWidth='44px'
                fontSize='14px'
                bgColor='var(--miiGreyDark)'
                fontColor='var(--miiGrey)'
                index={searchOptions.orderIndex}
                cbSelect={(val, index) => {
                  const amount = index === 0 || index === 1 || index === 5;
                  setReverseAmount(amount);
                  setSearchOptions({
                    ...searchOptions,
                    order: val,
                    orderIndex: index,
                    reverse: amount,
                    reverseIndex: 0,
                  });
                }}
                cbHover={(value, index, active) => setCaptionIndex(index)}
                controlRef={useRef()}
                segments={[
                  {
                    label: <IoThumbsUpSharp />,
                    value: 'votes',
                    ref: useRef(),
                  },
                  {
                    label: <IoPlaySharp />,
                    value: 'clickcount',
                    ref: useRef(),
                  },
                  {
                    label: <div>ABC</div>,
                    value: 'name',
                    ref: useRef(),
                  },
                  {
                    label: <BsGlobe2 />,
                    value: 'country',
                    ref: useRef(),
                  },
                  {
                    label: <IoLanguageSharp />,
                    value: 'language',
                    ref: useRef(),
                  },
                  {
                    label: <div>kB/s</div>,
                    value: 'bitrate',
                    ref: useRef(),
                  },
                ]}
              />
            </Tooltip>
          </div>
          <div className='ctrl_reverse'>
            <Tooltip
              content={t('tooltip.sort-reverse')}
              direction='top'
              margin='30px'
            >
              <SegControl
                name='reverse'
                segWidth='44px'
                fontSize='14px'
                bgColor='var(--miiGreyDark)'
                fontColor='var(--miiGrey)'
                index={reverseAmount ? 1 : 0}
                cbSelect={(val, index) => {
                  setSearchOptions({
                    ...searchOptions,
                    reverse: val,
                    reverseIndex: index,
                  });
                }}
                controlRef={useRef()}
                segments={[
                  {
                    label: reverseAmount ? (
                      <BsSortDownAlt />
                    ) : (
                      <BsSortAlphaDown />
                    ),
                    value: false,
                    ref: useRef(),
                  },
                  {
                    label: reverseAmount ? (
                      <BsSortDown />
                    ) : (
                      <BsSortAlphaDownAlt />
                    ),
                    value: true,
                    ref: useRef(),
                  },
                ]}
              />
            </Tooltip>
          </div>
          <div className='ctrl_hq'>
            <Tooltip content={t('tooltip.hq')} direction='top' margin='30px'>
              <SegControl
                name='hq'
                segWidth='44px'
                fontSize='14px'
                bgColor='var(--miiGreyDark)'
                fontColor='var(--miiGrey)'
                index={0}
                cbSelect={(val, index) => {
                  setSearchOptions({
                    ...searchOptions,
                    bitrateMin: val,
                  });
                }}
                controlRef={useRef()}
                segments={[
                  {
                    label: <div>{t('searchbar.all')}</div>,
                    value: 0,
                    ref: useRef(),
                  },
                  {
                    label: <div>{t('searchbar.hq')}</div>,
                    value: hqBitrate,
                    ref: useRef(),
                  },
                ]}
              />
            </Tooltip>
          </div>
          <div className='ctrl_country'>
            <Tooltip
              className='ctrl_country'
              content={t('tooltip.select-country')}
              direction='top'
              margin='30px'
              hide={hideTooltip}
            >
              <SelectCountry
                id='countrySel'
                onChange={selectCountryChange}
                onClick={() => setHideTooltip(true)}
                onMouseLeave={() => setHideTooltip(false)}
              >
                <option value=''>{t('searchbar.select-country')}</option>
                {countries.length > 0 &&
                  countries.map((item, i) => {
                    return (
                      <option key={i} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </SelectCountry>
            </Tooltip>
          </div>
        </SettingsWrapper>
      </IconContext.Provider>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  callback: PropTypes.func,
};
