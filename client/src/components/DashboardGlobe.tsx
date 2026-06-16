import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function DashboardGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  
  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;
    
    let width = canvasRef.current.offsetWidth || 300;
    
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // White dots for contrast
      markerColor: [0.1, 0.8, 1], // Cyan markers for modern look
      glowColor: [1, 1, 1], // White subtle glow
      markers: [
        { location: [20.5937, 78.9629], size: 0.1 }, // India
        { location: [37.0902, -95.7129], size: 0.05 }, // USA
        { location: [55.3781, -3.4360], size: 0.05 }, // UK
        { location: [23.4241, 53.8478], size: 0.05 }, // UAE
      ],
      onRender: (state) => {
        // Auto-rotate if not interacting
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const handleResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth || 300;
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full aspect-square max-w-[400px] flex items-center justify-center relative mx-auto overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          cursor: "grab",
          contain: "layout paint size",
        }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          e.currentTarget.style.cursor = 'grabbing';
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = 'grab';
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null;
          e.currentTarget.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 100;
          }
        }}
      />
    </div>
  );
}
