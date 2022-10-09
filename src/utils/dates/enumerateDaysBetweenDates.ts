import moment from 'moment';
import { Dates } from '../../components/User/Calendar/types';

export function enumerateDaysBetweenDates(range: Dates) {
  const dates = [];
  const currentDate = moment(range.startDate).startOf('day');
  const lastDate = moment(range.endDate).startOf('day');
  do {
    dates.push(currentDate.clone().toDate());
    currentDate.add(1, 'days');
    dates.push(currentDate.clone().toDate());
  } while (currentDate.diff(lastDate) < 0);
  return dates;
}
