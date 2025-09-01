import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#1E40AF", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#DBEAFE", "#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9"];

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const MonthlyOvertimePie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/monthly-overtime")
      .then(res => res.json())
      .then(data => {
        // Convert month number to month name
        const chartData = data.map(item => ({
          name: monthNames[item.month - 1],
          value: item.totalOvertime
        }));
        setData(chartData);
      });
  }, []);

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
