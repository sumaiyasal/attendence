import { useState } from "react";

const Sidebar = ({ onFilterChange }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const years = [2024, 2025]; // example years

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (month) => {
    const newMonths = selectedMonths.includes(month)
      ? selectedMonths.filter(m => m !== month)
      : [...selectedMonths, month];
    setSelectedMonths(newMonths);
    onFilterChange({ months: newMonths, year: selectedYear });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange({ months: selectedMonths, year });
  };

  return (
    <aside className="w-64 bg-amber-700 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <p className="font-semibold mb-2">Select Months</p>
        <div className="flex flex-wrap gap-2">
          {months.map(month => (
            <label key={month} className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded">
              <input
                type="checkbox"
                className="accent-white"
                checked={selectedMonths.includes(month)}
                onChange={() => handleMonthChange(month)}
              />
              {month}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Select Year</p>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full p-1 rounded text-black"
        >
          <option value="">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
