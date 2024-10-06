import style from "./Footer.module.css";

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
