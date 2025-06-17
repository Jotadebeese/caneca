import style from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={style.main}>
      <div className={style.innerContainer}>
        <p className={style.logoName}>CANECA</p>
        <div>
          <small>© {currentYear}</small>
        </div>
      </div>
    </footer>
  );
}
