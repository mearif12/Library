import React from 'react';
import { Button,Box,Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle, Login } from '@mui/icons-material'; 
import { keyframes } from "@emotion/react";

const scrollLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export default function Home() {
  
    return (
        <>
            <style>
                {`
                    @keyframes animate {
                        to {
                            background-position: 200%;
                        }
                    }
                  
                    .animated-title {
                        text-align: center;
                        background: linear-gradient(to right, #fc72ff, #8f68ff, #487bff, #8f68ff, #fc72ff);
                        background-size: 200%;
                        background-clip: text;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-family: monospace;
                        font-size: 3rem;
                        font-weight: bolder;
                        animation: animate 2.5s linear infinite;
                        
                    }
                    
                    .button-container {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin-top: 50px;
                    }

                    .auth-button {
                        font-size: 1rem;
                        font-weight: bold;
                        border-radius: 30px;  
                        padding: 10px 20px;
                        text-transform: none;
                        transition: all 0.3s ease;
                    }

                    
                    .sign-up-button {
                        background: linear-gradient(45deg, #6a11cb, #2575fc); 
                        color: white;
                        border: none;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
                    }

                    .sign-up-button:hover {
                        background: linear-gradient(45deg, #2575fc, #6a11cb);  
                        transform: scale(1.05); 
                    }

                   
                    .sign-in-button {
                        background-color: #00bcd4;  
                        color: white;
                        border: none;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    }

                    .sign-in-button:hover {
                        background-color: #008c99;
                        transform: scale(1.05); 
                    }

                    .auth-button .MuiButton-startIcon {
                        margin-right: 8px; 
                    }

                `}
            </style>
            
            <Box
                sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    background: "linear-gradient(90deg, #121212, #1e1e1e)",
                    borderBottom: "1px solid #333",
                    color:"white",
                    py: 1.2,
                }}
            >
             <Typography
                 sx={{
                    display: "inline-block",
                    animation: `${scrollLeft} 46s linear infinite`,
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, #00f5ff, #00ff95)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                 }}
       
             >
              🔔 Notice: This application is hosted on a shared server.You may experience brief delays during high traffic periods.Please use a simple password and log out after use to help reduce traffic. I appreciate your understanding.
            </Typography>
          </Box>
      
            <img 
                src="/ice.png" 
                alt="ICE" 
                style={{ display: 'block', margin: '40px auto', maxHeight: '350px', maxWidth: '350px',width: "80%",height: "auto" }} 
            />
            <h1 className="animated-title">Welcome to ICE Book Library</h1>


            <div className="button-container">
            
            <Button
                className="auth-button sign-up-button"
                variant="contained"
                component={Link} 
                to="/register" 
                color="inherit"
                startIcon={<AccountCircle />} 
            >
                Sign Up
            </Button>

            <Button
                className="auth-button sign-in-button"
                variant="contained"
                component={Link}
                to="/login" 
                color="inherit"
                startIcon={<Login />}
            >
                Sign In
            </Button>
        </div>
        </>
    );
}
