import React from "react";
import FilterBar from "./Component/Filterbar";
// import FilterBar from "./Component/Filterbar";

const Aside = ({ filter, setFilter, isOpen }) => {
  return (
    <aside
      className={`fixed left-0 h-full bg-[#f6f8fb] text-black z-40
        w-64 transform transition-transform duration-300 ease-in-out
        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="mt-6 px-4">
        <FilterBar filter={filter} setFilter={setFilter} />
      </div>
    </aside>
  );
};

export default Aside;
