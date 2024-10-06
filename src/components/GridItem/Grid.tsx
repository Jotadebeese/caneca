"use client";
import style from "./Grid.module.css";
import Camera from "@/src/components/Camera/Camera";
import Actionable from "@/src/components/Actionable/Actionable";
import Country from "@/src/components/Country/Country";
import Accordion from "@/src/components/ui/accordion";
import { useState } from "react";
import {
  AustralianStandar,
  ColombianStandar,
  ThaiStandar,
} from "@/src/components/BinStandard";
import { getImageTensorFromCanvas } from "@/src/lib/onnx/imageHelper";
import { predict } from "@/src/lib/onnx/predict";
import { classLabels } from "@/src/data/classLabels";
import { DropDownSelector } from "../ui/inputs";
import { ModelOption } from "@/src/lib/types";
import { killSession } from "@/src/lib/onnx/modelHelper";

export default function Grid({
  modelOptions,
}: {
  modelOptions: ModelOption[];
}) {
  const [country, setCountry] = useState("Australia");
  const [action, setAction] = useState(false);

  const [prediction, setPrediction] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelPath, setModelPath] = useState<ModelOption | undefined>(
    modelOptions.length > 0 ? modelOptions[0] : undefined
  );

  const accordionItems = [
    {
      title:
        country === "Australia"
          ? "Australian standard for mobile bin colours."
          : country === "Colombia"
          ? "Colombian standard for mobile bin colours."
          : "Thai standard for mobile bin colours.",
      content:
        country === "Australia" ? (
          <AustralianStandar />
        ) : country === "Colombia" ? (
          <ColombianStandar />
        ) : (
          <ThaiStandar />
        ),
    },
  ];
  const handleImageCapture = async (canvas: HTMLCanvasElement) => {
    try {
      setLoading(true);
      setError(null);
      setPrediction(null);

      // Preprocess the image to get tensor
      const imageTensor = await getImageTensorFromCanvas(canvas);
      console.log("Image tensor created");
      console.log("Starting prediciton with:", modelPath?.label);
      // Run the model prediction
      const { predictions, inferenceTime } = await predict(
        imageTensor,
        modelPath?.value as string,
        classLabels
      );
      console.log("Prediction completed");

      setPrediction({ predictions, inferenceTime });
    } catch (error) {
      console.error("Error during inference:", error);
      setError("Failed to process the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setPrediction(null);
    setError(null);
    setLoading(false);
  };

  const handleModelChange = async (newModel: ModelOption) => {
    handleReset();
    setAction(false);
    await killSession();
    setModelPath(newModel);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={style.cameraAndPredictionOutContainer}>
          <div className={style.cameraAndPredictionContainer}>
            <div className={style.loaderContainer}>
              <div className={style.loadingSpinner}></div>
            </div>
            <small>Analyzing image...</small>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={style.cameraAndPredictionOutContainer}>
          <div className={style.cameraAndPredictionContainer}>
            <small className={style.error}>{error}</small>
          </div>
        </div>
      );
    }

    if (prediction) {
      return (
        <div className={style.cameraAndPredictionOutContainer}>
          <div className={style.cameraAndPredictionContainer}>
            <div className={style.textBlock}>
              <h4>Prediction</h4>
              <table className={style.predictionTable}>
                <thead>
                  <tr>
                    <th className={style.tableHeader}>Index</th>
                    <th className={style.tableHeader}>Name</th>
                    <th className={style.tableHeader}>Probability (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {prediction.predictions.map((pred: any, index: number) => (
                    <tr key={index} className={style.tableRow}>
                      <td className={style.tableCell}>{index + 1}</td>
                      <td className={style.tableCell}>{pred.name}</td>
                      <td className={style.tableCell}>
                        {Math.round(pred.probability * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <small>
              Inference Time: {prediction.inferenceTime.toFixed(3)} seconds
            </small>
          </div>
        </div>
      );
    }

    return <Camera onCapture={handleImageCapture} action={action} />;
  };
  return (
    <main className={style.main}>
      <div className={style.innerContainer}>
        <div className={style.item1}>
          {renderContent()}

          <DropDownSelector
            options={modelOptions}
            label="Select Model"
            setValue={handleModelChange}
          />
        </div>
        <div className={style.item2}>
          <Actionable
            onCapture={() =>
              !action ? setAction(!action) : (setAction(!action), handleReset())
            }
            action={action}
          />
        </div>
        <div className={style.item3}>
          <Country country={country} setCountry={setCountry} />
        </div>
        <div className={style.item4}>
          <Accordion items={accordionItems} />
        </div>
      </div>
    </main>
  );
}
