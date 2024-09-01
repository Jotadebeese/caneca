"use client";
import { useEffect, useRef, useState } from "react";
import style from "@/src/styles/Camera.module.css";
import Image from "next/image";
import webcamIcon from "@/src/images/icons/webcam.svg";

export default function Camera({
  onCapture,
}: {
  onCapture: (image: HTMLCanvasElement) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [image, setImage] = useState(false);

  const allowCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraOn(true);
    } catch (e) {
      setCameraOn(false);
      console.error("Error accessing the camera", e);
      switch ((e as Error).name) {
        case "NotAllowedError":
          alert("You must allow access to the camera");
          break;
        case "NotFoundError":
          alert("No camera found in this device");
          break;
        default:
          alert("Error accessing the camera");
      }
    }
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
      }
    }
  };

  useEffect(() => {
    allowCamera();
  }, []);
  const handleIconClick = () => {
    allowCamera();
  };

  return (
    <div className={style.videoContainer}>
      {!cameraOn && (
        <div onClick={handleIconClick} className={style.allowContainer}>
          <Image src={webcamIcon} alt="camera" width={80} height={80} />
        </div>
      )}
      {cameraOn && (
        <>
          <div className={style.overlay}></div>
          <video
            ref={videoRef}
            className={style.video}
            autoPlay
            playsInline
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
