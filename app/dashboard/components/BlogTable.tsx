import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { readBlogAdmin, updateBlogById } from "@/lib/actions/blog";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import DeleteAlert from "./DeleteAlert";
import SwitchForm from "./SwitchForm";
import { BlogFormSchemaType } from "../schema";

export default async function BlogTable() {
  const { data: blogs } = await readBlogAdmin();

  return (
    <>
      <div className="rounded-md border-[0.5px] overflow-y-scroll ">
        <div className="w-[800px] md:w-full">
          <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
            <h1 className=" col-span-2">Title</h1>
            <h1>Publish</h1>
          </div>

          {blogs?.map((blog, index) => {
            const updatePulished = updateBlogById.bind(null, blog.id, {
              is_published: !blog.is_published,
            } as BlogFormSchemaType);

            return (
              <div className="grid grid-cols-5 p-5" key={index}>
                <h1 className="col-span-2">{blog.title}</h1>
                <SwitchForm
                  checked={blog.is_published}
                  name="publish"
                  onToggle={updatePulished}
                />
                <Actions id={blog.id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const Actions = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/blog/`}>
        <Button className="flex gap-2 items-center" variant="outline">
          <EyeOpenIcon />
          View
        </Button>
      </Link>

      <DeleteAlert blogId={id} />

      <Link href={"/dashboard/blog/edit/" + id}>
        <Button className="flex gap-2 items-center" variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      </Link>
    </div>
  );
};
