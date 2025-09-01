import { useState, useEffect } from "react";

export default function EmployeeSummaryTable() {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Replace with backend API
    fetch("http://localhost:5000/employee-summary")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1 * order;
    if (a[sortConfig.key] > b[sortConfig.key]) return 1 * order;
    return 0;
  });

  // Filtering
  const filteredData = sortedData.filter((item) =>
    item.employee.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employee Summary</h2>

      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="🔍 Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              {[
                "Employee",
                "Total Hours",
                "Avg Hours",
                "Max Hours",
                "Min Hours",
                "Days Worked",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 cursor-pointer hover:text-blue-600 transition"
                  onClick={() =>
                    handleSort(
                      header.toLowerCase().replace(" ", "").replace(" ", "")
                    )
                  }
                >
                  {header}
                  {sortConfig.key ===
                    header.toLowerCase().replace(" ", "").replace(" ", "") && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 transition duration-200"
              >
                <td className="px-6 py-3 font-medium text-gray-800">
                  {row.employee}
                </td>
                <td className="px-6 py-3">{row.totalHours}</td>
                <td className="px-6 py-3">{row.avgHours}</td>
                <td className="px-6 py-3">{row.maxHours}</td>
                <td className="px-6 py-3">{row.minHours}</td>
                <td className="px-6 py-3">{row.daysWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
