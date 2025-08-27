import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles/workCard.css";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa"; // Жүрек иконкасы

const WorksList = () => {
  const [works, setWorks] = useState([]);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get("https://oner-kz-backend.onrender.com/api/works");
        setWorks(response.data);
      } catch (error) {
        toast.error("Мәліметтерді алу кезінде қате пайда болды.");
      }
    };

    fetchWorks();
  }, []);
  
  const toggleFavorite = async (work) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Сіз жүйеге кірмегенсіз");
      return;
    }

    if (work.is_favorited) {
      const confirmRemove = window.confirm("Избранныйдан өшіруді қалайсыз ба?");
      if (!confirmRemove) return;
      try {
        await axios.delete(`https://oner-kz-backend.onrender.com/api/favorites/${work.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Избранныйдан өшірілді!");
        setWorks((prev) =>prev.map((w) =>w.id === work.id ? { ...w, is_favorited: false } : w));
      } catch (error) {
        toast.error("Өшіру кезінде қате болды!");
        console.error(error);
      }
    } else {
      try {
        await axios.post(`https://oner-kz-backend.onrender.com/api/favorites/${work.id}`,{},
          {headers: {Authorization: `Bearer ${token}`,},});
        toast.success("Избранныйға қосылды!");
        setWorks((prev) =>prev.map((w) =>w.id === work.id ? { ...w, is_favorited: true } : w));
      } catch (error) {
        toast.error("Қосу кезінде қате пайда болды!");
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Шынымен өшіргіңіз келе ме?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://oner-kz-backend.onrender.com/api/works/${id}`);
      toast.success("Жұмыс сәтті өшірілді!");
      setWorks((prev) => prev.filter((w) => w.id !== id));
    } catch (error) {
      toast.error("Өшіру кезінде қате.");
    }
  };

  const handleDetail = (id) => {
    navigate(`/workDetail/${id}`);
  };

  return (
    <div className="works-container">
      {works.map((work) => (
        <div key={work.id} className="work-card relative">
          <FaHeart className={`absolute top-2 right-2 cursor-pointer text-xl hover:scale-110 transition ${work.is_favorited ? "text-red-500" : "text-gray-300"}`}
          onClick={() => toggleFavorite(work)}title={work.is_favorited? "Избранныйдан өшіру": "Избранныйға қосу"}/>
          {work.image_url && (<img src={`https://oner-kz-backend.onrender.com${work.image_url}`}alt={work.title}className="work-image"/>)}
          <div className="work-info">
            <h2 className="work-title">{work.title}</h2>
            <p className="work-author">{t("by")}{work.author}</p>
            <p className="work-description">{work.description}</p>
            <p className="work-category">{t("category")}{work.category}</p>
            <div className="work-actions">
              <button onClick={() => handleDelete(work.id)}>{t("delete")}</button>
              <button onClick={() => handleDetail(work.id)}className="details-link">Толығырақ</button>
            </div>
          </div>
        </div>
      ))}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default WorksList;
