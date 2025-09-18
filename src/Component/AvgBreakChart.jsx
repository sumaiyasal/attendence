import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loading from "./Loading";

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const AvgBreakChart = ({filter}) => {
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

  if (!stats?.monthlyBreakMinutesAvg) return <Loading></Loading>;

  const data = stats.monthlyBreakMinutesAvg.map((hours, index) => ({
    month: monthNames[index],
    avgtime: hours,
  }));

  return (
   <ResponsiveContainer width="50%" height={400}>
         <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="month" />
           <YAxis label={{ value: "BreakMinutesAvg", angle: -90, position: "insideLeft" }} />
           <Tooltip formatter={(value) => `${value.toFixed(2)} hrs`} />
           <Legend />
           <Line type="monotone" dataKey="avgtime" stroke="rgb(240, 147, 251)" strokeWidth={3} activeDot={{ r: 6 }} />
         </LineChart>
       </ResponsiveContainer>
  );
};

export default AvgBreakChart;
