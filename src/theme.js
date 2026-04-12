const miiWhite = '#fff';
const miiGreyLight = '#e6e6e6';
const miiGreyMedium = '#383838';
const miiGreyDark = '#1d1d1d';
const miiGrey = '#868686';
const miiGreyBrown = '#26211c';

export const lightTheme = {
  color: {
    h1: miiGreyMedium,
    h3: miiGrey,
    p: miiGrey,
    bgBody: miiGreyLight,

    card: {
      bg: miiWhite,
      fg: miiGrey,
      bgHover: '#f0f0f0',
      heartBg: miiGrey,
      labelBg: miiGreyLight,
      labelFg: miiGreyMedium,
      bgIconPlay: miiGrey,
    },

    bgHeart: miiGrey,

    dropdown: {
      bg: miiWhite,
      fg: miiGrey,
      itemDisabled: miiGreyLight,
    },

    langsel: {
      bg: miiGreyLight,
      fg: miiGrey,
      itemDisabled: miiWhite,
    },

    menu: {
      bg: miiWhite,
      item: miiGrey,
      itemDisabled: miiGreyLight,
    },

    dialogs: {
      bg: miiWhite,
      icon: miiGrey,
      iconHover: '#ff914d',
      iconFilter: 'none',
      buttonBg: miiWhite,
      buttonColor: miiGrey,
      buttonBorder: miiGrey,
      buttonFocusBg: '#ff914d',
      buttonFocusColor: miiWhite,
    },

    modal: {
      bg: miiWhite,
      closeIcon: miiGrey,
      title: miiGreyMedium,
      text: miiGrey,
      listitem: miiGrey,
      link: miiGreyMedium,
    },

    segcontrol: {
      bg: miiGreyLight,
      font: miiGrey,
      itemDisabled: miiGrey,
    },

    toggleswitch: {
      bg: miiGreyLight,
      fg: miiWhite,
    },

    langselect: {
      bg: miiGreyLight,
      fg: miiGrey,
    },
  },

  opacity: {
    flag: '0.7',
  },

  break: {
    horiz: {
      sm: '576px',
      lg: '768px',
    },
    vert: {
      sm: '480px',
      lg: '720px',
    },
  },
};

export const darkTheme = {
  color: {
    h1: miiWhite,
    h3: miiGrey,
    p: miiGrey,
    bgBody: miiGreyBrown,

    card: {
      bg: '#352e28',
      fg: miiGreyLight,
      bgHover: '#3a342f',
      heartBg: miiGreyLight,
      labelBg: miiGrey,
      labelFg: miiGreyLight,
      bgIconPlay: '#554e48',
    },

    bgHeart: miiGreyLight,

    dropdown: {
      bg: miiGreyBrown,
      fg: miiGreyLight,
      itemDisabled: miiGreyMedium,
    },

    langsel: {
      bg: miiGreyLight,
      fg: miiGrey,
      itemDisabled: miiWhite,
    },

    menu: {
      bg: miiGreyMedium,
      item: miiGreyLight,
      itemDisabled: miiGrey,
    },

    dialogs: {
      bg: miiGreyMedium,
      icon: miiGrey,
      iconHover: '#ff914d',
      iconFilter: 'brightness(0.8)',
      buttonBg: miiGreyMedium,
      buttonColor: miiGreyLight,
      buttonBorder: miiGreyLight,
      buttonFocusBg: '#ff914d',
      buttonFocusColor: miiWhite,
    },

    modal: {
      bg: miiGreyMedium,
      closeIcon: miiGreyLight,
      title: miiGreyLight,
      text: miiGreyLight,
      listitem: miiGreyLight,
      link: miiGrey,
    },

    segcontrol: {
      bg: miiGreyDark,
      font: miiGrey,
      itemDisabled: miiGrey,
    },

    toggleswitch: {
      bg: miiGreyDark,
      fg: miiGrey,
    },

    langselect: {
      bg: miiGreyDark,
      fg: miiGrey,
    },
  },

  opacity: {
    flag: '0.85',
  },

  break: {
    horiz: {
      sm: '576px',
      lg: '768px',
    },
    vert: {
      sm: '480px',
      lg: '720px',
    },
  },
};
