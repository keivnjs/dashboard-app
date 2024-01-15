"use client";

import React, { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useUser } from "@/lib/store/user";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/shared/utils/constants";

export default function Sessionprovider() {
  const setUser = useUser((state) => state.setUser);

  const supabase = createBrowserClient(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const readSession = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user);
  };

  useEffect(() => {
    readSession();
    // eslint-disable-next-line
  }, []);
  return <></>;
}
