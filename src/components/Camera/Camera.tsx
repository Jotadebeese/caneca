"use client";
import { useEffect, useRef, useState } from "react";
import style from "./Camera.module.css";
import Image from "next/image";
import webcamIcon from "@/src/images/icons/webcam.svg";

export default function Camera({
  onCapture,
  action,
}: {
  onCapture: (image: HTMLCanvasElement) => void;
  action: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [image, setImage] = useState(false);

  // This useEffect hook now handles starting the camera.
  // It runs only when `cameraOn` changes to `true`.
  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (cameraOn && videoRef.current) {
        try {
          console.log(
            "1. `cameraOn` is true, attempting to get media stream..."
          );
          stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
            audio: false,
          });
          console.log("2. Stream received:", stream);

          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          console.log("3. Video is playing.");
        } catch (e) {
          console.error("Error accessing the camera", e);
          alert(
            "Could not access the camera. Please check permissions and ensure it is not in use by another app."
          );
          setCameraOn(false); // Turn off on error
        }
      }
    };

    startCamera();

    // This is a crucial cleanup function.
    // It runs when the component is unmounted or `cameraOn` becomes false.
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        console.log("Camera stream stopped.");
      }
    };
  }, [cameraOn]); // <-- The hook correctly depends on the `cameraOn` state.

  // This function is now very simple. It only changes the state.
  const handleEnableCameraClick = () => {
    setCameraOn(true);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        onCapture(canvas);
        setImage(true);
        console.log("Image captured");
      }
    }
  };

  useEffect(() => {
    if (action) {
      captureImage();
    } else {
      setImage(false);
    }
  }, [action]);

  return (
    <div className={style.videoContainer}>
      {!cameraOn && (
        // This button now ONLY sets the state.
        <div onClick={handleEnableCameraClick} className={style.allowContainer}>
          <Image src={webcamIcon} alt="camera" width={80} height={80} />
        </div>
      )}

      {/* This section now correctly renders BEFORE we try to access the stream */}
      {cameraOn && (
        <>
          <div className={style.overlay}></div>
          <video
            ref={videoRef}
            className={style.video}
            autoPlay
            playsInline
            muted // `muted` is a good attribute to add for autoplay compatibility
            style={image ? { display: "none" } : {}}
          ></video>
          <canvas
            className={style.video}
            ref={canvasRef}
            style={image ? { display: "block" } : { display: "none" }}
          ></canvas>
        </>
      )}
    </div>
  );
}
