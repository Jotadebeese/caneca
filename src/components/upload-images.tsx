"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Camera from "./Camera/Camera";

interface Label {
  id: string;
  value: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: any;
    es: any;
  };
}

interface Media {
  id: string;
  url: string;
  alt: string;
}

export default function UploadImages() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [locale, setLocale] = useState<"en" | "es">("es");
  const [selectedLabel, setSelectedLabel] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string>("");
  const [inputMode, setInputMode] = useState<"upload" | "camera">("upload");
  const [triggerCapture, setTriggerCapture] = useState<boolean>(false);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/labels?locale=all&limit=100`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setLabels(data.docs || []))
      .catch((err) => {
        console.error(err);
        setStatus("error");
        setError("Could not load categories from the server.");
      });
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCameraCapture = (canvas: HTMLCanvasElement) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `camera-capture-${Date.now()}.jpg`, {
            type: "image/jpeg",
          });
          setSelectedFile(file);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          setPreviewUrl(URL.createObjectURL(file));
          setInputMode("upload");
        }
      },
      "image/jpeg",
      0.95
    );
    setTriggerCapture(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedLabel) {
      setError("Please select a category and an image.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const numberSelectedLabel = parseInt(selectedLabel, 10);
      const labelObject = labels.find((l) => {
        const id = parseInt(l.id, 10);
        return id === numberSelectedLabel;
      });
      console.log("Selected label object:", labelObject);
      const englishLabelName = labelObject?.name?.en || "User Submission";
      const generatedAltText = `${englishLabelName} - ${selectedFile.name}`;

      const mediaFormData = new FormData();
      mediaFormData.append("file", selectedFile);

      const mediaRes = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media`,
        {
          method: "POST",
          body: mediaFormData,
        }
      );

      if (!mediaRes.ok) throw new Error("Step 1: Image upload failed.");
      const newMedia: { doc: Media } = await mediaRes.json();
      const mediaId = newMedia.doc.id;

      await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media/${mediaId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alt: generatedAltText }),
        }
      );

      const submissionRes = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: mediaId,
            userCorrectedLabel: parseInt(selectedLabel, 10),
          }),
        }
      );

      if (!submissionRes.ok)
        throw new Error("Step 3: Failed to create submission record.");
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
      console.error(err);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white w-full max-w-[1440px] mx-auto rounded-2xl p-8! flex justify-center flex-col items-center text-center shadow-sm">
        <h2 className="text-3xl font-bold text-primary-02">
          ¡Gracias! / Thank you!
        </h2>
        <p className="mt-4! text-lg text-primary-02">
          Your image has been submitted successfully.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6! px-6! py-2! bg-secondary! text-white! font-semibold! rounded-lg  transition-colors"
        >
          Submit Another Image
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full max-w-[1440px] mx-auto rounded-2xl p-6! sm:p-8! shadow-sm mb-10!">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4! border-b border-slate-200 pb-4! mb-6!">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Contribute Image
          </h1>
          <p className="mt-1 text-slate-500">
            Help build the dataset by labeling and uploading an image.
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-1! p-1! bg-secondary! rounded-lg self-start sm:self-center">
          <button
            onClick={() => setLocale("en")}
            className={`px-3! py-1! text-sm font-semibold rounded-md transition-colors ${
              locale === "en"
                ? "bg-white! text-slate-800! shadow-sm"
                : "bg-transparent! text-white! "
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLocale("es")}
            className={`px-3! py-1! text-sm font-semibold rounded-md transition-colors ${
              locale === "es"
                ? "bg-white! text-slate-800! shadow-sm"
                : "bg-transparent! text-white! "
            }`}
          >
            Español
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10!">
        <fieldset>
          <legend className="text-xl font-semibold text-slate-800 mb-4!">
            1. Choose an image to upload
          </legend>
          <div className="flex border border-slate-200 rounded-lg p-1! mb-4! max-w-xs">
            <button
              type="button"
              onClick={() => setInputMode("upload")}
              className={`flex-1 text-center text-sm font-semibold p-2! rounded-md transition-colors ${
                inputMode === "upload"
                  ? "bg-primary-02! text-white!"
                  : "hover:bg-slate-100!"
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setInputMode("camera")}
              className={`flex-1 text-center text-sm font-semibold p-2! rounded-md transition-colors ${
                inputMode === "camera"
                  ? "bg-primary-02! text-white!"
                  : "hover:bg-slate-100!"
              }`}
            >
              Use Camera
            </button>
          </div>
          {inputMode === "upload" ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!selectedFile}
                className="block w-full text-sm text-slate-500 file:mr-4! file:py-2! file:px-4! file:rounded-full file:border-0! file:text-sm file:font-semibold file:bg-slate-100! file:text-slate-700! hover:file:bg-slate-200! cursor-pointer"
              />
              {previewUrl && (
                <div className="mt-4!">
                  <p className="text-sm text-slate-600 mb-2!">Image Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Selected preview"
                    className="max-w-xs rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full aspect-square max-w-2xl bg-slate-200 rounded-lg ">
              <Camera onCapture={handleCameraCapture} action={triggerCapture} />
              <button
                type="button"
                onClick={() => setTriggerCapture(true)}
                className="w-full px-6! py-3! text-white font-semibold rounded-lg"
              >
                Take Picture
              </button>
            </div>
          )}
        </fieldset>
        <fieldset>
          <legend className="text-xl font-semibold text-slate-800 mb-4!">
            2. Select the correct category
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4!">
            {labels.length > 0 ? (
              labels.map((label) => (
                <div
                  key={label.id}
                  className="has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-600 has-[:checked]:ring-2 has-[:checked]:ring-indigo-200 border border-slate-200 rounded-lg transition-all duration-200"
                >
                  <label
                    htmlFor={label.id}
                    className="flex p-4! gap-4! cursor-pointer"
                  >
                    <input
                      type="radio"
                      id={label.id}
                      name="label"
                      value={label.id}
                      onChange={(e) => setSelectedLabel(e.target.value)}
                      required
                      className="h-5 w-5 mt-0.5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <div className="text-sm flex-1">
                      <strong className="text-base font-semibold text-slate-900">
                        {label.name[locale]}
                      </strong>
                      <div className="text-slate-600 prose prose-sm max-w-none mt-1!">
                        <RichText data={label.description[locale]} />
                      </div>
                    </div>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-slate-500 col-span-2">Loading categories...</p>
            )}
          </div>
        </fieldset>

        <div className="pt-6! border-t border-slate-200">
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6! py-3! bg-secondary! text-white!  rounded-lg  disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            {status === "loading" ? "Uploading..." : "Submit Image"}
          </button>
          {error && (
            <p className="mt-4! text-center text-red-600 font-medium">
              Error: {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
