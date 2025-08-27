import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      alert(`Сіздің email-іңіз: ${email} тіркелді!`);
      e.target.reset();
    } else {
      alert('Email енгізіңіз!');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactEmail = () => {
    window.location.href = 'mailto:mukhametov@gmail.com';
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Artversnicht</h3>
          <p>Art жоба, Галерея, жариялау</p>
          <p>3981 Ranchview Dr, Ричардсон,</p>
          <p>Калифорния 62639</p>
        </div>
        <div className="footer-section">
          <h3>Сайт бөлімдері</h3>
          <ul>
            <li><Link to="/">Басты бет</Link></li>
            <li><Link to="/works">Жұмыстар</Link></li>
            <li><Link to="/submit">Жұмыс жіберу</Link></li>
            <li><Link to="/profile">Профиль</Link></li>

          </ul>
        </div>
        <div className="footer-section">
          <h3>Байланыс</h3>
          <p onClick={openContactEmail} style={{ cursor: 'pointer' }}>
            mukhametov@gmail.com
          </p>
          <p>(777) 777-7777</p>
        </div>
        <div className="footer-section newsletter">
          <h3>Жаңалықтарға жазылыңыз</h3>
          <form onSubmit={handleNewsletterSignup}>
            <input type="email" name="email" placeholder="Email-іңізді енгізіңіз" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Барлық құқықтар қорғалған</p>
        <div className="footer-links">
          <Link to="/help">Анықтама орталығы</Link>
          <Link to="/terms">Пайдалану шарттары</Link>
          <Link to="/privacy">Құпиялылық саясаты</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
