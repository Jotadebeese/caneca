import Image, { StaticImageData } from "next/image";
import style from "./inputs.module.css";
import { ModelOption } from "@/src/lib/types";
import polygonDark from "@/src/images/icons/polygonDark.svg";
import { useState } from "react";

export function CustomSelector({
  options,
  value,
  onChange,
  children,
}: {
  options: { value: string; image: StaticImageData }[];
  value: string;
  onChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className={style.flagsContainer}>
      {options.map((option) => (
        <label
          key={option.value}
          className={value === option.value ? style.selected : style.unselected}
        >
          <input
            type="radio"
            name="country"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <Image
            className={style.flag}
            src={option.image}
            alt={`${option.value} flag.`}
            width={50}
            height={50}
          />
        </label>
      ))}
    </div>
  );
}

export function DropDownSelector({
  options,
  label,
  setValue,
}: {
  options: ModelOption[];
  label: string;
  setValue: (input: ModelOption) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  console.log(isFocused);
  return (
    <div className={style.dropDownSelectorContainer}>
      <label className={style.dropDownSelectorLabel}>{label}</label>
      <div className={style.selectContainer}>
        <Image
          src={polygonDark}
          alt="Arrow down icon."
          width={15}
          height={15}
          className={
            isFocused ? `${style.rotateArrow} ${style.arrow}` : style.arrow
          }
        />
        <select
          className={style.dropDownSelector}
          onMouseDown={() => {
            // Use onMouseDown to catch when the dropdown is clicked to open.
            setIsFocused((prevState) => !prevState);
          }}
          onChange={(e) => {
            setValue({
              value: e.target.value,
              label: e.target.options[e.target.selectedIndex].text,
            });
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
