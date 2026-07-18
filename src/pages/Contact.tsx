import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/footer/Footer";

const Contact = () => (
  <div className="min-h-screen bg-background">
    <SimpleNav />
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-light">Contact Us</h1>
      <p className="mb-8 text-sm font-light leading-relaxed text-muted-foreground">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Reach out and we'll get back to you as soon as possible.
      </p>
      <div className="space-y-4 text-sm font-light">
        <div>
          <p className="font-normal text-foreground">Phone / WhatsApp</p>
          <p className="text-muted-foreground">+91 99400 89442</p>
        </div>
        <div>
          <p className="font-normal text-foreground">Email</p>
          <p className="text-muted-foreground">hello@lineajewelry.com</p>
        </div>
        <div>
          <p className="font-normal text-foreground">Address</p>
          <p className="text-muted-foreground">Lorem ipsum street 123, Dolor Sit City</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Contact;