import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Writing() {
  useEffect(() => {
    document.title = "Writing - Amaan Khan";
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <header className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">Writing</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Notes on shipping AI-native products, multi-provider orchestration,
            and solo engineering at scale.
          </p>
        </header>

        <p className="text-muted italic">First posts coming soon.</p>
      </main>
      <Footer />
    </>
  );
}
