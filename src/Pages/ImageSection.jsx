import { Box } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react'
import ImageOne from '../assets/Images/image (1).jpg'
import ImageTwo from '../assets/Images/image (2).jpg'
import ImageThree from '../assets/Images/image (3).jpg'

const MainBox = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // flexDirection: "column",
    gap: theme.spacing(3),
    paddingTop:theme.spacing(7),
    paddingBottom:"20px"
  }));

const SecondBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(7),
    flexDirection:"column"
  }));



function ImageSection() {
  return (
    <MainBox>
      <Box>
        <img src={ImageOne} alt="img1" style={{width:500, borderTopLeftRadius:"30px", borderBottomLeftRadius:"30px"}} />
      </Box>
      <SecondBox>
        <img src={ImageTwo} alt="img2" style={{width:500, borderTopRightRadius:"30px"}}  />
        <img src={ImageThree} alt="img3" style={{width:500, borderBottomRightRadius:"30px"}}  />
      </SecondBox>
    </MainBox>
  )
}

export default ImageSection
