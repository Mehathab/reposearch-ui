import { DateTime, Interval } from 'luxon';

export const DEFAULT_DATE_FORMAT = 'LL/dd/yyyy';
export const DEFAULT_TIME_FORMAT = 'hh:mm a';
export const DEFAULT_DATE_TIME_FORMAT = 'LL/dd/yyyy hh:mm a';

export const formatIsoDate = (
  isoDateTime = '',
  format = DEFAULT_DATE_FORMAT
) => {
  const dt = DateTime.fromISO(isoDateTime);
  return dt.isValid ? dt.toFormat(format) : null;
};
