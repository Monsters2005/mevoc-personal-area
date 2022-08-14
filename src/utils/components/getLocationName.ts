import { Location } from 'react-router';
import { pages } from '../../constants/sidebar';

export function getLocationName(pathname: string) {
  return pathname
    .replace('/', '')
    .split('-')
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join('') as keyof typeof pages;
}
