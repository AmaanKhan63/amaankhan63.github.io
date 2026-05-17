import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import profile from "@/assets/profile.png";

export default function About() {
  useEffect(() => {
    document.title = "About — Amaan Khan";
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <header className="mb-12 flex items-start gap-6">
          <img
            src={profile}
            alt="Amaan Khan"
            className="w-[140px] h-[140px] object-cover rounded-sm flex-shrink-0"
          />
          <div className="pt-2">
            <h1 className="font-serif text-3xl sm:text-4xl leading-tight">About</h1>
          </div>
        </header>

        {/* How I work */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            How I work
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              I ship. Most of what I build at Naya Studio has gone live in front of
              enterprise customers within weeks of starting it — the Cost Estimation
              product I'm currently founding-engineering went from architecture
              sketches to $500K+ in signed enterprise contracts in a single year,
              and the codebase now serves as the foundation for client-specific
              forks at MillerKnoll, Schneider Electric, and NAC.
            </p>
            <p>
              I work AI-native. Claude Code, Cursor, and a handful of model APIs
              are daily drivers, not experiments. I treat them the way a previous
              generation treated their IDE: as table stakes for shipping at the
              pace AI startups actually need. When I say I built something solo,
              I mean me plus the AI tools I use every day — and I think that's
              the honest framing.
            </p>
            <p>
              I'm comfortable with ambiguity and direct customer contact. The
              cleanest way to learn what an enterprise customer actually wants
              is to talk to them, not to triangulate it through a PM. I'd rather
              ship a smaller, less general thing that the customer is using
              tomorrow than a more elegant one they'll see in a quarter.
            </p>
            <p>
              I default to less. Less abstraction, fewer dependencies, fewer
              clever frameworks. The hard part of shipping isn't writing code —
              it's knowing what not to write.
            </p>
          </div>
        </section>

        {/* Background */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            Background
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              B.Tech in Computer Science from Swami Ramanand Teerth Marathwada
              University (2019–2023). Joined Naya Studio in November 2022 and
              have been there since — currently a Founding Engineer on Cost
              Estimation and Sustainability AI (Beta 2026), and a Software
              Developer on the broader Workflow platform.
            </p>
            <p>
              Outside Naya, I contribute to the CSPP community and mentor on
              WOPI (the Microsoft Office in-platform editing protocol) for
              engineers building enterprise integrations.
            </p>
            <p>
              Resume:{" "}
              <a
                href="/amaan-khan-resume.pdf"
                className="text-accent hover:underline underline-offset-4"
              >
                PDF
              </a>
              .
            </p>
          </div>
        </section>

        {/* Hiring */}
        <section id="hiring" className="scroll-mt-8">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            Hiring
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              I'm open to founding-engineer or early-engineer roles at seed or
              Series A AI startups, remote, with founding compensation (meaningful
              equity + market cash). I work best with founders who ship weekly,
              hire for ownership, and use AI-native tools as daily drivers
              rather than experiments. If that's you,{" "}
              <a
                href="mailto:amankhanak063@gmail.com"
                className="text-accent hover:underline underline-offset-4"
              >
                email me
              </a>
              .
            </p>
            <p>
              Or{" "}
              <a
                href="https://cal.com/amaan-khan/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                book a 30-minute call directly
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
