import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { workItems } from "@/lib/work-items";

type Metadata = {
  label: string;
  value: string;
};

type Props = {
  slug: string;
  title: string;
  subtitle: string;
  metadata: Metadata[];
  children: ReactNode;
};

export default function CaseStudyLayout({
  slug,
  title,
  subtitle,
  metadata,
  children,
}: Props) {
  const index = workItems.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? workItems[index - 1] : null;
  const next = index >= 0 && index < workItems.length - 1 ? workItems[index + 1] : null;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <p className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-6">
          <Link to="/work" className="hover:text-accent transition-colors">
            Work
          </Link>{" "}
          / {title}
        </p>

        <header className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed">
            {subtitle}
          </p>
        </header>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mb-12 pb-12 border-b border-border">
          {metadata.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-1">
                {m.label}
              </dt>
              <dd className="text-sm sm:text-base">{m.value}</dd>
            </div>
          ))}
        </dl>

        <article className="space-y-10 text-base sm:text-lg leading-relaxed">
          {children}
        </article>

        <nav className="mt-20 pt-8 border-t border-border flex items-center justify-between text-sm font-sans">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="text-muted hover:text-accent transition-colors"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="text-muted hover:text-accent transition-colors"
            >
              {next.title} →
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
