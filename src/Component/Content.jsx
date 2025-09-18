import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MonthlyHoursChart from './MonthlyHoursChart';
import MonthlyOvertimePie from './MonthlyOvertimePie';
import AvgBreakChart from './AvgBreakChart';
import TotalBreakChart from './TotalBreakChart';
import WorkingHoursTables from './WorkingHoursTables';
import EmployeeSummaryTable from './EmployeeSummaryTable';
import ExportCSV from './ExportCSV';

const Content = ({filter}) => {
    const [stats, setStats] = useState({
    totalEmployees: 0,
    avgLoginTime: "--:--",
    avgLogoutTime: "--:--",
    avgWorkHours: "0"
  });

const handleExport = async () => {
  const token = localStorage.getItem("token");
  const base = import.meta.env.VITE_API_URL;

  const p = new URLSearchParams();
  p.append("years", "2025");
  p.append("months", "January");
  p.append("employees", "E101");

  try {
    const res = await fetch(`${base}/api/export?${p.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Export failed");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv"; 
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Export failed");
  }
};
useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // get token
      if (!token) {
        console.error("No token found. User not logged in.");
        return;
      }

      const query = new URLSearchParams();
      if (filter?.year) query.append("years", filter.year);
      filter?.months?.forEach((month) => query.append("months", month));
      filter?.employees?.forEach((emp) => query.append("employees", emp));

      const url = `${import.meta.env.VITE_API_URL}/api/metrics?${query.toString()}`;
      console.log("Fetching metrics with filter:", filter);

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(res.data);
    } catch (err) {
      console.error("Error fetching metrics:", err);
    }
  };

  fetchData();
}, [filter]);



    return (
        <div className='bg-[#f6f8fb]'>
              <div className='container mx-auto '>
          
            <div className='bg-[linear-gradient(90deg,rgba(102,126,234,0.1)_0%,transparent_100%)] p-2 my-4 rounded-[10px] border-l-[5px] border-l-[#667eea]'>
                <p className='text-[1.3rem] font-[700]'>📈 Key Metrics</p>
            </div>
            <div className='flex justify-center items-center gap-8'> 
                <div className='flex flex-col justify-center items-center px-20 space-y-2  bg-[linear-gradient(135deg,rgba(102,126,234,0.1)_0%,rgba(118,75,162,0.1)_100%)] border-[rgba(255,255,255,0.2)] rounded-xl py-5 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent'>{stats.totalEmployees}</p>
                    <p>Total Employees</p>
                </div>
                <div className='flex flex-col justify-center items-center px-16 space-y-2  bg-[linear-gradient(135deg,rgba(102,126,234,0.1)_0%,rgba(118,75,162,0.1)_100%)] border-[rgba(255,255,255,0.2)] rounded-xl py-5 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent'>{stats.avgLogin}</p>
                    <p>Average Login Time</p>
                </div>
             <div className='flex flex-col justify-center items-center px-16 space-y-2  bg-[linear-gradient(135deg,rgba(102,126,234,0.1)_0%,rgba(118,75,162,0.1)_100%)] border-[rgba(255,255,255,0.2)] rounded-xl py-5 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent'>{stats.avgLogout}</p>
                    <p>Average Logout Time</p>
                </div>
                <div className='flex flex-col justify-center items-center px-16 space-y-2  bg-[linear-gradient(135deg,rgba(102,126,234,0.1)_0%,rgba(118,75,162,0.1)_100%)] border-[rgba(255,255,255,0.2)] rounded-xl py-5 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] bg-clip-text text-transparent'>{stats.avgWorkingHours}</p>
                    <p>Average Working Hour</p>
                </div>
            </div>
            <div className='py-12 bg-white '>
             <div className="p-4">
  <div className="flex justify-around">
    <p className="text-xl font-semibold">Total Working Hours Per Month</p>
    <p className="text-xl font-semibold">Monthly Overtime (Hours)</p>
  </div>
</div>

              
                <div className='flex'>
                <MonthlyHoursChart filter={filter}></MonthlyHoursChart>
                <MonthlyOvertimePie filter={filter}></MonthlyOvertimePie> 
                </div>
                </div>

           

            <div className='py-12 bg-white'>
                
                             <div className="p-4">
  <div className="flex justify-around">
    <p className="text-xl font-semibold">Average Break (Minute) Per Month</p>
    <p className="text-xl font-semibold">Total Break Hours Per Month</p>
  </div>
</div>
                <div className='flex'>
                <AvgBreakChart filter={filter}></AvgBreakChart>
               <TotalBreakChart filter={filter}></TotalBreakChart> 
                </div>            
                </div>
                <WorkingHoursTables filter={filter}></WorkingHoursTables>
<div className='bg-[linear-gradient(90deg,rgba(102,126,234,0.1)_0%,transparent_100%)] p-2 my-4 rounded-[10px] border-l-[5px] border-l-[#667eea]'>
                <p className='text-[1.3rem] font-[700]'>📋 Employee Summary</p>
            </div>
            <EmployeeSummaryTable filter={filter}></EmployeeSummaryTable>
<div className="flex justify-center mb-2">
  <ExportCSV filter={filter} />
</div>
        </div>
        </div>
      
    );
};

export default Content;