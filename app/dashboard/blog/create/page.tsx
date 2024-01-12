"use client";

import React from "react";
import BlogForm from "../../components/BlogForm";
import { BlogFormSchemaType } from "../../schema";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createBlog } from "@/lib/actions/blog";

export default function page() {
  //   const router = useRouter();
  const onHandleSubmit = async (data: BlogFormSchemaType) => {
    const result = await createBlog(data);

    const { error } = JSON.parse(result);
    if (error?.message) {
      toast({
        title: "Fail to create a post 😢",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "Successfully create a post 🎉",
        description: data.title,
      });
    }
  };

  return <BlogForm onHandleSubmit={onHandleSubmit} />;
}
