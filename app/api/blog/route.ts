import { Database } from "@/lib/types/supabase";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/shared/utils/constants";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const supabase = createClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id === "*") {
    const result = await supabase.from("blog").select("id").limit(10);
    return Response.json({ ...result });
  } else if (id) {
    const result = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .single();
    return Response.json({ ...result });
  }
  return Response.json({});
}
