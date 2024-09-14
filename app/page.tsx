"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreationList from "@/components/abraham/creations/CreationList";

export default function Home() {
  const [creations, setCreations] = useState([]);
  useEffect(() => {
    axios.get("/api/artlabproxy/stories").then((res) => {
      setCreations(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <div className=" flex flex-col items-center justify-center w-full mt-20">
          <CreationList creations={creations || []} />
        </div>
      </div>
    </>
  );
}
