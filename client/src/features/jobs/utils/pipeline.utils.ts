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
        const status = job.status.toLowerCase();
        if (groupedJobs[status]) {
            groupedJobs[status].push(job);
        }
    });

    return groupedJobs;
};

export const getStatCountByStatus = (jobs) => {
    const statJobs = {
        total: 0, // all
        active: 0, // all that are not rejected
        interview: 0, // status = interview
        offers: 0, // status = offer
        responseRate: 0 // percentage of jobs not rejected
    };

    let respondedCount = 0; // total - wishlist
    let positiveCount = 0; // total - rejected

    jobs.forEach(job => {
        statJobs.total += 1;
        const status = job.status?.toLowerCase?.() || job.status;

        // 'Active' means not rejected
        if (status !== 'rejected') {
            statJobs.active += 1;
        }
        // 'Interview' status only
        if (status === 'interview') {
            statJobs.interview += 1;
        }
        // 'Offer' status only
        if (status === 'offer') {
            statJobs.offers += 1;
        }

        // For response rate: respondedCount = jobs not in wishlist, positiveCount = jobs not rejected
        if (status !== 'wishlist') {
            respondedCount += 1;
        }
        if (status !== 'rejected') {
            positiveCount += 1;
        }
    });

    statJobs.responseRate = respondedCount > 0 ? Math.round((positiveCount / respondedCount) * 100) : 0;

    return statJobs;
};