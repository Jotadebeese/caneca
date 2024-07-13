import Image from "next/image";
import style from "@/src/styles/home.module.css";
import Camera from "@/src/components/Camera";

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.innerContainer}>
        <div className={style.item1}>
          <Camera />
        </div>
        <div className={style.item2}>2</div>
        <div className={style.item3}>3</div>
        <div className={style.item4}>4</div>
      </div>
    </main>
  );
}
