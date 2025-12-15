import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from './pages/header/Header';
import Signup from '../src/pages/auth/components/signup/Signup';
import Signin from '../src/pages/auth/components/signin/Signin';
import AdminDashboard from './pages/admin/components/dashboard/AdminDashboard';
import StudentDashboard from './pages/student/components/dashboard/StudentDashboard';
import UpdateBook from './pages/admin/components/update-book/UpdateBook';
import PostBook from './pages/admin/components/post-book/PostBook';
import Home from './pages/header/Home';
import Footer from './pages/footer/Footer';
import Contact from './pages/header/Contact';
import HomeRedirect from './pages/header/HomeRedirect';
import PublicRoute from './pages/header/PublicRoute';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true);

  // Create theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  
  return (
     <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
       <Header  toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode}/>
       <div style={{ paddingTop: "64px" }}>
       <Routes>
         <Route path='/' element={<HomeRedirect><Home/></HomeRedirect>} />
          {/**Auth */}
         <Route path='/register' element={<PublicRoute><Signup/></PublicRoute>}/>
         <Route path='/login' element={<PublicRoute><Signin/></PublicRoute>} />
         <Route path='/contact' element={<Contact/>}/>
          {/**Admin */}
         <Route path='/admin/dashboard' element={<AdminDashboard />} />
         <Route path='/admin/book/post' element={<PostBook/>} />
         <Route path='/admin/book/:id/edit' element={<UpdateBook/>} />
  
          {/**Student */}
         <Route path='/student/dashboard' element={<StudentDashboard />} />

        </Routes>
        </div>   
       <Footer/>
       </ThemeProvider>
     </>
  );
}

export default App;
