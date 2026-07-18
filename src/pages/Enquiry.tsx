import { useState } from "react";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ShoppingBag, PackageSearch, Truck, Phone } from "lucide-react";

const CATEGORIES = [
  "Beverages",
  "Snacks",
  "Personal Care",
  "Dairy",
  "Household",
  "Frozen Foods",
];

const PRODUCTS: Record<string, string[]> = {
  Beverages: ["Mineral Water 1.5L", "Fresh Orange Juice 1L", "Green Tea 25 Bags", "Cola 2L"],
  Snacks: ["Potato Chips 200g", "Granola Bar 6-Pack", "Butter Biscuits 300g", "Microwave Popcorn"],
  "Personal Care": ["Shampoo 400ml", "Body Wash 250ml", "Toothpaste 100ml", "Moisturiser 200ml"],
  Dairy: ["Full Cream Milk 1L", "Greek Yoghurt 500g", "Unsalted Butter 250g", "Cheddar Cheese 400g"],
  Household: ["Dish Soap 750ml", "Laundry Detergent 2kg", "Paper Towels 6-Roll", "Floor Cleaner 1L"],
  "Frozen Foods": ["Frozen Peas 500g", "Vanilla Ice Cream 1L", "Frozen Pizza 400g", "Mixed Vegetables 1kg"],
};

const ENQUIRY_TYPES = [
  "Product Availability",
  "Bulk / Wholesale Order",
  "Price Quote",
  "Delivery Information",
  "Product Quality",
  "Other",
];

const Enquiry = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    enquiryType: "",
    category: "",
    product: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to save enquiry to server");
      }

      const text =
        `🛒 *FreshMart Product Enquiry*\n\n` +
        `👤 Name: ${form.name}\n` +
        `📧 Email: ${form.email}\n` +
        `📱 Phone: ${form.phone || "N/A"}\n` +
        `🏢 Company: ${form.company || "N/A"}\n\n` +
        `📋 Enquiry Type: ${form.enquiryType}\n` +
        `🗂 Category: ${form.category}\n` +
        `📦 Product: ${form.product}\n` +
        `🔢 Quantity: ${form.quantity}\n\n` +
        `💬 Message: ${form.message}`;

      window.open(
        `https://wa.me/919940089442?text=${encodeURIComponent(text)}`,
        "_blank"
      );
      toast.success("Opening WhatsApp to send your product enquiry…");
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />

      <main className="mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light mb-3">Product Enquiry</h1>
          <p className="text-sm font-light text-muted-foreground max-w-xl">
            Looking for a specific product, bulk pricing, or delivery details? Fill in the form below
            and our team will get back to you via WhatsApp within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="border border-green-200 bg-green-50 rounded-sm p-8 text-center space-y-3">
                <div className="text-4xl">✅</div>
                <h2 className="text-xl font-light text-green-800">Enquiry Sent!</h2>
                <p className="text-sm text-green-700">
                  Your product enquiry has been sent via WhatsApp. Our team will respond shortly.
                </p>
                <Button
                  variant="outline"
                  className="rounded-none mt-4"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", company: "", enquiryType: "", category: "", product: "", quantity: "", message: "" });
                  }}
                >
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                {/* Contact Details */}
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                    Contact Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        required
                        maxLength={100}
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        maxLength={255}
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        maxLength={20}
                        placeholder="+44 20 0000 0000"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="company">Company / Organisation</Label>
                      <Input
                        id="company"
                        maxLength={100}
                        placeholder="Optional"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                    Product Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="enquiryType">Enquiry Type <span className="text-red-500">*</span></Label>
                      <select
                        id="enquiryType"
                        required
                        className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
                        value={form.enquiryType}
                        onChange={(e) => set("enquiryType", e.target.value)}
                      >
                        <option value="">Select type…</option>
                        {ENQUIRY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="category">Product Category <span className="text-red-500">*</span></Label>
                      <select
                        id="category"
                        required
                        className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
                        value={form.category}
                        onChange={(e) => { set("category", e.target.value); set("product", ""); }}
                      >
                        <option value="">Select category…</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="product">Product Name <span className="text-red-500">*</span></Label>
                      <select
                        id="product"
                        required
                        className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
                        value={form.product}
                        onChange={(e) => set("product", e.target.value)}
                        disabled={!form.category}
                      >
                        <option value="">
                          {form.category ? "Select product…" : "Select category first…"}
                        </option>
                        {(PRODUCTS[form.category] || []).map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="quantity">Quantity / Units <span className="text-red-500">*</span></Label>
                      <Input
                        id="quantity"
                        required
                        maxLength={50}
                        placeholder="e.g. 100 units, 5 cases"
                        value={form.quantity}
                        onChange={(e) => set("quantity", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
                    Additional Message
                  </h2>
                  <div className="space-y-1">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="message"
                      required
                      maxLength={1000}
                      rows={5}
                      placeholder="Tell us more about your requirements — delivery location, specific packaging, urgency, etc."
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground text-right">{form.message.length}/1000</p>
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className="w-full h-12 rounded-none text-sm font-medium">
                  {submitting ? "Processing Enquiry…" : "📲 Send Enquiry via WhatsApp"}
                </Button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="border border-border p-6 space-y-4">
              <h3 className="text-sm font-medium">Why Enquire?</h3>
              <div className="space-y-4">
                {[
                  { icon: ShoppingBag, title: "Bulk Orders", desc: "Get special pricing on large quantity orders across all categories." },
                  { icon: PackageSearch, title: "Custom Sourcing", desc: "Can't find what you need? We'll source it for you." },
                  { icon: Truck, title: "Delivery Queries", desc: "Ask about delivery schedules, cold chain, or same-day options." },
                  { icon: Phone, title: "Fast Response", desc: "WhatsApp response within 24 hours on business days." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-xs font-light text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border p-6 space-y-2">
              <h3 className="text-sm font-medium mb-3">Contact Directly</h3>
              <p className="text-sm font-light text-muted-foreground">📧 hello@freshmartstore.com</p>
              <p className="text-sm font-light text-muted-foreground">📞 +44 20 7946 0123</p>
              <p className="text-sm font-light text-muted-foreground">⏰ Mon–Fri, 9am–6pm</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Enquiry;