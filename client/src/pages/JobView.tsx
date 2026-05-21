import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useJobs } from '../features/jobs/hooks/useJobs';
import { ArrowLeft, Pencil } from 'lucide-react';

const JobView = () => {
  const { jobId } = useParams();
  const { fetchJobViaId } = useJobs();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError('');
      try {
        if (jobId) {
          const fetchedJob = await fetchJobViaId(jobId);
          setJob(fetchedJob);
        } else {
          setError('Job ID not found in URL.');
        }
      } catch (err) {
        setError('Could not fetch job details.');
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, fetchJobViaId]);

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div>
      {/* Bar with Back and Edit buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-1.5 rounded border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button
          onClick={() => {
            /* TODO: link to edit page or trigger edit action */
          }}
          className="px-4 py-1.5 rounded border border-blue-600 bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Pencil size={18} />
          Edit
        </button>
      </div>

      <h2>Job Details</h2>
      <p>
        <strong>Company Name:</strong> {job.companyName}
      </p>
      <p>
        <strong>Job Role:</strong> {job.jobRole}
      </p>
      <p>
        <strong>Description:</strong>{' '}
        {job.description || <em>No description provided</em>}
      </p>
      <p>
        <strong>Job Type:</strong> {job.jobType}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      {job.officeAddress && (
        <p>
          <strong>Office Address:</strong> {job.officeAddress}
        </p>
      )}
      <p>
        <strong>Status:</strong> {job.status}
      </p>
      <p>
        <strong>Base Pay:</strong> {job.basePay ?? 0}
      </p>
      <p>
        <strong>Monthly Salary:</strong> {job.monthlySalary ?? 0}
      </p>
      <p>
        <strong>CTC:</strong> {job.ctc ?? 0}
      </p>
      <p>
        <strong>Bonus Included:</strong> {job.bonusIncluded ? 'Yes' : 'No'}
      </p>
      {job.bonusIncluded && job.bonusDescription && (
        <p>
          <strong>Bonus Description:</strong> {job.bonusDescription}
        </p>
      )}
      <p>
        <strong>Benefits:</strong> {job.benefits ? 'Yes' : 'No'}
      </p>
      {job.benefits &&
        Array.isArray(job.benefitsDetails) &&
        job.benefitsDetails.length > 0 && (
          <p>
            <strong>Benefits Details:</strong> {job.benefitsDetails.join(', ')}
          </p>
        )}
      <p>
        <strong>Active:</strong> {job.isActive ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Notes:</strong> {job.notes || <em>None</em>}
      </p>
      <div>
        <strong>Important Dates:</strong>
        {job.importantDates?.length > 0 ? (
          <ul>
            {job.importantDates.map((d, idx) =>
              d ? (
                <li key={idx}>
                  {d.label}:&nbsp;
                  {d.date ? new Date(d.date).toLocaleDateString() : 'No date'}
                </li>
              ) : null,
            )}
          </ul>
        ) : (
          <span> None</span>
        )}
      </div>
      <p>
        <strong>Created At:</strong>{' '}
        {job.createdAt ? new Date(job.createdAt).toLocaleString() : 'Unknown'}
      </p>
      <p>
        <strong>Updated At:</strong>{' '}
        {job.updatedAt ? new Date(job.updatedAt).toLocaleString() : 'Unknown'}
      </p>
    </div>
  );
};

export default JobView;
