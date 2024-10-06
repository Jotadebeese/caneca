import { Tensor } from "onnxruntime-web";
import { getSession } from "./modelHelper";

// Applies softmax to an array of numbers
function softmax(arr: number[]): number[] {
  const expScores = arr.map((r) => Math.exp(r));
  const sumExpScores = expScores.reduce((a, b) => a + b, 0);

  return expScores.map((r) => r / sumExpScores);
}

// Finds the top k classess based on probabilities

function topKClasses({
  classProbabilities,
  k = 3,
  classLabels,
}: {
  classProbabilities: number[];
  k?: number;
  classLabels: string[];
}) {
  const sorted = classProbabilities
    .map((prop, index) => ({ prop, index }))
    .sort((a, b) => b.prop - a.prop)
    .slice(0, k)
    .map(({ prop, index }) => ({
      name: classLabels[index],
      probability: prop,
    }));
  return sorted;
}

// Run model inference on the provided tensor and returns the predicted classes
export async function predict(
  inputTensor: Tensor,
  MODEL_PATH: string,
  classLabels: string[]
): Promise<{ predictions: any; inferenceTime: number }> {
  try {
    const session = await getSession(MODEL_PATH);

    const feeds: Record<string, Tensor> = {
      input: inputTensor,
    };

    // Run inference and mesure time
    const start = performance.now();
    const results = await session.run(feeds);
    const end = performance.now();
    const inferenceTime = (end - start) / 1000;

    const outputTensor = results.output as Tensor;
    const outputArray = Array.from(outputTensor.data as Float32Array);

    const probabilities = softmax(outputArray);
    const topPredictions = topKClasses({
      classProbabilities: probabilities,
      classLabels: classLabels,
    });
    console.log(`Inference time: ${inferenceTime} seconds`);
    console.log("Top predictions:", topPredictions);

    return { predictions: topPredictions, inferenceTime };
  } catch (error) {
    console.error("Error during prediction:", error);
    throw error;
  }
}
