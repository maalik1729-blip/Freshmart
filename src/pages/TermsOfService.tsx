import { useEffect } from "react";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - FreshMart";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />

      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: July 18, 2026</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the FreshMart website and services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our website and enquiry platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on FreshMart's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Product Information and Enquiries</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate product details, descriptions, and packaging information. However, we do not warrant that descriptions or other content are error-free. We reserve the right to modify product details, availability, or categories at any time without notice. Product supply is subject to direct confirmation via our WhatsApp enquiry process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">No Direct Sales / Pricing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform operates on a product enquiry basis. No retail pricing is displayed, and no online checkout or payment processing is completed through this website. Ordering terms, wholesale quotes, availability, and payment methods are handled directly and settled on an individual basis during offline or WhatsApp discussions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of FreshMart and is protected by copyright, trademark, and other intellectual property laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall FreshMart or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we have been notified of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our website and services, to understand our practices regarding your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with local laws, and you irrevocably submit to the exclusive jurisdiction of the courts in our operating locations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the current version of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>Email: legal@freshmartstore.com</p>
                <p>Phone: +44 20 7946 0123</p>
                <p>Address: 14 Market Street, London, EC1A 1BB</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;