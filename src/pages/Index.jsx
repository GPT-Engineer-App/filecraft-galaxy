import React, { useState } from 'react';
import FileUploadAndProcess from '../components/FileUploadAndProcess';
import ResultsDisplay from '../components/ResultsDisplay';

const Index = () => {
  const [results, setResults] = useState(null);

  const handleProcessComplete = (processedResults) => {
    setResults(processedResults);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">File Processing App</h1>
        <FileUploadAndProcess onProcessComplete={handleProcessComplete} />
        {results && <ResultsDisplay results={results} />}
      </div>
    </div>
  );
};

export default Index;
