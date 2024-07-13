import style from "@/src/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.main}>
      <div className={style.innerContainer}>
        <p className={style.logoName}>CANECA</p>
        <div>
          <small>© 2024</small>
        </div>
      </div>
    </footer>
  );
}
