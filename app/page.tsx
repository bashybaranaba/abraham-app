"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import StoryList from "@/components/abraham/stories/StoryList";
import AccountMenu from "@/components/account/AccountMenu";

export default function Home() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("/api/artlabproxy/stories").then((res) => {
      setStories(res.data);
      console.log("Stories:", res.data);
    });
  }, []);

  return (
    <>
      <div>
        <div className="fixed top-0 right-0">
          <AccountMenu />
        </div>
        <div className=" flex flex-col items-center justify-center w-full">
          <StoryList stories={stories || []} />
        </div>
      </div>
    </>
  );
}
