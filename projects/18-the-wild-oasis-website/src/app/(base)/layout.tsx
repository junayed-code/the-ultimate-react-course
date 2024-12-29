import type { ReactNode } from "react";
import Header from "@components/header";

export default function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="px-5 md:px-8 flex-1 grid">{children}</main>
    </>
  );
}
