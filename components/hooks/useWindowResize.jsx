import { useState, useEffect } from "react";

const useWindowResize = (breakpoint = 800) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkWindowSize = () => {
      if (typeof window !== "undefined") {
        setIsDesktop(window.innerWidth >= breakpoint);
      }
    };

    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);

    return () => window.removeEventListener("resize", checkWindowSize);
  }, [breakpoint]);

  return isDesktop;
};

export default useWindowResize;