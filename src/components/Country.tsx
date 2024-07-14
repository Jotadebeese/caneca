"use client";
import style from "@/src/styles/Country.module.css";
import { CustomSelector } from "./ui/inputs";
import { useState } from "react";
import colombiaFlag from "@/src/images/colombian.svg";
import thaiFlag from "@/src/images/thai.svg";
import australianFlag from "@/src/images/australian.svg";

export default function Country() {
  const [country, setCountry] = useState("Colombia");
  const options = [
    { value: "Colombia", image: colombiaFlag },
    { value: "Thailand", image: thaiFlag },
    { value: "Australia", image: australianFlag },
  ];
  return (
    <div className={style.main}>
      <h3>Select a country</h3>
      <CustomSelector options={options} value={country} onChange={setCountry} />
    </div>
  );
}
