import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResultsDisplay = ({ results }) => {
  const [activeTab, setActiveTab] = useState('images');

  const renderImages = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {results.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Result ${index + 1}`}
          className="w-full h-auto rounded-lg shadow-md"
        />
      ))}
    </div>
  );

  const renderCSV = () => (
    <div className="overflow-x-auto">
      <Table>
        <thead>
          <tr>
            {results.csv.headers.map((header, index) => (
              <th key={index} className="px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.csv.data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-4 py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="csv">CSV Data</TabsTrigger>
        </TabsList>
        <TabsContent value="images">{renderImages()}</TabsContent>
        <TabsContent value="csv">{renderCSV()}</TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
