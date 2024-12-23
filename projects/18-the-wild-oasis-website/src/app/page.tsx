import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold">
        This is the root page of the application
      </h1>
      <Link href="/cabins">Cabin Page</Link>
    </div>
  );
}
