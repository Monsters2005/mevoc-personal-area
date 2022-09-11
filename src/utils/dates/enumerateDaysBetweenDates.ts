import moment from 'moment';
import { Dates } from '../../components/User/Calendar/types';

export function enumerateDaysBetweenDates(range: Dates) {
  const dates = [];
  const currentDate = moment(range.startDate).startOf('day');
  const lastDate = moment(range.endDate).startOf('day');
  while (currentDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currentDate.clone().toDate());
  }
  return dates;
}
