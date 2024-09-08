import Image from "next/image";
import { TakeShot } from "./ui/buttons";
import takeShot from "@/src/images/icons/takeShot.svg";
import removeShot from "@/src/images/icons/removeShot.svg";
import style from "@/src/styles/Actionable.module.css";

export default function Actionable({
  onCapture,
  action,
}: {
  onCapture: () => void;
  action: boolean;
}) {
  return (
    <div className={style.outMain}>
      <div className={style.main}>
        <div className={style.textContainer}>
          <h2>Take a picture,</h2>
          <p>
            and we'll identify the type of waste and the correct bin for
            disposal, based on your selected country.
          </p>
        </div>
        <TakeShot onClick={onCapture}>
          <Image
            src={action ? removeShot : takeShot}
            width={60}
            height={60}
            alt="Polygon Icon"
          />
        </TakeShot>
      </div>
    </div>
  );
}
