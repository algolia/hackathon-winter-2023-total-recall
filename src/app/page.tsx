"use client";

import SplashScreen from "./components/splashscreen";
import Story from "./components/story";
import { useSearchParams } from "next/navigation";
import { motion, useAnimation } from "framer-motion";
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
      {!searchParams.get("tab") && !searchParams.get("step") && !isClicked && (
        <header className="text-center mb-24">
          <h1 className="text-4xl font-normal">
            Welcome to the Hackathon demo of #TeamTotalRecall
          </h1>
          <h2 className="text-lg font-normal mt-2 flex gap-4 justify-center">
            {[
              {
                name: "Clementine Caroubi",
                avatar:
                  "https://ca.slack-edge.com/T026AN50K-U0494UYA2TT-bd668a49574f-512",
              },
              {
                name: "Raed Chammam",
                avatar:
                  "https://ca.slack-edge.com/T026AN50K-U044E0W132T-350e5c960835-512",
              },
              {
                name: "Lucas Bonomi",
                avatar:
                  "https://ca.slack-edge.com/T026AN50K-U0MBG3Z1D-a5a8a263bf97-512",
              },
              {
                name: "Sarah Dayan",
                avatar:
                  "https://ca.slack-edge.com/T026AN50K-UAQATARPZ-398be3286b95-512",
              },
            ].map((author, index) => (
              <span className="flex items-center">
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={author.avatar}
                  alt=""
                />
                <span className="ml-2">{author.name}</span>
              </span>
            ))}
          </h2>
        </header>
      )}

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
