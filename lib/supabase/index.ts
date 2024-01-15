"use server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  SERVICE_ROLE,
} from "@/shared/utils/constants";

export async function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function createSupbaseAdmin() {
  return createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, SERVICE_ROLE!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function fetchCacheSupabase(query: string) {
  const cookieStore = cookies();

  const authToken = cookieStore.get(
    "sb-yymdoqdtmbfsrfydgfef-auth-token"
  )?.value;

  let headers = {};
  if (authToken) {
    const { access_token } = JSON.parse(authToken);
    headers = {
      Authorization: `Bearer ${access_token}`,
    };
  }

  const res = await fetch(NEXT_PUBLIC_SUPABASE_URL! + "/rest/v1/" + query, {
    headers: {
      apikey: NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      ...headers,
    },
    cache: "force-cache",
  });
  return await res.json();
}
