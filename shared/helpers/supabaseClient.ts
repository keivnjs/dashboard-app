import { createClient, SupabaseClientOptions } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from "../utils/constants";

export const getSupabase = (accessToken: string) => {
  if (!NEXT_PUBLIC_SUPABASE_URL)
    throw new Error("Missing env.NEXT_APP_SUPABASE_URL");

  if (!NEXT_PUBLIC_SUPABASE_ANON_KEY)
    throw new Error("Missing env.NEXT_APP_SUPABASE_ANON_KEY");

  const options: SupabaseClientOptions<"public"> = {};

  if (accessToken) {
    options.global = {
      headers: {
        // This gives Supabase information about the user (wallet) making the request
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
  );

  return supabase;
};
