import { useEffect, useState } from 'react';

const Loader = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleSetWidth = () => setWidth(100);
    handleSetWidth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md h-3 bg-gray-200 rounded overflow-hidden shadow">
        <div
          className="h-full bg-green-500 transition-all duration-2000 ease-linear"
          style={{ width: `${width}%` }}
        />
      </div>

      <div className="flex items-center mt-4 space-x-2">
        <span className="text-green-700 text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
