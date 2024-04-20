import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useAuth hook
import CustomButton from "./CustomButton"; // Import useAuth hook
import { styled } from "@mui/system";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { css } from "@emotion/react"; // Import css from @emotion/react
import { ClipLoader } from "react-spinners";
import StyledButton from "./StyledButton";
import LogoImm from "../assets/Hero/logo.png";
import { useCart } from "../CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "10vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 5,
  position: "fixed",
  zIndex: 100,
  // backdropFilter: "blur(15px)",
  width:"100%",
  background:"linear-gradient(90deg, rgba(211,197,229,0.9) 10%, rgba(115,93,165,0.8) 50%)"
}));
const StyledLink = ({ to, children }) => (
  <Link
    to={to}
    style={{
      fontWeight: 600,
      color: "#111",
      cursor: "pointer",
      textDecoration: "none",
      fontFamily: "Inknut Antiqua, serif",
      transition: "color 0.3s",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.color = "yellow"; // Change color on hover
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.color = "#111"; // Reset color on mouse out
    }}
  >
    {children}
  </Link>
);

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, profilePictureUrl } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const { cartItems } = useCart();

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openSettings = Boolean(anchorEl);

  const handleLogout = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setIsLoggedIn(false);
      navigate("/login");
      setLoading(false); // Stop loading
      console.log("User Logged out successfully");
    }, 2000); // Simulating a delay for demonstration purposes
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <MainBox>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginLeft: "20px",
          alignItems: "center",
          width:"50%"
        }}
      >
        <img src={LogoImm} alt="logo" style={{ width: "30px" }} />
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/pricing">Pricing</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginRight: "20px",
          justifyContent:"end",
          width:"50%",
        }}
      >
        {isLoggedIn ? (
          <>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Avatar
              alt="Profile"
              src={profilePictureUrl}
              onMouseEnter={handleSettingsClick}
              style={{ cursor: "pointer" }}
            />
          </>
        ) : (
          <>
            <StyledButton onClick={() => navigate("/login")}>
              Login
            </StyledButton>
            <StyledLink to="/register">Register</StyledLink>
          </>
        )}
      </Box>
      <Popover
        open={openSettings}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={2} sx={{ width: 200 }}>
          <Typography variant="h5">Settings</Typography>
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/profile");
                setAnchorEl(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/settings");
                setAnchorEl(false);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
          </List>
          <CustomButton
            onClick={() => {
              handleLogout();
              setAnchorEl(null);
            }}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader
                color={"#fff"}
                loading={true}
                css={override}
                size={20}
              />
            ) : (
              "Logout"
            )}
          </CustomButton>
        </Box>
      </Popover>
    </MainBox>
  );
}

export default Header;
