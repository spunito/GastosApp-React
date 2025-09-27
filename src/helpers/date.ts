import { format, parseISO } from 'date-fns';

export const formatDDMMYYYY = (dateString: string | Date) => {
  if (!dateString) return "";

  try {
    let date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;

    // Ajustar a la zona horaria local ignorando la conversión
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    return format(date, "dd-MM-yyyy");
  } catch {
    return "";
  }
};