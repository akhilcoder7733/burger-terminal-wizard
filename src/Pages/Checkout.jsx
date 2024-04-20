import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Modal } from "@mui/material";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system'
import StyledButton from "../Components/StyledButton";
import Success from '../assets/svg/undraw_order_confirmed_re_g0if.svg'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {db} from '../Config'

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  backgroundImage: "linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  display: "flex",
  // justifyContent: "start",
  alignItems: "center",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(10),
  flexDirection:"column",
}));

const ItenBox = styled(Box)(({ theme }) => ({
  minHeight: "30vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(1),
  flexDirection:"column",
  padding:"15px",
  borderRadius:"15px",
  border:"1px solid #C2C1C1"
}));
const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexDirection:"column",
  
}));

const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 300,
    backgroundColor: "#fff",
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

function Checkout() {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [paymentOption, setPaymentOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [isError, setIsError] = useState(false); // State for form errors

  const handleNext = () => {
    if (activeStep === 1 && !isDeliveryDetailsValid()) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setIsError(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDeliveryDetailsChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const isDeliveryDetailsValid = () => {
    return (
      deliveryDetails.fullName !== "" &&
      deliveryDetails.address !== "" &&
      deliveryDetails.city !== "" &&
      deliveryDetails.zip !== "" &&
      deliveryDetails.country !== ""
    );
  };

  const steps = ["Item Details", "Delivery Details", "Payment"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
        return (
          <ItenBox>
            <Typography variant="h4" fontWeight={600}>Item Details Step</Typography>
            <Box>
              {cartItems.map((item) => (
                <Typography key={item.id}>
                  {item.name} - {item.price}/-
                </Typography>
              ))}
            </Box>
            <Typography>Total Price: {totalPrice}/-</Typography>
          </ItenBox>
        );
      case 1:
        return (
          <ItenBox>
            <Typography variant="h4" fontWeight={600}>Delivery Details Step</Typography>
            <FormControl fullWidth error={isError}>
              <FormBox>
              <TextField
                label="Full Name"
                name="fullName"
                value={deliveryDetails.fullName}
                onChange={handleDeliveryDetailsChange}
                required
              />
              <TextField
                label="Address"
                name="address"
                value={deliveryDetails.address}
                onChange={handleDeliveryDetailsChange}
                required
              />
              <TextField
                label="City"
                name="city"
                value={deliveryDetails.city}
                onChange={handleDeliveryDetailsChange}
                required
              />
              <TextField
                label="ZIP Code"
                name="zip"
                value={deliveryDetails.zip}
                onChange={handleDeliveryDetailsChange}
                required
              />
              <TextField
                label="Country"
                name="country"
                value={deliveryDetails.country}
                onChange={handleDeliveryDetailsChange}
                required
              />
              </FormBox>
            </FormControl>
          </ItenBox>
        );
      case 2:
        return (
          <ItenBox>
            <Typography>Payment Step</Typography>
            <FormControl fullWidth error={isError}>
              <InputLabel id="payment-option-label">Payment Option</InputLabel>
              <Select
                labelId="payment-option-label"
                value={paymentOption}
                onChange={handlePaymentOptionChange}
                required
              >
                <MenuItem value="credit-card">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
              </Select>
            </FormControl>
          </ItenBox>
        );
      default:
        return "Unknown step";
    }
  };

  const ordersCollection = collection(db, 'orders');

  const handleFinish = async () => {
    if (activeStep === 1 && !isDeliveryDetailsValid()) {
      setIsError(true);
      return;
    }
    setIsError(false);

    try {
      // Add order details to Firestore
      const orderDetails = {
        items: cartItems,
        deliveryDetails: deliveryDetails,
        paymentOption: paymentOption,
        timestamp: serverTimestamp()
      };
      const docRef = await addDoc(ordersCollection, orderDetails);
  
      // Clear the cartItems
      clearCart();
  
      setIsModalOpen(true); // Open the modal
      handleReset();
    } catch (error) {
      console.error('Error adding order: ', error);
    }
  };

  return (
    <MainBox >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box>
            <Box>{getStepContent(activeStep)}</Box>
            <Box sx={{ display:"flex", marginTop:"10px", gap:"10px"}}>
              <StyledButton disabled={activeStep === 0} onClick={handleBack}>
                Back
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                disabled={activeStep === 1 && !isDeliveryDetailsValid()}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </StyledButton>
            </Box>
          </Box>
        )}
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <StyledBox>
          <img src={Success} alt="succcess"  style={{width:"130px"}}/>
          <Typography variant="h3" fontWeight={600}>
            Hurrayy.!
          </Typography>
          <Typography variant="h5">
            Your Order is placed.
          </Typography>
          <StyledButton onClick={() => navigate("/")}>
            Explore more
          </StyledButton>
        </StyledBox>
      </Modal>
    </MainBox>
  );
}

export default Checkout;
