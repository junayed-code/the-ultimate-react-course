import { Suspense } from "react";
import type { Metadata } from "next";

import Cabins from "@components/cabins";
import Spinner from "@components/ui/spinner";
import Container from "@components/container";

export const metadata: Metadata = {
  title: `Cabins`,
};

function CabinsFallback() {
  return (
    <div className="grid place-items-center">
      <Spinner />
      <p className="text-lg text-primary-200">Loading cabins data...</p>
    </div>
  );
}

export default async function CabinsPage() {
  return (
    <Container>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10 lg:mb-12">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense fallback={<CabinsFallback />}>
        <Cabins />
      </Suspense>
    </Container>
  );
}
