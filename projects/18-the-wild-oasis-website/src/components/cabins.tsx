import CabinCard from "@components/cabin-card";
import { getCabins } from "@lib/db";

type CabinsProps = { search: Record<string, string | string[] | undefined> };

async function Cabins({ search }: CabinsProps) {
  let min = -1,
    max = 100;
  switch (search.capacity) {
    case "small":
      min = 2;
      max = 3;
      break;
    case "medium":
      min = 4;
      max = 7;
      break;
    case "large":
      min = 8;
      max = 12;
  }

  const { data: cabins } = await getCabins()
    .gte("capacity", min)
    .lte("capacity", max)
    .select("id, name, capacity, price, discount, image")
    .order("name");

  if (!cabins?.length) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {cabins.map(cabin => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}

export default Cabins;
