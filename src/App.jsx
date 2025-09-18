import './App.css';
import Content from './Component/Content';
import { useState } from "react";
import { Menu, X } from "lucide-react";
import FilterBar from './Component/Filterbar';
import Navbar from './Navbar';
import Login from './Component/Login';
import Aside from './Aside';
import { Outlet } from 'react-router-dom';

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
  console.log(filter);
const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
  };
  return (
   <div>
      <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />

      <div className="flex h-screen bg-white mt-16">
        {/* Sidebar */}
        <Aside filter={filter} setFilter={setFilter} isOpen={isOpen} />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out bg-[#f6f8fb]`}>
          <main className={`flex-1 ${isOpen ? "ml-64" : "ml-0"}`}>
          
            <Content filter={filter}></Content>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
