import Image, { StaticImageData } from "next/image";
import style from "@/src/styles/inputs.module.css";

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
