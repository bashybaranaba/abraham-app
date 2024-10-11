import React from "react";

export default function Blessings({ blessings }: { blessings: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      {blessings.map((blessing, index) => (
        <div
          key={index}
          className="flex flex-col border-b border-gray-300 p-6 lg:w-[43vw]"
        >
          <div className="text-gray-700">{blessing}</div>
        </div>
      ))}
    </div>
  );
}
