import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#1E40AF", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9"];

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const MonthlyOvertimePie = ({filter}) => {
  const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
        // Build query params from filter
        const query = new URLSearchParams();
        if (filter?.year) query.append("year", filter.year);
        if (filter?.months?.length) query.append("months", filter.months.join(","));

        const res = await fetch(`http://localhost:5000/employee-monthly-hours?${query.toString()}`);
        if (!res.ok) throw new Error("Network response was not ok");

        const result = await res.json();

        // Aggregate totalWorkHours per month
        const monthMap = {};
        result.forEach((item) => {
          const month = item.month;
          if (!monthMap[month]) monthMap[month] = 0;
          monthMap[month] += item.totalWorkHours;
        });

        // Convert to chart data
        const chartData = Object.keys(monthMap)
          .sort((a, b) => a - b)
          .map((month) => ({
            name: monthNames[parseInt(month) - 1],
            value: monthMap[month],
          }));

        setData(chartData);
      
    };

    fetchData();
  }, [filter]);


  return (
    <ResponsiveContainer width="60%" height={400}>
      <PieChart>
        <Pie 
          data={data} 
          dataKey="value" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={120} 
          fill="#8884d8" 
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} hrs`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MonthlyOvertimePie;
