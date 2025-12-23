// C:\Users\RIHAN\Desktop\dealers - web\src\contexts\AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/index.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // Firestore user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userData
            };
            
            setUser(firebaseUser);
            setUserProfile(userData);
            setIsAuthenticated(true);
            
            // Store in localStorage for persistence
            localStorage.setItem("user", JSON.stringify(fullUserData));
          } else {
            // User exists in auth but not in Firestore
            console.warn("User document not found in Firestore");
            await signOut(auth);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        // User is signed out
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // 🔐 LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: "Please enter a valid email address" };
      }

      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      
      if (!userDoc.exists()) {
        await signOut(auth);
        return { 
          success: false, 
          message: "Account not found. Please contact administrator." 
        };
      }

      const userData = userDoc.data();
      
      // Check if user is active
      if (userData.is_active === false) {
        await signOut(auth);
        return { 
          success: false, 
          message: "Account is deactivated. Please contact administrator." 
        };
      }

      const fullUserData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...userData
      };

      return { 
        success: true, 
        user: fullUserData,
        role: userData.role 
      };

    } catch (error) {
      console.error("Login error:", error);
      
      let message = "Login failed. Please try again.";
      switch (error.code) {
        case "auth/user-not-found":
          message = "No account found with this email.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password.";
          break;
        case "auth/too-many-requests":
          message = "Too many failed attempts. Please try again later.";
          break;
        case "auth/user-disabled":
          message = "Account has been disabled.";
          break;
      }
      
      return { success: false, message };
    }
  };

  // 📝 REGISTER FUNCTION (for dealers)
  const register = async (userData) => {
    try {
      const { email, password, name, phone, business_name, nic_number } = userData;

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, message: "Invalid email format" };
      }

      // Check if email already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        return { success: false, message: "Email already registered" };
      }

      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const userDocData = {
        email: email,
        name: name,
        phone: phone,
        nic_number: nic_number,
        business_name: business_name,
        role: "dealer", // Default role for registration
        is_verified: false,
        is_active: true,
        credit_limit: 0,
        used_credit: 0,
        created_at: new Date().toISOString()
      };

      await setDoc(doc(db, "users", firebaseUser.uid), userDocData);

      return { 
        success: true, 
        userId: firebaseUser.uid,
        user: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userDocData
        }
      };

    } catch (error) {
      console.error("Registration error:", error);
      
      let message = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        message = "Email is already registered.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }
      
      return { success: false, message };
    }
  };

  // 🔓 LOGOUT FUNCTION
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 🔄 UPDATE PROFILE
  const updateProfile = async (updatedData) => {
    try {
      if (!user) {
        return { success: false, message: "No user logged in" };
      }

      await updateDoc(doc(db, "users", user.uid), updatedData);
      
      // Update local state
      const updatedUserProfile = { ...userProfile, ...updatedData };
      setUserProfile(updatedUserProfile);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({
        ...storedUser,
        ...updatedData
      }));

      return { success: true };
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, message: "Failed to update profile" };
    }
  };

  // 🔑 RESET PASSWORD
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "Password reset email sent!" };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, message: "Failed to send reset email" };
    }
  };

  const value = {
    user,
    userProfile,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};