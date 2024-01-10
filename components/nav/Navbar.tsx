import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import LoginForm from "./LoginForm";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="group">
        <Link href="/" className="text-2xl font-bold">
          Blog
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-orange-500"></div>
      </div>
      <LoginForm />
    </nav>
  );
}
