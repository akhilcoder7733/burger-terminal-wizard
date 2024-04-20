import React from 'react'
import {styled} from '@mui/system';
import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';

const MainBox = styled(Box)(({ theme }) => ({
    minHeight: "90vh",
    width: "100%",
    backgroundImage:"linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]:{
      flexDirection:"column-reverse"
    }
  }));

function NotFound() {
  return (
    <MainBox>
      <Helmet>
        <title>Terminal Wizard - Not Found</title>
      </Helmet>
      <Typography variant='h1' fontWeight={600}>404</Typography>
    </MainBox>
  )
}

export default NotFound
