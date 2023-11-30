"use client";

import SplashScreen from "./components/splashscreen";
import Story from "./components/story";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  return (
    <main className="min-h-screen p-24">
      <header className="text-center mb-24">
        <h1 className="text-4xl font-normal leading-9">
          Hello, this is the best demo you'll see today guys
        </h1>
      </header>

      {!searchParams.get("tab") && !searchParams.get("step") ? (
        <SplashScreen />
      ) : (
        <Story />
      )}
    </main>
  );
}
