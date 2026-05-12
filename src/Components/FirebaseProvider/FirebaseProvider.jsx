import PropTypes from "prop-types";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import auth from "../../Firebase/firbaseConfig";
import axios from "axios";
import AuthContext from "./AuthContext";

// social auth provider

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   create user

  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (credential) => {
        if (displayName || photoURL) {
          await updateProfile(credential.user, {
            displayName,
            photoURL,
          });
        }

        return credential;
      }
    );
  };

  //   update user profile
  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  //   sign in user

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google login

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //   github login

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // twitter login
  const twitterLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, twitterProvider);
  };

  //   logout
  const logout = () => {
    setLoading(true);
    setUser(null);
    return signOut(auth);
  };

  //observer

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const loggedUser = { email: currentUser?.email || null };
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        axios
          .post(
            "https://assignment-11-server-umber-nine.vercel.app/jwt",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .catch((error) => {
            console.error("Token sync failed:", error);
          });
      } else {
        axios
          .post(
            "https://assignment-11-server-umber-nine.vercel.app/logout",
            loggedUser,
            {
              withCredentials: true,
            }
          )
          .catch((error) => {
            console.error("Logout sync failed:", error);
          });
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const allValues = {
    createUser,
    signInUser,
    googleLogin,
    githubLogin,
    logout,
    user,
    updateUserProfile,
    twitterLogin,
    loading,
  };

  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};

export default FirebaseProvider;
