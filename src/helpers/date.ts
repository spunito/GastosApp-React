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

export const todayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); 
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedToday = `${yyyy}-${mm}-${dd}`;
  return formattedToday;
  
}

export const pastDate = () => {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 30); // restar 30 días

  const yyyy = pastDate.getFullYear();
  const mm = String(pastDate.getMonth() + 1).padStart(2, '0'); // meses empiezan en 0
  const dd = String(pastDate.getDate()).padStart(2, '0');

  const formattedPastDate = `${yyyy}-${mm}-${dd}`;

  return formattedPastDate;

}
  