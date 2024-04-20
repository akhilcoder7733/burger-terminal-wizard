import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import StyledButton from "../Components/StyledButton";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(1),
  paddingTop:theme.spacing(7)
}));

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: theme.spacing(32),
  minHeight: theme.spacing(40),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "20px",
  backgroundImage:
    "linear-gradient(40deg, rgba(130,102,200,1) 0%, rgba(172,140,191,1) 81%)",
  boxShadow: "0px 9px 15px -5px rgba(0,0,0,0.55)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 9px 15px -5px rgba(0,0,0,1)",
    transform: "translateY(-5px)",
  },
}));

const StyledCardBox = styled(CardContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  gap: theme.spacing(3),
}));

const SwitchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  gap: theme.spacing(1),
}));
const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const cardData = [
  {
    Heading: "Free",
    chipHead: "Free",
    priceMonthly: "0.00/-",
    priceYearly: "0.00/-",
    sub: "You can choose as FREE!",
    l1: "limited Contents",
    l2: "limited Accounts",
    l3: "limited Views",
    l4: "limited Smiles",
    color: "primary",
  },
  {
    Heading: "Premium",
    chipHead: "Premium",
    priceMonthly: "19.99/-",
    priceYearly: "99.99/-",
    sub: "You can choose as Premium!",
    l1: "limited Contents",
    l2: "limited Accounts",
    l3: "unlimited Views",
    l4: "unlimited Smiles",
    color: "secondary",

  },
  {
    Heading: "Pro",
    chipHead: "Pro-ultra",
    priceMonthly: "99.99/-",
    priceYearly: "199.99/-",
    sub: "You can choose as PRO!",
    l1: "Unlimited Contents",
    l2: "Unlimited Accounts",
    l3: "Unlimited Views",
    l4: "Unlimited Smiles",
    color: "success",

  },
];

function Pricing() {
  const navigate=useNavigate();
  const [monthly, setMonthly] = useState(false);

  const handleSwitchChange = () => {
    setMonthly((prev) => !prev);
  };

  return (
    <MainBox>
      <Helmet>
        <title>Terminal Wizard - Pricing</title>
      </Helmet>
      <Box data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
        <Typography variant="h3" sx={{ fontFamily: "Milonga, serif" }}>
          Choose Plans:
        </Typography>
      </Box>
      <SwitchBox data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"> 
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Milonga, serif",
            fontWeight: monthly ? "0" : "600",
            textDecoration: monthly ? "none" : "underline",
          }}
        >
          Monthly
        </Typography>
        <Switch defaultChecked={monthly} onChange={handleSwitchChange} />
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Milonga, serif",
            fontWeight: monthly ? "600" : "0",
            textDecoration: monthly ? "underline" : "none",
          }}
        >
          Yearly
        </Typography>
      </SwitchBox>
      <StyledCardBox>
        {cardData.map((item, index) => (
          <Box data-aos="fade-up" data-aos-delay={`${index * 100}`}>
            <StyledCard key={index} >
            <CardActionArea>
              <StyledCardContent>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  sx={{ fontFamily: "Milonga, serif" }}
                >
                  {item.Heading} <Chip color={item.color} label={item.chipHead} />
                </Typography>
                <Divider />
                <Typography
                  variant="h3"
                  fontWeight={600}
                  sx={{ fontFamily: "Milonga, serif" }}
                >
                  {monthly ? item.priceYearly : item.priceMonthly}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "Milonga, serif" }}
                >
                  {item.sub}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    gap: "5px",
                    fontFamily: "Milonga, serif",
                  }}
                >
                  <ControlPointIcon /> {item.l1}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    gap: "5px",
                    fontFamily: "Milonga, serif",
                  }}
                >
                  <ControlPointIcon /> {item.l2}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    gap: "5px",
                    fontFamily: "Milonga, serif",
                  }}
                >
                  <ControlPointIcon /> {item.l3}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    gap: "5px",
                    fontFamily: "Milonga, serif",
                  }}
                >
                  <ControlPointIcon /> {item.l4}
                </Typography>
              </StyledCardContent>
            </CardActionArea>
            <CardActions>
              <StyledButton sx={{ fontFamily: "Milonga, serif" }} onClick={()=>navigate('/login')}>
                {monthly ? "Get Plan Yearly" : "Get Plan Monthly"}
              </StyledButton>
            </CardActions>
          </StyledCard>
        
          </Box>
        ))}
      </StyledCardBox>
    </MainBox>
  );
}

export default Pricing;
