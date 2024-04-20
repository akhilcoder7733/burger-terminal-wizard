// Login.js
import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../Config"; // Import app from Config.js
import { useAuth } from "../AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import LoginImgs from "../assets/Login.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StyledButton from "../Components/StyledButton";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";


const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  width: "100%",
  backgroundImage:
    "linear-gradient(104deg, #D3C5E5 50%, #735DA5 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState();
  const { setIsLoggedIn } = useAuth(); // Access setIsLoggedIn function from AuthContext
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const auth = getAuth(app);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      navigate("/");
    } catch (error) {
      setError("Invalid credentials. Please check your email and password.");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false); // Stop loading
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainBox>
      <Helmet>
        <title>Terminal Wizard - Login</title>
      </Helmet>
      <SmallBox data-aos="fade-in" data-aos-duration="1000">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          Login
        </Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          sx={{ width: 400 }}
          variant="standard"
          id="input-with-icon-adornment"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          sx={{ width: 400 }}
          variant="standard"
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

        <StyledButton
          sx={{ width: 400, m: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color={"#fff"} loading={true} size={20} />
          ) : (
            "Login"
          )}
        </StyledButton>
        <Typography variant="body2">
          Don't have an Account?{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Click Here
          </span>
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
      </SmallBox>
      <SmallBox>
        <img
          src={LoginImgs}
          alt="login"
          style={{
            width: "70%",
            height: "auto",
            objectFit: "fill",
            objectPosition: "center",
          }}
          data-aos="fade-up"
        />
      </SmallBox>
    </MainBox>
  );
}

export default Login;
