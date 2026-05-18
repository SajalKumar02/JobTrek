export const getTodayWithDay = (): string => {
  const today = new Date();
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const day = dayNames[today.getDay()];
  const date = today.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};
