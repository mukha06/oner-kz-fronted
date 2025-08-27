import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      toast.success("Сіз сәтті тіркелдіңіз!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error("Тіркелу кезінде қате туындады");
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Тіркелу</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-white mb-1">Логин</label>
            <input type="text"requiredvalue={username}onChange={(e) => setUsername(e.target.value)}className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"placeholder="Логинді енгізіңіз"/>
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input type="email"requiredvalue={email}onChange={(e) => setEmail(e.target.value)}className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"placeholder="Email енгізіңіз"/>
          </div>
          <div>
            <label className="block text-white mb-1">Құпия сөз</label>
            <input type="password"requiredvalue={password}onChange={(e) => setPassword(e.target.value)}className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"placeholder="Құпия сөзді енгізіңіз"/>
          </div>
          <button type="submit"className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition duration-300">Тіркелу</button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white text-sm">Аккаунт бар ма?{" "}<span onClick={() => navigate("/login")}className="text-cyan-300 hover:underline cursor-pointer">Кіру</span></p>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
