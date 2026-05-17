import { Link, NavLink } from "react-router-dom";

const items = [
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  return (
    <nav className="mx-auto max-w-prose px-4 pt-8 pb-12 flex items-center justify-between text-sm font-sans">
      <Link
        to="/"
        className="font-serif text-base hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        Amaan Khan
      </Link>
      <div className="flex gap-6 text-muted">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                isActive ? "text-fg" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
