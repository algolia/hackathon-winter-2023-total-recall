import { Splash } from "next/font/google";
import Story from "./components/story";

const SplashScreen = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/hilnmyskv/image/upload/v1701272241/hackathon/Group_2049.png"
          loading="lazy"
          alt="logo"
          className="w-96"
        />
      </div>
      <div>
        <h2>jexplique la demo recommend</h2>
        <p>
          You don’t need to hire a full data science team.  Best practices and
          models for content understanding are built into NeuralSearch. je
          demarre ma demo
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <header className="text-center text-2xl font-black mb-24">
        <h1>Hello, this is the best demo you'll see today guys</h1>
      </header>

      <SplashScreen />
      <Story />
    </main>
  );
}
