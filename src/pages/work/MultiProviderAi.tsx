import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function MultiProviderAi() {
  useEffect(() => {
    document.title = "Multi-provider AI — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="multi-provider-ai"
      title="Multi-provider AI orchestration"
      subtitle="10 providers, 50+ models powering enterprise generation workflows for Adidas, MillerKnoll, and others."
      metadata={[
        { label: "Role", value: "Software Developer" },
        { label: "Stack", value: "TypeScript, Node, MongoDB, pub/sub" },
        { label: "Customers", value: "Adidas, MillerKnoll" },
        { label: "Year", value: "2024" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          Naya's Workflow platform generates images, 3D models, and other assets
          for enterprise design teams. The customers don't care which AI
          provider sits behind it — they care that the generation works, looks
          good, and stays available when one provider has an outage or rate-limits
          a critical workload.
        </p>
        <p>
          Building against a single provider was a non-starter for any customer
          paying real money. The platform needed to fan out across providers,
          fall back transparently, and let internal users select models without
          knowing which infrastructure was running them.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A multi-provider AI generation platform spanning text-to-image,
          text-to-3D, and image-to-3D. 10 providers (OpenAI, Anthropic, Google
          Gemini, Stability AI, Meshy, Hunyuan, and others) and 50+ models in
          total. Each generation request flows through a provider router that
          handles model selection, fan-out, fallback, and queueing — the
          frontend doesn't know which provider served which response.
        </p>
        <p>
          I also engineered a custom Hunyuan 3D service that bypasses Tencent's
          hosted API limits. This dropped the per-generation cost for
          enterprise 3D workflows significantly and removed the licensing
          dependency that came with using their hosted offering.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Frontend
   │
   ▼
Provider router ── model selection, params
   │
   ▼
Pub/sub queue ── decouples request from execution
   │
   ▼
Workers ── pool per provider class
   │   ├─ wraps each call in fallback controller
   │   └─ retries on rate-limit / quota / provider error
   │
   ▼
Completion event ── delivered via WebSocket
   │
   ▼
Frontend renders result`}</pre>
        <p>
          The fallback controller is the load-bearing piece. When a provider
          fails (rate limit, quota, outage, model deprecation), the controller
          re-issues the request against the next-best provider for that
          capability without surfacing the failure to the user. This is what
          makes the platform feel like one thing instead of ten.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>$200K+ Adidas deal</strong> — the platform's generation
            capabilities were a major component of the contract
          </li>
          <li>
            <strong>Additional MillerKnoll ARR</strong> through enterprise
            deployments
          </li>
          <li>
            <strong>Custom Hunyuan 3D service</strong> bypassing Tencent API
            limits — lower per-generation cost and reduced licensing dependency
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p className="text-muted italic">
          {/* TODO: Amaan to fill in */}
          [Pending — to be written by Amaan.]
        </p>
      </section>
    </CaseStudyLayout>
  );
}
