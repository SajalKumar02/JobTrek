import { useContext } from "react"
import { JobContext } from "../../../app/providers/JobProvider";

export const useJobs = () => {
    const {
        jobs,
        createJob,
        updateJob,
        switchJobStatus,
        deleteJob,
        fetchJobViaId,
        showCreateModal,
        setShowCreateModal,
        setCloseCreateModal,
        filterString,
        handleSetFilter,
        searchString,
        handleSetSearchString
    } = useContext(JobContext);

    return {
        jobs,
        createJob,
        updateJob,
        switchJobStatus,
        deleteJob,
        fetchJobViaId,
        showCreateModal,
        setShowCreateModal,
        setCloseCreateModal,
        filterString,
        handleSetFilter,
        searchString,
        handleSetSearchString
    };
}