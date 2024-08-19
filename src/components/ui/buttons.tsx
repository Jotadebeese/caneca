import style from "@/src/styles/buttons.module.css";

export function TakeShot({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={style.takeShotMain} onClick={onClick}>
      {children}
    </button>
  );
}
