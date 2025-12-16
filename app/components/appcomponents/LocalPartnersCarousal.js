"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import ArrowLeft from "../../../public/lokalni/left.png";
import ArrowRight from "../../../public/lokalni/right.png";
import screenSizes from "@/app/lokalni/constant";

export default function LocalPartnersCarousal({ categories, screen }) {
  return <LocalCarousal categories={categories} screen={screen} />;
}

const GAP = 16;

const LocalCarousal = ({ categories, screen }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];
  const total = safeCategories.length;

  const [index, setIndex] = useState(safeCategories.length);
  const [isResetting, setIsResetting] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [itemWidths, setItemWidths] = useState([]);

  const itemRefs = useRef([]);
  const resumeTimeout = useRef(null);

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 744);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Duplicate for infinite looping
  const loopedItems = [
    ...safeCategories.slice(-total),
    ...safeCategories,
    ...safeCategories.slice(0, total),
  ];

  // Measure dynamic widths
  useLayoutEffect(() => {
    const w = itemRefs.current.map((el) => (el ? el.offsetWidth : 0));
    setItemWidths(w);
  }, [safeCategories]);

  // Compute total x offset
  const computeX = () => {
    if (itemWidths.length === 0) return 0;

    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += itemWidths[i] + GAP;
    }
    return -offset;
  };

  const xOffset = computeX();

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pause & resume logic
  const pauseAuto = () => {
    setIsPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setIsPaused(false), 5000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  // Initialize position
  useEffect(() => {
    if (total > 0 && index === 0) {
      setIndex(total);
      setIsResetting(true);
    }
  }, [total, index]);

  // Resetting cleanup
  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => setIsResetting(false), 50);
      return () => clearTimeout(timer);
    }
  }, [isResetting]);

  const handleAnimationComplete = () => {
    if (isResetting) return;

    if (index >= total * 2) {
      setIsResetting(true);
      setIndex(index - total);
    } else if (index < total) {
      setIsResetting(true);
      setIndex(index + total);
    }
  };

  const next = () => {
    pauseAuto();
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    pauseAuto();
    setIndex((prev) => prev - 1);
  };

  // Drag handling
  const handleDragEnd = (e, info) => {
    if (!isMobile) return;
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  return (
    <div className="flex flex-col items-start justify-center w-full gap-6 md:w-[600px] lg:w-[750px]">
      {/* CAROUSEL */}
      <div className="overflow-hidden w-full py-3">
        <motion.div
          className="flex gap-4"
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          animate={{ x: xOffset }}
          transition={{ duration: isResetting ? 0 : 0.35, ease: "easeOut" }}
          onAnimationComplete={handleAnimationComplete}
        >
          {loopedItems.length == 0 ? (
            <div className="flex items-center justify-center w-full h-full text-[#B9B9B9]">
              Loading...
            </div>
          ) : null}
          {loopedItems.map((item, i) => (
            <div key={i} ref={(el) => (itemRefs.current[i] = el)}>
              <LocalPartnersCarousalItem {...item} screen={screen} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row items-center justify-end w-full gap-8 mb-10">
        <button onClick={prev}>
          <img src={ArrowLeft.src} alt="Puščica levo - prejšnji element" className="w-4" />
        </button>
        <button onClick={next}>
          <img src={ArrowRight.src} alt="Puščica desno - naslednji element" className="w-4" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden flex-row items-center justify-center w-full gap-12 mt-3">
        <button onClick={prev}>
          <img src={ArrowLeft.src} alt="Puščica levo - prejšnji element" className="w-5" />
        </button>
        <button onClick={next}>
          <img src={ArrowRight.src} alt="Puščica desno - naslednji element" className="w-5" />
        </button>
      </div>
    </div>
  );
};

const LocalPartnersCarousalItem = ({ name, screen }) => {
  return (
    <div
      className={`border border-[#B9B9B9] border-[2px] px-4 py-2 bg-[#3B3B3B]
                  text-[#B9B9B9] uppercase rounded-sm w-fit leading-6 
                 flex justify-center items-center ${
                   screen === screenSizes.MOBILE
                     ? "text-base h-[50px]"
                     : "text-lg h-[80px]"
                 } whitespace-nowrap`}
    >
      <span>{name}</span>
    </div>
  );
};
