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
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { BlogFormSchema, BlogFormSchemaType } from "../schema";
import { IBlogDetail } from "@/lib/types";
import { generateHTML } from "@tiptap/html";
import {
  Editor,
  EditorBubble,
  EditorBubbleItem,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorContent,
  EditorRoot,
  defaultEditorProps,
} from "novel";
import { defaultExtensions } from "@/components/extensions";
import { slashCommand, suggestionItems } from "@/components/slash-command";
import { Separator } from "@/components/ui/separator";
import { NodeSelector } from "@/components/selectors/node-selector";
import { LinkSelector } from "@/components/selectors/link-selector";
import { TextButtons } from "@/components/selectors/text-buttons";
import { ColorSelector } from "@/components/selectors/color-selector";

export default function BlogForm({
  onHandleSubmit,
  blog,
}: {
  onHandleSubmit: (data: BlogFormSchemaType) => void;
  blog?: IBlogDetail;
}) {
  const [isPreview, setPreview] = useState(false);
  const form = useForm<z.infer<typeof BlogFormSchema>>({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      image_url: blog?.image_url || "",
      content: blog?.blog_content?.content || "",
      is_published: blog?.is_published || true,
    },
  });

  function onSubmit(data: z.infer<typeof BlogFormSchema>) {
    onHandleSubmit(data);
  }

  const extensions = [...defaultExtensions, slashCommand];
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

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
                  {/* <Textarea
                    placeholder="title "
                    {...field}
                    autoFocus
                    className={cn(
                      "border-none text-lg font-medium leading-relaxed resized-none h-full",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  /> */}
                  {/* <Editor
                    {...field}
                    onUpdate={(editor) => {
                      form.setValue("content", editor?.getHTML() || "");
                    }}
                    className={cn(
                      "border-none text-lg font-medium w-full lg:w-1/2",
                      isPreview ? "hidden p-0" : "block"
                    )}
                  /> */}
                  {/* <TailwindEditor /> */}
                  <EditorRoot>
                    <EditorContent
                      {...field}
                      onUpdate={({ editor }) => {
                        form.setValue("content", editor.getHTML());
                      }}
                      extensions={extensions}
                      editorProps={{
                        ...defaultEditorProps,
                        attributes: {
                          class: `prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
                        },
                      }}
                      className={cn(
                        "border-none text-lg font-medium w-full lg:w-1/2",
                        isPreview ? "hidden p-0" : "block"
                      )}
                    >
                      <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                        <EditorCommandEmpty className="px-2 text-muted-foreground">
                          No results
                        </EditorCommandEmpty>
                        {suggestionItems.map((item) => (
                          <EditorCommandItem
                            value={item.title}
                            onCommand={(val) => item.command?.(val)}
                            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                            key={item.title}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                              {item.icon}
                            </div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </EditorCommandItem>
                        ))}
                      </EditorCommand>
                      <EditorBubble
                        tippyOptions={{
                          placement: "top",
                        }}
                        className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-red-500 shadow-xl"
                      >
                        <Separator orientation="vertical" />
                        <NodeSelector
                          open={openNode}
                          onOpenChange={setOpenNode}
                        />
                        <Separator orientation="vertical" />

                        <LinkSelector
                          open={openLink}
                          onOpenChange={setOpenLink}
                        />
                        <Separator orientation="vertical" />
                        <TextButtons />
                        <Separator orientation="vertical" />
                        <ColorSelector
                          open={openColor}
                          onOpenChange={setOpenColor}
                        />
                      </EditorBubble>
                    </EditorContent>
                  </EditorRoot>

                  <div
                    className={cn(
                      "overflow-y-auto mx-auto w-full lg:w-4/5 ",
                      isPreview ? "block" : " w-1/2 lg:block hidden"
                    )}
                  >
                    {/* <MarkdownPreview content={form.getValues().content} /> */}
                    <div
                      className="wysiwyg wysiwyg-slate wysiwyg-invert"
                      dangerouslySetInnerHTML={{
                        __html: form.getValues().content,
                      }}
                    ></div>
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
