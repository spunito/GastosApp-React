import { format, parseISO } from 'date-fns';

export const formatDDMMYYYY = (dateString: string | Date) => {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, 'dd-MM-yyyy');
};