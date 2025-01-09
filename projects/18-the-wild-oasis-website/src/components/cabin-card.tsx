import Link from "next/link";
import Image from "next/image";
import { UsersIcon } from "@heroicons/react/24/solid";
import type { Tables } from "@lib/supabase/database.types";

type CabinCardProps = {
  cabin: Omit<Tables<"cabins">, "created_at" | "description">;
};

function CabinCard({ cabin }: CabinCardProps) {
  const { id, name, capacity, price, discount, image } = cabin;

  return (
    <div className="flex flex-col sm:flex-row border-primary-800 border">
      <figure className="relative flex-grow aspect-[4/2] sm:border-r border-primary-800">
        <Image
          fill
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover"
          sizes="(min-width: 48em) 40vw, 100vw"
        />
      </figure>

      <div className="basis-2/3">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{capacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount && discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">${price - discount}</span>
                <span className="line-through font-semibold text-primary-600">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${price}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
