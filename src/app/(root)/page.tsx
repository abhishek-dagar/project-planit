import PriceCard from "@/components/cards/price-card";
import { ContainerScroll } from "@/components/common/container-scroll-animation";
import { LampComponent } from "@/components/common/lamp-animation";
import { Button } from "@/components/ui/button";
import { priceDetails } from "@/lib/config/price.config";
import { PriceDetailType } from "@/lib/types/price.type";

export default function Home() {
  //WIP: remove fault IMAge for home page
  return (
    <main className="flex items-center justify-center flex-col pb-10 bg-background">
      <section className="h-screen w-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={"lg"}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                    Start For Free Today
                  </span>
                </Button>
                <h1 className="text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Manage Team with Project Planit
                </h1>
              </div>
            }
          />
        </div>
      </section>
      {/* <InfiniteMovingCards
        className="md:mt-[24rem] mt-[14rem]"
        items={clients}
        direction="right"
        speed="slow"
      /> */}
      <div className="md:mt-[24rem] mt-[14rem]"></div>
      <section className="">
        <LampComponent />
        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
          {priceDetails.map((info: PriceDetailType) => (
            <PriceCard key={info.name} info={info} />
          ))}
        </div>
      </section>
    </main>
  );
}
