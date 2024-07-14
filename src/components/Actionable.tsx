import Image from "next/image";
import { TakeShot } from "./ui/buttons";
import takeShot from "@/src/images/icons/takeShot.svg";
import style from "@/src/styles/Actionable.module.css";

export default function Actionable() {
  return (
    <div className={style.main}>
      <div className={style.textContainer}>
        <h2>Take a picture</h2>
        <p>
          And we will identify the kind of rubbish and correct bin container
          where to throw it base in the country selection.
        </p>
      </div>
      <TakeShot>
        <Image src={takeShot} width={60} alt="Polygon Icon" />
      </TakeShot>
    </div>
  );
}
