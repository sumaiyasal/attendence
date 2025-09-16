import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MonthlyHoursChart = ({ filter }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User not logged in.");
        return;
      }
        const query = new URLSearchParams();
       if (filter?.year) query.append("years", filter.year);
        filter?.months?.forEach((month) => query.append("months", month));
        filter?.employees?.forEach((emp) => query.append("employees", emp));
        let url = `${import.meta.env.VITE_API_URL}/api/charts?${query.toString()}`; 
        const response = await axios.get(url,
           {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
        );
        setStats(response.data); 
      } catch (err) {
        console.error("Error fetching monthly stats:", err);
      }
    };

    fetchData();
  }, [filter]);

  if (!stats) return <p>Loading...</p>;

  // Map API monthlyHours array to chart data
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const data = stats.monthlyBreakHours.map((hours, index) => ({
    month: monthNames[index],
    breakHours: hours,
  }));

  return (
    <ResponsiveContainer width="50%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: "Total Break Hours", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="breakHours" fill="rgb(139, 155, 255)" name="Break Hours" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyHoursChart;
