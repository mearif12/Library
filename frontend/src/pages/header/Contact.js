import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_824drfb', 'template_1repgdj', form.current, {
        publicKey: '_iNc3th7Um4zxFpKe',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          enqueueSnackbar("Successfully sent email",{variant:"success",autoHideDuration:3000});
          navigate('/');

        },
        (error) => {
          console.log('FAILED...', error.text);
          enqueueSnackbar("Failed to send email",{variant:'error',autoHideDuration:3000});
        },
      );
  };

  return (
       <Container maxWidth="sm" sx={{marginTop:7}}>
         <Box
           sx={{
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             padding: 4,
             boxShadow: 3,
             borderRadius: 2,
             backgroundColor: 'background.paper',
           }}
         >
           <Typography variant="h4" gutterBottom>
             Contact Me
           </Typography>
           <form ref={form} onSubmit={sendEmail} style={{ width: '100%' }}>
             <TextField
               label="Name"
               name="name"
               variant="outlined"
               fullWidth
               margin="normal"
               required
             />
             <TextField
               label="Email"
               name="email"
               type="email"
               variant="outlined"
               fullWidth
               margin="normal"
               required
             />
             <TextField
               label="Message"
               name="message"
               variant="outlined"
               fullWidth
               multiline
               rows={4}
               margin="normal"
               required
             />
             <Button
               type="submit"
               variant="contained"
               color="primary"
               fullWidth
               sx={{ marginTop: 2 }}
             >
               Send
             </Button>
           </form>
         </Box>
       </Container>
  );
};

export default Contact;