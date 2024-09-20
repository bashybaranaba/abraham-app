import React, { useState } from "react";
import Image from "next/image";
import { StoryItem } from "@/types";
import { FlameIcon } from "lucide-react";
import PraiseIcon from "@/components/customIcons/PraiseIcon";

export default function Story({ story }: { story: StoryItem }) {
  const [praisesCount, setPraisesCount] = useState(story.praises.length);
  const [burnsCount, setBurnsCount] = useState(story.burns.length);
  const [hasPraised, setHasPraised] = useState(
    story.praises.includes("test_user_1")
  );
  const [hasBurned, setHasBurned] = useState(
    story.burns.includes("test_user_1")
  );

  const handleReaction = async (actionType: string) => {
    const response = await fetch("/api/artlabproxy/stories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story_id: story.id,
        action: actionType,
      }),
    });

    if (!response.ok) {
      throw new Error("Error reacting to story");
    }
  };

  const handlePraiseClick = async () => {
    try {
      if (hasPraised) {
        // User is unpraising
        await handleReaction("unpraise");
        setPraisesCount(praisesCount - 1);
        setHasPraised(false);
      } else {
        if (hasBurned) {
          // User had burned, need to unburn first
          await handleReaction("unburn");
          setBurnsCount(burnsCount - 1);
          setHasBurned(false);
        }
        await handleReaction("praise");
        setPraisesCount(praisesCount + 1);
        setHasPraised(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBurnClick = async () => {
    try {
      if (hasBurned) {
        // User is unburning
        await handleReaction("unburn");
        setBurnsCount(burnsCount - 1);
        setHasBurned(false);
      } else {
        if (hasPraised) {
          // User had praised, need to unpraise first
          await handleReaction("unpraise");
          setPraisesCount(praisesCount - 1);
          setHasPraised(false);
        }
        await handleReaction("burn");
        setBurnsCount(burnsCount + 1);
        setHasBurned(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-12 border-b p-4 lg:w-[43vw]">
      <div className="col-span-1 flex flex-col mr-3">
        <Image
          src={"/abrahamlogo.png"}
          alt={story.logline}
          width={100}
          height={100}
          className="rounded-full aspect-[1] object-cover border"
        />
      </div>
      <div className="col-span-11 flex flex-col ">
        <p className="mb-1 mr-8">{story.logline}</p>
        <Image
          src={story.poster_image}
          alt={story.logline}
          width={500}
          height={500}
          className="rounded-lg aspect-[1] object-cover mt-2 border"
        />
        <div className="flex items-center mt-6 mb-4">
          <PraiseIcon
            onClick={handlePraiseClick}
            className={`w-9 h-5 cursor-pointer ${
              hasPraised ? "text-blue-500" : "text-gray-500"
            }`}
          />
          <span className="ml-1 text-sm font-semibold text-gray-500">
            {praisesCount}
          </span>
          <FlameIcon
            onClick={handleBurnClick}
            className={`w-5 h-5 ml-10 cursor-pointer ${
              hasBurned ? "text-red-500" : "text-gray-500"
            }`}
          />
          <span className="ml-1 text-sm font-semibold text-gray-500">
            {burnsCount}
          </span>
        </div>
      </div>
    </div>
  );
}
