"use client";

import React, { useState, useRef, useEffect } from "react";
import "./CustomCarousel.module.css";

interface CarouselProps {
  children: React.ReactNode[];
  itemsToShow: number;
}

export default function CustomCarousel({
  children,
  itemsToShow,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = React.Children.count(children);
  const maxIndex = Math.max(0, totalItems - itemsToShow);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
      setIsTouching(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.style.setProperty("--current-index", currentIndex.toString());
    }
  }, [currentIndex]);

  return (
    <div className="carousel-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div
        className="carousel"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div className="carousel-item" key={index}>
            {child}
          </div>
        ))}
      </div>
      <button
        className="carousel-button prev"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
        aria-label="Previous item"
      >
        Left
      </button>
      <button
        className="carousel-button next"
        onClick={goToNext}
        disabled={currentIndex === maxIndex}
        aria-label="Next item"
      >
        Right
      </button>
      <div className="carousel-progress">
        <input
          type="range"
          min={0}
          max={maxIndex}
          value={currentIndex}
          onChange={(e) => setCurrentIndex(Number(e.target.value))}
          aria-label="Carousel progress"
        />
      </div>
    </div>
  );
}
