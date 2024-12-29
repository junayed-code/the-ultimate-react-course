import type { ReactNode } from "react";
import Header from "@components/header";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header className="sticky top-0 bg-primary-950 z-50" />
      <main className="px-5 md:px-8 flex-1 grid">{children}</main>
    </>
  );
}
