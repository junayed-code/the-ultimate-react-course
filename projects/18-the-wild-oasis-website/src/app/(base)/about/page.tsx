import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import Container from "@components/container";
import { supabase } from "@lib/supabase";

import aboutImg1 from "@images/about-1.jpg";
import aboutImg2 from "@images/about-2.jpg";

export const metadata: Metadata = { title: `About` };

// Revalidate the page once every day
export const revalidate = 86400;

async function AboutPage() {
  const { count: cabinsCount } = await supabase
    .from("cabins")
    .select("*", { head: true, count: "exact" });

  return (
    <Container className="space-y-24 md:space-y-32 md:text-lg">
      <section className="flex flex-col gap-x-16 gap-y-12 lg:flex-row">
        <div className="basis-1/2 xl:basis-3/5">
          <h1 className="text-accent-400 mb-8 text-3xl font-medium sm:mb-10 sm:text-4xl">
            Welcome to The Wild Oasis
          </h1>
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
            <br />
            <br />
            Our {cabinsCount} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
            <br />
            <br />
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
        <div className="basis-1/2 xl:basis-2/5">
          <Image
            src={aboutImg1}
            placeholder="blur"
            alt="Family sitting around a fire pit in front of cabin"
          />
        </div>
      </section>

      <section className="flex flex-col gap-x-16 gap-y-12 lg:flex-row-reverse">
        <div className="basis-1/2 xl:basis-3/5">
          <h1 className="text-accent-400 mb-8 text-3xl font-medium sm:mb-10 sm:text-4xl">
            Managed by our family since 1962
          </h1>
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
            <br />
            <br />
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <Link
            href="/cabins"
            className="bg-accent-500 text-primary-800 hover:bg-accent-600 mt-6 inline-block px-5 py-3 font-semibold transition-all sm:text-lg md:px-7 md:py-4"
          >
            Explore our luxury cabins
          </Link>
        </div>

        <div className="basis-1/2 xl:basis-2/5">
          <Image
            src={aboutImg2}
            placeholder="blur"
            alt="Family that manages The Wild Oasis"
          />
        </div>
      </section>
    </Container>
  );
}

export default AboutPage;
