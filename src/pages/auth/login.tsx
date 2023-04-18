import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import UserDash from "../userdashboard/dashboard";

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import Link from "next/link";

const firebaseConfig = {
  // Config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const currentUser = auth.currentUser;

const provider = new GoogleAuthProvider();

const Login = () => {
  const [value, setValue] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  const handleLogout = () => {
    // Clear user data from LocalStorage and log out
    localStorage.clear();
    sessionStorage.clear();
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
    setLoggedin(false);
    // Add additional cleanup code here
    window.location.href = "/";
  };

  const handleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      if (data.user.email) {
        setValue(data.user.email);
        localStorage.setItem("email", data.user.email);
        sessionStorage.setItem("email", data.user.email);
        sessionStorage.setItem("uid", data.user.uid);
        window.location.href = "/";
      } else {
        console.log("Error, no matched user email");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const checkCredValid = () => {
  //   const currentUser = auth.currentUser;
  //   console.log(currentUser);
  //   if (currentUser !== null) {
  //     setLoggedin(true);
  //     const userEmail = currentUser.email;
  //     console.log(userEmail);
  //     const userid = currentUser.uid;
  //     console.log(userid);
  //     if (
  //       sessionStorage.getItem("email") == userEmail &&
  //       sessionStorage.getItem("uid") == userid
  //     ) {
  //       console.log("User Valid");
  //       return true;
  //     } else {
  //       console.log("User Not Valid");
  //       return false;
  //     }
  //   } else {
  //     console.log("No current user");
  //     setLoggedin(false);
  //     console.log(currentUser);
  //   }
  // };
  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const sessionuid = sessionStorage.getItem("uid");
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setValue(email!);
        setCurrentUserEmail(currentUser.email ?? "");
        setLoggedin(true);
      } else {
        console.log("Your login details are missing.");
        // console.log(currentUser);
        setLoggedin(false);
      }
    });
  }, []);

  // console.log(loggedin);
  interface FormValues {
    name: string;
    position: string;
    isJobSeeker: boolean;
    uid: string;
  }

  return (
    <>
      {loggedin ? (
        <div className="min-h-screen min-w-screen bg-white text-white text-center">
          <div className="text-black"> User Account: {currentUserEmail}</div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-violet-400 to-blue-400 px-2 text-[20px] font-semibold rounded-lg"
          >
            Logout
          </button>
          <div className="flex justify-center text-black p-2">
            <UserDash />
          </div>
        </div>
      ) : (
        <div className="min-h-screen min-w-screen bg-white text-white text-center">
          <p className="text-black">Job Seeker Login</p>
          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-violet-400 to-blue-400 px-2 text-[20px] font-semibold rounded-lg"
          >
            Login with Google
          </button>
          <p className="text-black mt-5">Recruiter Login</p>
          <Link
            href="/auth/recruiter_login"
            className="text-black bg-gradient-to-r from-violet-400 to-blue-400 px-2 py-1 text-[20px] font-semibold rounded-lg text-white"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Login;
