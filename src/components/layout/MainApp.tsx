

import React,{ useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavigation from '../../components/layout/BottomNavigation';
import Home from '../../pages/Home';
import Courses from '../../pages/courses/Course';
import Store from '../../pages/store/Store';
import Profile from '../../pages/profile/Profile';


const MainApp: React.FC = () => {
  

  useEffect(() => {
    const env = import.meta.env.VITE_ENV
    const api = import.meta.env.VITE_APP_API_URL
    console.log("Config(mod)", env)
    console.log("API(mod)", api)

  }, [])

  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<Courses />} />
          <Route path="/store" element={<Store />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      
      <BottomNavigation />
    </Router>
  );
};

export default MainApp;
