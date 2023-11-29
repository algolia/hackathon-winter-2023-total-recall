"use client";

import { useState } from "react";
import SplashScreen from "./components/splashscreen";
import Story from "./components/story";

export default function Home() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  return (
    <main className="min-h-screen p-24">
      <header className="text-center text-2xl font-black mb-24">
        <h1>Hello, this is the best demo you'll see today guys</h1>
      </header>

      {showSplashScreen && (
        <SplashScreen showSplashScreen={setShowSplashScreen} />
      )}
      {!showSplashScreen && <Story />}
    </main>
  );
}
