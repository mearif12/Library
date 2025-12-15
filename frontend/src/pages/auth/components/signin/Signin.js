import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Avatar, Container, Paper,CircularProgress, TextField, Typography,Box, Button, Grid,Link, Backdrop } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signin } from '../../services/auth/auth';
import { useSnackbar } from 'notistack';
import  { saveToken, isAdminLoggedIn, isStudentLoggedIn } from '../../../../utils/common';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Signin = () => {
  const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
         email:'',
         password:'',
         roll:''
    });
    const [loading,setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev);
    };


    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await signin(formData);
            if(response.status === 200){
               console.log(response);
               const token = response.data.token;
               saveToken(token);
               if(isAdminLoggedIn()){
                 enqueueSnackbar('Admin successfully logged in',{variant:'success',autoHideDuration:2000});
                 navigate('/admin/dashboard');
               } else if (isStudentLoggedIn()){
                enqueueSnackbar('Log In Successful',{variant:'success',autoHideDuration:2000});
                navigate('/student/dashboard');
               }
            }
        } catch (error) {
          if (error.response && error.response.status === 403) {
            enqueueSnackbar(error.response.data.error, { variant: 'error',autoHideDuration:5000 });
          } else {
           enqueueSnackbar('Login Failed',{variant:'error',autoHideDuration:5000});
          }
        } finally{
          setLoading(false);
        }
    };

    const handleSignUpClick = () =>{
        navigate('/register');
    }

  return (
    <>
    <Container maxWidth="xs">
        <Paper elevation={10} sx={{marginTop:8,padding:2}}>
          <Avatar
          sx={{
            mx:"auto",
            bgcolor:"primary.main",
            textAlign:"center",
            mb:1,
          }}
          >
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
             Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt:1}}>
            
       
              
              <TextField
                required
                fullWidth
                name='email'
                id='email'
                label='Email'
                autoComplete='123@email.com'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
                sx={{mb:2}}
              />

             <TextField
                required
                fullWidth
                name="password"
                id="password"
                label="Password"
                autoComplete="new-password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
        
              <Button 
                     type="submit" 
                     fullWidth 
                     variant="contained" 
                     sx={{mt:1,mb:1}}
                     disabled={!formData.email || !formData.password}
                >
                    {loading ? <CircularProgress color='success' size={24} />: 'Sign In'} 
              </Button>
          </Box>
          <Grid container sx={{mt:2}}> 
             <Grid item>
                <Link variant='body2' onClick={handleSignUpClick} sx={{textDecoration:'none',cursor:'pointer',color:'primary.main'}}>
                    Don't have an account? Sign up
                </Link>
            </Grid>  
          </Grid>
        </Paper>
    </Container>
    <Backdrop 
    sx={{color:'#fff',zIndex:(theme)=> theme.zIndex.drawer + 1}}
    open={loading}
    >
        <CircularProgress color='success'/>
      </Backdrop>
    </> 
  )
}

export default Signin
