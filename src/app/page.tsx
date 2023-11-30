"use client";

import { motion, useAnimation } from "framer-motion";
import SplashScreen from "./components/splashscreen";
import Story from "./components/story";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const controls = useAnimation();

  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    console.log("isClicked", isClicked);
    const animateSplashScreen = async () => {
      await controls.start({ opacity: 0, scale: 1.5 });

      controls.set({ display: "none" });
    };

    if (!searchParams.get("tab") && !searchParams.get("step") && isClicked) {
      animateSplashScreen();
      window.history.pushState({}, "", "?tab=0&step=0");
    }
  }, [isClicked]);

  return (
    <main className="min-h-screen p-24">
      <header className="text-center mb-24">
        <h1 className="text-4xl font-normal leading-9">
          Hello, this is the best demo you'll see today guys
        </h1>
      </header>

      <motion.div
        style={{ display: "block" }}
        initial={{ opacity: 1, scale: 1 }}
        animate={controls}
      >
        {!searchParams.get("tab") && !searchParams.get("step") && (
          <SplashScreen setIsClicked={setIsClicked} />
        )}
      </motion.div>

      {searchParams.get("tab") || searchParams.get("step") || isClicked ? (
        <Story />
      ) : null}
    </main>
  );
}
