const FilterBar = ({ filter, setFilter }) => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const years = [2024, 2025];

  const toggleMonth = (month) => {
    const newMonths = filter.months.includes(month)
      ? filter.months.filter(m => m !== month)
      : [...filter.months, month];
    setFilter({ ...filter, months: newMonths });
  };

  const changeYear = (e) => {
    setFilter({ ...filter, year: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold mb-2">Select Months</p>
        <div className="flex flex-wrap gap-2">
          {months.map(m => (
            <label key={m} className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded">
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
          className="w-full p-1 rounded text-black"
        >
          <option value="">All Years</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
