import React from 'react';
import { Button,Typography, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import { removeToken } from '../../utils/common';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate('/');
    removeToken();
 }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '40.7vh', 
      }}
    >
      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }} /> 

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#333',
          color: 'white',
          textAlign: 'center',
          padding: '1px 0',
          fontFamily: '"Poppins", sans-serif',
          fontSize: '0.9rem',
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontWeight: '400', fontSize: '1rem', fontFamily: 'fangsong' }}
        >
          &copy;2025 Arifur Rahman.
        </Typography>
        <Button onClick={handleLogOut} to="/" color="inherit" sx={{":hover":{backgroundColor:'black'}}}><HomeIcon/></Button>
        <Button component={Link} to="https://pust.ac.bd/academic/departments/dept_teachers/D06" target='_blank' color="inherit" sx={{":hover":{backgroundColor:'black'}}}><SchoolIcon/></Button>
        <Button component={Link} to="/contact" color="inherit" sx={{":hover":{backgroundColor:'black'}}}><EmailIcon/></Button>
      </Box>
    </Box>
  );
};

export default Footer;

