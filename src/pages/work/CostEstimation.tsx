import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function CostEstimation() {
  useEffect(() => {
    document.title = "Cost Estimation — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="cost-estimation"
      title="Cost Estimation"
      subtitle="Solo-built the AI Cost Estimation product as Founding Engineer. Its codebase became the foundation for FDE forks at MillerKnoll, Schneider Electric, and NAC."
      metadata={[
        { label: "Role", value: "Founding Engineer · Solo" },
        { label: "Stack", value: "Node.js, MongoDB, Anthropic, Gemini, GCP" },
        { label: "Customers", value: "MillerKnoll, Schneider, NAC" },
        { label: "Year", value: "2025–Present" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          Enterprise manufacturing teams spend weeks producing per-product cost
          estimates: gathering supplier prices, applying industry-specific markup
          conventions, reconciling against BOM data, and packaging the result as
          a defensible report. The work is high-leverage but slow and uneven —
          it depends heavily on which estimator picks it up.
        </p>
        <p>
          Naya needed a product that could compress this from weeks to minutes
          per estimate while staying defensible to customers spending serious
          money against the output. The product also had to be deployable as
          client-specific forks: MillerKnoll, Schneider Electric, and NAC each
          required their own isolated instance with their own data, integrations,
          and customizations.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A sequential 8-stage LLM workflow in Node.js, with editable intermediate
          outputs at each stage and per-stage state persistence in MongoDB. Each
          run is reproducible: every stage's input, prompt, model selection, and
          output is stored, so a user can audit or branch from any midpoint.
        </p>
        <p>
          Users select the model per execution (Anthropic Opus or Google Gemini)
          based on cost/quality preferences. Firebase handles asset storage for
          uploaded reference docs and generated PDF reports. Sentry covers
          observability; the whole thing runs on GCP with CI/CD.
        </p>
        <p>
          The classifier in the first stage of the pipeline loads
          domain-specific markdown context — a markdown-driven industry
          knowledge system I built across 16 verticals via expert collaboration.
          This is what makes the downstream pipeline accurate without fine-tuning:
          the model gets the right reference material at the right moment.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <p>
          The 8-stage pipeline runs sequentially with user-editable handoffs
          between stages. Each stage reads its inputs from MongoDB, writes its
          output back, and either auto-advances or pauses for human review:
        </p>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Input (product spec, refs)
   │
   ▼
[1] Classify ──── loads 1 of 16 industry markdown contexts
   │
   ▼
[2] Decompose ── into BOM line items
   │
   ▼
[3] Source ───── supplier prices per line
   │
   ▼
[4] Apply markups ── per-industry conventions
   │
   ▼
[5] Reconcile ── against historical estimates
   │
   ▼
[6] Format ───── PDF report
   │
   ▼
[7] Validate ─── self-check pass
   │
   ▼
[8] Deliver ──── store, notify
   │
   ▼
Output (PDF + structured JSON)`}</pre>
        <p>
          Per-stage MongoDB persistence is the key architectural decision. It's
          what makes the same codebase deployable as isolated client forks
          (MillerKnoll, Schneider Electric, NAC each get their own DB) and what
          makes individual runs auditable for enterprise procurement teams who
          can't accept "the model said so."
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>$500K+ in signed enterprise contracts</strong> across the
            base product plus FDE forks (MillerKnoll, Schneider Electric, NAC)
          </li>
          <li>
            <strong>4,000+ estimations</strong> run in active production
          </li>
          <li>
            <strong>16 industry verticals</strong> covered by the markdown
            knowledge system
          </li>
          <li>
            The codebase became the architectural template for Sustainability
            AI (Beta 2026), reusing the same pipeline pattern for carbon, water,
            plastic, and energy analysis
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p>
          Cache more rate data in flat lookup tables. The pipeline currently
          fetches supplier rates, freight rates, and per-vertical markup
          conventions from MongoDB on every estimation — fine at current
          volume, but a flat table layer (or a column store keyed by SKU and
          region) would cut hot-path latency and let me serve faster previews
          to estimators iterating on a single line item. If I were starting
          over, I'd build this in from day one rather than treating it as an
          optimization to do later.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
