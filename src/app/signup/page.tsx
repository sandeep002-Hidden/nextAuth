"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function SignUpPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);
  const verifyEmail = (regX: RegExp, email: String) => {
    if (email.match(regX)) {
      return true;
    } else {
      setMessage("Invalid Email id");
      return false;
    }
  };
  const verifyPass = (regX: RegExp, password: String) => {
    if (password.match(regX)) {
      return true;
    } else {
      setMessage("invalid Password");
      return false;
    }
  };
  const onSignUp = async () => {
    if (buttonDisable === true) {
      alert("Fill the form to signup");
    } else {
      try {
        setLoading(true);
        const emailRegX: RegExp =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        const passwordRegX: RegExp =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

        if (
          verifyEmail(emailRegX, user.email) &&
          verifyPass(passwordRegX, user.password)
        ) {
          const response = await axios.post("/api/users/signup", user);
          router.push("/login");
        }
      } catch (error: any) {
        console.log("Error occur on SignUp f");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-black flex justify-center items-center">
        <div className="flex justify-center items-center flex-col border border-white  rounded-2xl p-2">
          {" "}
          <h1 className="text-white text-2xl">
            {loading ? "Processing" : "SignUp"}
          </h1>
          <h1 className="text-white">{message}</h1>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="UserName"
            className=" block h-6 p-4 m-4 border border-white rounded-lg font-semibold text-sm"
          />
          <label htmlFor="email"></label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="email"
            className=" block h-6 p-4 m-4 border border-white rounded-lg font-semibold text-sm"
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="password"
            className=" block h-6 p-4 m-4 border border-white rounded-lg font-semibold text-sm"
          />
          <button
            className=" border-2 border-white text-white text-sm  rounded-lg p-2  mx-6 block"
            onClick={onSignUp}
          >
            {buttonDisable ? "fill the form to SignUp" : "SignUp"}
          </button>
          <p className="text-white m-4">
            Already have an Account?
            <Link className=" text-purple-400" href="/login">
              Go for Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
}
