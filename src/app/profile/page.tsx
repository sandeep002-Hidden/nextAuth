"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Sidebar from "@/app/components/sidebar";
export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  useEffect(() => {
    const userDetails = async () => {
      await axios.get("/api/users/me").then((user) => {
        setUser({
          username: user.data.data.username,
          email: user.data.data.email,
        });
      });
    };
    userDetails();
  }, []);

  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in logout", error.message);
    }
  };
  return (
    <>
      <div>
        <Header />
        <div className="min-h-screen flex justify-start items-start">
          <Sidebar/>
          <div>
            <div>Profile Page</div>
            <div>{user.email}</div>
            <div>{user.username}</div>
            <div>
              <button
                onClick={onLogout}
                className="border-2 border-white p-2 rounded-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
