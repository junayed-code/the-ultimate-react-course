import CabinCard from "@components/cabin-card";
import { getCabins } from "@lib/db";

async function Cabins() {
  const { data: cabins } = await getCabins()
    .select("id, name, capacity, price, discount, image")
    .order("name");

  if (!cabins?.length) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {cabins.map(cabin => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}

export default Cabins;
