import React, { useEffect, useRef, useState, useMemo } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

export default function DashboardGlobe() {
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight || containerRef.current.offsetWidth
        });
      }
    };
    
    // Initial size
    updateDimensions();
    
    // Setup observer
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // Auto-rotate
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false; // Disable zoom to keep it looking clean
    }
  }, [mounted]);

  // Points for arcs and rings
  const arcsData = useMemo(() => [
    { startLat: 20.5937, startLng: 78.9629, endLat: 37.0902, endLng: -95.7129, color: ['#1fd5f9', '#ffffff'] }, // India -> USA
    { startLat: 20.5937, startLng: 78.9629, endLat: 55.3781, endLng: -3.4360, color: ['#1fd5f9', '#ffffff'] },  // India -> UK
    { startLat: 20.5937, startLng: 78.9629, endLat: 23.4241, endLng: 53.8478, color: ['#1fd5f9', '#ffffff'] },  // India -> UAE
    { startLat: 37.0902, startLng: -95.7129, endLat: 55.3781, endLng: -3.4360, color: ['#1fd5f9', '#ffffff'] }, // USA -> UK
  ], []);

  const ringsData = useMemo(() => [
    { lat: 20.5937, lng: 78.9629, maxR: 12, propagationSpeed: 2, repeatPeriod: 1000 }, // India
    { lat: 37.0902, lng: -95.7129, maxR: 8, propagationSpeed: 1.5, repeatPeriod: 1200 }, // USA
    { lat: 55.3781, lng: -3.4360, maxR: 6, propagationSpeed: 1, repeatPeriod: 1500 }, // UK
    { lat: 23.4241, lng: 53.8478, maxR: 6, propagationSpeed: 1.5, repeatPeriod: 1100 }, // UAE
  ], []);

  // Use raw globe material configuration for that premium look
  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      color: "#050B14",
      emissive: "#000000",
      specular: "#111111",
      shininess: 10,
      transparent: true,
      opacity: 0.9,
    });
    return material;
  }, []);

  return (
    <div className="border-border bg-surface relative overflow-hidden rounded-xl border w-full h-full min-h-[340px]" style={{ height: "340px" }}>
      {/* Top Left Title */}
      <div className="absolute top-4 left-5 z-10">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">Global Reach</h3>
        <p className="text-muted-foreground mt-0.5 text-[10px]">Active regions</p>
      </div>

      {/* Top Right LIVE indicator */}
      <div className="absolute top-4 right-5 z-10 flex items-center gap-1.5">
        <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></div>
        <span className="text-muted-foreground text-[9px] font-medium">LIVE</span>
      </div>

      <div className="flex h-full w-full items-center justify-center p-4">
        {/* Container for Globe */}
        <div className="relative overflow-hidden w-full h-full flex items-center justify-center" ref={containerRef}>
          
          {/* Subtle radial glow background */}
          <div className="pointer-events-none absolute inset-0 select-none flex items-center justify-center" aria-hidden="true">
            <div 
              className="rounded-full" 
              style={{ 
                width: Math.min(dimensions.width, dimensions.height) * 0.9, 
                height: Math.min(dimensions.width, dimensions.height) * 0.9, 
                background: "radial-gradient(circle, rgba(31, 213, 249, 0.08) 0%, transparent 55%)" 
              }}
            ></div>
          </div>

          {/* Render Globe only after mounting to avoid hydration issues */}
          {mounted && (
            <div className="absolute flex items-center justify-center z-10">
              <Globe
                ref={globeEl}
                width={Math.min(dimensions.width, dimensions.height)}
                height={Math.min(dimensions.width, dimensions.height)}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                globeMaterial={globeMaterial}
                showAtmosphere={true}
                atmosphereColor="#1fd5f9"
                atmosphereAltitude={0.15}
                
                // Arcs
                arcsData={arcsData}
                arcColor="color"
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2500}
                arcStroke={0.5}
                
                // Rings
                ringsData={ringsData}
                ringColor={() => '#1fd5f9'}
                ringMaxRadius="maxR"
                ringPropagationSpeed="propagationSpeed"
                ringRepeatPeriod="repeatPeriod"
              />
            </div>
          )}

          {/* Border overlay */}
          <div className="pointer-events-none absolute inset-[4%] rounded-full border border-white/5 z-20"></div>
        </div>
      </div>
    </div>
  );
}
