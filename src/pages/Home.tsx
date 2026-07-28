import { useEffect } from "react";
import { Link } from "react-router-dom";
import WorkRow from "@/components/WorkRow";
import Footer from "@/components/Footer";
import { workItems } from "@/lib/work-items";

export default function Home() {
  useEffect(() => {
    document.title = "Amaan Khan - Software Engineer";
  }, []);

  return (
    <>
      <main className="mx-auto max-w-prose px-4 pt-20 pb-12">
        {/* Identity */}
        <section className="mb-20">
          <h1 className="stagger-1 font-serif text-[2.75rem] sm:text-5xl md:text-[3.5rem] leading-tight">
            Amaan Khan
          </h1>
          <p className="stagger-2 mt-6 text-lg sm:text-xl leading-relaxed">
            Software engineer. I ship AI-native products end-to-end for enterprise
            customers - design through deployment, solo.
          </p>
          <p className="stagger-3 mt-3 text-lg sm:text-xl text-muted leading-relaxed">
            Currently at Naya Studio. Open to founding-engineer roles.
          </p>

          <hr className="my-10 border-border" aria-hidden="true" />

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-sans text-muted">
            <Link
              to="/work"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Work
            </Link>
            <Link
              to="/writing"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Writing
            </Link>
            <Link
              to="/about"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              About
            </Link>
            <a
              href="https://github.com/Amaan2210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* Selected work */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-2">
            Selected work
          </h2>
          <div>
            {workItems.map((item) => (
              <WorkRow key={item.slug} item={item} />
            ))}
          </div>
        </section>

        {/* Now */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            Now
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Shipping AI-native products at Naya Studio - currently a Founding
            Engineer on Cost Estimation and Sustainability AI (Beta 2026).
            Writing about multi-provider orchestration and shipping solo with
            Claude Code.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed">
            Open to{" "}
            <Link
              to="/about#hiring"
              className="text-accent hover:underline underline-offset-4"
            >
              early-engineer roles at seed/Series A AI startups
            </Link>{" "}
            - remote, founding compensation conversation welcome.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
