"use client";
import styles from "./accordion.module.css";
import Image from "next/image";
import { useState } from "react";
import firstLine from "@/src/images/icons/line.svg";
import secondLine from "@/src/images/icons/line.svg";

export default function Accordion({
  items,
}: {
  items: { title: string; content: React.ReactNode }[];
}) {
  const [open, setOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          index={index}
          itemIndex={itemIndex}
          setItemIndex={setItemIndex}
          open={open}
          setOpen={setOpen}
          item={item}
        />
      ))}
    </div>
  );
}
export function AccordionItem({
  open,
  setOpen,
  item,
  index,
  itemIndex,
  setItemIndex,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
  item: { title: string; content: React.ReactNode };
  index: number;
  itemIndex: number;
  setItemIndex: (i: number) => void;
}) {
  return (
    <div className={styles.item}>
      <AccordionTrigger
        title={item.title}
        open={open}
        setOpen={setOpen}
        index={index}
        itemIndex={itemIndex}
        setItemIndex={setItemIndex}
      />
      <AccordionContent
        open={open && index == itemIndex}
        content={item.content}
      />
    </div>
  );
}
export function AccordionContent({
  open,
  content,
}: {
  open: boolean;
  content: React.ReactNode;
}) {
  return (
    <div
      className={
        open ? `${styles.content} ${styles.open}` : `${styles.content}`
      }
    >
      {content}
    </div>
  );
}
export function AccordionTrigger({
  title,
  open,
  setOpen,
  setItemIndex,
  index,
  itemIndex,
}: {
  title: string;
  open: boolean;
  setOpen: (b: boolean) => void;
  setItemIndex: (i: number) => void;
  index: number;
  itemIndex: number;
}) {
  return (
    <button
      onClick={() => {
        setOpen(!open);
        setItemIndex(index);
        console.log(open);
      }}
      className={styles.trigger}
    >
      <h3>{title}</h3>
      <div className={styles.linesContainer}>
        <Image
          className={open && index == itemIndex ? styles.vanish : ""}
          src={firstLine}
          width={20}
          height={20}
          alt="First Line"
        />
        <Image
          className={
            open && index == itemIndex
              ? `${styles.secondLine} ${styles.flat}`
              : `${styles.secondLine}`
          }
          src={secondLine}
          width={20}
          height={20}
          alt="Second Line"
        />
      </div>
    </button>
  );
}
