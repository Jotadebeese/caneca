import Image, { StaticImageData } from "next/image";
import style from "./inputs.module.css";
import { ModelOption } from "@/src/lib/types";

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
            width={150}
            height={100}
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
  return (
    <div className={style.dropDownSelectorContainer}>
      <label className={style.dropDownSelectorLabel}>{label}</label>
      <select
        className={style.dropDownSelector}
        onChange={(e) =>
          setValue({
            value: e.target.value,
            label: e.target.options[e.target.selectedIndex].text,
          })
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
