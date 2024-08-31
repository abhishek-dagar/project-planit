"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";

const ProgressbarProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height="4px"
        options={{ showSpinner: true }}
        color="rgb(var(--primary))"
        showOnShallow
      />
    </>
  );
};

export default ProgressbarProviders;
