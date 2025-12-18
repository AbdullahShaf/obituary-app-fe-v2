// "use client" stays omitted; this component is used inside client components
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import obituaryService from "@/services/obituary-service";

/**
 * A lightweight React/Next re-implementation of the Codrops 3D Wall Gallery.
 * - Horizontal scrollable strip with subtle 3D tilt on interaction
 * - Controlled via range slider + mouse wheel
 * - Accepts an array of photos with fileUrl fields
 */
export default function WallGallery3D({ photos = [] }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [tilt, setTilt] = useState("flat"); // flat | left | right
  const [isCentered, setIsCentered] = useState(false);
  const touchState = useRef({ active: false, startX: 0, startScroll: 0 });
  const tiltTimeoutRef = useRef(null);
  const scrollPosRef = useRef(0);
  const maxScrollRef = useRef(0);
  const [aspectMap, setAspectMap] = useState({});
  const [memoryLogs, setMemoryLogs] = useState([]);
  const [photoUserNameMap, setPhotoUserNameMap] = useState({});

  // Fetch memoryLogs directly using obituaryId from photos
  useEffect(() => {
    const fetchMemoryLogs = async () => {
      // Get obituaryId from the first photo (all photos should have the same obituaryId)
      const obituaryId = photos.length > 0 && photos[0]?.obituaryId;
      
      if (obituaryId) {
        try {
          const response = await obituaryService.getMemoryLogs(obituaryId);
          if (response?.detailedLogs) {
            setMemoryLogs(response?.detailedLogs);
          }
        } catch (error) {
          console.error("Error fetching memory logs:", error);
        }
      }
    };

    fetchMemoryLogs();
  }, []);

  // Create a map of photoId to userName from memoryLogs
  // We match each photo.id with memoryLog.interactionId to get the userName
  useEffect(() => {
    const map = {};
    if (memoryLogs && Array.isArray(memoryLogs) && memoryLogs.length > 0) {
      memoryLogs.forEach((log) => {
        // Match photo ID with memoryLog interactionId where type is "photo"
        if (log.type === "photo" && log.interactionId != null && log.userName) {
          // Convert interactionId to number to match with photo.id (INTEGER)
          const photoId = Number(log.interactionId);
          // Store both number and string keys for flexible lookup
          if (!isNaN(photoId)) {
            map[photoId] = log.userName;
            map[String(photoId)] = log.userName;
          }
        }
      });
    }
    setPhotoUserNameMap(map);
  }, [memoryLogs]);

  // Initialize aspect map from photo orientation data
  useEffect(() => {
    const initialMap = {};
    photos.forEach((p, idx) => {
      const id = p.id ?? idx;
      if (p.orientation) {
        initialMap[id] = p.orientation;
      }
    });
    if (Object.keys(initialMap).length > 0) {
      setAspectMap(initialMap);
    }
  }, [photos]);

  useEffect(() => {
    scrollPosRef.current = scrollPos;
  }, [scrollPos]);

  useEffect(() => {
    maxScrollRef.current = maxScroll;
  }, [maxScroll]);

  // Precompute a stable list of image sources
  // Match each photo.id with memoryLog.interactionId to get userName
  const items = useMemo(
    () =>
      photos.map((p, idx) => {
        // Use the photo's actual id (INTEGER) for matching
        const photoId = p.id ?? idx;
        // Look up userName from memoryLogs by matching photo.id with log.interactionId
        // Try both number and string keys for flexible matching
        const userName = 
          p.userName || 
          photoUserNameMap[Number(photoId)] || 
          photoUserNameMap[String(photoId)] || 
          "";
        return {
          id: photoId,
          src: p.fileUrl,
          alt: p.alt ?? "",
          userName: userName,
          orientation: p.orientation ?? null, // Use orientation from backend if available
        };
      }),
    [photos, photoUserNameMap]
  );

  // Clamp helper
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  // Recalculate scroll bounds when photos or container size change
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !trackRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const scrollWidth = trackRef.current.scrollWidth;
      const scrollable = Math.max(0, scrollWidth - containerWidth);
      setMaxScroll(scrollable);
      setIsCentered(scrollWidth <= containerWidth + 1);
      setScrollPos((prev) => clamp(prev, 0, scrollable));
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [items.length]);

  // Recompute after images load/render to capture intrinsic widths
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (!containerRef.current || !trackRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const scrollWidth = trackRef.current.scrollWidth;
      const scrollable = Math.max(0, scrollWidth - containerWidth);
      setMaxScroll(scrollable);
      setIsCentered(scrollWidth <= containerWidth + 1);
      setScrollPos((prev) => clamp(prev, 0, scrollable));
    });
    return () => cancelAnimationFrame(id);
  }, [items]);

  // Handle range slider change
  const handleSlider = (e) => {
    const next = Number(e.target.value);
    setScrollPos(next);
    setTilt("flat");
  };

  // Handle wheel scroll with a gentle tilt
  const handleWheel = (e) => {
    if (maxScrollRef.current <= 0) return;
    e.preventDefault();
    const delta = e.deltaY || e.deltaX || 0;
    const next = clamp(
      scrollPosRef.current + delta * 0.6,
      0,
      maxScrollRef.current
    );
    setScrollPos(() => next);
    setTilt(delta > 0 ? "right" : "left");
    // reset tilt after animation frame
    clearTimeout(tiltTimeoutRef.current);
    tiltTimeoutRef.current = window.setTimeout(() => setTilt("flat"), 180);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onPointerDown = (e) => {
      touchState.current = {
        active: true,
        startX: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
        startScroll: scrollPosRef.current,
      };
    };
    const onPointerMove = (e) => {
      if (!touchState.current.active) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const delta = touchState.current.startX - x;
      const next = clamp(
        touchState.current.startScroll + delta,
        0,
        maxScrollRef.current
      );
      setScrollPos(() => next);
      setTilt(delta > 0 ? "right" : "left");
    };
    const onPointerUp = () => {
      if (touchState.current.active) {
        touchState.current.active = false;
        setTilt("flat");
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp, { passive: true });
    el.addEventListener("pointercancel", onPointerUp, { passive: true });
    el.addEventListener("touchstart", onPointerDown, { passive: true });
    el.addEventListener("touchmove", onPointerMove, { passive: false });
    el.addEventListener("touchend", onPointerUp, { passive: true });
    el.addEventListener("touchcancel", onPointerUp, { passive: true });

    return () => {
      clearTimeout(tiltTimeoutRef.current);
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("touchstart", onPointerDown);
      el.removeEventListener("touchmove", onPointerMove);
      el.removeEventListener("touchend", onPointerUp);
      el.removeEventListener("touchcancel", onPointerUp);
    };
  }, []); // handlers use refs for latest state

  const tiltClass =
    tilt === "left" ? "turnLeft" : tilt === "right" ? "turnRight" : "flat";
  const showSlider = maxScroll > 0.5;

  if (!items.length) {
    return (
      <div className="wg-empty">
        Trenutno ni dodanih fotografij.
      </div>
    );
  }

  return (
    <div className="wg-wrapper">
      <div className="wg-header">
        {showSlider && (
          <div className="wg-slider">
            <input
              type="range"
              min={0}
              max={maxScroll}
              step={5}
              value={scrollPos}
              onChange={handleSlider}
              aria-label="Premakni galerijo"
            />
          </div>
        )}
      </div>

      <div className="wg-wall" ref={containerRef}>
        <div
          ref={trackRef}
          className={`wg-track ${tiltClass} ${isCentered ? "centered" : ""}`}
          style={{
            transform: isCentered ? "translate3d(0,0,0)" : `translate3d(${-scrollPos}px, 0, 0)`,
            justifyContent: isCentered ? "center" : "flex-start",
          }}
        >
          {items.map((item) => {
            // Use backend orientation if available, otherwise use detected or default to landscape
            const orientation = item.orientation || aspectMap[item.id] || "landscape";
            const isPortrait = orientation === "portrait";
            return (
              <figure
                className={`wg-photo wg-photo-${orientation}`}
                key={item.id}
              >
                <div className="wg-img-wrap">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={isPortrait ? 160 : 360}
                    height={240}
                    sizes="(max-width: 768px) 90vw, (max-width: 480px) 90vw, 360px"
                    className="wg-img"
                    loading="lazy"
                    onLoadingComplete={(img) => {
                      // Only detect if orientation wasn't set from backend
                      if (!item.orientation) {
                        const detectedPortrait = img.naturalHeight > img.naturalWidth;
                        setAspectMap((prev) => ({
                          ...prev,
                          [item.id]: detectedPortrait ? "portrait" : "landscape",
                        }));
                      }
                    }}
                  />
                  <figcaption className="wg-caption-overlay">
                    {item.userName || ""}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .wg-wrapper {
          width: 100%;
          margin: 0;
          padding: 0;
          background: transparent;
        }
        .wg-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 8px 16px 10px;
        }
        .wg-title {
          font-size: 32px;
          line-height: 1.1;
          color: #1e2125;
          margin: 0;
        }
        .wg-slider {
          flex: 1;
          display: flex;
          justify-content: center;
          max-width: 420px;
          margin: 0 auto 6px;
        }
        .wg-slider input[type="range"] {
          width: 100%;
          accent-color: #0a85c2;
          height: 4px;
          padding: 2px 0;
          cursor: pointer;
          background: transparent;
          border-radius: 999px;
        }
        .wg-wall {
          position: relative;
          overflow: hidden;
          padding: 0;
          perspective: 350px;
          background: transparent;
        }
        .wg-track {
          display: flex;
          gap: 10px;
          transition: transform 0.28s ease, filter 0.28s ease;
          transform-style: preserve-3d;
          padding: 0 14px 16px 10px;
          touch-action: pan-y;
          align-items: flex-start;
        }
        .wg-track::after {
          content: "";
          flex: 0 0 22px;
        }
        .wg-track.centered {
          gap: 14px;
        }
        .wg-track.flat {
          transform: translate3d(-${scrollPos}px, 0, 0) rotateY(0deg);
        }
        .wg-track.turnLeft {
          transform: translate3d(-${scrollPos}px, 0, 0) rotateY(-2deg);
        }
        .wg-track.turnRight {
          transform: translate3d(-${scrollPos}px, 0, 0) rotateY(2deg);
        }
        .wg-track.centered.turnLeft,
        .wg-track.centered.turnRight {
          transform: translate3d(0, 0, 0);
        }
        .wg-photo {
          flex: 0 0 auto;
          transform-style: preserve-3d;
          box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.8);
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          background: #ffffff;
          margin-right: 0;
          max-width: 100%;
          display: inline-flex;
          overflow: hidden;
          border-radius: 0;
        }
        .wg-photo-landscape {
          width: 360px;
          height: 240px;
          aspect-ratio: 3 / 2;
        }
        .wg-photo-portrait {
          width: 160px;
          height: 240px;
          aspect-ratio: 2 / 3;
        }
        .wg-img-wrap {
          position: relative;
          padding: 0;
          background: transparent;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          cursor: pointer;
        }
        .wg-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: transparent;
          flex-shrink: 0;
        }
        .wg-caption-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.3) 80%, transparent 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          padding: 24px 16px 16px;
          border-radius: 0;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          pointer-events: none;
          text-align: left;
          z-index: 100;
          display: flex;
          align-items: flex-end;
          min-height: 60px;
        }
        .wg-photo:hover .wg-caption-overlay,
        .wg-img-wrap:hover .wg-caption-overlay {
          opacity: 1;
        }
        .wg-caption-overlay:empty {
          display: none;
        }
        .wg-empty {
          text-align: center;
          padding: 20px 0 10px;
          color: #414141;
        }

        @media (max-width: 768px) {
          .wg-wrapper {
            padding: 12px 8px 28px;
          }
          .wg-title {
            font-size: 26px;
          }
          .wg-photo-landscape {
            width: 270px;
            height: 180px;
            aspect-ratio: 3 / 2;
          }
          .wg-photo-portrait {
            width: 120px;
            height: 180px;
            aspect-ratio: 2 / 3;
          }
          .wg-track {
            gap: 6px;
            padding: 0 10px 12px 6px;
          }
          .wg-slider {
            justify-content: flex-start;
            padding-right: 8px;
          }
        }
        @media (max-width: 480px) {
          .wg-photo-landscape {
            width: 240px;
            height: 160px;
            aspect-ratio: 3 / 2;
          }
          .wg-photo-portrait {
            width: 107px;
            height: 160px;
            aspect-ratio: 2 / 3;
          }
          .wg-photo {
            border-width: 0.5px;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
          }
          .wg-track {
            gap: 5px;
          }
        }
      `}</style>
    </div>
  );
}
