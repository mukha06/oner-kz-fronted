import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import Header from './components/header';
import Works from './pages/workCard';
import NotFound from './pages/NotFound';
import SubmitWork from './pages/Submit';
import Profile from './pages/Profile';
import PrivateRoute from "./components/PrivateRoute";
import Favorite from './pages/favorites'
import AboutUS from './pages/aboutUs'
import axios from 'axios';

function App() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('/api/works');
        setWorks(response.data);
      } catch (error) {
        setError('Error fetching works');
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} /> 
            <Route path="/submit" element={<PrivateRoute><SubmitWork/></PrivateRoute>} />
            <Route path="/works"element={<PrivateRoute><Works/></PrivateRoute>}/>
            <Route path="/favorites" element={<PrivateRoute><Favorite/></PrivateRoute>} />
            <Route path="/work/:id" element={<PrivateRoute><Works works={works} /></PrivateRoute>} />
            <Route path="/work/:id/edit" element={<PrivateRoute><SubmitWork editMode={true} /></PrivateRoute>} />
            <Route path="/work/:id/delete" element={<PrivateRoute><Works works={works} /></PrivateRoute>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path='/aboutUs' element={<AboutUS/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;