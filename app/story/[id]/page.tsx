"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Story from "@/components/abraham/stories/Story";
import AccountMenu from "@/components/account/AccountMenu";
import { StoryItem } from "@/types";
import Blessings from "@/components/abraham/stories/Blessings";

export default function Home({ params }: { params: { id: string } }) {
  const [story, setStory] = useState<StoryItem | null>(null);

  useEffect(() => {
    //maybe change later to get a single story
    axios.get("/api/artlabproxy/stories").then((res) => {
      // filter story by id and return object
      const filteredStory: StoryItem | null =
        res.data.find((story: StoryItem) => {
          return story.id === params.id;
        }) || null;

      setStory(filteredStory);
      console.log("Story:", filteredStory);
    });
  }, []);

  return (
    <>
      <div>
        <div className="fixed top-0 right-0">
          <AccountMenu />
        </div>
        <div className=" flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex flex-col items-center justify-center  border-x ">
              <div>{story && <Story story={story} />}</div>
              <div>
                <Blessings blessings={story?.blessings || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
