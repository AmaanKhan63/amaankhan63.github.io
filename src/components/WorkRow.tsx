import { Link } from "react-router-dom";
import type { WorkItem } from "@/lib/work-items";

type Props = {
  item: WorkItem;
};

export default function WorkRow({ item }: Props) {
  return (
    <Link
      to={`/work/${item.slug}`}
      className="group grid grid-cols-[7rem_1fr_auto] sm:grid-cols-[8rem_12rem_1fr_auto] items-baseline gap-4 sm:gap-6 px-2 py-4 sm:py-5 -mx-2 border-b border-border transition-colors duration-150 hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span className="text-sm text-muted font-sans tabular-nums">{item.year}</span>
      <span className="font-serif text-base sm:text-lg col-span-2 sm:col-span-1">
        {item.title}
      </span>
      <span className="hidden sm:block text-sm text-muted font-sans">
        {item.description}
      </span>
      <span
        aria-hidden="true"
        className="text-accent transition-transform duration-150 group-hover:translate-x-1"
      >
        →
      </span>
      <span className="sm:hidden col-span-3 text-sm text-muted font-sans -mt-2">
        {item.description}
      </span>
    </Link>
  );
}
