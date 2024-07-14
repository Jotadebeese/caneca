import style from "@/src/styles/home.module.css";
import Camera from "@/src/components/Camera";
import Actionable from "@/src/components/Actionable";
import Country from "@/src/components/Country";

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.innerContainer}>
        <div className={style.item1}>
          <Camera />
        </div>
        <div className={style.item2}>
          <Actionable />
        </div>
        <div className={style.item3}>
          <Country />
        </div>
        <div className={style.item4}>4</div>
      </div>
    </main>
  );
}
