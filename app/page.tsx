"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const Home: React.FC = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([{ content }]);
      if (error) {
        throw error;
      }
      console.log("Post saved:", data);
      // Optionally, you can redirect the user to a different page after successful save
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
      <button onClick={handleSave}>Save Post</button>
    </div>
  );
};

export default Home;
