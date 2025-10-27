
import { useState } from "react";
import api from "../api/axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react"; 

export default function Login({ setUser }) {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
    } catch (err) {
      setError("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-80 transition-transform hover:scale-[1.02]"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-blue-700">
          Enterprise Management System
        </h2>
        <h6 className="text-xl font-bold mb-6 text-center text-blue-700">
            Login
            </h6>


        {/* Email Field */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 pl-10 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email address"
          />
        </div>

        {/* Password Field with Eye Toggle */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 pl-10 pr-10 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

