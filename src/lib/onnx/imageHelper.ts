import { Tensor } from "onnxruntime-web";

/**
 * Converts a canvas image to a preprocessed tensor suitable for the model.
 */
export async function getImageTensorFromCanvas(
  canvas: HTMLCanvasElement
): Promise<Tensor> {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Cannot get canvas context");
  }

  const width = 224; // Model's expected width
  const height = 224; // Model's expected height

  // Resize the image
  const resizedCanvas = document.createElement("canvas");
  resizedCanvas.width = width;
  resizedCanvas.height = height;
  const resizedContext = resizedCanvas.getContext("2d");
  if (!resizedContext) {
    throw new Error("Cannot get resized canvas context");
  }
  resizedContext.drawImage(canvas, 0, 0, width, height);

  const imageData = resizedContext.getImageData(0, 0, width, height);
  const { data } = imageData;

  const dims = [1, 3, height, width];
  const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * 4;
      const r = data[pixelIndex] / 255.0;
      const g = data[pixelIndex + 1] / 255.0;
      const b = data[pixelIndex + 2] / 255.0;

      // Channels first
      float32Data[y * width + x] = r;
      float32Data[dims[2] * dims[3] + y * width + x] = g;
      float32Data[2 * dims[2] * dims[3] + y * width + x] = b;
    }
  }

  return new Tensor("float32", float32Data, dims);
}
