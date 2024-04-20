import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Modal,
  Fade
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import b1 from "../assets/Hero/b1.png";
import b2 from "../assets/Hero/b2.png";
import b3 from "../assets/Hero/b3.png";
import b4 from "../assets/Hero/b4.png";
import b5 from "../assets/Hero/b5.png";
import StyledButton from "../Components/StyledButton";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCart } from "../CartContext";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import ErImg from '../assets/svg/error.svg'

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: theme.spacing(1),
  flexWrap: "wrap",
  padding: theme.spacing(1),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: theme.spacing(35),
  minHeight: theme.spacing(40),
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(5),
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
  "&:hover .immo": {
    transform: "scale(1.1)",
    transition: "transform 0.3s ease-in-out",
  },
}));

const StyledCardBox = styled(CardContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
  flexDirection: "column",
  // gap: theme.spacing(3),
}));

const FirstBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  // backgroundColor: "red",
  minHeight: "20vh",
  paddingTop: theme.spacing(9),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 300,
  backgroundColor: "#fff",
  // border: '2px solid #000',
  boxShadow: 24,
  padding: theme.spacing(2),
  borderRadius: "20px",
  display: "flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection: "column",
  gap: theme.spacing(1),
  overflow:"hidden",
  backgroundImage:"linear-gradient(60deg, #D3C5E5 0%, #735DA5 81%)"
}));

const StyledTypo = styled(Typography)({
  fontFamily: "Rubik, sans-serif",
});
const StyledImg = {
  width: 230,
  alignSelf: "center",
  filter: "brightness(90%)",
  marginTop: "15px",
};

const foodItems = [
  {
    id: 1,
    name: "Classic Burger",
    info: "Juicy beef patty with lettuce, tomato, and pickles",
    ratingValue: 4,
    buyed: 245,
    price: 85,
    img: b1,
  },
  {
    id: 2,
    name: "Cheese Bacon Burger",
    info: "Delicious beef burger with cheese and bacon",
    ratingValue: 4.5,
    buyed: 312,
    price: 95,
    img: b2,
  },
  {
    id: 3,
    name: "Caramelized Onion Burger",
    info: "Mouth-watering beef burger with caramelized onions",
    ratingValue: 4.2,
    buyed: 278,
    price: 90,
    img: b3,
  },
  {
    id: 4,
    name: "Special Sauce Burger",
    info: "Succulent beef patty with special sauce and grilled onions",
    ratingValue: 4.3,
    buyed: 291,
    price: 92,
    img: b4,
  },
  {
    id: 5,
    name: "Mushroom Swiss Burger",
    info: "Irresistible beef burger with mushrooms and Swiss cheese",
    ratingValue: 4.4,
    buyed: 299,
    price: 94,
    img: b5,
  },
  {
    id: 6,
    name: "Spicy Jalapeno Burger",
    info: "Savory beef patty with jalapenos and spicy sauce",
    ratingValue: 4.1,
    buyed: 268,
    price: 89,
    img: b1,
  },
  {
    id: 7,
    name: "Avocado Cilantro Burger",
    info: "Flavorful beef burger with avocado and cilantro",
    ratingValue: 4.7,
    buyed: 342,
    price: 98,
    img: b3,
  },
  {
    id: 8,
    name: "Barbecue Onion Burger",
    info: "Tender beef patty with barbecue sauce and onion rings",
    ratingValue: 4.6,
    buyed: 329,
    price: 96,
    img: b3,
  },
  {
    id: 9,
    name: "Egg Bacon Burger",
    info: "Hearty beef burger with fried egg and bacon",
    ratingValue: 4.8,
    buyed: 355,
    price: 100,
    img: b5,
  },
  {
    id: 10,
    name: "Blue Cheese Arugula Burger",
    info: "Deluxe beef patty with blue cheese and arugula",
    ratingValue: 4.9,
    buyed: 368,
    price: 105,
    img: b2,
  },
  {
    id: 11,
    name: "Egg Bacon Burger",
    info: "Hearty beef burger with fried egg and bacon",
    ratingValue: 4.8,
    buyed: 355,
    price: 100,
    img: b5,
  },
  {
    id: 12,
    name: "Blue Cheese Arugula Burger",
    info: "Deluxe beef patty with blue cheese and arugula",
    ratingValue: 4.9,
    buyed: 368,
    price: 105,
    img: b2,
  },
];

function Dishes() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (foodItem) => {
    if (isLoggedIn) {
      addToCart(foodItem);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
    <FirstBox>
      <StyledTypo variant="h2" fontWeight={600}>
        Dishes You Love
      </StyledTypo>
      <StyledTypo variant="body1">Dishes You Love</StyledTypo>
      <StyledTypo variant="h6">
        Dishes You have make you unfottable
      </StyledTypo>
    </FirstBox>
    <MainBox>
      {foodItems.map((foodItem, index) => (
        <Box key={index} data-aos="fade-in" data-aos-delay={`${index * 100}`}>
          <StyledCard>
            <CardMedia
              component="img"
              src={foodItem.img}
              alt={`Burger ${index + 1}`}
              style={StyledImg}
              className="immo"
            />
            <StyledCardBox>
              <StyledTypo variant="h5" fontWeight={600}>
                {foodItem.name}
              </StyledTypo>
              <StyledTypo variant="subtitle2" color="#3b3b3b">
                {foodItem.info}
              </StyledTypo>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Rating
                  value={foodItem.ratingValue}
                  readOnly
                  style={{ fontSize: "15px" }}
                />{" "}
                <StyledTypo style={{ fontSize: "12px" }}>
                  ({foodItem.buyed})
                </StyledTypo>
              </Box>
              <StyledTypo variant="body1" fontWeight={600}>
                <span style={{ fontSize: "12px" }}>price:</span>{" "}
                {foodItem.price}/-
              </StyledTypo>
              <StyledTypo variant="body1" color="#086e02" fontWeight={600}>
                Free Delivery!
              </StyledTypo>
              <Accordion
                sx={{
                  background: "transparent",
                  border: 0,
                  boxShadow: 0,
                  width: 220,
                  padding: 0,
                  marginTop: 1,
                  fontFamily: "Rubik, sans-serif",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <StyledTypo variant="body1">Show more..</StyledTypo>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledTypo variant="subtitle2">
                    very tasty item.{" "}
                  </StyledTypo>
                </AccordionDetails>
              </Accordion>
            </StyledCardBox>
            <CardActions
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <StyledButton onClick={() => handleAddToCart(foodItem)}>
                Add to Cart
              </StyledButton>
            </CardActions>
          </StyledCard>
        </Box>
      ))}
     
    </MainBox>
    <Modal  open={showModal} onClose={()=> setShowModal(false)}>
      <Fade in={showModal}>
        <StyledBox>
          <img src={ErImg} alt="eror" style={{width:200}} />
          <Typography variant="h2" fontWeight={600} data-aos="fade-down" data-aos-delay="100" data-aos-duration="200" >
            Oops.!
          </Typography>
          <Typography variant="h5" fontWeight={600} data-aos="fade-down" data-aos-delay="200" data-aos-duration="200">
            Login to Add item to Cart
          </Typography>
          <StyledButton onClick={()=>navigate("/login")} >
            Login
          </StyledButton>
        </StyledBox>
      </Fade>
    </Modal>
  </>
);
}

export default Dishes;
