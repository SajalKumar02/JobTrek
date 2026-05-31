const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

const shortMonthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getTodayWithDay = (): string => {
  const today = new Date();
  const day = dayNames[today.getDay()];
  const date = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

export const getCustomDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()} ${shortMonthNames[date.getMonth() + 1]} ${date.getFullYear()}`;
};
