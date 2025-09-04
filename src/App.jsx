import './App.css';
import Content from './Component/Content';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import FilterBar from './Component/Filterbar';
// import FilterBar from './Component/FilterBar';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Filter state
  const [filter, setFilter] = useState({ months: [], year: "" });
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white z-40
          w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200
          ${isOpen ? "translate-x-0" : "-translate-x-full "}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-500">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Filters */}
        <div className="mt-6 px-4">
          <FilterBar filter={filter} setFilter={setFilter} />
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? "ml-64" : "ml-0"}
        `}
      >
        {/* Top Bar */}
        <header className="p-4 flex items-center bg-white shadow-md">
          {!isOpen && (
            <button className="text-blue-600 mr-4" onClick={toggleSidebar}>
              <Menu size={28} />
            </button>
          )}
      
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <Content filter={filter} />
        </main>
      </div>
    </div>
  );
}

export default App;
