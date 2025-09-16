import { useEffect, useState } from "react";
import axios from "axios";

const FilterBar = ({ filter, setFilter }) => {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch filters from API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
         const token = localStorage.getItem("token"); // get token

      if (!token) {
        console.error("No token found. User not logged in.");
        return;
      }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/options`,
          {
          headers: {
            Authorization: `Bearer ${token}`, // pass token in headers
          },
        }
        );
        const data = res.data;

        setYears(data.years || []);
        setMonths(data.months || []);
        setEmployees(data.employees || []);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
      }
    };

    fetchFilters();
  }, []);

  // Toggle month selection
  const toggleMonth = (month) => {
    const newMonths = (filter.months || []).includes(month)
      ? filter.months.filter((m) => m !== month)
      : [...(filter.months || []), month];
    setFilter({ ...filter, months: newMonths });
  };

  // Toggle employee selection
  const toggleEmployee = (emp) => {
    const newEmployees = (filter.employees || []).includes(emp)
      ? filter.employees.filter((e) => e !== emp)
      : [...(filter.employees || []), emp];
    setFilter({ ...filter, employees: newEmployees });
  };

  // Change year
  const changeYear = (e) => {
    setFilter({ ...filter, year: e.target.value });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter({ year: "", months: [], employees: [] });
  };

  // Filter employees by search
  const filteredEmployees = employees.filter((emp) =>
    emp.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 ">
      {/* Filters Heading */}
      <div>
        <p className="font-semibold mb-2 text-xl">Filters</p>
      </div>

      {/* Calendar Section */}
      <div className="border border-[#e2e8f0] bg-white rounded-xl">
        <div className="flex justify-between items-center p-2 text-[#475569]">
          <p className="font-semibold">Calendar</p>
          <button
            onClick={clearFilters}
            className="border border-[#cbd5e1] rounded-xl px-3 py-1 hover:bg-[#f6f8fbcc] transition"
          >
            Clear
          </button>
        </div>

        {/* Year Dropdown */}
        <div className="p-2">
          <select
            value={filter.year}
            onChange={changeYear}
            className="w-full p-2 rounded-xl border-2 border-[#e2e8f0] bg-white"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Month Buttons */}
        <div className="p-2">
          <p className="font-semibold mb-2">Select Months</p>
          <div className="flex flex-wrap gap-2">
            {months.map((m) => {
              const isSelected = (filter.months || []).includes(m);
              return (
                <button
                  key={m}
                  onClick={() => toggleMonth(m)}
                  type="button"
                  className={`px-3 py-1 rounded-lg border transition
                    ${isSelected ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                >
                  {m.slice(0, 3)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Employee Section */}
      <div className="border border-[#e2e8f0] bg-white rounded-xl p-4 mb-10">
        <div className="flex justify-between items-center text-[#475569]">
          <p className="font-semibold">Employee</p>
        </div>

        {/* Search Input */}
        <div className="flex items-center border border-[#cbd5e1] rounded-lg px-3 py-2 w-full mt-3">
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Employee Buttons */}
      <div className="mt-3 mb-5 flex flex-wrap gap-2">
  {filteredEmployees.map((emp) => {
    const isSelected = (filter.employees || []).includes(emp);
    return (
      <label
        key={emp}
        className={`flex items-center gap-2 px-4 py-1 border rounded-lg cursor-pointer transition
          ${isSelected ? "bg-green-500 text-white border-green-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleEmployee(emp)}
          className="form-checkbox h-4 w-full text-green-500"
        />
        <span>{emp}</span>
      </label>
    );
  })}
</div>
      </div>
    </div>
  );
};

export default FilterBar;
