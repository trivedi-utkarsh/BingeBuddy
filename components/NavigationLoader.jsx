// components/NavigationLoader.js
"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./Loader";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showLoader, setShowLoader] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const handleStart = () => {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout to show loader after 300ms
      const newTimeoutId = setTimeout(() => {
        setShowLoader(true);
      }, 300);
      
      setTimeoutId(newTimeoutId);
    };

    const handleComplete = () => {
      // Clear timeout and hide loader
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setShowLoader(false);
    };

    // Start loading
    handleStart();

    // Cleanup on route change complete
    return () => {
      handleComplete();
    };
  }, [pathname, searchParams]);

  return showLoader ? <Loader /> : null;
}