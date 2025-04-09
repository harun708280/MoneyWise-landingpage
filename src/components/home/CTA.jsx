'use client';

import { RetroGrid } from "../magicui/retro-grid";


const CTA = ({ children }) => {
  return (
    <div className=" w-full mb-12 md:mb-[100px] relative flex flex-col items-center h-[500px]">
      {/* Top Grid */}
      <div className="absolute top-0 clip-path-cta left-0 right-0 rounded-3xl overflow-hidden border-t-2 border-blue-500/40 h-[20vh]">
        <RetroGrid className="opacity-100" angle={120} cellSize={180} />
      </div>

      <div className="relative w-full flex-1 max-w-3xl aspect-[3/2]">
        <div
          className="absolute inset-0 rounded-full z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 40%, transparent 70%)',
          }}
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center gap-6 text-white p-8">
          {children}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="absolute clip-path-cta bottom-0 border-t-2 border-blue-500/40 border-opacity left-0 right-0 rounded-3xl overflow-hidden h-[20vh] rotate-180">
        <RetroGrid className="opacity-100" angle={-245} cellSize={180} />
      </div>
    </div>
  );
};

export default CTA;
