import './App.css';
import Content from './Component/Content';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import FilterBar from './Component/Filterbar';
import Navbar from './Navbar';
import Login from './Component/Login';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Filter state
  const [filter, setFilter] = useState({ months: [], year: "", employees: [] });

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
  };
  return (
    <div>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />

      <div className="flex h-screen bg-white mt-16">
        {/* Sidebar */}
        <aside
          className={`
            fixed left-0 h-full bg-[#f6f8fb] text-black z-40
            w-64 transform transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 border
            ${isOpen ? "translate-x-0" : "-translate-x-full "}
          `}
        >
          <div className="mt-6 px-4">
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
        </aside>

        {/* Main Content */}
        <div className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          bg-[#f6f8fb]
        `}>
          <main className={`flex-1 ${isOpen ? "ml-64" : "ml-0"}`}>
            <Content filter={filter} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
