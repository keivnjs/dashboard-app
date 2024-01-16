import Image from "next/image";
import { IBlog } from "@/lib/types";
import Content from "./components/Content";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
  SITE_URL,
} from "@/shared/utils/constants";
import { headers } from "next/headers";
import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
// import Content from "./components/Content";

const supabase = createClient<Database>(
  NEXT_PUBLIC_SUPABASE_URL!,
  NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function generateStaticParams() {
  const result = await supabase.from("blog").select("id").limit(10);
  const data = result.data || [];

  return data.map((item) => ({ params: { id: item.id } }));
}

export default async function page({ params }: { params: { id: string } }) {
  const result = await supabase
    .from("blog")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!result.data?.id) {
    return <h1 className="text-white">Not found</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen  pt-10 space-y-10">
      <div className="sm:px-10 space-y-5">
        <h1 className=" text-3xl font-bold dark:text-gray-200">
          {result.data?.title}
        </h1>
        <p className="text-sm dark:text-gray-400">
          {new Date(result.data?.created_at!).toDateString()}
        </p>
      </div>

      <div className="w-full h-96 relative">
        <Image
          priority
          src={result.data?.image_url!}
          alt="cover"
          fill
          className=" object-cover object-center rounded-md border-[0.5px] border-zinc-600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <Content blogId={params.id} />
    </div>
  );
}
