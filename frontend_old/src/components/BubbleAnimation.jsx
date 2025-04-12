import { useEffect } from "react";
import gsap from "gsap";

const BubbleAnimation = () => {
  useEffect(() => {
    gsap.to("#moving-background", {
      y: 300, // Move up and down
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return null; // This component just runs animations
};

export default BubbleAnimation;
