import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MonthlyHoursChart = ({filter}) => {
  const [data, setData] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams();
      if (filter?.year) query.append("year", filter.year);
      if (filter?.months?.length) query.append("months", filter.months.join(","));

      const res = await fetch(`http://localhost:5000/employee-monthly-hours?${query.toString()}`);
      const result = await res.json();

      const monthMap = {};
      result.forEach((item) => {
        const month = item.month;
        if (!monthMap[month]) monthMap[month] = 0;
        monthMap[month] += item.totalWorkHours;
      });

      const chartData = Object.keys(monthMap)
        .sort((a, b) => a - b)
        .map((month) => ({
          month: parseInt(month),
          totalHours: monthMap[month],
        }));

      setData(chartData);
    };

    fetchData();
  }, [filter]);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <ResponsiveContainer width="60%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tickFormatter={(m) => monthNames[m - 1]} />
        <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalHours" fill="#1E40AF" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyHoursChart;
