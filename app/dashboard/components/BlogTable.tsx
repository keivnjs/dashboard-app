import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function BlogTable() {
  return (
    <>
      <div className="rounded-md border-[0.5px] overflow-y-scroll ">
        <div className="w-[800px] md:w-full">
          <div className="grid grid-cols-5 border-b p-5 dark:text-gray-500">
            <h1 className=" col-span-2">Title</h1>
            <h1>Publish</h1>
          </div>
          <div className="grid grid-cols-5 border-b p-5">
            <h1 className=" col-span-2">Title</h1>
            <h1>Title</h1>
            <Actions />
          </div>
        </div>
      </div>
    </>
  );
}

const Actions = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/blog/`}>
        <Button className="flex gap-2 items-center" variant="outline">
          <EyeOpenIcon />
          View
        </Button>
      </Link>

      <Link href={`/blog/`}>
        <Button className="flex gap-2 items-center" variant="outline">
          <TrashIcon />
          Delete
        </Button>
      </Link>

      <Link href={`/dashboard/blog/edit/`}>
        <Button className="flex gap-2 items-center" variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      </Link>
    </div>
  );
};
