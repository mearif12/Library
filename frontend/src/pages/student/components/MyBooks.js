import { useEffect, useState } from "react";
import axios from "axios";
import { Box,Typography, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import { Delete as DeleteIcon } from '@mui/icons-material';

import { authHeader } from "../../../utils/common";

// Styled components
const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "100%",
  height: "250px",
  objectFit: "cover",
});

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://ice-library-server.onrender.com/api/my-books", {
          headers: authHeader(),
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching My Books:", err);
      }
    };
    fetchBooks();
  }, []);

  const removeBook = async (id) => {
    try {
      await axios.delete(`https://ice-library-server.onrender.com/api/my-books/${id}`, { headers: authHeader() });
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  const handleViewBook = (bookUrl) => {
    window.open(bookUrl, "_blank");
  };

  return (
    <Grid
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
    <Box sx={{ flexGrow: 1, p: 5 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontFamily: "monospace", color: "yellow", mb: 4 }}
      >
        Your Books
      </Typography>

      <Grid container spacing={3} sx={{ display: "flex", alignItems: "stretch" }}>
        {books.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            key={item._id}
            sx={{ display: "block", margin: "auto", maxWidth: "525px" }}
          >
            <Item elevation={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  p: 3,
                  alignItems: "center",
                  flexGrow: 1,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 7,
                    fontWeight: "bolder",
                  },
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    width: { xs: "100%", sm: "40%" },
                    display: "flex",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Img src={item.book.imageUrl} alt={item.book.title} />
                </Box>

                {/* DETAILS & BUTTONS */}
                <Box
                  sx={{
                    width: { xs: "100%", sm: "60%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    p: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {item.book.title}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%' }}>
                    <Button
                      variant="contained"
                      color="info"
                      endIcon={<Visibility />}
                      onClick={() => handleViewBook(item.book.bookUrl)}
                      fullWidth
                    >
                      View
                    </Button>

                    <Button color="error" fullWidth endIcon={<DeleteIcon />} variant="contained" onClick={() => removeBook(item._id)}>
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
    </Grid>
  );
}
