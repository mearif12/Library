import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Avatar, Container, Paper,CircularProgress, TextField, Typography,Box, Button, Grid,Link, Backdrop } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signup } from '../../services/auth/auth';
import { useSnackbar } from 'notistack';


const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
         email:'',
         firstName:'',
         lastName:'',
         password:'',
         roll:''
    });
    const [loading,setLoading] = useState(false);

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
      
      const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];

      const emailDomain = formData.email.split('@')[1];

      if (!emailDomain || !allowedDomains.includes(emailDomain)) {
        enqueueSnackbar(
          "Email must be Gmail,Outlook or Yahoo",
          { variant: "error",autoHideDuration:3000 }
        );
        setLoading(false);
        return;
      }

      const rollStr = String(formData.roll);

      // must be 6 digits
      if (!/^\d{6}$/.test(rollStr)) {
        enqueueSnackbar("Roll must be 6 digits", { variant: "error" });
        setLoading(false);
        return;
      }

      // check XX06XX pattern
      if (rollStr.substring(2, 4) !== "06") {
        enqueueSnackbar("Roll must follow pattern XX06XX", { variant: "error" });
        setLoading(false);
        return;
      }

      // last two digits between 01–42
      const lastTwo = Number(rollStr.substring(4, 6));
      if (lastTwo < 1 || lastTwo > 42) {
        enqueueSnackbar("Last two digits must be between 01 and 42", {
          variant: "error",
        });
        setLoading(false);
        return;
      }

    
      try {
        const response = await signup({
          ...formData,
          roll: Number(formData.roll)  // FIX
        });
    
        if (response.status === 201) {
          enqueueSnackbar("Signup Success", { variant: "success",autoHideDuration:5000 });
          navigate("/login");
        }
    
      } catch (error) {
        if (error.response && error.response.status === 406) {
          enqueueSnackbar(error.response.data.error, { variant: "error",autoHideDuration:5000 });
        } else {
          enqueueSnackbar("Signup failed", { variant: "error",autoHideDuration:5000 });
        }
      } finally {
        setLoading(false);
      }
    };
    

    const handleSignInClick = () =>{
        navigate('/login');
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
             Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt:1}}>
            
             <TextField
              autoComplete='given-name'
              name='firstName'
              fullWidth
              required
              id='firstName'
              label='First Name'
              sx={{mb:2}}
              value={formData.firstName}
              onChange={handleInputChange}
              />          
              
              <TextField
                required
                fullWidth
                name="lastName"
                id='lastName'
                label='Last Name'
                autoComplete='family-name'
                value={formData.lastName}
                onChange={handleInputChange}
                sx={{mb:2}}
              />

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
                name='password'
                id='password'
                label='Password'
                autoComplete='new-password'
                type='password'
                value={formData.password}
                onChange={handleInputChange}
                sx={{mb:2}}
              />

              <TextField
                required
                fullWidth
                name='roll'
                id='roll'
                label='Roll'
                autoComplete='220000'
                value={formData.roll}
                onChange={handleInputChange}
                sx={{mb:2}}
              />
              
            
              <Button 
                     type="submit" 
                     fullWidth 
                     variant="contained" 
                     sx={{mt:1,mb:1}}
                     disabled={!formData.email || !formData.firstName || !formData.lastName || !formData.password || !formData.roll}
                >
                    {loading ? <CircularProgress color='success' size={24} />: 'Sign Up'} 
              </Button>
          </Box>
          <Grid container justifyContent="flex-end"> 
             <Grid item>
                <Link variant='body2' onClick={handleSignInClick} sx={{textDecoration:'none',cursor:'pointer',color:'primary.main'}}>
                    Already have an account? Sign in
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

export default Signup