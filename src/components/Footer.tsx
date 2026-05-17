import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Email", href: "mailto:amankhanak063@gmail.com" },
  { label: "GitHub", href: "https://github.com/Amaan2210" },
  { label: "LinkedIn", href: "https://linkedin.com/in/amaan-khan-gsm" },
  { label: "X", href: "https://x.com/Amaan2210" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-prose px-4 py-12 mt-16 border-t border-border">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted font-sans">
        {links.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-3">
            {i > 0 && <span aria-hidden="true">·</span>}
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {link.label}
            </a>
          </span>
        ))}
        <span aria-hidden="true">·</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
