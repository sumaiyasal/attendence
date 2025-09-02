import React, { useEffect, useState } from "react";

const WorkingHoursTables = ({filter}) => {
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const query = new URLSearchParams();
        if (filter?.year) query.append("year", filter.year);
        if (filter?.months?.length) query.append("months", filter.months.join(","));
        const [topRes, bottomRes] = await Promise.all([
          fetch(`http://localhost:5000/top-working-hours?${query.toString()}`),
          fetch(`http://localhost:5000/bottom-working-hours?${query.toString()}`)
        ]);
        if (!topRes.ok || !bottomRes.ok) throw new Error("Failed to fetch data");
        const [topResult, bottomResult] = await Promise.all([topRes.json(), bottomRes.json()]);
        setTopData(topResult);
        setBottomData(bottomResult);
    };

    fetchData();
  }, [filter]);


  const renderTable = (data, title, color) => (
    <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className={`px-6 py-4 ${color} text-white font-bold text-lg`}>
        {title}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Rank</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Employee</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, index) => (
              <tr
                key={emp.employee}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-700">{index + 1}</td>
                <td className="px-6 py-3 text-gray-700">{emp.employee}</td>
                <td className="px-6 py-3 font-semibold text-gray-800">{emp.totalHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {renderTable(topData, "🏆 Top 5 Employees", "bg-green-500")}
      {renderTable(bottomData, "⚠️ Bottom 5 Employees", "bg-red-500")}
    </div>
  );
};

export default WorkingHoursTables;
