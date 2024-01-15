"use client";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { Database } from "@/lib/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState, useTransition } from "react";
import { BlogContentLoading } from "./Skeleton";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/shared/utils/constants";

export default function Content({ blogId }: { blogId: string }) {
  const [loading, setLoading] = useState(true);

  const [blog, setBlog] = useState<{
    blog_id: string;
    content: string;
    created_at: string;
  } | null>();

  const supabase = createBrowserClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const readBlogContent = async () => {
    const { data } = await supabase
      .from("blog_content")
      .select("*")
      .eq("blog_id", blogId)
      .single();
    setBlog(data);
    setLoading(false);
  };

  useEffect(() => {
    readBlogContent();

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <BlogContentLoading />;
  }

  return <MarkdownPreview content={blog?.content || ""} />;
}
