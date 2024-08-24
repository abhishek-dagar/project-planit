import PriceCard from "@/components/cards/price-card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { priceDetails } from "@/lib/config/price.config";
import { currentUser } from "@/lib/helpers/getTokenData";
import { PriceDetailType } from "@/lib/types/price.type";
import {
  MoveRight
} from "lucide-react";
import Link from "next/link";
import HeroImage from "./_components/hero-image";
import ParticleContainer from "./_components/partical-container";
import FeatureSection from "./_components/features-section";


export default async function Home() {
  const user = await currentUser();

  //WIP: remove fault IMAge for home page
  return (
    <main className="relative mx-auto flex-1 overflow-hidden pb-10">
      <ParticleContainer />
      <section
        id="hero"
        className="relative mx-auto mt-32 max-w-[60rem] px-6 text-center md:px-8"
      >
        <h1 className="bg-gradient-to-br from-foreground from-30% to-foreground/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl animate-[fade-in_1s_ease_1] animate-fade-in[--animation-delay:200ms]">
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
            <HeroImage />
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
        id="features"
        className="text-center mx-auto max-w-[80rem] px-6 md:px-8"
      >
        <FeatureSection/>
      </section>
      <div className="[--color:#ffbd7a] pointer-events-none relative -z-[2] mx-auto h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[rgb(var(--border))] after:bg-background" />
      <section id="pricing">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
          <div className="mx-auto max-w-5xl text-center text-foreground">
            <h4 className="text-xl font-bold tracking-tight">Pricing</h4>
            <h2 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Simple pricing for everyone.
            </h2>
            <p className="mt-6 text-xl leading-8">
              Choose an <strong>affordable plan</strong> {"that's"} packed with
              the best features for engaging your audience, creating customer
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
  );
}
