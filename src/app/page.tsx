import Header from "@/components/header";
import Image from "next/image";
import icons from "@/public/landing-page/icons.png";
import FeaturedSlot from "@/components/featured-slot";
import ExploreShots from "@/components/explore-shots";

export default function Home() {
  return (
    <div>
      <main>
        <Header>
          <section className="h-[calc(100vh-120px)]">
            <div className="container mx-auto px-4 py-12">
              <div className="space-y-8 mt-[8rem]">
                <div className="flex items-center justify-center">
                  <div className="bg-[#242728] border-[#474D50] border rounded-lg p-2 text-white w-fit">
                    Open Source
                  </div>
                </div>

                <h1 className="text-5xl font-bold text-[#576063] text-center space-y-1">
                  <div>
                    <span className="font-[booksellerBk] italic text-white font-light">
                      Level up your
                    </span>{" "}
                    <span>designs 🎨</span>
                  </div>

                  <div className="flex justify-center items-center gap-2">
                    <span>with curated app</span>

                    <Image src={icons} alt="icons" className="w-[150px]" />

                    <span className="font-[booksellerBk] italic text-white font-light mt-3">
                      UI screenshots!
                    </span>
                  </div>
                  <span>Get inspired today.</span>
                </h1>
              </div>
            </div>
          </section>
        </Header>

        <section className="my-12 lg:my-20">
          <FeaturedSlot />
        </section>

        <section className="container mx-auto px-4 my-12 lg:my-20">
          <ExploreShots />
        </section>
      </main>
    </div>
  );
}
