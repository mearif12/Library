// import { useSnackbar } from 'notistack';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getBooks, searchBook } from '../../service/student';
// import axios from "axios";
// import { authHeader } from "../../../../utils/common";
// import { 
//   Box,
//   Button,
//   Grid,
//   Typography,
//   Paper,
//   CircularProgress,
//   Backdrop,
//   Select,
//   FormControl,
//   InputLabel,
//   MenuItem 
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import Visibility from '@mui/icons-material/Visibility';
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   width: '100%',
//   height: '250px',
//   objectFit: 'cover'
// });

// const Item = styled(Paper)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'space-between',
//   backgroundColor: '#fff',
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   height: '100%',
//   boxSizing: 'border-box',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027'
//   })
// }));

// export default function StudentDashboard() {

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSem, setSelectedSem] = useState('');
//   const [sem] = useState([
//     "1Y-1S", "1Y-2S", "2Y-1S", "2Y-2S",
//     "3Y-1S", "3Y-2S", "4Y-1S", "4Y-2S",
//     "Notes", "All"
//   ]);

//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();

//   const fetchBooks = async () => {
//     setLoading(true);
//     try {
//       const response = await getBooks();
//       if (response.status === 200) {
//         setBooks(response.data);
//       }
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleSemChange = async (e) => {
//     setLoading(true);
//     const selectedSem = e.target.value;
//     setSelectedSem(selectedSem);

//     try {
//       if (selectedSem === "All") {
//         const response = await getBooks();
//         if (response.status === 200) {
//           setBooks(response.data);
//         }
//       } else {
//         const response = await searchBook(selectedSem);
//         if (response.status === 200) {
//           setBooks(response.data);
//         }
//       }
//     } catch (error) {
//       console.log(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewBook = (bookUrl) => {
//     window.open(bookUrl, '_blank');
//   };

//   const addToMyBooks = async (bookId) => {
//     try {
//       await axios.post("https://ice-library-server.onrender.com/api/my-books", { bookId }, {headers:authHeader()});
//       enqueueSnackbar("Added to My Books", { variant: "success" ,autoHideDuration:3000});
//     } catch (error) {
//       enqueueSnackbar("Book already added",{variant:'error',autoHideDuration:3000});
//     }
//   };

//   return (
//     <>
//       {/* SEARCH FILTER */}
//       <Grid
//         sx={{
//           marginTop: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <FormControl sx={{ mt: 2,  width: { xs: "100%", sm: 200, md: 400 } }}>
//           <InputLabel id="sem-label">Filter Semester :</InputLabel>
//           <Select
//             labelId="sem-label"
//             id="sem"
//             value={selectedSem}
//             onChange={handleSemChange}
//             label="Select Semester"
//           >
//             <MenuItem value="">Select Semester</MenuItem>
//             {sem.map((sm) => (
//               <MenuItem key={sm} value={sm}>{sm}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>

//       {/* BOOK CARDS */}
//       <Box sx={{ flexGrow: 1, p: 5 }}>
//         <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'stretch'}}>

//           {books.map((book) => (
//             <Grid item xs={12} md={6}  sm={6} lg={6} key={book._id} sx={{ display: 'block',margin:'auto',maxWidth:'525px'  }}>
//               <Item sx={{ width: '100%' }}>
                
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: { xs: 'column', sm: 'row' },
//                     p: 3,
//                     alignItems: 'center',
//                     flexGrow: 1,
//                     borderRadius: 2,
//                     transition: 'all 0.3s ease', 
//                     '&:hover': {
//                       transform: 'scale(1.1)', 
//                       boxShadow: 7,
//                       fontWeight:'bolder'
//                     }
//                   }}
//                 >
//                   {/* IMAGE */}
//                   <Box
//                     sx={{
//                       width: { xs: '100%', sm: '40%' },
//                       display: 'flex',
//                       justifyContent: 'center',
//                       p: 2
//                     }}
//                   >
//                     <Img
//                       alt={book.title}
//                       src={book.imageUrl}
//                       sx={{ width: '100%', maxWidth: '150px' }}
//                     />
//                   </Box>

//                   {/* TEXT */}
//                   <Box
//                     sx={{
//                       width: { xs: '100%', sm: '60%' },
//                       //p: 2
//                       p: { xs: 0, sm: 1 },
//                       mt: { xs: 2, sm: 0 }
//                     }}
//                   >
//                     <Typography variant="h6">
//                       <strong>{book.title}</strong>
//                     </Typography>

//                     <Box
//                       sx={{
//                         display: 'grid',
//                         gridTemplateColumns: '100px 1fr',
//                         gap: 1,
//                         mt: 2
//                       }}
//                     >
//                       <Typography variant="body2">Author:</Typography>
//                       <Typography variant="body2"><strong>{book.author}</strong></Typography>

//                       <Typography variant="body2">Description:</Typography>
//                       <Typography variant="body2"><strong>{book.description}</strong></Typography>

//                       <Typography variant="body2">Semester:</Typography>
//                       <Typography variant="body2"><strong>{book.sem}</strong></Typography>

//                       <Typography variant="body2">Edition:</Typography>
//                       <Typography variant="body2"><strong>{book.edition}</strong></Typography>
//                     </Box>

//                     {/* VIEW BUTTON */}
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         mt: 3,
//                         gap:1,
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         width: '100%'
//                       }}
//                     >
//                       <Button
//                         variant="outlined"
//                         color="success"
//                         endIcon={<LibraryAddIcon />}
//                         onClick={() => addToMyBooks(book._id)}
//                         fullWidth
//                       >
//                         Add 
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="info"
//                         endIcon={<Visibility />}
//                         onClick={() => handleViewBook(book.bookUrl)}
//                         fullWidth  
//                       >
//                         View
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Box>

//               </Item>
//             </Grid>
//           ))}

//         </Grid>
//       </Box>

//       {/* LOADING */}
//       <Backdrop
//         sx={{
//           color: '#fff',
//           zIndex: (theme) => theme.zIndex.drawer + 1
//         }}
//         open={loading}
//       >
//         <CircularProgress color="success" />
//       </Backdrop>
//     </>
//   );
// }


import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, searchBook } from '../../service/student';
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
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';

/* IMAGE STYLE */
const Img = styled("img")({
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "12px",
  transition: "transform .5s ease"
});

/* CARD STYLE */
const Item = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "20px",
  padding: theme.spacing(1),
  background: theme.palette.mode === "dark"
    ? "linear-gradient(145deg,#1f2937,#111827)"
    : "linear-gradient(145deg,#ffffff,#f3f4f6)",
  transition: "all .35s cubic-bezier(.17,.67,.43,.98)",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  border: "1px solid transparent",

  "&:hover": {
    transform: "translateY(-12px) scale(1.02)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
    border: "1px solid rgba(0,255,200,0.4)"
  },

  "&:hover img": {
    transform: "scale(1.12)"
  },

  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg,transparent,rgba(255,255,255,.35),transparent)",
    opacity: 0,
    transition: ".6s"
  },

  "&:hover::before": {
    opacity: 1,
    transform: "translateX(100%)"
  }
}));

export default function StudentDashboard() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSem, setSelectedSem] = useState('');

  const [sem] = useState([
    "1Y-1S","1Y-2S","2Y-1S","2Y-2S",
    "3Y-1S","3Y-2S","4Y-1S","4Y-2S",
    "Notes","All"
  ]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /* FETCH ALL BOOKS */
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

  /* FILTER BY SEM */
  const handleSemChange = async (e) => {
    setLoading(true);
    const selected = e.target.value;
    setSelectedSem(selected);

    try {
      if (selected === "All") {
        const response = await getBooks();
        setBooks(response.data);
      } else {
        const response = await searchBook(selected);
        setBooks(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* VIEW BOOK */
  const handleViewBook = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {/* FILTER DROPDOWN */}
      <Grid
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <FormControl sx={{ width: 320 }}>
          <InputLabel>Filter Semester</InputLabel>
          <Select
            value={selectedSem}
            label="Filter Semester"
            onChange={handleSemChange}
          >
            <MenuItem value="">Select Semester</MenuItem>
            {sem.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* BOOK GRID */}
      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Grid container spacing={4} justifyContent="center">

          {books.map(book => (
            <Grid item xs={12} sm={6} md={6} lg={5} key={book._id}>
              <Item>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs:"column", sm:"row" },
                    alignItems: "center",
                    p: 3
                  }}
                >

                  {/* IMAGE */}
                  <Box
                    sx={{
                      width: { xs:"100%", sm:"40%" },
                      overflow:"hidden",
                      borderRadius:3
                    }}
                  >
                    <Img src={book.imageUrl} alt={book.title}/>
                  </Box>

                  {/* TEXT */}
                  <Box sx={{ width:{ xs:"100%", sm:"60%" }, p:2 }}>

                    <Typography variant="h6" fontWeight="bold">
                      {book.title}
                    </Typography>

                    <Box
                      sx={{
                        display:"grid",
                        gridTemplateColumns:"110px 1fr",
                        gap:1,
                        mt:2
                      }}
                    >
                      <Typography>Author:</Typography>
                      <Typography fontWeight="bold">{book.author}</Typography>

                      <Typography>Description:</Typography>
                      <Typography fontWeight="bold">{book.description}</Typography>

                      <Typography>Semester:</Typography>
                      <Typography fontWeight="bold">{book.sem}</Typography>

                      <Typography>Edition:</Typography>
                      <Typography fontWeight="bold">{book.edition}</Typography>
                    </Box>

                    {/* BUTTON */}
                    <Box sx={{ display:"flex", justifyContent:"flex-end", mt:2 }}>
                      <Button
                        variant="contained"
                        onClick={() => handleViewBook(book.bookUrl)}
                        endIcon={<Visibility />}
                        sx={{
                          borderRadius:"30px",
                          px:3,
                          background:"linear-gradient(135deg,#00f5ff,#00ff95)",
                          color:"#000",
                          fontWeight:"bold",
                          transition:".3s",
                          "&:hover":{
                            transform:"scale(1.08)",
                            boxShadow:"0 10px 20px rgba(0,255,200,.4)"
                          }
                        }}
                      >
                        View
                      </Button>
                    </Box>

                  </Box>
                </Box>
              </Item>
            </Grid>
          ))}

        </Grid>
      </Box>

      {/* LOADER */}
      <Backdrop
        open={loading}
        sx={{ color:"#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="success"/>
      </Backdrop>
    </>
  );
}
