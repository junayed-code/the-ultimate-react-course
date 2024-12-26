import Link from "next/link";
import Image from "next/image";

import Container from "@components/container";
import bgImage from "@images/bg.png";

export default function Home() {
  return (
    <Container className="relative">
      {/* Background image of the page */}
      <Image
        src={bgImage}
        placeholder="blur"
        className="object-cover object-top fixed inset-0 w-full h-full"
        alt="Mountains and forests with two cabins"
      />

      {/* The page content */}
      <div className="w-full min-h-fit absolute top-[78%] sm:top-[58%] -translate-y-1/2 z-10 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-50 mb-4 md:mb-6 tracking-tight">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="inline-block bg-accent-500 px-7 md:px-9 py-3.5 md:py-5 text-primary-800 text-sm md:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </Container>
  );
}
