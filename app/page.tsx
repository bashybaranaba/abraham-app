"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryList from "@/components/abraham/stories/StoryList";

export default function Home() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    axios.get("/api/artlabproxy/stories").then((res) => {
      setStories(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <div className=" flex flex-col items-center justify-center w-full">
          <StoryList stories={stories || []} />
        </div>
      </div>
    </>
  );
}
