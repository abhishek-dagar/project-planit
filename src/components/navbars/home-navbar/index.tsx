import UserButton from "@/components/buttons/user-button";
import Logo from "@/components/icons/logo";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { currentUser } from "@/lib/helpers/getTokenData";
import Link from "next/link";

const HomeNavbar = async () => {
  const user = await currentUser();
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-background/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-border justify-between text-foreground">
      <aside className="flex items-center gap-1">
        <Logo />
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#hero">Home</Link>
          </li>
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#pricing">Pricing</Link>
          </li>
          {/* <li>
            <Link href="#">About</Link>
          </li> */}
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link
          href="/app/dashboard"
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 border-2 border-slate-400 scale-95 hover:scale-100 transition-all"
        >
          {/* <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" /> */}
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out">
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-transparent px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
              {user ? "Dashboard" : "Get Started"}
              {/* {true ? "Dashboard" : "Get Started"} */}
            </span>
          </AnimatedShinyText>
        </Link>
        <UserButton user={user} />
      </aside>
    </header>
  );
};

export default HomeNavbar;
