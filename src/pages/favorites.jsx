import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import '../styles/workCard.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Сіз жүйеге кірмегенсіз');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://oner-kz-backend.onrender.com/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const uniqueFavorites = Array.from(
          new Map(response.data.map(work => [work.work_id, work])).values()
        );

        setFavorites(uniqueFavorites);
      } catch (error) {
        console.error(error);
        toast.error("Избранный тізімін алу кезінде қате пайда болды.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (workId) => {
      console.log('workId:', workId);
      console.log(favorites);
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Сіз жүйеге кірмегенсіз');
      return;
    }

    try {
      await axios.delete(`https://oner-kz-backend.onrender.com/api/favorites/${workId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Избранныйдан өшірілді');
      setFavorites(prev => prev.filter(work => work.work_id !== workId));
    } catch (error) {
      console.error(error);
      toast.error('Өшіру кезінде қате пайда болды');
    }
  };

  const handleDetail = (workId) => {
    navigate(`/workDetail/${workId}`);
  };

  return (
    <div className="works-container">
      {loading ? (
        <p>Жүктелуде...</p>
      ) : favorites.length === 0 ? (
        <p>Таңдаулылар тізімі бос.</p>
      ) : (
        favorites.map((work) => (
          <div key={work.work_id} className="work-card relative">
            <FaHeart className="absolute top-2 right-2 text-red-500 cursor-pointer text-xl hover:scale-110 transition"onClick={() => handleRemoveFavorite(work.work_id)}title="Избранныйдан өшіру"/>

            {work.image_url && (
              <img src={`https://oner-kz-backend.onrender.com${work.image_url}`}alt={work.title}className="work-image"/>)}
            <div className="work-info">
              <h2 className="work-title">{work.title}</h2>
              <p className="work-author">Автор: {work.author || ''}</p>
              <p className="work-description">{work.description}</p>
              <p className="work-category">Категория: {work.category || ''}</p>
              <div className="work-actions mt-2">
                <button onClick={() => handleDetail(work.work_id)} className="details-link">Толығырақ</button>
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}