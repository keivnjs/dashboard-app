import { readBlogDeatailById } from "@/lib/actions/blog";
import React from "react";
import EditForm from "./components/EditForm";

export default async function Edit({ params }: { params: { id: string } }) {
  const { data: blog } = await readBlogDeatailById(params.id);
  return <EditForm blog={blog} />;
}
