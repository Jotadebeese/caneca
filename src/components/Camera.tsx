"use client";
import { useEffect, useRef, useState } from "react";
import style from "@/src/styles/Camera.module.css";
import Image from "next/image";
import webcamIcon from "@/src/images/icons/webcam.svg";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);

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
          ></video>
        </>
      )}
    </div>
  );
}
