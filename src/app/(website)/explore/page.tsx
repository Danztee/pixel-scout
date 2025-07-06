"use client";

import { useMemo } from "react";
import Navbar from "@/components/navbar";
import { FilterSearchComponent } from "@/components/category-filter";
import { ExploreShotsBody, type Shot } from "@/components/explore-shots";
import { ViewAllButton } from "@/components/explore-shots";
// import snapShots from "../snapPage/page";

const staticShots: Shot[] = [
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

export default function ExplorePage() {
  const shots = useMemo(() => staticShots, []);

  return (
    <div>
      <Navbar />
      <section>
        <FilterSearchComponent />
        <section className="container mx-auto px-4 my-5 lg:my-16">
          <ExploreShotsBody shots={shots} />
        </section>
        <section className="py-8">
          <ViewAllButton />
        </section>
      </section>
    </div>
  );
}
