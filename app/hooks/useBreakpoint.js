import { useState, useEffect } from "react";

export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(null);

  const calculateBreakpoint = () => {
    const width = document.documentElement.clientWidth;
    console.log("Window width:", width);

    // Fixed layouts above 460px - no responsive behavior
    if (width >= 1280) return "desktop";
    if (width >= 1024) return "laptop";
    if (width >= 461) return "tablet"; // Fixed layout, no responsive
    
    // Responsive layout ONLY for 360-460px range
    if (width >= 360) return "mobile";
    
    // For screens smaller than 360px, use fixed tablet layout
    return "tablet";
  };

  useEffect(() => {
    const update = () => {
      const bp = calculateBreakpoint();
      setBreakpoint((prev) => {
        if (prev !== bp) {
          console.log("Breakpoint changed:", bp);
          return bp;
        }
        return prev; // avoid unnecessary re-renders
      });
    };

    update(); // run on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return breakpoint;
};
