# Caneca V1 - Client-Side Rubbish Classifier

This repository contains the original proof-of-concept for the Caneca rubbish classifier. It's a web application built with Next.js that performs machine learning inference entirely in the user's browser using ONNX Runtime Web.

The ONNX models are not bundled with the application; they are fetched remotely from a Cloudflare R2 bucket at runtime.

**Live Demo:** **[https://caneca-self.vercel.app/](https://caneca-self.vercel.app/)**

---

## Project Status

This application served as a successful prototype. Its current focus is shifting to act as a **data collection tool** for the next-generation version of the project by integrating with the new V2 backend.

All new backend and future web app development is happening in the V2 repository.

➡️ **V2 Repository (Backend & Future Web App):** **[https://github.com/Jotadebeese/caneca_v2](https://github.com/Jotadebeese/caneca_v2)**

---

## Core Technology

* **Framework:** Next.js
* **Language:** TypeScript
* **ML Inference:** [ONNX Runtime Web](https://onnxruntime.ai/) for client-side inference.
* **Model Hosting:** ONNX models are hosted on and loaded from [Cloudflare R2](https://www.cloudflare.com/products/r2/).

### Model Conversion

The PyTorch models used in this project were converted to the ONNX format using a custom Python script.

➡️ **See the ONNX Exporter Script:** **[https://github.com/Jotadebeese/Rubbish-Classifier-Updated/tree/main/ONNX_exporter](https://github.com/Jotadebeese/Rubbish-Classifier-Updated/tree/main/ONNX_exporter)**

---

## Local Development

### Prerequisites

* Node.js

### Installation

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/Jotadebeese/caneca.git](https://github.com/Jotadebeese/caneca.git)
    cd caneca
    ```
2.  **Install dependencies (choose one):**

    Using npm:
    ```sh
    npm install
    ```
    Using yarn:
    ```sh
    yarn
    ```
3.  **Run the dev server (choose one):**

    Using npm:
    ```sh
    npm run dev
    ```
    Using yarn:
    ```sh
    yarn dev
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).
