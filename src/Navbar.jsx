import { div } from "framer-motion/client";
import { Menu, X } from "lucide-react";

export default function Navbar({ isOpen, toggleSidebar,onLogout }) {
  return (

    <header className="fixed top-0 left-0 right-0 z-50 
  p-4 flex items-center justify-between 
  bg-[#f6f8fbcc] backdrop-blur-[6px] shadow-md">
      {/* Sidebar toggle button */}
      <div className="flex items-center">
        <button
          className="text-blue-600 mr-2 sm:mr-4"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Dashboard Title */}
      <h1 className="flex-1 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
        Attendance Monitoring Dashboard
      </h1>

      {/* Right placeholder (to keep title centered) */}
      <div className="w-10 sm:w-12 mr-12" >
         <button
        onClick={onLogout}
        className="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        Logout
      </button>
      </div>
    </header>


  );
}
