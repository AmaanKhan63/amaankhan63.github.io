import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function CostEstimation() {
  useEffect(() => {
    document.title = "Cost Estimation - Amaan Khan";
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
          estimates. Done by hand, that means gathering supplier prices, applying
          industry-specific markup conventions, reconciling against BOM data, and
          packaging the result as a defensible report. The work is high-leverage
          but slow and uneven - it depends heavily on which estimator picks it up.
        </p>
        <p>
          Naya needed a product that could compress this from weeks to minutes
          per estimate while staying defensible to customers spending serious
          money against the output. It also had to be fork-friendly: MillerKnoll,
          Schneider Electric, and NAC each needed the codebase customized to
          their own data sources, vertical, and workflows, running as a sovereign
          instance rather than a configuration of the shared product.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A sequential 8-stage LLM workflow in Node.js. The pipeline runs
          end-to-end in a single pass, but state persists per stage in MongoDB -
          one collection per stage - so a run is resumable and auditable, and
          users can edit a stage's output before the next stage consumes it.
        </p>
        <p>
          Users select the model per execution (Anthropic Opus or Google Gemini)
          based on cost/quality preferences. A circuit breaker falls through to
          the next model in the chain when a provider errors or rate-limits, so
          one provider having a bad moment degrades the run instead of ending it.
          Firebase handles asset storage for uploaded reference docs and
          generated PDF reports. Sentry covers observability; the whole thing
          runs on GCP with CI/CD.
        </p>
        <p>
          The first stage classifies the product into one of 11 industry
          verticals and then into a sub-segment within it, loading the matching
          markdown knowledge files as system context - 11 verticals, 10+ segments
          each, 110+ curated files, with the vertical files authored via expert
          collaboration. This is what makes the downstream pipeline accurate
          without fine-tuning: the model gets the right reference material at the
          right moment.
        </p>
        <p>
          Rates are the part that has to hold up. The pipeline grounds them in
          indexed rate tables rather than model memory - but when a table has no
          entry, the model will happily generate one, and a generated rate is a
          guess. So generated rates get logged to a rate-insights collection
          instead of being accepted, and a scheduled GCP worker resolves each one
          against indices, citations, and supplier directories, then writes the
          sourced value back into the rate tables. The grounding layer compounds
          with use: every estimate that hits a gap surfaces it, and the gap gets
          filled with a sourced number before the next run needs it.
        </p>
        <p>
          Each step carries two ceilings, an output-token cap and a wall-clock
          limit, so an agent that can re-plan and re-call tools can't quietly
          burn cost or stall the run on a single step.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <p>
          Five pre-cost stages, then the cost is computed, then three post-cost
          stages. The chain inside a run goes strictly in order - each stage's
          output decides what the next one costs, so it can't be parallelized -
          with user-editable handoffs in between:
        </p>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Input (product images, BOM, 3D models, supply-chain data)
   │
   ▼
[1] Expert Knowledge ── LLM: classify into 1 of 11 verticals,
   │                    then a sub-segment; load those files
   ▼
[2] Key Cost Drivers ── user: quantity, origin/destination,
   │                    tariff + freight + packaging toggles
   ▼
[3] Product Details ─── LLM: generate BOM + material specs
   │
   ▼
[4] Data Sources ────── user: attach links, docs, customer data
   │
   ▼
[5] Analysis ────────── agent: writes its own ~9-step plan, then
   │                    executes it one tool call at a time
   ▼
═══════════════ cost computed ═══════════════
   │
   ▼
[6] Cost Summary ────── rendered: component-level breakdown
   │                    + manufacturing timeline
   ▼
[7] Value Engineering ─ LLM: material + process substitutions
   │
   ▼
[8] Scenario Planning ─ per query: switch origin, change
   │                    quantity, adjust tooling
   ▼
Output (shareable report + PDF)`}</pre>
        <p>
          Stage 5 is the one that does the real work, and it's an agent rather
          than a chat wrapper: it generates its own multi-step plan from the
          inputs, then works through it - each step calls a tool (a rate-table
          lookup, a ledger calculation, a web search), reviews the result, marks
          the step done, and moves on. State carries between steps because the
          numbers are interwoven. The model decides <em>what</em> to compute; the
          tools do the computing; the outer pipeline is fixed. That separation is
          what keeps a number defensible enough to sign into a contract.
        </p>
        <p>
          Three mechanisms get conflated here and they're worth keeping apart.
          Per-stage MongoDB persistence is what makes an individual run resumable
          and auditable, for procurement teams who can't accept "the model said
          so." Customer isolation is separate: WorkOS provisions a tenant at
          login, tenant IDs stamped on user records enforce row-level security
          across the APIs, and storage buckets are scoped to the owning tenant.
          The client forks are a third thing - they exist for customization, not
          isolation. When MillerKnoll, Schneider Electric, or NAC need changes
          specific to their data and workflows, a forward-deployed team branches
          the codebase into an instance that evolves independently.
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
            <strong>7,500+ estimations</strong> run in active production
          </li>
          <li>
            <strong>11 industry verticals</strong>, 10+ sub-segments each,{" "}
            <strong>110+ curated knowledge files</strong> in the markdown
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
          Size limits against the thing they actually limit. I set the per-step
          token budgets by intuition before building them, and I was off by
          roughly 30x - I'd been reasoning about context windows, the
          million-plus numbers on a model card, when the constraint that
          actually binds a generation step is max output tokens, which tops out
          far lower. I had the ranking backwards too: I assumed plan generation
          would be the most expensive step, and it turned out to be one of the
          cheapest, since it emits short structured output and runs early,
          before state accumulates. Rebuilding the budgets against observed
          per-step usage fixed it. The habit I took from it is to check which
          side of a call a limit constrains before picking a number for it.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
