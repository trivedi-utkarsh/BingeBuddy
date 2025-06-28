"use client";

import { useEffect, useState } from "react";

export default function BackgroundVideo() {
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsReversed((prev) => !prev);
    }, 20000); // switch every 20 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Forward Video */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className={`fixed top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-1000 ${
          isReversed ? "opacity-0" : "opacity-100"
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Reversed Video */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className={`fixed top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-1000 ${
          isReversed ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/backgroundrev.mp4" type="video/mp4" />
      </video>
    </>
  );
}
