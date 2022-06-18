import moment from 'moment';
import { Dates } from '../../components/User/Calendar/types';

export function checkDateInRange<T extends string>(
  compare: T,
  range: Dates,
  format: T
) {
  const compareDate = moment(compare, format);
  const startDate = moment(range.startDate, format);
  const endDate = moment(range.endDate, format);
  const isBetween = compareDate.isBetween(startDate, endDate);
  return isBetween;
}
