import { useEffect, useState } from "react";
import CSVUpload from "./CSVUpload";

const FilterBar = ({ filter, setFilter }) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  // const years = [2024, 2025];
  const[years,setYears]=useState([]);
  useEffect(() => {
  const fetchYears = async () => {
    try {
      const res = await fetch("http://localhost:5000/attendance-years");
      const data = await res.json();
      setYears(data); // data is an array now
    } catch (err) {
      console.error("Failed to fetch years:", err);
    }
  };

  fetchYears();
}, []);


  const toggleMonth = (month) => {
    const newMonths = filter.months.includes(month)
      ? filter.months.filter(m => m !== month)
      : [...filter.months, month];
    setFilter({ ...filter, months: newMonths });
  };

  const changeYear = (e) => {
    setFilter({ ...filter, year: e.target.value });
  };

  const clearFilters = () => {
    setFilter({ year: "", months: [] });
  };

  return (
    <div className="space-y-4  ">
      <div className="border-2 rounded-xl p-4">
        <CSVUpload></CSVUpload>
      </div>
      <div>
         <p className="font-semibold mb-2 text-xl">Filters</p>
            <button
        onClick={clearFilters}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Clear Filters
      </button>
      </div>
      <div>
        <p className="font-semibold mb-2">Select Months</p>
        <div className="flex flex-wrap gap-2">
          {months.map(m => (
            <label
              key={m}
              className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded"
            >
              <input
                type="checkbox"
                checked={filter.months.includes(m)}
                onChange={() => toggleMonth(m)}
                className="accent-white"
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Select Year</p>
        <select
          value={filter.year}
          onChange={changeYear}
          className="w-full p-1 rounded text-black bg-white"
        >
          <option value="">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

  
    </div>
  );
};

export default FilterBar;
