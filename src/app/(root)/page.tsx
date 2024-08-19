import PriceCard from "@/components/cards/price-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import Particles from "@/components/magicui/particles";
import { priceDetails } from "@/lib/config/price.config";
import { currentUser } from "@/lib/helpers/getTokenData";
import { PriceDetailType } from "@/lib/types/price.type";
import {
  AlignStartHorizontalIcon,
  AlignStartVerticalIcon,
  LayoutDashboardIcon,
  MoveRight,
  UsersIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  //WIP: remove fault IMAge for home page
  return (
    <main className="relative mx-auto flex-1 overflow-hidden pb-10">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <section className="relative mx-auto mt-32 max-w-[80rem] px-6 text-center md:px-8">
        <h1 className="bg-gradient-to-br from-white from-30% to-white/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl animate-[fade-in_1s_ease_1] animate-fade-in[--animation-delay:200ms]">
          Manage Team with
          <br className="hidden md:block" /> Project Planit
        </h1>
        <p className="mb-12 text-lg tracking-tight text-gray-400 md:text-xl text-balance">
          Transforming Ideas into Action with Seamless Project Management.
        </p>
        <Link
          href="/app/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 border-2 border-slate-400 bg-white text-black"
        >
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-3 py-1 text-sm font-medium backdrop-blur-3xl bg-white">
            {user ? "Dashboard" : "Get Started For Free"}
            <MoveRight size={12} className="ml-2" />
          </span>
        </Link>
        <div className="relative mt-[8rem] h-[419px] animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,rgb(var(--background))_30%,transparent)]">
          <div className="rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,#ffbd7a,#ffbd7a,transparent_40%)] before:animate-image-glow">
            <Image
              src="/temp-banner-real.png"
              fill
              alt="bannerImage"
              className="relative w-full h-[100px] rounded-[inherit] border block"
            />
            <BorderBeam
              size={250}
              duration={12}
              delay={9}
              className="rounded-xl"
            />
          </div>
        </div>
      </section>
      <section
        id="clients"
        className="text-center mx-auto max-w-[80rem] px-6 md:px-8"
      >
        <div className="py-14">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h2 className="text-center text-4xl font-semibold text-gray-600">
              Features
            </h2>
            <div className="mt-6">
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 [&amp;_path]:fill-white">
                <li className="flex items-center">
                  <AlignStartVerticalIcon className="h-8 w-20 px-2 brightness-0 invert" />
                  <span>List view</span>
                </li>
                <li className="flex items-center">
                  <AlignStartHorizontalIcon className="h-8 w-20 px-2 brightness-0 invert" />
                  <span>List view</span>
                </li>
                <li className="flex items-center">
                  <UsersIcon className="h-8 w-20 px-2 brightness-0 invert" />
                  <span>Teams</span>
                </li>
                <li className="flex items-center">
                  <LayoutDashboardIcon className="h-8 w-20 px-2 brightness-0 invert" />
                  <span>Workspaces</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="[--color:#ffbd7a] pointer-events-none relative -z-[2] mx-auto h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgb(var(--border))] after:bg-background" />
      <section id="pricing">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h4 className="text-xl font-bold tracking-tight text-white">
              Pricing
            </h4>
            <h2 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Simple pricing for everyone.
            </h2>
            <p className="mt-6 text-xl leading-8 text-white">
              Choose an <strong>affordable plan</strong> that's packed with the
              best features for engaging your audience, creating customer
              loyalty, and driving sales.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
            {priceDetails.map((info: PriceDetailType) => (
              <PriceCard key={info.name} info={info} />
            ))}
          </div>
        </div>
      </section>
    </main>
    // <main className="flex items-center justify-center flex-col pb-10 bg-background">
    //   <section className="h-screen w-full  bg-neutral-950 rounded-md  !overflow-visible relative flex flex-col items-center  antialiased">
    //     <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
    //     <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
    //       <ContainerScroll
    //         titleComponent={
    //           <div className="flex items-center flex-col">
    //             <Button
    //               size={"lg"}
    //               className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
    //             >
    //               <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
    //                 Start For Free Today
    //               </span>
    //             </Button>
    //             <h1 className="text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
    //               Manage Team with Project Planit
    //             </h1>
    //           </div>
    //         }
    //       />
    //     </div>
    //   </section>
    //   {/* <InfiniteMovingCards
    //     className="md:mt-[24rem] mt-[14rem]"
    //     items={clients}
    //     direction="right"
    //     speed="slow"
    //   /> */}
    //   <div className="md:mt-[24rem] mt-[14rem]"></div>
    //   <section className="">
    //     <LampComponent />
    //     <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
    //       {priceDetails.map((info: PriceDetailType) => (
    //         <PriceCard key={info.name} info={info} />
    //       ))}
    //     </div>
    //   </section>
    // </main>
  );
}
