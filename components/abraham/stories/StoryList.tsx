import React from "react";
import Image from "next/image";
import { StoryItem } from "@/types";
import Story from "./Story";

export default function StoryList({ stories }: { stories: StoryItem[] }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="border-x ">
        {stories.map((story, index) => (
          <Story key={index} story={story} />
        ))}
      </div>
    </div>
  );
}
