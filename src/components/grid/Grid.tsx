"use client";

import React, { useEffect, useState } from "react";
import grid from "@/config/tailwind/grid";

export const Grid = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [columns, setColumns] = useState(grid.desktop.columns);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "g") setIsVisible((prev) => !prev);
    };

    const updateColumns = () => {
      const width = window.innerWidth;
      setColumns(
          width < 768
              ? grid.mobile.columns
              : width < 1024
                  ? grid.tablet.columns
                  : grid.desktop.columns,
      );
    };

    document.body.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateColumns);
    updateColumns();

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
      <div
          className={`fixed inset-0 w-full h-full z-999 pointer-events-none ${isVisible ? "" : "hidden"}`}
      >
        <div className="flex h-full w-full gap-grid px-grid">
          {Array.from({ length: columns }).map((_, i) => (
              <div
                  key={i}
                  className="border-2 border-red opacity-60 h-full flex-1"
              ></div>
          ))}
        </div>
      </div>
  );
};
