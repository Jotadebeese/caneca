import path from "path";
import fs from "fs";
import { ModelOption } from "../types";

export function listModelOptions(): ModelOption[] {
  const modelsDir = path.join(process.cwd(), "public", "models", "ONNX_models");

  // Check if the directory exists
  if (!fs.existsSync(modelsDir)) {
    console.warn(`Models directory does not exist at path: ${modelsDir}`);
    return [];
  }
  // Read all files in the ONNX_models directory
  const files = fs.readdirSync(modelsDir);

  // Filter out only the ONNX model files
  const onnxFiles = files.filter((file) => file.endsWith(".onnx"));

  //  Map to model options
  const modelOptions = onnxFiles.map((file) => {
    // Extract model name and epochs from the file name
    // Example filename: effnetb0_extra_info_betweem_10_epochs.onnx
    const regex = /^([a-zA-Z0-9_]+).*?_(\d+)_epochs\.onnx$/;
    const match = file.match(regex);

    if (!match) {
      console.warn(`Filename "${file}" does not match the expected pattern`);
      return null;
    }

    const [, modelName, epochs] = match;

    // Create a user-friendly label
    let label = "";
    if (modelName.toLowerCase().startsWith("effnet")) {
      const version = modelName
        .replace("effnet", "EfficientNet")
        .split("_")[0]
        .toUpperCase();
      label = `${version} (${epochs} epochs)`;
    } else if (modelName.toLowerCase().startsWith("vit")) {
      const version = modelName
        .toUpperCase()
        .split("_")
        .slice(0, 3)
        .join("")
        .replace("_", "");
      label = `${version} (${epochs} epochs)`;
    } else {
      const version = modelName.toUpperCase().split("_")[0];
      label = `${version} (${epochs} epochs)`;
    }

    const value = `/models/ONNX_models/${file}`;

    return { label, value };
  });

  const validModelOptions: ModelOption[] = modelOptions.filter(
    (option): option is ModelOption => option !== null
  );
  return validModelOptions;
}
