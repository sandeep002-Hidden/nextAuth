"use client"
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import React from "react";
import Link from "next/link";
import { Switch } from '@nextui-org/react';
import { MoonIcon } from "../components/moonIcon";
import { SunIcon } from "../components/sunIcon";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        Dashboard
        <h1><Link href={"/profile"}>Go to Profile page</Link></h1>
      </div>
      <Footer />
    </>
  );
}
