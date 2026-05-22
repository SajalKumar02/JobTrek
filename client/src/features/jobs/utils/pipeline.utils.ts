export const groupJobsByStatus = (jobs) => {
    const groupedJobs = {
        wishlist: [],
        applied: [],
        oa: [],
        interview: [],
        offer: [],
        rejected: []
    };

    jobs.forEach(job => {
        const status = job?.status?.toLowerCase();
        if (groupedJobs[status]) {
            groupedJobs[status].push(job);
        }
    });

    return groupedJobs;
};

export const getStatCountByStatus = (jobs) => {
    let total = 0;
    let active = 0;
    let interview = 0;
    let offers = 0;

    let appliedCount = 0;   // jobs not in wishlist
    let respondedCount = 0; // interviews + offers

    if (Array.isArray(jobs) && jobs.length > 0) {
        for (const job of jobs) {
            total++;
            const status = String(job?.status || '').toLowerCase();

            if (status !== 'rejected') active++;
            if (status === 'interview') interview++;
            if (status === 'offer') offers++;

            // Applied = anything except wishlist
            if (status !== 'wishlist') appliedCount++;

            // Responded = interview or offer
            if (status === 'interview' || status === 'offer') respondedCount++;
        }
    }

    const responseRate =
        appliedCount > 0 ? Math.round((respondedCount / appliedCount) * 100) : 0;

    return { total, active, interview, offers, responseRate };
};

export const getJobsThroughStatus = (jobs, status) => {
    const normalizedStatus = status.toLowerCase();
    return jobs.filter(job =>
        String(job?.status || '').toLowerCase() === normalizedStatus
    );
};