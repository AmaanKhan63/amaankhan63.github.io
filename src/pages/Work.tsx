import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkRow from "@/components/WorkRow";
import { workItems } from "@/lib/work-items";

export default function Work() {
  useEffect(() => {
    document.title = "Work — Amaan Khan";
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <header className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">Work</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Selected projects from my time at Naya Studio.
          </p>
        </header>

        <div>
          {workItems.map((item) => (
            <WorkRow key={item.slug} item={item} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
