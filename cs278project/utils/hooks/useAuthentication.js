// import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app, firebase } from "../../config/firebase"; // Ensure the path is correct
// // import firebase from "../../config/firebase"; // Assuming you've a firebase file where you export the initialized app.

// // const auth = getAuth(app);

// export function useAuthentication() {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // const unsubscribeFromAuthStatusChanged = onAuthStateChanged(
//     //   auth,
//     //   (user) => {
//     //     if (user) {
//     //       setUser(user);
//     //     } else {
//     //       setUser(undefined);
//     //     }
//     //     setIsLoading(false); // Set loading to false after handling the auth state.
//     //   }
//     // );

//     // return unsubscribeFromAuthStatusChanged;
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       setUser(user);
//       setIsLoading(false);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   return {
//     user,
//     isLoading,
//   };
// }

// export default useAuthentication;

import { useState, useEffect } from "react";
import firebase from "../../config/firebase"; // Assuming you've a firebase file where you export the initialized app.

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};
