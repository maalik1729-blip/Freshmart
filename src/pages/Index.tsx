import { Link } from "react-router-dom";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const features = [
  {
    id: "01",
    title: "Fresh",
    desc: "Every product sourced fresh from trusted suppliers and delivered to your doorstep.",
  },
  {
    id: "02",
    title: "Trusted",
    desc: "Certified quality across all categories — from organic dairy to household essentials.",
  },
  {
    id: "03",
    title: "Delivered",
    desc: "Fast, reliable delivery with real-time tracking and hassle-free returns.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />

      <main>
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="text-4xl font-light md:text-6xl">Fresh Essentials, Everyday Needs</h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            Discover a curated selection of FMCG products — beverages, snacks, personal care,
            dairy, household, and more. Quality you can trust, delivered right to your door.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/products"><Button className="rounded-none">Shop Now</Button></Link>
            <Link to="/enquiry"><Button variant="outline" className="rounded-none">Send Enquiry</Button></Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24 grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.id} className="border border-border p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{f.id}</p>
              <h3 className="mt-3 text-xl font-light">{f.title}</h3>
              <p className="mt-3 text-sm font-light text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
