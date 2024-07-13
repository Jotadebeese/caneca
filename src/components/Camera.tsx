"use client";
import { useEffect, useRef, useState } from "react";
import style from "@/src/styles/Camera.module.css";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((e) => {
        console.error("Error accessing the camera", e);
        switch (e.name) {
          case "NotAllowedError":
            alert("You must allow access to the camera");
            break;
          case "NotFoundError":
            alert("No camera found in this device");
            break;
          default:
            alert("Error accessing the camera");
        }
      });
  }, [cameraOn]);
  const handleIconClick = () => {
    setCameraOn(!cameraOn);
  };
  return (
    <div className={style.videoContainer}>
      {!cameraOn && (
        <div onClick={handleIconClick}>
          <span className={style.icon} role="img" aria-label="camera">
            📷
          </span>
          <h1 className={style.heading}>Click to Use Camera</h1>
        </div>
      )}
      {cameraOn && (
        <>
          <div className={style.overlay}></div>
          <video ref={videoRef} className={style.video} autoPlay></video>
        </>
      )}
    </div>
  );
}
