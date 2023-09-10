"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import SecondSection from "./_second-section";
import Image from "next/image";
import ss from "@/assets/Scrrenshot.png";
import ThirdSection from "./_third-section";
import ForthSection from "./_forth-section";

export default function Home() {
  return (
    <main className="mb-6 bg-muted flex flex-col gap-5">
      <div className="container flex flex-col lg:flex-row">
        <section className="flex-1">
          <div className="flex gap-2 flex-col pt-14 pb-14 lg:p-14">
            <div>
              <p className="text-title-md lg:text-title-lg font-extrabold">
                Entire Business
              </p>
              <p className="text-title-md lg:text-title-lg font-extrabold">
                in One Ecosystem
              </p>
            </div>
            <p className="text-subtitle font-light">
              With our cloud based Project Management software you can
              collaborate with team easily and sharing files are very easy
            </p>
            <div className="flex flex-wrap gap-2">
              {/* <Input className="md:flex-[2.5]" /> */}
              <Button
                className="shadow-button hover:shadow-none transition-shadow ease-in duration-300"
                asChild
              >
                <Link href={"/register"}>SignUp for free</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="flex-1 block">
          <div className="relative h-full p-10">
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[240px] w-[200px] rounded-2xl shadow-fake" /> */}
            <div>
              <Image src={ss} alt="screenshot" />
            </div>
          </div>
        </section>
      </div>
      <SecondSection />
      <ThirdSection />
      <ForthSection />
    </main>
  );
}
