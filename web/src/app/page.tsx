import { CardWithForm } from "@/components/derived/CardWithForm";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">Next JS Starter</h1>
        <div className="mt-4">
          <ThemeToggle />
        </div>
        <div className="mt-12">
          <CardWithForm />
        </div>
      </div>
    </section>
  );
}
