import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  // Config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const recruiterSignup = () => {
  const emailInput = document.getElementById(
    "recruiterEmail"
  ) as HTMLInputElement;
  const passwordInput = document.getElementById(
    "recruiterPassword"
  ) as HTMLInputElement;
  //   console.log(emailInput.value); // debug statement
  //   console.log(passwordInput.value); // debug statement
  if (emailInput.value != "" && passwordInput.value != "") {
    console.log("success");
    const email = emailInput.value;
    const password = passwordInput.value;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // console.log(userCredential);
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        // console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  } else {
    console.log("No email or password input");
  }
};

const signIn = () => {
  const emailInput = document.getElementById("login_email") as HTMLInputElement;
  const passwordInput = document.getElementById(
    "login_password"
  ) as HTMLInputElement;
  if (emailInput.value != "" && passwordInput.value != "") {
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        sessionStorage.setItem("email", email);
        sessionStorage.setItem("usertype", "recruiter");

        // console.log(user);
        window.location.href = "/";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  } else {
    console.log("error");
  }
};

const RecruiterLogin = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-white text-black p-20 flex flex-row">
      <div>
        Recruiter Sign Up
        <form className="flex flex-col w-[250px]">
          <label>Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="company"
            className="bg-slate-200 rounded-lg mr-2"
            value={companyName}
            onChange={(e) => setCompanyname(e.target.value)}
          />
          <label>Recruiter&apos;s Name:</label>
          <input
            type="text"
            id="recruiterName"
            name="recruiter"
            className="bg-slate-200 rounded-lg mr-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Recruiter&apos;s Email:</label>
          <input
            type="text"
            id="recruiterEmail"
            name="recruit_email"
            className="bg-slate-200 rounded-lg mr-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Recruiter&apos;s Password:</label>
          <input
            type="password"
            id="recruiterPassword"
            name="recruit_password"
            className="bg-slate-200 rounded-lg mr-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            id="signInButton"
            onClick={recruiterSignup}
            className="bg-gradient-to-r from-red-300 to-blue-400 w-[150px] rounded-lg text-white font-semibold mt-2"
          >
            SignUp
          </button>
        </form>
      </div>

      <div className="ml-10 flex flex-col">
        If you already have an account...
        <form className="flex flex-col">
          <label>Email</label>
          <input
            type="text"
            id="login_email"
            className="bg-slate-200 rounded-lg mr-2"
          />
          <label>Password</label>
          <input
            type="password"
            id="login_password"
            className="bg-slate-200 rounded-lg mr-2"
          />
        </form>
        <button
          type="submit"
          className="bg-gradient-to-r from-red-300 to-blue-400 w-[150px] rounded-lg text-white font-semibold mt-2"
          onClick={signIn}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RecruiterLogin;
function preventDefault() {
  throw new Error("Function not implemented.");
}
