import { useContext } from "react"
import { JobContext } from "../../../app/providers/JobProvider";

export const useJobs = () => {
    const {
        jobs,
        countJobs,
        createJob,
        updateJob,
        deleteJob,
        showCreateModal,
        setShowCreateModal,
        setCloseCreateModal
    } = useContext(JobContext);

    return {
        jobs,
        countJobs,
        createJob,
        updateJob,
        deleteJob,
        showCreateModal,
        setShowCreateModal,
        setCloseCreateModal
    };
}