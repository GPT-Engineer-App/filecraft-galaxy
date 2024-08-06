import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload } from 'lucide-react';

const FileUploadAndProcess = ({ onProcessComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFiles = async () => {
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      onProcessComplete(response.data);
      toast({
        title: "Files processed successfully",
        description: "Your files have been uploaded and processed.",
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Error processing files",
        description: "There was an error processing your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setFiles([]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? 'Drop the files here...'
            : "Drag 'n' drop some files here, or click to select files"}
        </p>
      </div>
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <ul className="mt-2 text-sm text-gray-500">
            {files.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      {files.length > 0 && (
        <Button
          onClick={uploadFiles}
          disabled={uploading}
          className="mt-4 w-full"
        >
          {uploading ? 'Processing...' : 'Process Files'}
        </Button>
      )}
      {uploading && (
        <Progress value={uploadProgress} className="mt-2" />
      )}
    </div>
  );
};

export default FileUploadAndProcess;
