const STAGE_ORDER = ['wishlist', 'applied', 'oa', 'interview', 'offer', 'rejected'];

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
