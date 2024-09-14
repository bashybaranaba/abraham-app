import React from "react";
import Image from "next/image";
import { CreationItem } from "@/types";

export default function Creation({ creation }: { creation: CreationItem }) {
  return (
    <div>
      <Image
        src={creation.poster_image}
        alt={creation.logline}
        width={300}
        height={300}
        className="rounded-lg aspect-[1] object-cover"
      />
      <h3>{creation.logline}</h3>
    </div>
  );
}
