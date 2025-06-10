import * as ort from "onnxruntime-web";

let session: ort.InferenceSession | null = null;

export async function getSession(
  MODEL_PATH: string
): Promise<ort.InferenceSession> {
  const model = MODEL_PATH.split("/").pop();
  if (!session) {
    session = await ort.InferenceSession.create(MODEL_PATH, {
      executionProviders: ["webgl", "wasm"],
      graphOptimizationLevel: "all",
    });
    console.log("Inference Session created with", model);
  }
  return session;
}

export async function killSession() {
  if (session) {
    session = null;
    console.log("Inference Session killed");
  }
}
