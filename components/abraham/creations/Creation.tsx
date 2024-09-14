import React from "react";
import Image from "next/image";
import { CreationItem } from "@/types";

export default function Creation({ creation }: { creation: CreationItem }) {
  return (
    <div className="grid grid-cols-12 border-b p-4 w-[45vw]">
      <div className="col-span-1 flex flex-col mr-3">
        <Image
          src={"/abrahamlogo.png"}
          alt={creation.logline}
          width={100}
          height={100}
          className="rounded-full aspect-[1] object-cover border"
        />
      </div>
      <div className="col-span-11 flex flex-col">
        <h3>{creation.logline}</h3>
        <Image
          src={creation.poster_image}
          alt={creation.logline}
          width={500}
          height={500}
          className="rounded-lg aspect-[1] object-cover mt-2"
        />
      </div>
    </div>
  );
}
