import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import MainB1 from "../assets/Hero/b5.png";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "70vh",
  backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(1),
}));
const LeftBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(1),
  width: theme.spacing(80),
}));

const StyledImage = styled("img")(({ theme }) => ({
  width: theme.spacing(70),
  height: "auto",
//     boxShadow: "0px 9px 15px -5px rgba(0,0,0,0.55)",
//   borderRadius:"20%"
filter:"brightness(90%)"
}));

function Hero() {
  return (
    <MainBox>
      <LeftBox>
        <Typography variant="h4" style={{ fontFamily: "Play, sans-serif" }} data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
          Best Burgers Ever!
        </Typography>
        <Typography variant="h6" style={{ fontFamily: "Play, sans-serif" }} data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          Try It Now!
        </Typography>
        <Typography variant="body1" style={{ fontFamily: "Play, sans-serif" }} data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
          To make a delicious beef burger, start by mixing 500 grams of ground
          beef with a pinch of salt and pepper in a bowl. Divide the mixture
          into equal-sized patties and grill or fry them until they're cooked to
          your liking. While the patties are cooking, toast the burger buns in a
          separate pan until they're golden brown.
        </Typography>
        <Typography variant="body1" style={{ fontFamily: "Play, sans-serif" }} data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
          Next, prepare your burger toppings. Slice some tomatoes, onions, and
          lettuce. You can also add cheese slices, pickles, and condiments like
          ketchup, mustard, and mayonnaise.
        </Typography>
        <Typography variant="body1" style={{ fontFamily: "Play, sans-serif" }} data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000">
          Once the patties and buns are ready, assemble your burgers. Place a
          patty on the bottom half of each bun and top it with your desired
          toppings. Add the top half of the bun and serve your delicious beef
          burgers hot. Enjoy!
        </Typography>
      </LeftBox>
      <Box>
        <StyledImage src={MainB1} alt="burger-1"  data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000"/>
      </Box>{" "}
    </MainBox>
  );
}

export default Hero;
