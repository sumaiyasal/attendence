import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TotalBreakChart = ({filter}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const query = new URLSearchParams();
        if (filter?.year) query.append("year", filter.year);
        if (filter?.months?.length) query.append("months", filter.months.join(","));
        const res = await fetch(`http://localhost:5000/total-break-per-month?${query.toString()}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const result = await res.json();
        const chartData = result.map(item => ({
          month: monthNames[item.month - 1],
          totalBreak: item.totalBreakHours
        }));
      setData(chartData);
    };
    fetchData();
  }, [filter]);

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
