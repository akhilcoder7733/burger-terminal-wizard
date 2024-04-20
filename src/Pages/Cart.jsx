import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/system";
import { useCart } from "../CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import StyledButton from "../Components/StyledButton";
import { useNavigate } from "react-router-dom";
import NotImage from '../assets/svg/undraw_empty_cart_co35.svg'

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  width: "100%",
  backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  display: "flex",
  justifyContent: "center",
}));

const NotBox = styled(Box)(({ theme }) => ({
  minHeight: "50vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems:"center",
  flexDirection:"column",
  marginTop:"30px"
}));

const StyledImg = {
  width: 50,
  height: 50,
  borderRadius: "5px",
  marginRight: "20px",
};

const QuantityBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const QuantityButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
}));

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState({});
  const [totalPriceAll, setTotalPriceAll] = useState(0);

  useEffect(() => {
    let totalPrices = {};
    cartItems.forEach((item) => {
      totalPrices[item.id] = item.price * (quantity[item.id] || 1);
    });
    setTotalPrice(totalPrices);
  }, [cartItems, quantity]);

  useEffect(() => {
    let sum = Object.values(totalPrice).reduce((acc, curr) => acc + curr, 0);
    setTotalPriceAll(sum);
  }, [totalPrice]);

  // Scroll to top when cartItems change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cartItems]);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantity({ ...quantity, [itemId]: newQuantity });
  };

  return (
    <MainBox>
      {cartItems.length > 0 ? (
        <TableContainer sx={{ width: 1000, marginTop: "100px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl No.</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img src={item.img} alt={item.name} style={StyledImg} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <QuantityBox>
                      <QuantityButton
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            quantity[item.id] ? quantity[item.id] - 1 : 0
                          )
                        }
                      >
                        -
                      </QuantityButton>
                      <Typography>{quantity[item.id] || 1}</Typography>
                      <QuantityButton
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            quantity[item.id] ? quantity[item.id] + 1 : 2
                          )
                        }
                      >
                        +
                      </QuantityButton>
                    </QuantityBox>
                  </TableCell>
                  <TableCell>{item.price}/-</TableCell>
                  <TableCell>{totalPrice[item.id]}/-</TableCell>
                  <TableCell>
                    <Tooltip title="Remove from Cart" placement="right">
                    <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table>
            <TableRow>
              <TableCell sx={{ width: 710 }}>Total price</TableCell>

              <TableCell>{totalPriceAll}/-</TableCell>
            </TableRow>
          </Table>
        <StyledButton sx={{width:"100%", marginTop:"20px"}} onClick={()=>navigate("/checkout")}>
          Proceed to Checkout
        </StyledButton>
        <StyledButton sx={{width:"100%", marginTop:"20px", backgroundColor:"#499638"}} onClick={()=>navigate("/dishes")}>
          Add more Items
        </StyledButton>
        </TableContainer>
      ) : (
      <NotBox>
        <img src={NotImage} alt="nocart"  style={{width:300, }} data-aos="fade-down" data-aos-delay="100" data-aos-duration="100"/>
          <Typography variant="h2" data-aos="fade-down" data-aos-delay="100">oops..!</Typography>
          <Typography variant="h5" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
          Your cart is empty
        </Typography>
        
        <StyledButton sx={{marginTop:"10px"}} onClick={()=>navigate("/dishes")}>
          Select Items
        </StyledButton>
      </NotBox>
      )}
    </MainBox>
  );
}

export default Cart;
