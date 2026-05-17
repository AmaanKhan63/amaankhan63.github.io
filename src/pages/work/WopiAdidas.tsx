import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function WopiAdidas() {
  useEffect(() => {
    document.title = "WOPI for Adidas — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="wopi-adidas"
      title="WOPI integration for Adidas"
      subtitle="In-platform Microsoft Office editing for Adidas enterprise teams — Word and Excel documents edited without leaving Naya's Workflow platform."
      metadata={[
        { label: "Role", value: "Software Developer" },
        { label: "Stack", value: "TypeScript, Node, Microsoft WOPI protocol" },
        { label: "Customer", value: "Adidas" },
        { label: "Year", value: "2024" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          Adidas's enterprise teams needed to view and edit Microsoft Office
          documents — Word and Excel — inside Naya's Workflow platform, not
          download-edit-reupload through their desktop apps. The standard
          experience (open in Word, save locally, drag-drop back into the
          platform) loses version history, makes review cycles slower, and
          adds friction for non-technical users.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A full WOPI (Web Application Open Platform Interface) integration. WOPI
          is Microsoft's protocol for letting third-party document hosts plug
          into Office Online — when an authenticated request lands, Office
          Online opens the document inside an iframe in our platform, talks
          back to our WOPI host endpoints for read/write/lock operations, and
          users edit the document inline.
        </p>
        <p>
          The integration also covers Google Drive and SharePoint as additional
          enterprise storage backends — customers like Adidas keep documents
          in their existing storage and Naya brokers the editing flow.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`User clicks document in Workflow
        │
        ▼
Naya WOPI host generates access token
        │
        ▼
Frontend opens Office Online in iframe
        │  (URL includes access token + WOPI src)
        ▼
Office Online ◄──── reads file (CheckFileInfo, GetFile)
        │     ◄──── locks for edit
        │     ─────► writes back (PutFile)
        ▼
Naya WOPI host persists to backend
   (S3 / SharePoint / Google Drive)`}</pre>
        <p>
          The trickiest part of WOPI isn't the happy path — it's the locking
          semantics. Office Online expects exclusive write locks during an
          edit session, and the platform has to handle stale locks, refresh
          tokens, and concurrent-edit attempts cleanly. Most of the bugs
          I shipped lived in lock state.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Production rollout to Adidas enterprise teams; documents edited
            in-platform without context-switching to desktop Office
          </li>
          <li>
            Google Drive and SharePoint integrations layered on top — customers
            keep their existing storage strategy
          </li>
          <li>
            Outside Naya, I mentor engineers in the CSPP community on WOPI
            specifically — the protocol's documentation has historically been
            hard to navigate
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p>
          Honestly, not much. The WOPI protocol prescribes most of the
          architecture — token issuance, lock semantics, the iframe handoff —
          so the design space was narrow and the calls I made tracked the spec.
          The bugs I shipped were in lock state and they'd happen again on a
          rewrite. If I were doing it cold, I'd model the lock state machine
          formally before writing the implementation, but the architecture
          itself I'd repeat.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
