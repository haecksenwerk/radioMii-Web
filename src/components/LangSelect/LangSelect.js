import { Wrapper, SelectLanguage } from './LangSelect.styles';

import { useTranslation } from 'react-i18next';

export default function Dropdown() {
  const { i18n } = useTranslation();

  const lang = i18n.language.substring(0, 2);

  const languages = [
    { cc: 'id', lang: 'Bahasa Indonesia' },
    { cc: 'bg', lang: 'Български' },
    { cc: 'bs', lang: 'Bosanski' },
    { cc: 'cs', lang: 'Česky' },
    { cc: 'da', lang: 'Dansk' },
    { cc: 'de', lang: 'Deutsch' },
    { cc: 'et', lang: 'Eesti' },
    { cc: 'en', lang: 'English' },
    { cc: 'eo', lang: 'Esperanto' },
    { cc: 'eu', lang: 'Euskara' },
    { cc: 'fr', lang: 'French' },
    { cc: 'ga', lang: 'Gaeilge' },
    { cc: 'hr', lang: 'Hrvatski' },
    { cc: 'xh', lang: 'IsiXhosa' },
    { cc: 'zu', lang: 'IsiZulu' },
    { cc: 'it', lang: 'Italiano' },
    { cc: 'lv', lang: 'Latviešu valoda' },
    { cc: 'lt', lang: 'Lietuvių kalba' },
    { cc: 'hu', lang: 'Magyar' },
    { cc: 'nl', lang: 'Nederlands' },
    { cc: 'pl', lang: 'Polska' },
    { cc: 'pt', lang: 'Português' },
    //{ cc: 'ceb', lang: 'Sinugboanon' }, TODO: 639-2 support
    { cc: 'ro', lang: 'Română' },
    { cc: 'sk', lang: 'Slovenské' },
    { cc: 'fi', lang: 'Suomi' },
    { cc: 'sv', lang: 'Svenska' },
    { cc: 'vi', lang: 'Tiếng Việt' },
    { cc: 'tw', lang: 'Twi' },
    { cc: 'ru', lang: 'Русский' },
    { cc: 'uk', lang: 'Українська' },
    { cc: 'uz', lang: 'Ўзбек' },
    { cc: 'yo', lang: 'Yorùbá' },
    { cc: 'ts', lang: 'Xitsonga' },
  ];

  function selectLanguageChange(e) {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <Wrapper>
      <SelectLanguage value={lang} onChange={selectLanguageChange} id='langSel'>
        {languages.map((item, id) => {
          return (
            <option key={id} value={item.cc}>
              {item.lang}
            </option>
          );
        })}
      </SelectLanguage>
    </Wrapper>
  );
}
