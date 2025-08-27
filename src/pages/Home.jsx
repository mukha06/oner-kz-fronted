import { useState, useRef,useEffect } from 'react';
import { useTranslation } from "react-i18next";
import '../styles/homepage.css';

import Footer from '../components/Footer'; 

const artworks = [
  {id: 1,title: "Ескі заманның эхоы",author: "Жаред Кларк",price: "$1800",category: "Renaissance",img: "https://i.pinimg.com/736x/5b/5f/88/5b5f88964f6b76e3f79586725782660b.jpg",},
  {id: 2,title: "Қылқалам соққылары",author: "Геральд Стьюард",price: "$2100",category: "Renaissance",img: "https://i.pinimg.com/736x/90/e0/3f/90e03fec4e15f8f76d020c4420aa8ef4.jpg",},
  {id: 3,title: "Қайта туған дәуір",author: "Густав Климт",price: "$1900",category: "Renaissance",img: "https://i.pinimg.com/736x/f2/b1/b0/f2b1b02074a1227b64780f1445c32e57.jpg",},
  {id: 4,title: "Түсті ой",author: "Анна Ли",price: "$1200",category: "Abstract",img: "https://i.pinimg.com/1200x/e3/a4/88/e3a48878eb1e4c1539dfdd44bad73664.jpg",},
  {id: 5,title: "Дала рухы",author: "Майк Браун",price: "$950",category: "Animal",img: "https://i.pinimg.com/1200x/75/bd/50/75bd50aff93c11abbb64a317c8a52e3a.jpg",},
  {id: 6,title: "Пішіндер мен көлеңкелер",author: "Сара Уайт",price: "$1300",category: "Geometric Art",img: "https://i.pinimg.com/736x/10/fe/f4/10fef4288539fa9bb55ade14d30dc48f.jpg",},
  {id: 7,title: "Қала армандары",author: "Том Грин",price: "$1700",category: "Modern",img: "https://i.pinimg.com/736x/c9/79/93/c979937a9a2fe329242c70958bd0a831.jpg",},
  {id: 8,title: "Арман әлемі",author: "Эмили Стоун",price: "$1100",category: "Abstract",img: "https://i.pinimg.com/1200x/85/ec/98/85ec98898409e4bbc447dd1e848b54ad.jpg",},
  {id: 9,title: "Орман сыбыры",author: "Иван Петров",price: "$1400",category: "Animal",img: "https://i.pinimg.com/736x/8c/95/59/8c95595bdce66b8267caaa62aaa4c805.jpg",},
  {id: 10,title: "Алтын пропорция",author: "Лина Голд",price: "$1250",category: "Geometric Art",img: "https://i.pinimg.com/1200x/91/0c/c3/910cc3e8626fe61980a87ee09bc9ef46.jpg",},
  {id: 11,title: "Заманауи өмір",author: "Крис Блэк",price: "$1600",category: "Modern",img: "https://i.pinimg.com/736x/f1/39/6d/f1396dfd8c7d0fdda0de93a7dfd0c79f.jpg",},
  {id: 12,title: "Ұяң әуен",author: "Ольга Уайт",price: "$1000",category: "Abstract",img: "https://i.pinimg.com/736x/32/c4/57/32c457f581a3f2c45c0e7a8dcb9cd89d.jpg",},
  {id: 13,title: "Арыстанның қарамағы",author: "Сам Лайон",price: "$1350",category: "Animal",img: "https://i.pinimg.com/736x/d8/46/fb/d846fb4449679511d855ea1db0b12738.jpg",},
  {id: 14,title: "Тіршілік шеңбері",author: "Нина Сircle",price: "$1200",category: "Geometric Art",img: "https://i.pinimg.com/1200x/dd/7a/58/dd7a5808c4944ba507df3cf13c5296b7.jpg",},
  {id: 15,title: "Қала шамдары",author: "Мак Сити",price: "$1750",category: "Modern",img: "https://i.pinimg.com/1200x/72/47/b4/7247b4bc9674cf7c61f646752c0ad427.jpg",},
  {id: 16,title: "Өткен даңқ",author: "Леонардо Росси",price: "$2000",category: "Renaissance",img: "https://i.pinimg.com/736x/c5/6b/7c/c56b7c0a23993fb288d8a8b6d2e5b26f.jpg",},
  {id: 17,title: "Көк үйлесім",author: "Анна Блю",price: "$1150",category: "Abstract",img: "https://i.pinimg.com/736x/77/6f/22/776f22ec3a4d4616666606d5f364181d.jpg",},
  {id: 18,title: "Саванна патшасы",author: "Майк Браун",price: "$1450",category: "Animal",img: "https://i.pinimg.com/736x/98/40/bf/9840bf38bf106ec7361064bf18daa78d.jpg",},
  {id: 19,title: "Алтын геометрия",author: "Сара Уайт",price: "$1350",category: "Geometric Art",img: "https://i.pinimg.com/736x/8c/ed/9d/8ced9dd24d89ce035618a42dddd1ca84.jpg",},
  {id: 20,title: "Қала ырғағы",author: "Том Грин",price: "$1800",category: "Modern",img: "https://i.pinimg.com/1200x/b3/26/09/b326096483eed82e260a9a9bd2879e75.jpg",},
];

const testimonials = [
  { name: "Джек Смит", role: "Дизайнер", text: "Әрбір суреттегі ерекше мұқияттылық таңғажайып.", date: "15 Мамыр 2020 8:30", img: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg" }, // 1-ші ер
  { name: "Эмили Джонсон", role: "Фотограф", text: "Галереяның атмосферасы өте шабыттандырады.", date: "20 Маусым 2020 9:15", img: "https://i.pinimg.com/736x/da/24/62/da24628ec15db648bb1c810f494e5bca.jpg" }, // 2-ші әйел
  { name: "Майкл Браун", role: "Суретші", text: "Техникалық шеберлік пен шығармашылықтың үйлесімі.", date: "10 Шілде 2020 14:20", img: "https://i.pinimg.com/1200x/8f/df/47/8fdf471f368262db87795aa7b8f68a22.jpg" }, // 3-ші ер
  { name: "Сара Дейвис", role: "Жазушы", text: "Керемет шығармашылық әлемі.", date: "15 Тамыз 2020 10:00", img: "https://i.pinimg.com/736x/6f/64/66/6f64669d94c9bcb69991370d0c61e7bf.jpg" }, // 4-ші әйел
  { name: "Томас Уилсон", role: "Музыкант", text: "Музыка мен суреттің керемет үйлесімі.", date: "20 Қыркүйек 2020 12:00", img: "https://i.pinimg.com/736x/76/05/ab/7605ab036f99d17edb5e82ffd5370a43.jpg" }, // 5-ші ер
  { name: "Лора Миллер", role: "Стилист", text: "Галерея өнерді басқа деңгейге көтерді.", date: "25 Қазан 2020 14:30", img: "https://i.pinimg.com/736x/3a/57/6b/3a576b0f3c5d80172ba13208290b550c.jpg" }, // 6-ші әйел
  { name: "Крис Андерсон", role: "Сculptor", text: "Шынайы өнердің тамаша үлгісі.", date: "30 Қараша 2020 9:45", img: "https://i.pinimg.com/736x/d7/ac/c7/d7acc710d8001089244718e8869aa7d4.jpg" }, // 7-ші ер
  { name: "Анна Уайт", role: "Журналист", text: "Бұл жерде шабыт табу оңай.", date: "5 Желтоқсан 2020 11:15", img: "https://i.pinimg.com/736x/12/72/cf/1272cffd65ae8e43df0249f13f6df317.jpg" }, // 8-ші әйел
];

const categories = [
  "All",
  "Renaissance",
  "Abstract",
  "Animal",
  "Geometric Art",
  "Modern",
];


export default function Home() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("Renaissance");
  const currentLang = i18n.language; 
  const [currentIndex, setCurrentIndex] = useState(0);
  const artworkSectionRef = useRef(null);
  const faqData = [
    {question: "Басты бет қалай келушілермен өзара әрекеттеседі?",answer: "Интерактивті элементтер, оқиға күнтізбелері, виртуалды турлар немесе мультимедиа контент арқылы келушілер музейдің ұсыныстарымен тікелей таныса алады."},
    {question: "Басты бетте қандай суреттер көрсетіледі?",answer: "Түрлі стильдегі суреттер мен суретшілердің еңбектері көрсетіледі."},
    {question: "Қолданушы тәжірибесін жақсартатын интерактивті элементтер бар ма?",answer: "Иә, қолданушы тәжірибесін жақсартатын интерактивті элементтер қосылған."},
    {question: "Басты беттің дизайны эстетикаға қалай әсер етеді?",answer: "Басты беттің дизайны музейдің эстетикасын бейнелейді, заманауи және тартымды стильмен ерекшеленеді."},
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredArtworks =
    activeTab === "All"
      ? artworks
      : artworks.filter((art) => art.category === activeTab);

  const scrollToArtworks = () => {
  if (artworkSectionRef.current) {
    artworkSectionRef.current.scrollIntoView({behavior: "smooth",  block: "start",});
  }
};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home-container lang-${currentLang}`}>
      <div className="gallery-section">
        <div className="overlay" />
        <div className="content">
            <h1 className='onerkz'>{t("Art Gallery Platform")}</h1>
          <h2 className={`gallery-title ${currentLang}`}>{t("Dive into creativity with our")}<br />{t("gallery collection")}</h2>
          <p>{t("Immerse yourself in the captivating stories behind each artwork, as our artists draw inspiration from cultures, nature, and everyday life.")}</p>
          <button onClick={scrollToArtworks} className="visit-button">{t("Visit Gallery")}</button>

        </div>
      </div>

      <div className="home-container">
        <div className="hero-art-section">
          <div className="hero-art-left">
            <button className="new-artwork-btn">{t("New Art Work")}</button>
            <h2 className={`hero-title ${currentLang}`}>{t("New Artworks")}<br />{t("From Our Artist")}</h2>
            <p className="hero-desc">{t("Explore our diverse exhibitions, from stunning paintings to captivating illustrations, thought-provoking installations to beautiful sculptures.")}</p>
          </div>
          <div className="hero-art-right">
            <div className="hero-art-cards">
              <div className="hero-art-card">
                <span className="category">{t("Renaissance")}</span>
                <button className="card-expand-btn">&#8599;</button>
                <img src="https://i.pinimg.com/1200x/da/87/7a/da877a5feffcb06369c9007ad0345fa6.jpg"alt={t("Life and Legacy")}/>
                <div className="card-info">
                  <h3>{t("Life and Legacy")}</h3>
                  <p>{t("by")} Warren William</p>
                </div>
              </div>
              <div className="hero-art-card">
                <span className="category">{t("Abstract")}</span>
                <img src="https://i.pinimg.com/736x/dd/3a/bf/dd3abf9cef8e919a572966972cb292de.jpg" alt={t("Splendor and Grace")} />
                <div className="card-info">
                  <h3>{t("Splendor and Grace")}</h3>
                  <p>{t("by")} Jack Wood</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={artworkSectionRef} className="artwork-sale-section">
        <div className="artwork-sale-header">
          <button className="artwork-sale-btn">{t("Artwork Sale")}</button>
          <h2 className={`artwork-sale-title ${currentLang}`}>{t("Artwork For Sale")}</h2>
          <div className="artwork-sale-desc">
            <span>
              {t(
                "Explore a diverse range of styles, themes, and techniques brought to life by talented artists from around the globe."
              )}
            </span>
          </div>
        </div>
        <div className="artwork-sale-tabs">
          {categories.map((cat) => (
            <button key={cat}className={`tab${activeTab === cat ? " active" : ""}`}onClick={() => setActiveTab(cat)}>{t(cat)}</button>
          ))}
        </div>
        <div className="artwork-sale-cards">
          {filteredArtworks.map((art) => (
            <div className="artwork-sale-card" key={art.id}>
              <button className="card-expand-btn">&#8599;</button>
              <img src={art.img} alt={art.title} />
              <div className="card-price">{art.price}</div>
              <div className="card-info">
                <h3>{t(art.title)}</h3>
                <p>{t("by")} {art.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
{/*типа екыншы туры  */}
      {/* <div ref={artworkSectionRef} className="new-artworks-section">
        <div className="new-artworks-header">
          <button className="new-artworks-btn">{t("New Artworks")}</button>
          <h2 className={`new-artworks-title ${currentLang}`}>
            {t("Explore Our")}
            <br />
            {t("Artworks")}
          </h2>
          <p className="new-artworks-desc">
            {t(
              "Discover a world of creativity with our latest collection of stunning artworks, crafted by talented artists worldwide."
            )}
          </p>
        </div>
        <div className="new-artworks-grid">
          {artworks.slice(0, 20).map((art) => (
            <div className="new-artwork-card" key={art.id}>
              <img src={art.img} alt={art.title} />
              <div className="new-artwork-overlay">
                <span className="new-artwork-category">{t(art.category)}</span>
                <h3>{t(art.title)}</h3>
                <p>{t("by")} {art.author}</p>
                <div className="new-artwork-price">{art.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

          <div className="testimonial-section">
        <h1>Пікірлер</h1>
        <p className="intro">Мұнда біздің өнімдеріміз бен қызметтеріміздің сапасы жайлы пікірлер мен олардың өмірлерге әсері туралы көп айтылады.</p>
        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => {
            let positionClass = '';
            const adjustedIndex = (index - currentIndex + testimonials.length) % testimonials.length;
            if (adjustedIndex === 0) positionClass = 'left-large';
            else if (adjustedIndex === 1) positionClass = 'center-large';
            else if (adjustedIndex === 2) positionClass = 'right-small';
            else if (adjustedIndex === 3) positionClass = 'hidden';

            return (
              <div key={index} className={`testimonial-card ${positionClass}`}>
                <img src={testimonial.img} alt="User" className="user-img" />
                <div className="user-info">
                  <h3>{testimonial.name}</h3>
                  <p className="role">{testimonial.role}</p>
                </div>
                <p className="comment">{testimonial.text}</p>
                <p className="date">{testimonial.date}</p>
              </div>
            );
          })}
        </div>
      </div>


      <div className={`home-container lang-${currentLang}`}>
      <div className="faq-section">
        <span className="tag">ЖСҚ</span>
        <h2>Жиі Қойылатын Сұрақтар</h2>
        {faqData.map((item, index) => (
          <div className="faq-item" key={index}>
            <p className="question" onClick={() => toggleFAQ(index)}>
              {item.question} <span className="toggle">{openIndex === index ? '-' : '+'}</span>
            </p>
            <p className={`answer ${openIndex === index ? 'visible' : 'hidden'}`}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>



<Footer />
    </div>
  );
}