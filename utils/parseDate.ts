import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const parseDate = (date: Date) => {
  return dayjs(date).tz('Asia/Tokyo').format('YYYY.MM.DD');
};

export const parseDateSlash = (date: Date) => {
  return dayjs(date).tz('Asia/Tokyo').format('YYYY/MM/DD');
};

export const parseDateTime = (date: Date) => {
  return dayjs(date).tz('Asia/Tokyo').format('YYYY-MM-DD');
};
