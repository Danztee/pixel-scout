import Image from "next/image";
import Link from "next/link";
import React from "react";

const ExploreShots = () => {
  const shots = [
    {
      image: "/landing-page/shot-1.png",
      title: "Door Dash - Food & groceries, delivered",
      tag: "Food",
    },
    {
      image: "/landing-page/shot-2.png",
      title: "Nike - Exclusive shopping & releases",
      tag: "Shop",
    },
    {
      image: "/landing-page/shot-3.png",
      title: "Blue Apron - Home cooking delivery service",
      tag: "Food",
    },
    {
      image: "/landing-page/shot-4.png",
      title: "Squarespace - Build a brand, website & store",
      tag: "No-code",
    },
    {
      image: "/landing-page/shot-5.png",
      title: "Family - Your favorite crypto wallet",
      tag: "Wallet",
    },
    {
      image: "/landing-page/shot-6.png",
      title: "Mozi - A place for your people",
      tag: "Travel",
    },
  ];
  return (
    <div className="space-y-16">
      <div className="flex justify-center">
        <div className="bg-[#242728] border-[#474D50] border rounded-lg p-2 text-white text-sm w-fit">
          Explore Shots
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {shots.map((shot, index) => (
          <aside
            className="overflow-hidden rounded-xl border border-[#242728] bg-[#0B0B0B] pt-4"
            key={index}
          >
            <Image
              src={shot.image}
              alt={shot.title}
              width={100}
              height={100}
              className="object-cover w-full"
              //   placeholder="blur"
              priority
              unoptimized
            />

            <div className="p-4 flex items-center justify-between bg-black">
              <h2 className="text-white text-2xl font-bold truncate overflow-hidden whitespace-nowrap max-w-[80%]">
                {shot.title}
              </h2>
              <p className="text-white bg-[#242728] text-sm rounded-full p-2 w-fit px-4">
                {shot.tag}
              </p>
            </div>
          </aside>
        ))}
      </div>

      <Link href="" className="flex justify-center">
        <button className="px-8 py-4 rounded-3xl text-white font-medium bg-black border border-[#474D5099] bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.024)] to-[rgba(255,255,255,0.08)] cursor-pointer">
          View All
        </button>
      </Link>
    </div>
  );
};

export default ExploreShots;
