import { Suspense } from "react";
import type { Metadata } from "next";

import Spinner from "@ui/spinner";
import Cabins from "@components/cabins";
import Container from "@components/container";
import CabinsFilter from "@components/cabins-filter";

export const metadata: Metadata = {
  title: `Cabins`,
};

function CabinsFallback() {
  return (
    <div className="grid place-items-center">
      <Spinner />
      <p className="text-primary-200 text-lg">Loading cabins data...</p>
    </div>
  );
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type CabinsPageProps = { searchParams: SearchParams };

export default async function CabinsPage({ searchParams }: CabinsPageProps) {
  const search = await searchParams;

  return (
    <Container>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg lg:mb-12">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <CabinsFilter className="mb-8" />

      <Suspense
        fallback={<CabinsFallback />}
        key={(search.capacity ?? "/cabins") + ""}
      >
        <Cabins search={search} />
      </Suspense>
    </Container>
  );
}
