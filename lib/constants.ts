import { Platform } from "react-native";

export const NAV_THEME = {
  light: {
    background: "hsl(0 0% 100%)", // background
    border: "hsl(240 5.9% 90%)", // border
    card: "hsl(0 0% 100%)", // card
    notification: "hsl(0 84.2% 60.2%)", // destructive
    primary: "hsl(240 5.9% 10%)", // primary
    text: "hsl(240 10% 3.9%)", // foreground
  },
  dark: {
    background: "hsl(240 10% 3.9%)", // background
    border: "hsl(240 3.7% 15.9%)", // border
    card: "hsl(240 10% 3.9%)", // card
    notification: "hsl(0 72% 51%)", // destructive
    primary: "hsl(0 0% 98%)", // primary
    text: "hsl(0 0% 98%)", // foreground
  },
};

export const TOTAL_QUIZ_PER_LESSON = 5;
export const APP_NAME = "Ieltsie";
export const APP_VERSION = "1.0.0";

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'
export const IS_WEB = Platform.OS === 'web'

const enFlag = require('~/assets/flags/en.png')
const frFlag = require('~/assets/flags/fr.png')
const esFlag = require('~/assets/flags/es.png')
const deFlag = require('~/assets/flags/de.png')
const cnFlag = require('~/assets/flags/cn.png')
const viFlag = require('~/assets/flags/vi.png')

export const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    image: enFlag,
  },
  {
    code: 'fr',
    name: 'Français',
    image: frFlag,
  },
  {
    code: 'es',
    name: 'Español',
    image: esFlag,
  },
  {
    code: 'de',
    name: 'Deutsch',
    image: deFlag,
  },
  {
    code: 'cn',
    name: '中文',
    image: cnFlag,
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    image: viFlag,
  },

]