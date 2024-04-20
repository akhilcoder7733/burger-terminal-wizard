import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // Add profilePictureUrl state
  const [currentUserUid, setCurrentUserUid] = useState(null); // Add currentUserUid state

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profilePictureUrl,
        setProfilePictureUrl,
        currentUserUid,
        setCurrentUserUid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
