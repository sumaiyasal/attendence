import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeSummaryTable = ({ filter }) => {
  const [data, setData] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User not logged in.");
        return;
      }

      const query = new URLSearchParams();
      if (filter?.year) query.append("years", filter.year);
      filter?.months?.forEach((month) => query.append("months", month));
      filter?.employees?.forEach((emp) => query.append("employees", emp));

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/summary?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const normalized = res.data.rows.map((r) => ({
        id: r.ID,
        employee: r.Name,
        totalHours: r["Total Hours"],
        avgHours: r["Avg Daily Hours"],
        avgBreak: r["Avg Break (min)"],
        daysWorked: r["Days Worked"],
      }));

      setData(normalized);
    } catch (err) {
      console.error("Error fetching employee summary:", err);
    }
  };

  fetchData();
}, [filter]);


  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md mb-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-white text-black">
          <tr>
            <th className="px-6 py-3 text-left text-lg font-bold">ID</th>
            <th className="px-6 py-3 text-left text-lg font-bold">Employee</th>
            <th className="px-6 py-3 text-left text-lg font-bold">Total Hours</th>
            <th className="px-6 py-3 text-left text-lg font-bold">Avg Daily Hours</th>
            <th className="px-6 py-3 text-left text-lg font-bold">Avg Break (min)</th>
            <th className="px-6 py-3 text-left text-lg font-bold">Days Worked</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-purple-50 transition duration-200">
              <td className="px-6 py-3 font-medium text-gray-800">{row.id}</td>
              <td className="px-6 py-3">{row.employee}</td>
              <td className="px-6 py-3">{row.totalHours.toFixed(2)}</td>
              <td className="px-6 py-3">{row.avgHours.toFixed(2)}</td>
              <td className="px-6 py-3">{row.avgBreak.toFixed(2)}</td>
              <td className="px-6 py-3">{row.daysWorked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSummaryTable;
