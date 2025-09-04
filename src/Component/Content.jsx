import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MonthlyHoursChart from './MonthlyHoursChart';
import MonthlyOvertimePie from './MonthlyOvertimePie';
import AvgBreakChart from './AvgBreakChart';
import TotalBreakChart from './TotalBreakChart';
import WorkingHoursTables from './WorkingHoursTables';
import EmployeeSummaryTable from './EmployeeSummaryTable';

const Content = ({filter}) => {
    const [stats, setStats] = useState({
    totalEmployees: 0,
    avgLoginTime: "--:--",
    avgLogoutTime: "--:--",
    avgWorkHours: "0"
  });

 useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5000/dashboard-stats";
        if (filter && (filter.months?.length || filter.year)) {
          const query = new URLSearchParams();
          if (filter.year) query.append("year", filter.year);
          if (filter.months?.length) query.append("months", filter.months.join(","));
          url += "?" + query.toString();
        }
        const res = await axios.get(url);
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [filter]);

    return (
        <div>
              <div className='container mx-auto '>
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
                <MonthlyHoursChart filter={filter}></MonthlyHoursChart>
               <MonthlyOvertimePie filter={filter}></MonthlyOvertimePie>
                
                </div>
               
                </div>
            <div className='py-12 '>
                
                <div className='flex justify-center items-center gap-24'>
          <p className='text-xl'>Average Break Per Month</p>
          <p className='text-xl'>Total Break Per Month</p>
                </div>
                <div className='flex'>
                <AvgBreakChart filter={filter}></AvgBreakChart>
               <TotalBreakChart filter={filter}></TotalBreakChart>
                
                </div>
               
                </div>
                <WorkingHoursTables filter={filter}></WorkingHoursTables>
                 <div className='bg-blue-100 p-4 my-4 rounded-xl border-l-8 border-l-blue-400'>
                <p className='text-xl font-bold'>Employee Summary</p>
            </div>
            <EmployeeSummaryTable filter={filter}></EmployeeSummaryTable>
        </div>
        </div>
      
    );
};

export default Content;