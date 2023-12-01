"use client";

import Link from "next/link";

const SplashScreen = ({
  setIsClicked,
}: {
  setIsClicked: (value: boolean) => void;
}) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <div className="flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/hilnmyskv/image/upload/v1701272241/hackathon/Group_2049.png"
          loading="lazy"
          alt="logo"
          className="w-[600px]"
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-start gap-6 w-full max-w-[500px]">
          <h2 className="text-2xl text-grey-800 dark:text-grey-200">
            How to implement personalized recommendations with Algolia
          </h2>
          <p className="text-grey-600 text-pretty dark:text-grey-400">
            With Algolia Recommend, you can easily add personalized product
            recommendations to your e-commerce website. This demo shows how to
            use Algolia Recommend to display personalized recommendations on a
            product page.
          </p>

          <button
            className="text-xenon-500 dark:text-xenon-300 group"
            onClick={() => setIsClicked(true)}
          >
            Let&apos;s start the demo{" "}
            <span className="relative top-0.5 group-hover:left-2">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
