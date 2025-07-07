"use client";

import { shots } from "@/constants/shot";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FilterSearchComponent } from "./category-filter";

const Shots = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const pathname = usePathname();
  const router = useRouter();

  const handleViewMore = () => {
    if (pathname === "/dashboard") {
      setVisibleCount((prev) => Math.min(prev + 6, shots.length));
    } else {
      router.push("/auth/sign-in");
    }
  };

  const handleShotClick = (shotId: number) => {
    router.push(`/dashboard/shots/${shotId}`);
  };

  const hasMoreShots = visibleCount < shots.length;
  const visibleShots = shots.slice(0, visibleCount);

  return (
    <div className="space-y-10">
      {pathname === "/dashboard" && <FilterSearchComponent />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {visibleShots.map((shot) => (
          <aside
            className="overflow-hidden rounded-xl border border-[#242728] bg-[#0B0B0B] pt-4 cursor-pointer hover:border-gray-600 transition-colors"
            key={shot.id}
            onClick={() => handleShotClick(shot.id)}
          >
            <Image
              src={shot.image}
              alt={shot.title}
              width={100}
              height={100}
              className="object-cover w-full"
              priority
              unoptimized
            />

            <div className="p-4 flex items-center gap-3 bg-black">
              <h2 className="text-white text-2xl font-bold truncate overflow-hidden whitespace-nowrap min-w-0 flex-1">
                {shot.title}
              </h2>
              <p className="text-white bg-[#242728] text-sm rounded-full p-2 px-4 w-fit">
                {shot.tag}
              </p>
            </div>
          </aside>
        ))}
      </div>

      {hasMoreShots && (
        <div className="flex justify-center items-center">
          <button
            onClick={handleViewMore}
            className="px-8 py-4 rounded-3xl text-white font-medium bg-black border border-[#474D5099] bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.024)] to-[rgba(255,255,255,0.08)] cursor-pointer"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default Shots;
