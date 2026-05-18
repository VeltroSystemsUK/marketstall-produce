import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DemoEditor from "@/components/demo/DemoEditor";
import ScrollReveal from "@/components/demo/ScrollReveal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollReveal />
      <Suspense fallback={null}>
        <DemoEditor />
      </Suspense>
    </>
  );
}
