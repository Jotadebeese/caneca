//import * as ort from "onnxruntime-web";
const ort = (window as any).ort;

//let session: ort.InferenceSession | null = null;
let session: any = null;
ort.env.wasm.wasmPaths =
  "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/";

export async function getSession(MODEL_PATH: string): Promise<any> {
  const model = MODEL_PATH.split("/").pop();
  if (!session) {
    session = await ort.InferenceSession.create(MODEL_PATH, {
      executionProviders: ["wasm"],
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
