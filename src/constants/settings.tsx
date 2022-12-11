import React from 'react';
import { SettingsSvgSelector } from '../components/Settings/SettingsSvgSelector';

export const currentTheme = {
  dark: {
    value: 'dark',
    icon: <SettingsSvgSelector id="moon" />,
  },
  light: {
    value: 'light',
    icon: <SettingsSvgSelector id="sun" />,
  },
};

export const textSizes = {
  small: {
    value: 'small',
    icon: <SettingsSvgSelector id="text-small" />,
  },
  medium: {
    value: 'normal',
    icon: <SettingsSvgSelector id="text-medium" />,
  },
  large: {
    value: 'large',
    icon: <SettingsSvgSelector id="text-large" />,
  },
};

export const textColor = {
  dark: {
    value: 'dark',
    icon: <SettingsSvgSelector id="text-dark" />,
  },
  normal: {
    value: 'normal',
    icon: <SettingsSvgSelector id="text-normal" />,
  },
  light: {
    value: 'light',
    icon: <SettingsSvgSelector id="text-light" />,
  },
};

export const accentColors = [
  {
    label: 'light_yellow',
    value: '#FFEBA7',
    key: 1,
  },

  {
    label: 'light_mint',
    value: '#A1F9D4',
    key: 8,
  },
  {
    label: 'dark_mint',
    value: '#63DFE3',
    key: 2,
  },
  {
    label: 'dark_pink',
    value: '#FF88BA',
    key: 3,
  },
  {
    label: 'light_blue',
    value: '#A8D7FF',
    key: 4,
  },
  {
    label: 'light_salmon',
    value: '#FFAABB',
    key: 5,
  },
  {
    label: 'light_lawenda',
    value: '#9CA3FF',
    key: 6,
  },
  {
    label: 'pale_violet',
    value: '#C29EFB',
    key: 7,
  },
];
