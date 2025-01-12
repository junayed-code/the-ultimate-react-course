"use client";

import Button from "@ui/button";

type ErrorProps = { error: Error; reset(): void };

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center">
      <div className="px-4 text-center">
        <h1 className="mb-2.5 text-4xl font-bold sm:text-5xl">
          ERROR{" "}
          <span className="text-primary-50 text-[2.5rem] sm:text-[3.25rem]">
            500
          </span>
        </h1>
        <p className="mb-5 text-lg sm:text-xl">
          There seems to be a problem, please try again or return later.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
