import { useParams } from 'react-router';

const Jobs = () => {
  const jobID = useParams();

  console.log(jobID);

  return <div>Jobs</div>;
};

export default Jobs;
