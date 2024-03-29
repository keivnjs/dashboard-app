"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { SiGithub } from "react-icons/si";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/shared/utils/constants";

export default function LoginForm() {
  const pathname = usePathname();
  const supabase = createBrowserClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleLogin}
    >
      <SiGithub />
      Login
    </Button>
  );
}
