"use client";
import { useState } from "react";
import "@/src/styles/test.module.css";
const items = [
  <div>Item 1</div>,
  <div>Item 2</div>,
  <div>Item 3</div>,
  <div>Item 4</div>,
  <div>Item 5</div>,
  <div>Item 1</div>,
  <div>Item 2</div>,
  <div>Item 3</div>,
  <div>Item 4</div>,
  <div>Item 5</div>,
];
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 3; // Number of items to show at once

  const nextSlide = () => {
    if (currentIndex < items.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const itemWidth = 100 / visibleItems; // Percentage width of each item
  const gap = 10; // Gap in pixels
  const translateX = -(currentIndex * itemWidth); // Translate the wrapper based on current index
  const progress = ((currentIndex + visibleItems) / items.length) * 100; // Progress bar calculation

  return (
    <div className="carousel-container">
      <div className="carousel-progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <div
        className="carousel-wrapper"
        style={{
          display: "flex",
          width: `100%`,
          transform: `translateX(calc(${translateX}% - ${
            gap * currentIndex
          }px))`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item"
            style={{ flex: `0 0 ${itemWidth}%` }}
          >
            {item}
          </div>
        ))}
      </div>
      <button className="carousel-button left" onClick={prevSlide}>
        Back
      </button>
      <button className="carousel-button right" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
