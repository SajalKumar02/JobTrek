const STAGE_ORDER = [
  'wishlist',
  'applied',
  'oa',
  'interview',
  'offer',
  'rejected',
];

export const getStageConversionData = (jobs) => {
  const stageCounts = {};

  STAGE_ORDER.forEach((stage) => {
    stageCounts[stage] = 0;
  });

  jobs.forEach((job) => {
    if (!Array.isArray(job.statusHistory)) return;
    job.statusHistory.forEach((entry) => {
      const stage = entry.label?.toLowerCase();
      if (stage && stageCounts[stage] !== undefined) {
        stageCounts[stage] += 1;
      }
    });
  });

  const maxCount = Math.max(1, ...Object.values(stageCounts));

  return STAGE_ORDER.map((stage) => ({
    label: stage.charAt(0).toUpperCase() + stage.slice(1),
    value: stageCounts[stage],
    widthPercent: Math.round((stageCounts[stage] / maxCount) * 100),
  }));
};

export const getUpcomingDeadlineJobs = (jobs) => {
  // Defining start
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Defining end
  const endOfPeriod = new Date();
  endOfPeriod.setDate(endOfPeriod.getDate() + 7);
  endOfPeriod.setHours(23, 59, 59, 999);

  // Filter jobs (start - end)
  const filteredJobs = jobs.filter((job) => {
    if (!Array.isArray(job.importantDates) || job.importantDates.length === 0)
      return false;

    return job.importantDates.some((a) => {
      if (!a.date) return false;
      const date = new Date(a.date);
      return date >= startOfToday && date <= endOfPeriod;
    });
  });

  // Sort jobs by the soonest upcoming date in ascending order (soonest deadline first)
  const sortedJobs = filteredJobs.sort((a, b) => {
    // Find the earliest date within the window for each job
    const aDates = a.importantDates
      .filter((d) => d.date)
      .map((d) => new Date(d.date))
      .filter((date) => date >= startOfToday && date <= endOfPeriod);
    const bDates = b.importantDates
      .filter((d) => d.date)
      .map((d) => new Date(d.date))
      .filter((date) => date >= startOfToday && date <= endOfPeriod);

    const aEarliest = aDates.length
      ? Math.min(...aDates.map((d) => d.getTime()))
      : Infinity;
    const bEarliest = bDates.length
      ? Math.min(...bDates.map((d) => d.getTime()))
      : Infinity;

    return aEarliest - bEarliest;
  });

  return sortedJobs;
};
