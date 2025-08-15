import React from "react";

export default function Stamp({
  show,
  text = "CONFIDENTIAL",
}: { show: boolean; text?: string }) {
  if (!show) return null;
  return (
    <div
      aria-hidden
      className="select-none pointer-events-none absolute top-4 right-4"
      style={{ animation: "bureau-stamp 260ms ease-out both" }}
    >
      <div className="uppercase tracking-widest font-extrabold border-4 border-red-700 text-red-700 px-3 py-1 rotate-[-6deg] shadow-sm bg-white/60 backdrop-blur-[1px]">
        {text}
      </div>
    </div>
  );
}
