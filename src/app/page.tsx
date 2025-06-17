import dynamic from "next/dynamic";
import style from "@/src/styles/home.module.css";
import { listModelOptions } from "../lib/utils/listModels";
import { ModelOption } from "../lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Grid = dynamic(() => import("@/src/components/GridItem/Grid"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p>Loading Classifier...</p>
    </div>
  ),
});

export default function Home() {
  const modelOptions: ModelOption[] = listModelOptions();
  return (
    <main className={style.main}>
      <div className="flex flex-col max-w-2xl pb-5! gap-2">
        <h1 className="text-lg font-bold">Do you want to help?</h1>
        <p className="text-sm">
          Help CANECA to become better by providing pictures of rubbish and
          assigning the right label.
        </p>
        <Link
          href={"/uploads"}
          className="text-primary-02! gap-1 text-sm flex items-center underline! w-fit p-0! group"
        >
          Upload images here
          <ArrowRight
            size={14}
            className="text-secondary! transition-all group-hover:translate-x-1 ease-in-out"
          />
        </Link>
      </div>
      <Grid modelOptions={modelOptions} />
    </main>
  );
}
