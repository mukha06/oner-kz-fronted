import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SubmitWork() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !content || !category) {
      toast.error('Барлық өрістерді толтырыңыз!');
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Жүйеге кіруіңіз қажет!');
      setLoading(false);
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('content', content);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:3000/api/works', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setTitle('');
      setDescription('');
      setContent('');
      setCategory('');
      setImage(null);

      toast.success('Жұмыс сәтті жарияланды!');
      setTimeout(() => {
        navigate('/works');
      }, 2000);
    } catch (error) {
      console.error('Қате:', error);
      toast.error('Жіберу кезінде қате пайда болды.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-3xl p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Жұмыс жариялау</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Жұмыс атауы</label>
            <input type="text"value={title}onChange={(e) => setTitle(e.target.value)}placeholder="Атауын енгізіңіз"className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-white"required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Сипаттама</label>
            <textarea value={description}onChange={(e) => setDescription(e.target.value)}placeholder="Сипаттамасын жазыңыз"rows={3}className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-white"required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Мазмұн</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}placeholder="Негізгі мазмұн"rows={5}className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-white"required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Санат</label>
            <select value={category}onChange={(e) => setCategory(e.target.value)}className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"required>
              <option value="">Санатты таңдаңыз</option>
              <option value="Поэзия">Поэзия</option>
              <option value="Әндер">Музыка</option>
              <option value="Сурет">Кескін өнері</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Сурет жүктеу</label>
            <input type="file"accept="image/*"onChange={handleImageChange}className="w-full"/>
            {image && (
              <img src={URL.createObjectURL(image)}alt="Алдын ала қарау" className="mt-4 w-32 h-32 object-cover rounded-lg border"/>
            )}
          </div>

          <button type="submit" disabled={loading}className={`w-full py-2 text-white font-semibold rounded-lg transition duration-300 ${loading ? 'bg-cyan-300 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'}`}>
            {loading ? 'Жүктелуде...' : 'Жариялау'}
          </button>
        </form>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}
