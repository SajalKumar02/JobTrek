import { useEffect, useState } from 'react';

const REDIRECT_SECONDS = 3;

const PageNotFound = () => {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft === 0) {
      window.history.back();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 mb-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="text-gray-500">
        Redirecting you to the previous page in{' '}
        <span className="font-semibold">{secondsLeft}</span> second
        {secondsLeft !== 1 ? 's' : ''}...
      </p>
    </div>
  );
};

export default PageNotFound;
