import dynamic from "next/dynamic";
import style from "@/src/styles/home.module.css";
import { listModelOptions } from "../lib/utils/listModels";
import { ModelOption } from "../lib/types";

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
      <Grid modelOptions={modelOptions} />
    </main>
  );
}
