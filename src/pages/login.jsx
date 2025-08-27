import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://oner-kz-backend.onrender.com/api/auth/login", {username,password,});
      localStorage.setItem("username", username);
      localStorage.setItem("token", res.data.token);
      toast.success("Сіз сәтті кірдіңіз!");
      setTimeout(() => {navigate("/");}, 1500);
    } catch (err) {
      toast.error("Логин немесе құпия сөз қате!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Кіру</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-white mb-1">Логин</label>
            <input type="text"id="username"value={username}onChange={(e) => setUsername(e.target.value)}className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"placeholder="Логинді енгізіңіз"required/>
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1">Құпия сөз</label>
            <input type="password"id="password"value={password}onChange={(e) => setPassword(e.target.value)}className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300"placeholder="Құпия сөзді енгізіңіз"required/>
          </div>
          <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition duration-300">Кіру</button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white text-sm">Аккаунт жоқ па?{" "}<span onClick={() => navigate("/register")}className="text-cyan-300 hover:underline cursor-pointer">Тіркелу</span></p>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
