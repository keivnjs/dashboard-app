"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function LoginForm() {
  //   const [email, setEmail] = useState("");
  //   const supabaseClient = useSupabaseClient();

  //   const handleLogin = async (email: string) => {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabaseClient.auth.signInWithOtp({
  //       email,
  //       options: {
  //         emailRedirectTo: process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL,
  //       },
  //     });
  //   };

  return <Button variant="outline">Login</Button>;
}
