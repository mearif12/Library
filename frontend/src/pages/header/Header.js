import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAdminLoggedIn,isStudentLoggedIn, removeToken } from '../../utils/common';
import React from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material"; 



export default function Header({ toggleDarkMode, isDarkMode }){
  const[isAdmin,setIsAdmin] = useState(false);
  const[isStudent,setIsStudent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=>{
    const fetchUserRoles = async () => {
       try {
        const isAdmin = await isAdminLoggedIn();
        const isStudent = await isStudentLoggedIn();
        setIsAdmin(isAdmin);
        setIsStudent(isStudent);
       } catch (error) {
         console.log(`Error fetching roles ${error}`);
       }
    };
    fetchUserRoles();
  },[location]);
  const handleLogOut = () => {
     navigate('/');
     removeToken();
  }
    return (
        <>
          {!isStudent && !isAdmin && (
            <Box sx={{ flexGrow:1 }}>
             <AppBar position="static" color="secondary">
               <Toolbar> 
                  <IconButton onClick={toggleDarkMode} color="inherit" sx={{mr:2}}>
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                   <Typography variant="h6" component="div" sx={{flexGrow:1,fontFamily:'cursive'}}>
                         ICE 14th Books World
                   </Typography>

                     
                   <Button component={Link} to="/login" color="inherit" sx={{":hover":{backgroundColor:'black'}}}>Login</Button>
                   <Button component={Link} to="/register" color="inherit" sx={{":hover":{backgroundColor:'black'}}}>Register</Button>

               </Toolbar>
             </AppBar>
          </Box>
          )}

          {isAdmin && (
            <Box sx={{ flexGrow:1,mb:1 }}>
             <AppBar position="fixed" color="secondary">
               <Toolbar>
                  <IconButton onClick={toggleDarkMode} color="inherit" sx={{mr:2}}>
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                   <Typography variant="h6" component="div" sx={{flexGrow:1,fontFamily:'cursive'}}>
                         Admin 👑
                   </Typography>
                     
                   <Button component={Link} to="/admin/dashboard" color="inherit" sx={{":hover":{backgroundColor:'black'}}}>Books</Button>
                   <Button component={Link} to="/admin/book/post" color="inherit" sx={{":hover":{backgroundColor:'black'}}}>Add Book</Button>

                   <Button onClick={handleLogOut} color="inherit" sx={{":hover":{backgroundColor:'black'}}}>log out</Button>
               </Toolbar>
             </AppBar>
          </Box>
          )}

          {isStudent && (
            <Box sx={{ flexGrow:1,mb:1 }}>
             <AppBar position="fixed" color="secondary">
               <Toolbar>
                  <IconButton onClick={toggleDarkMode} color="inherit" sx={{mr:2}}>
                    {isDarkMode ? <Brightness7 /> : <Brightness4 />}
                  </IconButton>
                   <Typography variant="h6" component="div" sx={{flexGrow:1,fontFamily:'cursive'}}>
                         Alive 😊
                   </Typography>
                     
                   <Button component={Link} to="/student/dashboard" color="inherit" sx={{":hover":{backgroundColor:'black'},textAlign: 'center'}}>All Books</Button>
                   <Button component={Link} to="/student/my-books" color="inherit" sx={{":hover":{backgroundColor:'black'},textAlign: 'center'}}>My Books</Button>
                   <Button onClick={handleLogOut} color="inherit" sx={{":hover":{backgroundColor:'black'}}}>log out</Button>
               </Toolbar>
             </AppBar>
          </Box>
          )}
          
        </>
    )
};
