import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./hooks/useAuth";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import Auth from "./pages/Auth";
import SuperAdmin from "./pages/SuperAdmin";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/super-admin" element={<SuperAdmin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppFloat />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
