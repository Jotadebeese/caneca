"use client";
import style from "@/src/styles/home.module.css";
import Camera from "@/src/components/Camera";
import Actionable from "@/src/components/Actionable";
import Country from "@/src/components/Country";
import Accordion from "@/src/components/ui/accordion";
import { useState } from "react";
import {
  AustralianStandar,
  ColombianStandar,
  ThaiStandar,
} from "@/src/components/BinStandard";

export default function Home() {
  const [country, setCountry] = useState("Australia");
  const accordionItems = [
    {
      title:
        country === "Australia"
          ? "Australian standard for mobile bin colours."
          : country === "Colombia"
          ? "Colombian standard for mobile bin colours."
          : "Thai standard for mobile bin colours.",
      content:
        country === "Australia" ? (
          <AustralianStandar />
        ) : country === "Colombia" ? (
          <ColombianStandar />
        ) : (
          <ThaiStandar />
        ),
    },
  ];

  const handleImageCapture = (image: HTMLCanvasElement) => {
    console.log(image);
    console.log("Image captured");
  };
  return (
    <main className={style.main}>
      <div className={style.innerContainer}>
        <div className={style.item1}>
          <Camera onCapture={handleImageCapture} />
        </div>
        <div className={style.item2}>
          <Actionable onCapture={() => handleImageCapture} />
        </div>
        <div className={style.item3}>
          <Country country={country} setCountry={setCountry} />
        </div>
        <div className={style.item4}>
          <Accordion items={accordionItems} />
        </div>
      </div>
    </main>
  );
}
