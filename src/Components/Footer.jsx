import React from 'react'
import { styled } from "@mui/system";
import { Box } from '@mui/material';


const MainBox = styled(Box)(({ theme }) => ({
    minHeight: "30vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundImage:"linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  }));


function Footer() {
  return (
    <MainBox>
      Footer
    </MainBox>
  )
}

export default Footer
