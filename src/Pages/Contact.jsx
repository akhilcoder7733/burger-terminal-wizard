import { Box, Typography } from '@mui/material';
import React from 'react'
import {styled} from '@mui/system';
import Akhil from '../assets/svg/nnnnnnnnnnnnneeeeeeeeee.png'

const MainBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    // backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
    backgroundImage: "linear-gradient(90deg, rgba(211,197,229,1) 50%, rgba(115,93,165,1) 50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
        gap: theme.spacing(1),
    paddingTop:"80px"
  }));

  const PicBox =styled(Box)(({ theme }) =>({
    display:"flex",
    justifyContent: "center",
    height:theme.spacing(60),
    width:theme.spacing(60),
    // backgroundColor:"red",
    overflow:"hidden",
  }));
  const DetBox =styled(Box)(({ theme }) =>({
    display:"flex",
    justifyContent: "center",
    // alignItems:"center",
    height:theme.spacing(70),
    width:theme.spacing(60),
    // backgroundColor:"red",
    overflow:"hidden",
    flexDirection:"column",
  }));

  const PicImg =styled("img")(({ theme }) =>({
    height:theme.spacing(60),
    width:"auto",
    filter:"grayscale(100%)",
    transition:"all 0.3s ease-in-out",
    "&:hover":{
        transform:"scale(1.2) rotate(5deg)",
        filter:"grayscale(0%)",
    }
  }));


function Contact() {
  return (
    <MainBox>
        <PicBox>
<PicImg src={Akhil} alt="akhil" />
        </PicBox>
        <DetBox>
        <Typography variant='h2'>Akhil John</Typography>
        <Typography variant='h5'>React JS Developer</Typography>
        <Typography variant='subtitle2'>Its cool and awesome</Typography>
        <Typography variant='body2'>Akhil John</Typography>
        </DetBox>
      
    </MainBox>
  )
}


export default Contact
