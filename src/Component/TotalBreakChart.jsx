import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TotalBreakChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/total-break-per-month")
      .then(res => res.json())
      .then(data => {
        const chartData = data.map(item => ({
          month: monthNames[item.month - 1],
          totalBreak: item.totalBreakHours
        }));
        setData(chartData);
      });
  }, []);

  return (
    <ResponsiveContainer width="50%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="totalBreak" fill="#2563EB" name="Total Break Hours" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TotalBreakChart;
