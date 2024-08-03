"use client";

import Loading from "../components/loding";
import { useState, useEffect } from "react";
import axios from "axios";

export default function changePassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  
  useEffect(() => {
    if (userEmail.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [userEmail]);

  const VerifyEmail = async () => {
    setLoading(true);
    try {
      if (!buttonDisable) {
        await axios.post("/api/users/checkUser", { email: userEmail }).then((a)=>{
          setMessage(a.data.message)
          if(a.data.success){
            setFailure(false)
            setSuccess(true)
            setLoading(false)
          }
          else{
            setSuccess(false)
            setFailure(true)
            setLoading(false)
          }
        })
      } else {
        setMessage("Enter Your Email");
      }
    } catch (error: any) {
      console.log(error.message);
      setFailure(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-center items-center min-h-screen flex-1 flex-col">
          {loading && <Loading />}
          <h1 className="text-white">{message}</h1>
          <div
            className={`border-2 rounded-2xl p-4 flex justify-center items-center flex-col ${
              success ? "border-green-500 border-2" : ""
            } ${failure ? "border-red-500" : ""} ${
              buttonDisable ? `border-amber-400` : ``
            }`}
          >
            <input
              type="email"
              placeholder={"Enter Your Email" || userEmail}
              className="block h-6 p-4 m-4 border-2 text-white border-white  rounded-lg font-semibold text-sm"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            <button
              className={`border-2 rounded-lg p-2 border-white `}
              onClick={VerifyEmail}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
