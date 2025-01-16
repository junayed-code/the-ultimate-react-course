"use client";

import { type HTMLAttributes } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@ui/button";
import { cn } from "@utils/cn";

const filters = [
  {
    text: "All cabins",
    href: "/cabins",
  },
  {
    text: "2—3 guests",
    href: "?capacity=small",
  },
  {
    text: "4—7 guests",
    href: "?capacity=medium",
  },
  {
    text: "8—12 guests",
    href: "?capacity=large",
  },
];

type CabinsFilterProps = HTMLAttributes<HTMLDivElement>;

function CabinsFilter({ className, ...props }: CabinsFilterProps) {
  const { replace } = useRouter();
  const params = useSearchParams();
  const capacity = params.get("capacity") ?? "/cabins";

  return (
    <div {...props} className={cn("text-right", className)}>
      <ul className="border-primary-800 inline-flex flex-wrap border">
        {filters.map(({ text, href }) => (
          <li key={href} className="flex-1">
            <Button
              onClick={() => replace(href, { scroll: false })}
              className={cn(
                "hover:bg-primary-700 text-primary-200 w-full bg-transparent px-5 py-2 text-base md:text-base",
                href.endsWith(capacity) && "bg-primary-700 text-primary-50",
              )}
            >
              {text}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CabinsFilter;
