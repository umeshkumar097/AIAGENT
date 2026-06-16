import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function DashboardGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;
    
    // Cobe uses a fixed width/height but scales based on CSS.
    // For crisp rendering on high-DPI displays, we double the internal resolution.
    const width = 640;
    const height = 640;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width,
      height: height,
      phi: 0,
      theta: 0.3, // Slightly tilted
      dark: 1, // Render in dark mode
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05], // Very dark base
      markerColor: [1, 0.5, 0], // Saffron/Orange markers
      glowColor: [0.1, 0.3, 0.2], // Subtle green glow
      markers: [
        // India
        { location: [20.5937, 78.9629], size: 0.1 },
        // US
        { location: [37.0902, -95.7129], size: 0.05 },
        // UK
        { location: [55.3781, -3.4360], size: 0.05 },
        // UAE
        { location: [23.4241, 53.8478], size: 0.05 },
      ],
      onRender: (state) => {
        // Automatically rotate
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="border-border bg-surface relative overflow-hidden rounded-xl border w-full" style={{ height: "340px" }}>
      <div className="absolute top-4 left-5 z-10">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">Global Reach</h3>
        <p className="text-muted-foreground mt-0.5 text-[10px]">Active regions</p>
      </div>
      
      <div className="absolute top-4 right-5 z-10 flex items-center gap-1.5">
        <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></div>
        <span className="text-muted-foreground text-[9px] font-medium">LIVE</span>
      </div>
      
      <div className="flex h-full items-center justify-center">
        <div className="relative overflow-hidden h-[320px] w-[320px]">
          {/* Subtle glow background */}
          <div className="pointer-events-none absolute inset-0 select-none flex items-center justify-center" aria-hidden="true">
            <div 
              className="w-[90%] h-[90%] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
              style={{ background: "radial-gradient(circle, rgba(255, 153, 51, 0.08) 0%, transparent 55%)" }}
            ></div>
          </div>
          
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div className="scene-container" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  contain: "layout paint size",
                  cursor: "grab",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
