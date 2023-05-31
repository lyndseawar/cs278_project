import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../config/firebase"; // Ensure the path is correct

const auth = getAuth(app);

export function useAuthentication() {
  const [user, setUser] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
        setIsLoading(false); // Set loading to false after handling the auth state.
      }
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    isLoading,
  };
}
