import WorkRow from "@/components/WorkRow";
import Footer from "@/components/Footer";
import { workItems } from "@/lib/work-items";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-prose px-4 py-12">
        {workItems.map((item) => (
          <WorkRow key={item.slug} item={item} />
        ))}
      </main>
      <Footer />
    </>
  );
}
