import React, { useEffect, useState } from "react";
import { Box, Chip, Fade, Modal, Typography } from "@mui/material";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../Config"; // Import auth from Config.js
import { useAuth } from "../AuthContext"; // Import useAuth hook
import { styled } from "@mui/system";
import { BarLoader, ClipLoader } from "react-spinners";
import StyledButton from "../Components/StyledButton";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Helmet } from "react-helmet";

const MainBox = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  backgroundImage:"linear-gradient(90deg, #D3C5E5 0%, #735DA5 81%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: theme.spacing(2),
  paddingTop:theme.spacing(3)
}));

const ProfilePictureBox = styled(Box)(({ theme }) => ({
  width: 200,
  height: 200,
  backgroundColor: "red",
  borderRadius: "50%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  backgroundColor: "#fff",
  // border: '2px solid #000',
  boxShadow: 24,
  padding: theme.spacing(2),
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

function ProfilePage() {
  const { isLoggedIn, profilePictureUrl, setProfilePictureUrl, setCurrentUserUid } = useAuth();
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [open, setOpen] = useState(false);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [uploading, setUploading] = useState(false); // State to track upload status


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setCurrentUserUid(auth.currentUser.uid); // Set the currentUserUid in the context
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        try {
          // Get the document corresponding to the user's uid
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            // Set the user data in state
            setUserData(userDoc.data());
            setProfilePictureUrl(userDoc.data().profilePic); // Set the profile picture URL
          } else {
            console.log("Profile data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false); // Set loading to false after fetching user data
    };

    // Call the fetchUserData function if the user is logged in
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);
  

  if (loading) {
    return (
      <MainBox>
        <BarLoader color="#36d7b7" />
      </MainBox>
    );
  }

 

  const handleProfilePictureUpload = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);

    try {
      setUploading(true); 
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, selectedProfilePicture);

      // Get the download URL of the uploaded file
      const downloadUrl = await getDownloadURL(storageRef);

      // Update the user's document in Firestore with the profile picture URL
      const db = getFirestore();
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        profilePic: downloadUrl,
      });

      // Set the profile picture URL in state
      setProfilePictureUrl(downloadUrl);

      // Close the modal
      handleClose();
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setUploading(false); // Set uploading back to false
    }
  };

  return (
    <MainBox>
      <Helmet>
        <title>Terminal Wizard - Profile</title>
      </Helmet>
      {isLoggedIn && userData ? (
        <>
          <Typography variant="h5" gutterBottom>
            Stay Connected! <Chip label={userData.name} color="primary" />
          </Typography>
          <ProfilePictureBox>
            <img
              src={profilePictureUrl || userData.profilePic}
              alt="Profile"
              style={{ width: 200, height: 200, borderRadius: "50%" }}
            />
          </ProfilePictureBox>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
              {userData.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {userData.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: {userData.phone}
            </Typography>
            <StyledButton onClick={handleOpen}>Edit Profile</StyledButton>
          </Box>
        </>
      ) : (
        <Typography variant="body1" gutterBottom>
          Please log in to view your profile.
        </Typography>
      )}
<Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <StyledBox>
            <Typography variant="h5" fontWeight={600}>
              Edit Profile, <Chip label={userData.name} color="primary" />
            </Typography>
            <input
              type="file"
              onChange={(e) => setSelectedProfilePicture(e.target.files[0])}
            />
            <StyledButton onClick={handleProfilePictureUpload}>
            {uploading ? <ClipLoader color="#36d7b7" /> : "Change Profile Picture"}
            </StyledButton>
          </StyledBox>
        </Fade>
      </Modal>
    </MainBox>
  );
}

export default ProfilePage;
