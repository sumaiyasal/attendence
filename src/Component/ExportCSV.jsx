import React from "react";
import axios from "axios";

const ExportCSV = ({ filter }) => {
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      // Build query params
      const params = new URLSearchParams();
      if (filter.year) params.append("years", filter.year);
      filter.months?.forEach((month) => params.append("months", month));
      filter.employees?.forEach((emp) => params.append("employees", emp));
      const url = `${import.meta.env.VITE_API_URL}/api/export?${params.toString()}`;

      // Fetch CSV with auth token
      const res = await axios.get(url, {
        headers:{
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Important for file download
      });

      // Create a link to download
      const blob = new Blob([res.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `employee_summary.csv`;
      link.click();
      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Error exporting CSV:", err);
      alert("Failed to export CSV");
    }
  };

  return (
    <button
      onClick={handleExport}
      className="bg-[#667eea] text-white py-[10px] px-[14px] rounded-lg hover:bg-[#4668fffd] transition text-xl"
    >
      📥 Export Current Data
    </button>
  );
};

export default ExportCSV;
