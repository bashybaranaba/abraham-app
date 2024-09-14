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
      <div className="container">
        <CreationList creations={creations || []} />
      </div>
    </>
  );
}
