import React, { useState } from "react";
import axios from "axios";

function CSVUploadSidebar() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Please upload a valid CSV file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".csv")) {
      setFile(droppedFile);
      setMessage("");
    } else {
      setMessage("Please upload a valid CSV file");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setMessage("");
    document.getElementById("csvInput").value = ""; // Reset input to allow same file
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const res = await axios.post("http://localhost:5000/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Upload successful!");
      handleRemoveFile(); // clear file and reset input
    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="p-4 w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📁 Data Source
      </h2>

      {/* Drag & Drop area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer ${
          isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("csvInput").click()}
      >
        <p className="text-white">
          Drag & drop file here or click to select CSV
        </p>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        id="csvInput"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Display selected file with remove button */}
      {file && (
        <div className="mt-3 flex items-center justify-between bg-gray-100 p-2 rounded-md border border-gray-300">
          <span className="truncate text-black">{file.name}</span>
          <button
            onClick={handleRemoveFile}
            className="text-red-500 font-bold hover:text-red-700 ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 ${
          file ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Upload CSV
      </button>

      {/* Limit info */}
      <p className="text-xs text-gray-400 mt-1">Limit 200MB per file • CSV</p>

      {/* Message */}
      {message && (
        <p
          className={`mt-2 text-sm ${
            message.includes("failed") ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CSVUploadSidebar;
