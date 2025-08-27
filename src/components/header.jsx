import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "../styles/header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const hideHeader = () => {
    setIsHeaderVisible(false);
    localStorage.setItem('headerHidden', 'true'); 
  };
  // const showHeader = () => setIsHeaderVisible(true);

  const handleLogin = useCallback((name, token) => {
    localStorage.setItem('username', name);
    localStorage.setItem('token', token);
    setUserName(name);
    setToken(token);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setUserName('');
    setToken('');
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    setIsMenuOpen(false);
    if (pathname === "/login" || pathname === "/signup") {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }

    const storedUserName = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    if (storedUserName && storedToken) {
      setUserName(storedUserName);
      setToken(storedToken);
    }
  }, [pathname]);

  return (
    <header className={`custom-header ${!isHeaderVisible ? "hidden" : ""}`}>
      <div className="header-container">
        <div className="header-top">
          <h1 className="site-logo">OnerKz</h1>
          <nav className={`main-nav lang-${currentLang} `}>
            <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>{t("menu")}</Link>
            <Link to="/works" className={`nav-link ${pathname === "/works" ? "active" : ""}`}>{t("works")}</Link>
            <Link to="/submit" className={`nav-link ${pathname === "/submit" ? "active" : ""}`}>{t("addwork")}</Link>
            <Link to="/favorites" className={`nav-link ${[pathname === "/favorites" ? "active": ""]}`}>{t("favorite")}</Link>
            <Link to="/aboutUs" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>{t("aboutus")}</Link>
          </nav>



      <nav className="auth-nav">
        {!token ? (
          <div>
            <Link to="/login" className={`nav-link ${pathname === "/login" ? "active" : ""}`} onClick={hideHeader}>{t("login")}</Link>
            <Link to="/register" className={`signup-button ${pathname === "/signup" ? "active" : ""}`} onClick={hideHeader}>{t("register")}</Link>
          </div>
        ) : (
          <div className="user-box">
            <Link to="/profile" className="profile-link"  onClick={hideHeader} ><span className="icon">👤</span>{t("profile")}</Link>
            <button onClick={handleLogout} className="logout-btn"><span className="icon">🚪</span>{t("leave")}</button>
          </div>
        )}
      </nav>
    </div>

    <div className="burger-wrapper">
      <button onClick={toggleMenu} className={`burger-button ${isMenuOpen ? "open" : ""}`}>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>
    </div>
  </div>

  {isMenuOpen && (
    <div className="mobile-menu">
      <Link to="/" className="mobile-link">{t("menu")}</Link>
      <Link to="/works" className="mobile-link">{t("works")}</Link>
      <Link to="/submit" className="mobile-link">{t("addwork")}</Link>
      <Link to="/favorites" className="mobile-link">{t("favorite")}</Link>
      <Link to="/aboutUs" className="mobile-link">{t("aboutus")}</Link>
      {!token ? (
        <div>
          <Link to="/login" className="mobile-link">{t("login")}</Link>
          <Link to="/signup" className="mobile-link">{t("register")}</Link>
        </div>
      ) : (
        <div>
          <Link to="/profile" className="mobile-link">{t("profile")}({userName})</Link>
          <button onClick={handleLogout} className="mobile-link">{t("leave")}</button>
        </div>
      )}
    </div>
  )}
</header>

  );
}
