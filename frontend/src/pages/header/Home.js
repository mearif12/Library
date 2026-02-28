// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle, Login } from '@mui/icons-material'; 

export default function Home() {
  
  const text = "Welcome to ICE Book Library";
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  // typing animation loop
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < text.length) {
        setDisplayed(prev => prev + text[index]);
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          setDisplayed("");
          setIndex(0);
        }, 2500);
      }
    }, 70);

    return () => clearTimeout(timeout);
  }, [index]);
  
    return (
        <>
            <style>
                {`
                    @keyframes animate {
                        to {
                            background-position: 200%;
                        }
                    }
                    /* added logo slide animation */
                    @keyframes slideDown {
                        from {
                        opacity:0;
                        transform:translateY(-80px) scale(.8);
                        }
                        to {
                        opacity:1;
                        transform:translateY(0) scale(1);
                        }
                    }

                    .logo-slide{
                        animation:slideDown 1.3s ease forwards;
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
                        position: relative;
                        
                    } 

                    .cursor{
                      display:inline-block;
                      width:15px;
                      height:1em;
                      border-right:2px solid white;
                      margin-left:2px;
                      animation:blink 1s infinite;
                      vertical-align: baseline;
                      background: gray; 
                      position: relative; 
                      z-index: 1; 
                    }
                    
                    @keyframes blink{
                      0%,50%,100%{opacity:1}
                      25%,75%{opacity:0}
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

                     @media (max-width: 600px) {
                      .button-container {
                        flex-direction: column;  /* stack vertically */
                        gap: 15px;
                        margin-top: 1.5rem;
                      }
                    
                      .auth-button {
                        width: 80%; /* take most of the screen */
                        max-width: 250px;
                        margin: 0 auto;
                      }
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

            <img 
                src="/ice.png" 
                alt="ICE" 
                className="logo-slide"
                style={{ display: 'block', margin: '40px auto', maxHeight: '350px', maxWidth: '350px',width: "80%",height: "auto" }} 
            />
            <h1 className="animated-title">
                 {displayed}
                 <span className="cursor"/>  
            </h1>
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
