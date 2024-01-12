"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeOpenIcon, Pencil1Icon, RocketIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { BlogFormSchema, BlogFormSchemaType } from "../schema";

export default function BlogForm({
  onHandleSubmit,
}: {
  onHandleSubmit: (data: BlogFormSchemaType) => void;
}) {
  const [isPreview, setPreview] = useState(false);
  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: "",
      image_url: "",
      content: "",
      is_published: true,
    },
  });

  function onSubmit(data: z.infer<typeof BlogFormSchema>) {
    onHandleSubmit(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full border rounded-md space-y-8 mt-4 pb-10"
      >
        <div className="p-5 flex items-center flex-wrap justify-between border-b gap-5">
          <div className="flex gap-5 items-center flex-wrap">
            <span
              role="button"
              tabIndex={0}
              className="flex items-center gap-1 border  p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all"
              onClick={() => setPreview(!isPreview)}
            >
              {isPreview ? (
                <>
                  <Pencil1Icon /> Edit
                </>
              ) : (
                <>
                  <EyeOpenIcon /> Preview
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border  p-2 rounded-md">
                      <RocketIcon />
                      <span>Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="flex items-center gap-1"
            disabled={!form.formState.isValid}
          >
            <BsSave />
            Save
          </Button>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full flex break-words p-2 gap-2",
                    isPreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="title "
                    {...field}
                    autoFocus
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : " w-1/2 lg:block hidden "
                    )}
                  >
                    <h1>{form.getValues().title}</h1>
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("title").invalid &&
                form.getValues().title && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full flex break-words p-2 gap-2",
                    isPreview ? "divide-x-0" : "divide-x"
                  )}
                >
                  <Input
                    placeholder="image url "
                    {...field}
                    autoFocus
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed focus:ring-1 ring-green-500",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "lg:px-10",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : " w-1/2 lg:block hidden "
                    )}
                  >
                    {isPreview ? (
                      <div className="w-full h-80 relative mt-10 border rounded-md">
                        <Image
                          src={form.getValues().image_url}
                          alt="preview"
                          fill
                          className=" object-cover object-center rounded-md"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-400">
                        Click on preview to see image
                      </p>
                    )}
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("image_url").invalid &&
                form.getValues().image_url && (
                  <div className="p-2">
                    <FormMessage />{" "}
                  </div>
                )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "w-full flex break-words p-2 gap-2",
                    isPreview ? "divide-x-0" : "divide-x h-70vh"
                  )}
                >
                  <Textarea
                    placeholder="title "
                    {...field}
                    autoFocus
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed resized-none h-full",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      " overflow-y-auto",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5 "
                        : " w-1/2 lg:block hidden "
                    )}
                  >
                    <MarkdownPreview content={form.getValues().content} />
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
