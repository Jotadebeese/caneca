import Grid from "../components/GridItem/Grid";
import style from "@/src/styles/home.module.css";
import { listModelOptions } from "../lib/utils/listModels";
import { ModelOption } from "../lib/types";

export default function Home() {
  const modelOptions: ModelOption[] = listModelOptions();
  return (
    <main className={style.main}>
      <Grid modelOptions={modelOptions} />
    </main>
  );
}
