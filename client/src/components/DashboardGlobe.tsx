import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function DashboardGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 320, height: 320 });
  const [countries, setCountries] = useState({ features: [] });
  const globeRef = useRef<any>();

  // Fetch GeoJSON for world map boundaries
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Failed to load map data", err));
  }, []);

  // Handle dynamic resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Auto-rotate the globe slowly
  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false; // Prevent zooming to keep layout clean
    }
  }, [globeRef.current]);

  const markersData = [
    { lat: 20.5937, lng: 78.9629, label: "India", color: "#f97316" }, // Orange-500
    { lat: 37.0902, lng: -95.7129, label: "US", color: "#f97316" },
    { lat: 55.3781, lng: -3.4360, label: "UK", color: "#f97316" },
    { lat: 23.4241, lng: 53.8478, label: "UAE", color: "#f97316" },
  ];

  return (
    <div className="border-border bg-surface relative overflow-hidden rounded-xl border w-full flex flex-col h-full min-h-[340px]">
      <div className="absolute top-4 left-5 z-10 pointer-events-none">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">Global Reach</h3>
        <p className="text-muted-foreground mt-0.5 text-[10px]">Active regions</p>
      </div>
      
      <div className="absolute top-4 right-5 z-10 flex items-center gap-1.5 pointer-events-none">
        <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full shadow-[0_0_8px_rgba(255,153,51,0.8)]"></div>
        <span className="text-muted-foreground text-[9px] font-medium">LIVE</span>
      </div>
      
      <div className="flex-1 w-full flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle glow background behind the globe */}
        <div className="pointer-events-none absolute inset-0 select-none flex items-center justify-center" aria-hidden="true">
          <div 
            className="w-[80%] h-[80%] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl" 
            style={{ background: "radial-gradient(circle, rgba(255, 153, 51, 0.4) 0%, transparent 70%)" }}
          ></div>
        </div>
        
        {/* Container for the Globe.gl */}
        <div 
          ref={containerRef} 
          className="relative w-full aspect-square flex items-center justify-center"
          style={{ maxWidth: '320px', maxHeight: '320px' }}
        >
          {dimensions.width > 0 && (
            <Globe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              backgroundColor="rgba(0,0,0,0)" // Transparent background
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg" // High quality dark map texture
              bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Topography bump map
              polygonsData={countries.features}
              polygonAltitude={0.01}
              polygonCapColor={() => "rgba(255, 255, 255, 0.05)"} // Very subtle borders
              polygonSideColor={() => "rgba(255, 255, 255, 0.01)"}
              polygonStrokeColor={() => "rgba(255, 255, 255, 0.1)"}
              labelsData={markersData}
              labelLat={(d: any) => d.lat}
              labelLng={(d: any) => d.lng}
              labelText={(d: any) => d.label}
              labelSize={1.5}
              labelDotRadius={0.8}
              labelColor={(d: any) => d.color}
              labelResolution={2}
              atmosphereColor="rgba(255, 153, 51, 0.4)" // Match brand orange subtle glow
              atmosphereAltitude={0.15}
            />
          )}
        </div>
      </div>
    </div>
  );
}
