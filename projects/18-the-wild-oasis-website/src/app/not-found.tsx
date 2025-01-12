import Link from "next/link";
import Button from "@ui/button";

function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <div className="px-4 text-center">
        <h1 className="text-9xl font-bold md:text-[10rem]">
          <span className="inline-block">4</span>
          <span className="inline-block animate-ping">o</span>
          <span className="inline-block -translate-x-2 translate-y-5">4</span>
        </h1>
        <p className="mb-7 text-xl font-semibold md:text-2xl">
          The page you are looking for could not be found!
        </p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </main>
  );
}

export default NotFound;
