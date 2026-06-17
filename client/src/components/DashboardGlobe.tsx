import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

export default function DashboardGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let phi = 0;
    let globe: any = null;

    if (!canvasRef.current || !containerRef.current) return;

    const onResize = () => {
      if (globe) {
        globe.destroy();
      }
      
      const width = containerRef.current!.clientWidth;
      
      globe = createGlobe(canvasRef.current!, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1, // Dark mode inversion
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1], // Inverts to dark grey/black
        markerColor: [1, 0.5, 0], // Saffron/Orange
        glowColor: [1, 1, 1], // Inverts to subtle glow
        markers: [
          { location: [20.5937, 78.9629], size: 0.1 },
          { location: [37.0902, -95.7129], size: 0.05 },
          { location: [55.3781, -3.4360], size: 0.05 },
          { location: [23.4241, 53.8478], size: 0.05 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.005;
        },
      });
    };

    // Initial render
    onResize();

    // Handle resize
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (globe) {
        globe.destroy();
      }
    };
  }, []);

  return (
    <div className="border-border bg-surface relative overflow-hidden rounded-xl border w-full flex flex-col h-full min-h-[340px]">
      <div className="absolute top-4 left-5 z-10">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">Global Reach</h3>
        <p className="text-muted-foreground mt-0.5 text-[10px]">Active regions</p>
      </div>
      
      <div className="absolute top-4 right-5 z-10 flex items-center gap-1.5">
        <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full shadow-[0_0_8px_rgba(255,153,51,0.8)]"></div>
        <span className="text-muted-foreground text-[9px] font-medium">LIVE</span>
      </div>
      
      <div className="flex-1 w-full flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle glow background behind the globe */}
        <div className="pointer-events-none absolute inset-0 select-none flex items-center justify-center" aria-hidden="true">
          <div 
            className="w-[80%] h-[80%] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl" 
            style={{ background: "radial-gradient(circle, rgba(255, 153, 51, 0.5) 0%, transparent 70%)" }}
          ></div>
        </div>
        
        {/* Container for the Globe */}
        <div 
          ref={containerRef} 
          className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mix-blend-screen"
        >
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              contain: "layout paint size",
              opacity: 1,
              transition: "opacity 1s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
