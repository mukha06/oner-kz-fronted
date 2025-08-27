import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api, API_BASE_URL } from "../api";
import { toast, ToastContainer } from "react-toastify"; 
import "../styles/profile.css";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("token");
  const [avatar, setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeTab, setActiveTab] = useState("editProfile");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [myWorks, setMyWorks] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [category, setCategory] = useState("");
  const [aboutMe, setAboutMe] = useState("");


  const isDark = theme === "dark";
    useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!token) return;
    api.get("/api/user/me", {headers: { Authorization: `Bearer ${token}` },})
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        setAvatar(res.data.avatar?
            `${API_BASE_URL}/uploads/${res.data.avatar}`: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg");})
            .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    if (activeTab === "favorites") {
      api.get("https://oner-kz-backend.onrender.com/api/favorites", {headers: { Authorization: `Bearer ${token}` },})
        .then((res) => setFavorites(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeTab, token]);

  useEffect(() => {
    if (activeTab === "myWorks") {
      api.get("https://oner-kz-backend.onrender.com/api/works/my", {headers: { Authorization: `Bearer ${token}` },})
        .then((res) => setMyWorks(res.data))
        .catch((err) => console.error(err));
    }
  }, [activeTab, token]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.post("https://oner-kz-backend.onrender.com/api/user/upload-avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatar(`${API_BASE_URL}/uploads/${res.data.filename}`);
      toast.success(t("profile_updated"));
    } catch (err) {
      console.error(err);
      toast.error(t("failed_update_avatar"));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await api.put(
        "/api/user/update",
        { username, firstName, lastName, category, aboutMe },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(t("profile_updated"));
    } catch (error) {
      toast.error(t("failed_update"));
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error(t("fill_all_fields"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("passwords_do_not_match"));
      return;
    }

    try {
      await api.put("https://oner-kz-backend.onrender.com/api/user/change-password",
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(t("password_changed"));
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(t("failed_change_password"));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("https://oner-kz-backend.onrender.com/api/user/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(t("account_deleted"));
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/register";
      }, 1500);
    } catch (err) {
      toast.error(t("failed_delete_account"));
    }
  };
  const handleLogout = () => {
  localStorage.clear();
  toast.success(t("logout_success"));
  setShowModal(null);
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};


  return (
    <div className={`profile-root ${isDark ? "dark" : "light"}`}>
      <aside className={`profile-sidebar ${isDark ? "dark" : ""}`}>
        <div className="profile-sidebar-inner">
          <div className="profile-avatar-row">
            <label className="profile-avatar-label">
              <img src={avatar} alt="Profile" className="profile-avatar-img" />
              <input type="file"accept="image/*"className="profile-avatar-input"onChange={handleAvatarChange}/>
            </label>
            <div className="profile-avatar-info">
              <div className="profile-avatar-name">{username}</div>
              <div className="profile-avatar-email">{email}</div>
            </div>
          </div>

          <h1 className={`profile-menu-item ${activeTab === "editProfile" ? "active" : ""}`}onClick={() => setActiveTab("editProfile")}>{t("edit_profile")}</h1>
          <h1 className={`profile-menu-item ${activeTab === "myWorks" ? "active" : ""}`}onClick={() => setActiveTab("myWorks")}>{t("my_works")}</h1>
          <h1 className={`profile-menu-item ${activeTab === "favorites" ? "active" : ""}`}onClick={() => setActiveTab("favorites")}>{t("saved")}</h1>
          <h1 className={`profile-menu-item ${activeTab === "settings" ? "active" : ""}`}onClick={() => setActiveTab("settings")}>{t("settings")}</h1>
          <h1 className="profile-menu-item logout" onClick={() => setShowModal("logout")}>{t("logout")}</h1>
          <h1 className="profile-menu-item delete" onClick={() => setShowModal("delete")}>{t("delete_account")}</h1>
        </div>
      </aside>

      <main className="profile-main">
            {activeTab === "editProfile" && (
                <div className="profile-card">
                    <h2>{t("edit_profile")}</h2>
                    <div className="form-group">
                        <label>{t("username")}</label>
                        <input type="text" value={username}onChange={(e) => setUsername(e.target.value)}required/>
                    </div>
                    <div className="form-group">
                        <label>{t("first_name")}</label>
                        <input type="text"value={firstName}onChange={(e) => setFirstName(e.target.value)}required/>
                    </div>
                    <div className="form-group">
                        <label>{t("last_name")}</label>
                        <input type="text" value={lastName}onChange={(e) => setLastName(e.target.value)}required/>
                    </div>
                    <div className="form-group">
                        <label>{t("email")}</label>
                        <input type="email"value={email}readOnly/>
                    </div>
                    <div className="form-group">
                        <label>{t("category")}</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}required>
                            <option value="">{t("choose_category")}</option>
                            <option value="art">{t("art")}</option>
                            <option value="music">{t("music")}</option>
                            <option value="photography">{t("photography")}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{t("about_me")}</label>
                        <textarea value={aboutMe}onChange={(e) => setAboutMe(e.target.value)}rows="4"></textarea>
                    </div>
                    <button onClick={handleUpdateProfile}>{t("save_change")}</button>
                </div>
            )}
            {activeTab === "myWorks" && (
                <div className="profile-card">
                    <h2>{t("my_works")}</h2>
                    {myWorks.map((work) => (
                        <div key={work.id}>{work.title}</div>
                    ))}
                </div>
            )}

            {activeTab === "favorites" && (
                <div className="profile-card">
                    <h2>{t("saved")}</h2>
                    {favorites.map((fav) => (
                    <div key={fav.work_id}>{fav.title}</div>
                    ))}
                </div>
            )}

            {activeTab === "settings" && (
                <div className="profile-card">
                    <div className="form-group">
                    <label>{t("old_password")}</label>
                    <input type="password"value={oldPassword}onChange={(e) => setOldPassword(e.target.value)}required/>
                </div>
                <div className="form-group">
                    <label>{t("new_password")}</label>
                    <input type="password"value={newPassword}onChange={(e) => setNewPassword(e.target.value)}required/>
                </div>

                <br />
                    <button onClick={handleChangePassword}>{t("save_change")}</button>

                {/* <h3>{t("theme")}</h3>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="light">{t("light")}</option>
                        <option value="dark">{t("dark")}</option>
                    </select> */}
                <br /><br />
                <h3>{t("language")}</h3>
                    <select value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
                        <option value="kk">{t("kazakh")}</option>
                        <option value="ru">{t("russian")}</option>
                        <option value="en">{t("english")}</option>
                    </select>
                </div>
            )}
        </main>

        {showModal && (
            <div className="modal-overlay">
                <div className="modal">
                    <p>{showModal === "logout" ? t("confirm_logout") : t("confirm_delete")}</p>
                    <div className="modal-actions">
                        <button onClick={() => {if (showModal === "logout") handleLogout();else handleDeleteAccount();}}>{t("yes")}</button>
                        <button onClick={() => setShowModal(null)}>{t("no")}</button>
                    </div>
                </div>
            </div>
        )}
        <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}