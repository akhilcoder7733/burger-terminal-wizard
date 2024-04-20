import React,  {useEffect} from "react";
import Typed from "typed.js";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { styled } from "@mui/system";
import StyledButton from "../Components/StyledButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  // backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  backgroundImage: "linear-gradient(90deg, rgba(211,197,229,1) 50%, rgba(115,93,165,1) 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(1),
  paddingTop:"80px"
}));

const TypedBox = styled(Box)(({ theme }) => ({
  // minHeight:"10vh",
  width: 160,
  padding:theme.spacing(1),
  // backgroundColor:"red"
}));

const Sbtn = styled(StyledButton)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontFamily:"Milonga, serif",
  '&:hover .icon':{
    transition:"all 0.3s ease-in-out",
    transform:"translateX(5px)",
    color:"#111"
  }
}));

const StyledSpan = styled("span")(({ theme }) => ({
  fontSize:"20px",
  transition:"all 0.3s ease-in-out",
  fontFamily:"Milonga, serif",
  '&:hover':{
    fontWeight:600
  }
}));

const StyledTy = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap:theme.spacing(2)
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  color:"#4d4c4c",
  fontFamily:"Milonga, serif",
  fontWeight:600,
  fontSize:"15px",
  cursor:"pointer",
  display:"flex",
  gap:theme.spacing(1),
  transition:" all 0.3s ease-in-out",
  "&:hover":{
    color:"#e0e0e0",
  },
  ".insta, .fb, .twitter ":{
color:"#4d4c4c"
  },
  "&:hover .insta":{
    color:"#9c0865",
    transition:" all 0.3s ease-in-out",
  },
  "&:hover .fb":{
    color:"#215cff",
    transition:" all 0.3s ease-in-out",
  },
  "&:hover .twitter":{
    color:"#47a8ed",
    transition:" all 0.3s ease-in-out",
  },
}));

function Home() {
 useEffect(() => {
  const typed = new Typed(".element", {
    strings: ["First sentence.", "Second sentence.", "Third sentence.",],
    typeSpeed: 30,
    backSpeed: 50,
    loop:true
  });

  return () => {
    typed.destroy();
  }
 })

  return (
    <MainBox>
      <Helmet>
        <title>Terminal Wizard - Home Page</title>
      </Helmet>
      <Typography variant="h1" sx={{  fontFamily:"Milonga, serif",
}} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">Burger Mate</Typography>
      <TypedBox data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
<StyledSpan className="element"/>
      </TypedBox>
      <Typography variant="body1" sx={{width:900, display:"flex", textAlign:"center" }}>
      My intention is for this blog to chart my journey as I explore this most diverse of food types, travelling around to find the greatest that there is to offer, from the humble to the mighty.
      </Typography>
      <Typography variant="body1" sx={{width:900, display:"flex", textAlign:"center" }}>
      Along the way I plan on bringing you my own experiments in burger recipes so that you can try them for yourself, and explore the taste sensations that can be offered between sliced buns.      </Typography>

      <Sbtn className="get" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
        Get Started
        <ArrowForwardIcon className="icon" />
      </Sbtn>
      <StyledTy>
        <StyledTypo variant="subtitle1"><InstagramIcon className="insta"/>___._akhil_.___</StyledTypo>
        <Box sx={{padding:"1px", minHeight:"25px", backgroundColor:"#696969"}}/>
        <StyledTypo variant="subtitle1"><FacebookIcon className="fb"/>Akhil John</StyledTypo>
        <Box sx={{padding:"1px", minHeight:"25px", backgroundColor:"#696969"}}/>
        <StyledTypo variant="subtitle1"><TwitterIcon className="twitter"/>@akhilakhi</StyledTypo>
      </StyledTy>
    </MainBox>
  );
}

export default Home;
