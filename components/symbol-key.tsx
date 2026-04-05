"use client"

import React from "react"
import { getBlockColor } from "@/lib/utils"

export default function SymbolKey() {
  return (
    <div className="relative w-[380px] h-[260px] mx-auto scale-[0.65] sm:scale-75 md:scale-90 flex-shrink-0 z-10 origin-center">
      <div className="absolute top-0 left-0 text-2xl font-bold font-roboto-slab text-neutral-800">Symbol Key</div>

      <div className="absolute top-[40px] left-0 w-full h-[220px] pointer-events-none">
        {/* The Element Cell Diagram (z-10) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[93px] z-10 pointer-events-auto">
          <div className="relative bg-white flex flex-col items-center justify-center border-[2px] border-black rounded-[4px] w-full h-full shadow-[-4px_4px_0_0_#000]">
            <div className="absolute top-0.5 left-1 text-[11px] font-bold text-black font-roboto-slab">1</div>
            <div className="absolute top-0 right-0 w-[24%] h-[24%] border-l-[2px] border-b-[2px] border-black rounded-bl-[4px] rounded-tr-[2px]" style={{ backgroundColor: getBlockColor('s') }} />
            <div className="text-3xl font-bold mt-1 font-roboto-slab text-black">H</div>
            <div className="text-[8px] font-extrabold uppercase mt-1 tracking-tight text-black">Hydrogen</div>
            <div className="text-[7.5px] font-semibold mt-0.5 text-black">1.008</div>
          </div>
        </div>

        {/* SVG Lines (z-20) */}
        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 380 220">
          {/* Atomic number */}
          <path d="M 153 69 L 153 28 L 105 28" fill="none" stroke="#525252" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="153" cy="69" r="2.5" fill="#525252" />

          {/* Element symbol */}
          <path d="M 190 75 L 190 28 L 275 28" fill="none" stroke="#525252" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="190" cy="75" r="2.5" fill="#525252" />

          {/* Element name */}
          <path d="M 160 134 L 55 134 L 55 184" fill="none" stroke="#525252" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="160" cy="134" r="2.5" fill="#525252" />

          {/* Block */}
          <path d="M 222 72 L 325 72 L 325 184" fill="none" stroke="#525252" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="222" cy="72" r="2.5" fill="#525252" />

          {/* Relative atomic mass */}
          <path d="M 190 152 L 190 184" fill="none" stroke="#525252" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="190" cy="152" r="2.5" fill="#525252" />
        </svg>

        {/* Labels (z-30) */}
        <div className="absolute left-[12px] top-[16px] px-2 py-0.5 rounded-full border-[1.5px] border-neutral-500 bg-white text-[10px] font-bold text-neutral-800 w-[93px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-30 pointer-events-auto">Atomic number</div>
        <div className="absolute right-[12px] top-[16px] px-2 py-0.5 rounded-full border-[1.5px] border-neutral-500 bg-white text-[10px] font-bold text-neutral-800 w-[93px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-30 pointer-events-auto">Element symbol</div>

        <div className="absolute left-[12px] bottom-[12px] px-2 py-0.5 rounded-full border-[1.5px] border-neutral-500 bg-white text-[10px] font-bold text-neutral-800 w-[86px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-30 pointer-events-auto">Element name</div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[12px] px-2 py-0.5 rounded-full border-[1.5px] border-neutral-500 bg-white text-[10px] font-bold text-neutral-800 w-[120px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-30 pointer-events-auto">Relative atomic mass</div>
        <div className="absolute right-[25px] bottom-[12px] px-2 py-0.5 rounded-full border-[1.5px] border-neutral-500 bg-white text-[10px] font-bold text-neutral-800 w-[60px] text-center shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-30 pointer-events-auto">Series</div>
      </div>
    </div>
  )
}
