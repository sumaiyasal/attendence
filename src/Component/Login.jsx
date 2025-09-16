import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import axios from "axios";
import animationData from "../assets/animation/progerss.json"; 

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.access_token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Side - Animation */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden md:flex items-center justify-center p-6"
        >
          <Lottie animationData={animationData} loop={true} className="w-4/5" />
        </motion.div>

        {/* Right Side - Form */}
        <motion.form
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md mx-auto relative"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Attendence Dashboard
          </h2>
          <p className="text-xl font-semibold mb-6 text-center text-gray-500">
            Sign in to access the dashboard
          </p>

          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-gray-600 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Login
          </motion.button>
          <p className="text-center text-gray-500 pt-4">
            Default: admin@example.com / admin123
          </p>

          {/* Decorative Circles */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-300 rounded-full opacity-50 animate-pulse"></div>
        </motion.form>
      </div>
    </div>
  );
}
