import Image from "next/image";
import React from "react";

import screen1 from "@/public/screen.png";

const Page = () => {
  const details = {
    title: "Door Dash",
    description: "Food & groceries, delivered",
    tag: ["Food"],
    image: "/door-dash.png",

    screenshots: [
      {
        page: "Onboarding",
        screens: [screen1, screen1, screen1, screen1, screen1],
      },
      {
        page: "Other Screens",
        screens: [
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
          screen1,
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 my-8 lg:my-20">
      <div className="flex items-center gap-4">
        <div
          style={{
            boxShadow: "0px 1px 16.7px 5px #00000040",
          }}
        >
          <Image
            src={details.image}
            alt={details.title}
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{details.title}</h1>
          <p className="text-sm text-[#fff] font-[400]">
            {details.description}
          </p>

          <p className="text-sm text-[#fff] bg-[#242728] rounded-[38px] border-none px-4 py-2 w-fit">
            {details.tag.join(", ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-20 space-y-8">
        {details.screenshots.map((screenshot, index) => (
          <div key={index}>
            <h1 className="text-2xl font-bold">{screenshot.page}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
              {screenshot.screens.map((screen, index) => (
                <Image
                  key={index}
                  src={screen}
                  alt={screenshot.page}
                  className="rounded-[18.31px] border border-[#242728] w-full h-full object-cover"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
