"use client";

import Link from "next/link";

const SplashScreen = () => {
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
          <h2 className="text-2xl text-grey-800">
            How to implement personalized recommendations with Algolia
          </h2>
          <p className="text-grey-600 text-pretty">
            With Algolia Recommend, you can easily add personalized product
            recommendations to your e-commerce website. This demo shows how to
            use Algolia Recommend to display personalized recommendations on a
            product page.
          </p>

          <Link href="?tab=0&step=0" className="font-bold text-xenon-500">
            Let's start the demo ▶
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
