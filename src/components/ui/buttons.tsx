import style from "@/src/styles/buttons.module.css";

export function TakeShot({ children }: { children: React.ReactNode }) {
  return <button className={style.takeShotMain}>{children}</button>;
}
