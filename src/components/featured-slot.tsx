"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

const FeaturedSlot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const apps = [
    {
      id: 1,
      image: "/landing-page/feat-1.png",
      dimensions: "280 × 280",
    },
    {
      id: 2,
      image: "/landing-page/feat-2.png",
    },
    {
      id: 3,
      image: "/landing-page/feat-3.png",
    },
    {
      id: 4,
      image: "/landing-page/feat-4.png",
    },
    {
      id: 5,
      image: "/landing-page/feat-5.png",
    },
    {
      id: 6,
      image: "/landing-page/feat-6.png",
    },
    {
      id: 7,
      image: "/landing-page/feat-7.png",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const gallery = galleryRef.current;
    const panels = panelRefs.current.filter(Boolean);

    if (!container || !gallery || panels.length === 0) return;

    const totalPanelWidth = panels.reduce(
      (width, panel) => width + (panel?.offsetWidth || 0),
      0
    );

    const scrollDistance = Math.max(0, totalPanelWidth - window.innerWidth);

    const scrollTween = gsap.to(gallery, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollDistance + window.innerWidth}`,
        invalidateOnRefresh: true,
      },
    });

    panels.forEach((panel, index) => {
      const numberElement = panel?.querySelector(".number-outline");
      if (numberElement) {
        if (index === 0) {
          gsap.set(numberElement, {
            color: "#EE2A7B",
            WebkitTextStroke: "1px #EE2A7B",
          });
        } else {
          gsap.set(numberElement, {
            color: "transparent",
            WebkitTextStroke: "1px #EE2A7B",
          });
        }

        gsap.fromTo(
          numberElement,
          {
            color: index === 0 ? "#EE2A7B" : "transparent",
            WebkitTextStroke: "1px #EE2A7B",
          },
          {
            color: "#EE2A7B",
            WebkitTextStroke: "1px #EE2A7B",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left center-=100",
              end: "right center+=100",
              scrub: true,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden space-y-16 pt-10">
      <div className="flex justify-center">
        <div className="bg-[#242728] border-[#474D50] border rounded-lg p-2 text-white text-sm w-fit">
          Featured Slot
        </div>
      </div>

      <div
        ref={galleryRef}
        className="flex items-center h-[50vh] px-4 relative left-8"
      >
        {apps.map((app, index) => (
          <div
            key={app.id}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="flex-shrink-0 w-full md:w-1/4 px-4 h-full flex flex-col items-center justify-center m-2"
          >
            <div className="relative">
              <span
                className="absolute font-bold number-outline"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #EE2A7B",
                  left: "-0.3em",
                  top: "-0.3em",
                  zIndex: -1,
                  fontSize: "250px",
                  fontWeight: "normal",
                }}
              >
                {app.id}
              </span>
              <div className="w-[250px] h-[250px] relative">
                <Image
                  src={app.image}
                  alt={`Featured shot ${app.id}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/dashboard" className="flex justify-center mt-8">
        <button className="px-8 py-4 rounded-3xl text-white font-medium bg-black border border-[#474D5099] bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.024)] to-[rgba(255,255,255,0.08)] cursor-pointer">
          Explore Now
        </button>
      </Link>
    </div>
  );
};

export default FeaturedSlot;
