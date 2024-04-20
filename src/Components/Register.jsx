import React, { useState } from 'react';
import { Alert, Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../Config'; // Import app from Config.js
import { useNavigate } from 'react-router-dom';
import {styled} from '@mui/system';
import RegIm from '../assets/Register.svg'
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StyledButton from "../Components/StyledButton";
import { Helmet } from 'react-helmet';
import { ClipLoader } from "react-spinners";



const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  width: "100%",
  backgroundImage:
  "linear-gradient(104deg, #D3C5E5 50%, #735DA5 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop:theme.spacing(5),
  [theme.breakpoints.down("sm")]:{
    flexDirection:"column-reverse"
  }
}));

const SmallBox = styled(Box)(({ theme }) => ({
  minHeight: "70vh",
  width: "40%",
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false); // Track registration status
  const [showPassword, setShowPassword] = useState(false); // Initialize showPassword as false
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true); 
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user's details to Firestore with a unique document ID
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
      });

      // Set registered to true after successful registration
      setRegistered(true);
    } catch (error) {
      setError(error.message);
      console.error('Error registering user:', error);
    }
    finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <MainBox>
      <Helmet>
        <title>Terminal Wizard - Register</title>
      </Helmet>
      <SmallBox>
        <img src={RegIm} alt="register" style={{
            width: "70%",
            height: "auto",
            objectFit: "fill",
            objectPosition: "center",
          }} 
          data-aos="fade-in"/>
          {registered && ( // Show the alert if registered is true
        <Alert variant='filled' severity='success' sx={{m:3}}>
          User Registered Successfully
        </Alert>
      )}
      </SmallBox>
     <SmallBox data-aos="fade-up">
     <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
        Register
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        sx={{ width: 400 }}

      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        sx={{ width: 400 }}

      />
      <TextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
        sx={{ width: 400 }}
        
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
                value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        sx={{ width: 400 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                size="small"
                sx={{ minWidth: 0 }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <StyledButton sx={{ width: 400, m: 2 }} onClick={handleRegister} disabled={loading}>
      {loading ? (
        <ClipLoader color={"#fff"} loading={true} size={20} />
      ) : (
        "Register"
      )}
    </StyledButton>
      <Typography variant='body2'>Already have an Account?{" "} <span style={{cursor:"pointer"}} onClick={()=>navigate("/login")}>Login</span></Typography>
      {error && <Typography variant='body2' sx={{color:"#9c0303"}} fontWeight={600}>{error} <br />
      Invalid Email or Password. Try again
      </Typography>
      }
      
     </SmallBox>
      
    </MainBox>
  );
}

export default Register;
