import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function RealtimeCollab() {
  useEffect(() => {
    document.title = "Real-time collaboration — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="realtime-collab"
      title="Real-time collaboration system"
      subtitle="Simultaneous multi-user editing across Naya's Workflow platform — WebSockets + MongoDB Change Streams + YJS."
      metadata={[
        { label: "Role", value: "Software Developer" },
        { label: "Stack", value: "TypeScript, Node, MongoDB, WebSockets, YJS" },
        { label: "Customers", value: "Workflow enterprise users" },
        { label: "Year", value: "2023" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          The Workflow platform's documents and design surfaces needed
          Google-Docs-style concurrent editing — multiple users editing the
          same document with live cursors, conflict-free merges, and durable
          server-side state. Customers expected this as table stakes by 2023;
          enterprise design teams don't work alone.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A real-time collaboration layer combining three pieces: a YJS-based
          CRDT for in-memory document state (handles merge conflicts
          deterministically), WebSockets for low-latency client transport, and
          MongoDB Change Streams as the server-side feedback loop that keeps
          the persisted document in sync with the live one.
        </p>
        <p>
          I also engineered Python cloud functions for CAD-format conversion
          and ingestion pipelines that feed into the same collaborative
          documents — designs uploaded as STEP/IGES files get converted and
          ingested without breaking the collab session in progress.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Client A           Client B
   │ YJS doc          │ YJS doc
   │                  │
   ▼                  ▼
   WebSocket  ◄────►  WebSocket
        │                │
        ▼                ▼
   ┌────────────────────────┐
   │  WebSocket server      │
   │  (YJS sync protocol)   │
   └────────────────────────┘
              │
              ▼
   ┌────────────────────────┐
   │  MongoDB               │
   │  (document store)      │
   └────────────────────────┘
              │
              ▼ Change Streams
   ┌────────────────────────┐
   │  Server-side observers │
   │  (replay back to YJS)  │
   └────────────────────────┘`}</pre>
        <p>
          The reason MongoDB Change Streams sit in the loop alongside YJS is
          that not every change comes from a connected client. Server-side
          mutations (CAD ingestion, AI generation results, scheduled imports)
          need to flow back into the live document. Change Streams give a
          single source of truth for "the document changed, regardless of who
          changed it" and the YJS layer handles the merge.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Production-grade concurrent editing across the Workflow platform's
            document surfaces
          </li>
          <li>
            Sleep Mode — a DOM offload system that suspends inactive
            collaborative sessions while preserving server state, eliminating
            long-session tab crashes for returning users
          </li>
          <li>
            Combined with React virtualization, lazy loading, and code-splitting:{" "}
            <strong>90% image-load improvement, 50% page-render speedup,
            500MB+ memory reduction</strong> on long sessions
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p>
          Drop YJS, use WebSockets + MongoDB directly. Once Change Streams were
          already in place as the server-side feedback loop, the database was
          effectively the source of truth — YJS was solving the merge problem
          at a layer we didn't need it at, since concurrent writes can be
          reconciled via change-stream ordering with optimistic UI on the
          clients. The CRDT was overkill for the conflict patterns we actually
          saw (mostly distinct sections being edited, not character-level
          overlap). A simpler architecture would have been easier to reason
          about, easier to debug, and faster.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
