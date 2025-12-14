import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBook, getBooks, searchBook } from '../../service/admin';
import { 
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Backdrop,
  Select,
  FormControl,
  InputLabel,
  MenuItem 
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '100%',
  height: '250px',
  objectFit: 'cover'
});

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '100%',
  boxSizing: 'border-box',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}));

export default function AdminDashboard() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSem, setSelectedSem] = useState('');

  const [sem] = useState([
    "1Y-1S", "1Y-2S", "2Y-1S", "2Y-2S",
    "3Y-1S", "3Y-2S", "4Y-1S", "4Y-2S", "Notes"
  ]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      if (response.status === 200) {
        setBooks(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSemChange = async (e) => {
    setLoading(true);
    const selectedSem = e.target.value;
    setSelectedSem(selectedSem);

    try {
      const response = await searchBook(selectedSem);
      if (response.status === 200) {
        setBooks(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    setLoading(true);
    try {
      const response = await deleteBook(id);
      if (response.status === 200) {
        enqueueSnackbar('Book Deleted Successfully', { variant: 'success', autoHideDuration: 5000 });
        fetchBooks();
      }
    } catch (error) {
      enqueueSnackbar('Book not Deleted', { variant: 'error', autoHideDuration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBook = (id) => {
    navigate(`/admin/book/${id}/edit`);
  };

  return (
    <>
      <Grid
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <FormControl sx={{ mt: 2, width: 400 }}>
          <InputLabel id="sem-label">Search By Semester:</InputLabel>
          <Select
            labelId="sem-label"
            id="sem"
            value={selectedSem}
            onChange={handleSemChange}
            label="Select Semester"
          >
            <MenuItem value="">Select Semester</MenuItem>
            {sem.map((sm) => (
              <MenuItem key={sm} value={sm}>
                {sm}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'stretch'}}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={book._id} sx={{ display: 'block',margin:'auto',maxWidth:'525px'  }}>
              <Item>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    p: 3,
                    alignItems: 'center',
                    flexGrow: 1,
                    borderRadius: 2,
                    transition: 'all 0.3s ease', 
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: 7, 
                      fontWeight:'bolder'          
                    }
                  }}
                >
                  {/* IMAGE */}
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '40%' },
                      display: 'flex',
                      justifyContent: 'center',
                      p: 2
                    }}
                  >
                    <Img
                      src={book.imageUrl}
                      alt={book.title}
                      sx={{ width: '100%', height: 'auto', maxWidth: '150px' }}
                    />
                  </Box>

                  {/* TEXT DETAILS */}
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '60%' },
                      pl: { xs: 0, sm: 3 },
                      mt: { xs: 2, sm: 0 }
                    }}
                  >
                    <Typography variant="h6">
                      <strong>{book.title}</strong>
                    </Typography>

                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr',
                        gap: 1,
                        mt: 2
                      }}
                    >
                      <Typography variant="body2">Author:</Typography>
                      <Typography variant="body2"><strong>{book.author}</strong></Typography>

                      <Typography variant="body2">Description:</Typography>
                      <Typography variant="body2"><strong>{book.description}</strong></Typography>

                      <Typography variant="body2">Semester:</Typography>
                      <Typography variant="body2"><strong>{book.sem}</strong></Typography>

                      <Typography variant="body2">Edition:</Typography>
                      <Typography variant="body2"><strong>{book.edition}</strong></Typography>
                    </Box>

                    {/* BUTTONS */}
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2,
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%'
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<EditIcon />}
                        onClick={() => handleUpdateBook(book._id)}
                        fullWidth
                      >
                        Update
                      </Button>

                      <Button
                        variant="outlined"
                        color="error"
                        endIcon={<DeleteIcon />}
                        onClick={() => handleDeleteBook(book._id)}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="success" />
      </Backdrop>
    </>
  );
}
