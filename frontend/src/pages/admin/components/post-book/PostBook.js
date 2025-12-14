import { useState } from 'react';
import { Avatar,Button,TextField,Box,Container,Typography,CircularProgress,Backdrop,InputLabel,MenuItem,FormControl,Select } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { postBook } from '../../service/admin';

export default function PostBook() {
    const [sem] = useState([
        "1Y-1S",
        "1Y-2S",
        "2Y-1S",
        "2Y-2S",
        "3Y-1S",
        "3Y-2S",
        "4Y-1S",
        "4Y-2S",
        "Notes"
    ]);
    const[book,setBook] = useState({
        title:'',
        author:'',
        description:'',
        sem:'',
        edition:'',
        imageUrl:'',
        bookUrl:''
    });
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (event) => {
        const { name,value } = event.target;
        setBook({
            ...book,
            [name]: value
        });
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true);
        try {
           const response = await postBook(book);
           if(response.status === 201){
               navigate('/admin/dashboard');
               enqueueSnackbar("Book posted successfully",{variant:"success",autoHideDuration:5000});
           }
        } catch (error) {
         enqueueSnackbar("Book not posted",{variant:"error",autoHideDuration:5000});
        } finally {
         setLoading(false);
        }
    }

    return(
        <>
               <Container maxWidth="xs" sx={{marginTop:2,padding:1}}>
                    <Avatar sx={{mx:"auto",bgcolor:"primary.main"}}>
                        <BookIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                        Add Book
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}}>
                    <TextField
                           margin='normal'
                           required
                           fullWidth
                           id="title"
                           label="Enter Book Title"
                           name="title"
                           type="text"
                           autoComplete="title"
                           autoFocus
                           value={book.title}
                           onChange={handleInputChange}
                        />
                        
                        <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="author"
                           label="Enter Book Author"
                           name="author"
                           type="text"
                           autoComplete="author"
                           autoFocus
                           value={book.author}
                           onChange={handleInputChange}
                        />

                        <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="description"
                           label="Enter Book Description"
                           name="description"
                           type="text"
                           autoComplete="description"
                           autoFocus
                           value={book.description}
                           onChange={handleInputChange}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="sem-label">Select Semester</InputLabel>
                            <Select
                               labelId="sem-label"
                               id="sem"
                               value={book.sem}
                               onChange={handleInputChange}
                               name="sem"
                               label="Select Semester"
                            >
                               <MenuItem value="">Select Semester</MenuItem>
                               {sem.map((sm)=>(
                                  <MenuItem key={sm} value={sm}>
                                     {sm}
                                  </MenuItem>
                               ))}    
                            </Select>   
                        </FormControl>

                        <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="edition"
                           label="Enter Edition"
                           name="edition"
                           type="edition"
                           autoComplete="edition"
                           autoFocus
                           value={book.edition}
                           onChange={handleInputChange}
                        />


                        <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="imageUrl"
                           label="Enter image url"
                           name="imageUrl"
                           type="text"
                           autoComplete="imageUrl"
                           autoFocus
                           value={book.imageUrl}
                           onChange={handleInputChange}
                        />

                        <TextField
                           margin="normal"
                           required
                           fullWidth
                           id="bookUrl"
                           label="Enter Book url"
                           name="bookUrl"
                           type="text"
                           autoComplete="bookUrl"
                           autoFocus
                           value={book.bookUrl}
                           onChange={handleInputChange}
                        />

                        <Button
                             type="submit"
                             fullWidth
                             sx={{mt:1,mb:1}}
                             variant='contained'
                             disabled={
                                !book.title ||
                                !book.author ||
                                !book.description ||
                                !book.edition ||
                                !book.sem ||
                                !book.imageUrl ||
                                !book.bookUrl
                             }    
                        >
                           {loading ? <CircularProgress color="success" size={24} />: 'Add Book'}
                        </Button>

                    </Box>    
             </Container>
          
            <Backdrop
              sx={{color:'#fff',zIndex:(theme)=>theme.zIndex.drawer + 1}}
              open={loading}
            >
             <CircularProgress color="success" />  
            </Backdrop> 
        </>
    )
};