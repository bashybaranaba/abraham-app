import React from "react";
import Image from "next/image";
import { CreationItem } from "@/types";
import Creation from "./Creation";

export default function CreationList({
  creations,
}: {
  creations: CreationItem[];
}) {
  return (
    <div>
      {creations.map((creation, index) => (
        <Creation key={index} creation={creation} />
      ))}
    </div>
  );
}
