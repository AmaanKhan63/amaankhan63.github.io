import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found - Amaan Khan";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-prose text-center">
        <p className="font-serif text-5xl mb-4">404</p>
        <p className="text-muted mb-6">
          That page doesn't exist (or hasn't been written yet).
        </p>
        <Link
          to="/"
          className="text-accent hover:underline underline-offset-4"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
