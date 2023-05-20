import { darkTheme, lightTheme } from '../../constants/kit/themes';

export const onThemeSelect = (st: string) => {
  const root = document.documentElement.style;

  if (st === 'light') {
    Object.entries(lightTheme)
      .map(([key, value]) => [key, value])
      .forEach(([key, value]) => root.setProperty(key, value));
  }
  if (st === 'dark') {
    Object.entries(darkTheme)
      .map(([key, value]) => [key, value])
      .forEach(([key, value]) => root.setProperty(key, value));
  }
};
