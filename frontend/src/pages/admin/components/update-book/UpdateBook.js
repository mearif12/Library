import { useEffect,useState } from 'react';
import { Avatar,Button,TextField,Box,Container,Typography,CircularProgress,Backdrop,InputLabel,MenuItem,FormControl,Select } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate,useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getBookById,updateBook } from '../../service/admin';

export default function UpdateBook() {
   const {id} = useParams(); 
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

    const fetchBook = async ()=> {
      setLoading(true);
      try {
          const response = await getBookById(id);
          if(response.status === 200){
              setBook(response.data);
          }
      } catch (error) {
            console.log(error.message);
      } finally {
          setLoading(false);
      }
    }

    useEffect(()=>{
      fetchBook();
    },[]);


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
           const response = await updateBook(id,book);
           if(response.status === 200){
               navigate('/admin/dashboard');
               enqueueSnackbar("Book updated successfully",{variant:"success",autoHideDuration:5000});
           }
        } catch (error) {
         enqueueSnackbar("Book not updated",{variant:"error",autoHideDuration:5000});
        } finally {
         setLoading(false);
        }
    }

    return(
        <>
               <Container maxWidth="xs" sx={{marginTop:2,padding:1}}>
                    <Avatar sx={{mx:"auto",bgcolor:"primary.main"}}>
                        <Edit/>
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                        Update Book
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
                             sx={{mt:3,mb:2}}
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
                           {loading ? <CircularProgress color="success" size={24} />: 'Update Book'}
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

