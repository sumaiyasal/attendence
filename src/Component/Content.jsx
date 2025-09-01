import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MonthlyHoursChart from './MonthlyHoursChart';
import MonthlyOvertimePie from './MonthlyOvertimePie';
import AvgBreakChart from './AvgBreakChart';
import TotalBreakChart from './TotalBreakChart';
import WorkingHoursTables from './WorkingHoursTables';
import EmployeeSummaryTable from './EmployeeSummaryTable';

const Content = () => {
    const [stats, setStats] = useState({
    totalEmployees: 0,
    avgLoginTime: "--:--",
    avgLogoutTime: "--:--",
    avgWorkHours: "0"
  });

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard-stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);
    return (
        <div className='container mx-auto'>
            <div>
            <h1 className='flex justify-center items-center text-4xl font-bold text-purple-700'>Attendence Monitoring Dashboard</h1>
            </div>
            <div className='bg-blue-100 p-4 my-4 rounded-xl border-l-8 border-l-blue-400'>
                <p className='text-xl font-bold'>Key Metrics</p>
            </div>
            <div className='flex justify-center iyems-center gap-8'> 
                <div className='flex flex-col justify-center items-center px-16 space-y-2 bg-blue-100 rounded-xl py-4 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold text-blue-500'>{stats.totalEmployees}</p>
                    <p>Total Employees</p>
                </div>
                <div className='flex flex-col justify-center items-center px-16 space-y-2 bg-blue-100 rounded-xl py-14 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold text-blue-500'>{stats.avgLoginTime} AM</p>
                    <p>Average Login Time</p>
                </div>
             <div className='flex flex-col justify-center items-center px-16 space-y-2 bg-blue-100 rounded-xl py-14 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold text-blue-500'>{stats.avgLogoutTime} PM</p>
                    <p>Average Logout Time</p>
                </div>
                <div className='flex flex-col justify-center items-center px-16 space-y-2 bg-blue-100 rounded-xl py-14 transform transition duration-700 hover:scale-105 animate-fadeIn'>
                    <p className='text-4xl font-bold text-blue-500'>{stats.avgWorkHours}</p>
                    <p>Average Working Hour</p>
                </div>
            </div>
            <div className='py-12 '>
                
                <div className='flex justify-center items-center gap-24'>
          <p className='text-xl'>Total Working Hours Per Month</p>
          <p className='text-xl'>Monthly Overtime(Hours)</p>
                </div>
                <div className='flex'>
                <MonthlyHoursChart></MonthlyHoursChart>
               <MonthlyOvertimePie></MonthlyOvertimePie>
                
                </div>
               
                </div>
            <div className='py-12 '>
                
                <div className='flex justify-center items-center gap-24'>
          <p className='text-xl'>Average Break Per Month</p>
          <p className='text-xl'>Total Break Per Month</p>
                </div>
                <div className='flex'>
                <AvgBreakChart></AvgBreakChart>
               <TotalBreakChart></TotalBreakChart>
                
                </div>
               
                </div>
                <WorkingHoursTables></WorkingHoursTables>
                 <div className='bg-blue-100 p-4 my-4 rounded-xl border-l-8 border-l-blue-400'>
                <p className='text-xl font-bold'>Employee Summary</p>
            </div>
            <EmployeeSummaryTable></EmployeeSummaryTable>
        </div>
    );
};

export default Content;