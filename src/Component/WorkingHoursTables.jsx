import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkingHoursTables = ({ filter }) => {
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);

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
        let url = `${import.meta.env.VITE_API_URL}/api/charts?${query.toString()}`;
        const res = await axios.get(url,
          {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
        );

        // Assuming your backend returns the JSON you shared
        setTopData(res.data.top5);
        setBottomData(res.data.bottom5);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [filter]);

  const renderTable = (data, title, color) => (
    <div className={`w-full md:w-1/2 rounded-2xl shadow-xl overflow-hidden ${color} text-white`}>
      {/* Header */}
      <div className="px-6 py-4 font-bold text-lg">{title}</div>

      {/* Table */}
      <div className="text-gray-800 p-3.5">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-[#ffffff1A] text-white">
          <thead className="border border-gray-300 bg-[#f6f8fb3f]  border-collapse p-2">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">ID</th>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Working Hour</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, index) => (
              <tr key={emp.id || index} className="border-b last:border-none">
                <td className="px-6 py-3">{emp.id}</td>
                <td className="px-6 py-3 font-medium">{emp.name}</td>
                <td className="px-6 py-3 font-semibold">{emp.hours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {renderTable(topData, "🏆 Top 5 by Working Hour", "bg-gradient-to-br from-[#667eea] to-[#764ba2]")}
      {renderTable(bottomData, "⚠️ Bottom 5 by Working Hour", "bg-[linear-gradient(135deg,#f093fb_0%,#f5576c_100%)]")}
    </div>
  );
};

export default WorkingHoursTables;
