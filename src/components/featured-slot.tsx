"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

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
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const gallery = galleryRef.current;
    const panels = panelRefs.current.filter(Boolean);

    if (!container || !gallery || panels.length === 0) return;

    // Calculate the total width for horizontal scrolling
    // We need to scroll less since we're showing 4 items at once
    const totalPanelWidth = panels.reduce(
      (width, panel) => width + (panel?.offsetWidth || 0),
      0
    );

    // We need to scroll only enough to see the last item
    // Since we're showing 4 at once, we need to scroll (totalItems - 4) * panelWidth
    const scrollDistance = Math.max(0, totalPanelWidth - window.innerWidth);

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(gallery, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollDistance + window.innerWidth * 0.5}`, // Add some extra scroll distance
        invalidateOnRefresh: true,
      },
    });

    // Create animations for filling the numbers
    panels.forEach((panel, index) => {
      const numberElement = panel?.querySelector(".number-outline");
      if (numberElement) {
        // Set initial styles based on index
        if (index === 0) {
          gsap.set(numberElement, {
            color: "#EE2A7B", // First number starts filled
            WebkitTextStroke: "1px #EE2A7B",
          });
        } else {
          gsap.set(numberElement, {
            color: "transparent", // Others start as outlines
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
              start: "left center",
              end: "right center",
              scrub: true,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      // Clean up ScrollTrigger on component unmount
      scrollTween.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="">
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div className="flex justify-center mb-8 pt-8">
          <div className="bg-[#242728] border-[#474D50] border rounded-lg p-2 text-white w-fit">
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
              className="flex-shrink-0 w-1/4 px-4 h-full flex flex-col items-center justify-center"
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

        <div className="flex justify-center mt-8">
          <button className="px-6 py-4 rounded-3xl text-white font-medium bg-black border border-[#474D5099] bg-gradient-to-b from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.024)] to-[rgba(255,255,255,0.08)]">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSlot;
