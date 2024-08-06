import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results || !results.processed_files) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Processed Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {results.processed_files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={`http://localhost:5000/${file}`}
              alt={`Processed Image ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              {file.split('/').pop()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
