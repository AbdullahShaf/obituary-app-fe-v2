"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowLeft from "../../../public/lokalni/left.png";
import ArrowRight from "../../../public/lokalni/right.png";

export default function LocalPartnersCarousal({ categories }) {
  return <LocalCarousal categories={categories} />;
}

const DEFAULT_VISIBLE_COUNT = 5;
const ITEM_WIDTH = 150; // min width of item
const GAP = 16; // gap between items

const LocalCarousal = ({ categories }) => {
  const total = categories.length;

  // ----------------------
  // Responsive / State
  // ----------------------
  const [index, setIndex] = useState(DEFAULT_VISIBLE_COUNT); // start at first real item
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const resumeTimeout = useRef(null);

  // detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 744);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // responsive visible count
  const visibleCount = isMobile ? 3 : DEFAULT_VISIBLE_COUNT;

  // ----------------------
  // Build looped items
  // ----------------------
  const loopedItems = [
    ...categories.slice(-visibleCount),
    ...categories,
    ...categories.slice(0, visibleCount),
  ];

  const totalLooped = loopedItems.length;

  // ----------------------
  // Auto Slide
  // ----------------------
  useEffect(() => {
    if (isPaused || categories.length <= visibleCount) return;

    const t = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(t);
  }, [isPaused, index, categories.length, visibleCount]);

  const pauseAuto = () => {
    setIsPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setIsPaused(false), 6000);
  };

  // ----------------------
  // Navigation
  // ----------------------
  const next = () => {
    if (categories.length <= visibleCount) return;
    pauseAuto();
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (categories.length <= visibleCount) return;
    pauseAuto();
    setIndex((prev) => prev - 1);
  };

  // ----------------------
  // Reset index for infinite looping
  // ----------------------
  useEffect(() => {
    if (index >= total + visibleCount) {
      // reached cloned end, reset to real first
      setTimeout(() => setIndex(visibleCount), 50);
    } else if (index < visibleCount) {
      // reached cloned start, reset to real last
      setTimeout(() => setIndex(total + visibleCount - 1), 50);
    }
  }, [index, total, visibleCount]);

  // ----------------------
  // Handle Drag
  // ----------------------
  const handleDragEnd = (e, info) => {
    if (!isMobile) return;
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  // ----------------------
  // Compute x offset
  // ----------------------
  const xOffset = -(index * (ITEM_WIDTH + GAP));

  return (
    <div className="flex flex-col items-start justify-center gap-6 w-full md:w-[600px] lg:w-[750px]">
      {/* Carousel */}
      <div className="overflow-hidden w-full py-3">
        <motion.div
          ref={containerRef}
          className="flex flex-row gap-4"
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25}
          onDragEnd={handleDragEnd}
          animate={{ x: xOffset }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {loopedItems.map((item, i) => (
            <LocalPartnersCarousalItem key={i} {...item} />
          ))}
        </motion.div>
      </div>

      {/* Desktop + Tablet Navigation */}
      <div className="hidden md:flex flex-row items-center justify-end w-full gap-8 mb-10">
        <img
          src={ArrowLeft.src}
          alt="arrow-left"
          className="hover:cursor-pointer w-4"
          onClick={prev}
        />
        <img
          src={ArrowRight.src}
          alt="arrow-right"
          className="hover:cursor-pointer w-4"
          onClick={next}
        />
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden flex-row items-center justify-center w-full gap-10 mt-3">
        <img
          src={ArrowLeft.src}
          alt="arrow-left"
          className="hover:cursor-pointer w-5"
          onClick={prev}
        />
        <img
          src={ArrowRight.src}
          alt="arrow-right"
          className="hover:cursor-pointer w-5"
          onClick={next}
        />
      </div>
    </div>
  );
};

const LocalPartnersCarousalItem = ({ name }) => {
  return (
    <div
      className="border border-[#B9B9B9] border-[2px] px-4 py-2 bg-[#3B3B3B]
                 text-base md:text-lg text-[#B9B9B9] uppercase rounded-sm min-w-[150px]
                 flex justify-center items-center"
    >
      <a href="#" target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </div>
  );
};
