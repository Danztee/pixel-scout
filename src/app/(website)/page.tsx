import Header from "@/components/header";
import Image from "next/image";
import icons from "@/public/landing-page/icons.png";
import FeaturedSlot from "@/components/featured-slot";
import Shots from "@/components/shots";

export default function HomePage() {
  return (
    <div>
      <main>
        <Header>
          <section className="container mx-auto px-4 my-8 lg:my-20">
            <div className="space-y-8 lg:space-y-10 pb-20 lg:pb-40 pt-12">
              <div className="flex items-center justify-center">
                <div className="bg-[#242728] border-[#474D50] border rounded-lg p-2 text-white text-sm w-fit">
                  Open Source
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-[#576063] text-center space-y-1 md:space-y-2">
                <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
                  <span className="font-[booksellerBk] italic text-white font-light">
                    Level up your
                  </span>{" "}
                  <span>designs 🎨</span>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2">
                  <span>with curated app</span>

                  <Image
                    src={icons}
                    alt="icons"
                    className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[150px]"
                  />

                  <span className="font-[booksellerBk] italic text-white font-light mt-1 md:mt-2 lg:mt-3">
                    UI screenshots!
                  </span>
                </div>
                <span>Get inspired today.</span>
              </h1>
            </div>
          </section>
        </Header>

        <section className="">
          <FeaturedSlot />
        </section>

        <section className="container mx-auto px-4 my-12 lg:my-20">
          <Shots />
        </section>
      </main>
    </div>
  );
}
