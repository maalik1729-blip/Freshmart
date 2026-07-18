import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import SimpleNav from "@/components/SimpleNav";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2, Edit, Plus, X, Upload, Check, Clock, UserCheck, UserX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string | null;
  imageUrl?: string;
  created_at?: string;
}

const CATEGORIES = ["Beverages", "Snacks", "Personal Care", "Dairy", "Household", "Frozen Foods"];

const Admin = () => {
  const { user, isSuperAdmin, loading, signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  
  // Login Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  // Rate-limit state (client-side, 5 attempts per 10 min)
  const RATE_KEY = "admin_login_attempts";
  const RATE_LIMIT = 5;
  const LOCKOUT_MS = 10 * 60 * 1000; // 10 minutes
  const getRateData = () => {
    try { return JSON.parse(localStorage.getItem(RATE_KEY) || "{}"); } catch { return {}; }
  };
  const [lockedUntil, setLockedUntil] = useState<number>(() => {
    const d = JSON.parse(localStorage.getItem(RATE_KEY) || "{}");
    return d.lockedUntil || 0;
  });
  const [attemptsLeft, setAttemptsLeft] = useState<number>(() => {
    const d = JSON.parse(localStorage.getItem(RATE_KEY) || "{}");
    return Math.max(0, RATE_LIMIT - (d.attempts || 0));
  });

  // Tab State
  const [activeTab, setActiveTab] = useState<"products" | "enquiries">("products");
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // Add Product Form State
  const [form, setForm] = useState({ name: "", category: "Beverages", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [addBusy, setAddBusy] = useState(false);

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", description: "" });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editBusy, setEditBusy] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const loadEnquiries = async () => {
    try {
      const token = localStorage.getItem("freshmart_token");
      const response = await fetch("/api/enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error("Error loading enquiries:", err);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      loadProducts();
      loadEnquiries();
    }
  }, [isSuperAdmin]);

  // SHA-256 hash helper (browser native crypto API)
  const sha256 = async (text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  // Handle Admin Login with SHA-256 + rate limiting
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check client-side lockout
    const now = Date.now();
    const rateData = getRateData();
    if (rateData.lockedUntil && now < rateData.lockedUntil) {
      const minsLeft = Math.ceil((rateData.lockedUntil - now) / 60000);
      toast.error(`Too many attempts. Try again in ${minsLeft} minute${minsLeft !== 1 ? "s" : ""}.`);
      return;
    }

    setLoginBusy(true);
    try {
      // Hash password with SHA-256 before sending
      const hashedPassword = await sha256(password);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: hashedPassword,
      });

      if (error) throw error;

      if (!data?.user?.isSuperAdmin) {
        await supabase.auth.signOut();
        throw new Error("You are not authorized as an Admin.");
      }

      // Success — clear rate limit
      localStorage.removeItem(RATE_KEY);
      setLockedUntil(0);
      setAttemptsLeft(RATE_LIMIT);
      toast.success("Successfully authenticated as Admin");
      loadProducts();
    } catch (err: any) {
      // Track failed attempt
      const fresh = getRateData();
      const attempts = (fresh.attempts || 0) + 1;
      let newLocked = 0;
      if (attempts >= RATE_LIMIT) {
        newLocked = Date.now() + LOCKOUT_MS;
        localStorage.setItem(RATE_KEY, JSON.stringify({ attempts, lockedUntil: newLocked }));
        setLockedUntil(newLocked);
        setAttemptsLeft(0);
        toast.error(`Too many failed attempts. Account locked for 10 minutes.`);
      } else {
        localStorage.setItem(RATE_KEY, JSON.stringify({ attempts, lockedUntil: 0 }));
        setAttemptsLeft(RATE_LIMIT - attempts);
        toast.error(err.message || "Invalid credentials");
      }
    } finally {
      setLoginBusy(false);
    }
  };

  // Handle Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddBusy(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("category", form.category);
      formData.append("description", form.description.trim());
      formData.append("price", "0");
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const token = localStorage.getItem("freshmart_token");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to add product");
      }

      toast.success("Product created successfully");
      setForm({ name: "", category: "Beverages", description: "" });
      setImageFile(null);
      const fileInput = document.getElementById("p-image") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Error adding product");
    } finally {
      setAddBusy(false);
    }
  };

  // Open Edit Dialog
  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      category: product.category,
      description: product.description || "",
    });
    setEditImageFile(null);
  };

  // Handle Update Product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setEditBusy(true);
    try {
      const formData = new FormData();
      formData.append("name", editForm.name.trim());
      formData.append("category", editForm.category);
      formData.append("description", editForm.description.trim());
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      const token = localStorage.getItem("freshmart_token");
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update product");
      }

      toast.success("Product updated successfully");
      setEditingProduct(null);
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Error updating product");
    } finally {
      setEditBusy(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("freshmart_token");
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete product");
      }

      toast.success("Product deleted successfully");
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Error deleting product");
    }
  };

  // Handle Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const token = localStorage.getItem("freshmart_token");
      const response = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to delete enquiry");
      }

      toast.success("Enquiry removed successfully");
      loadEnquiries();
    } catch (err: any) {
      toast.error(err.message || "Error deleting enquiry");
    }
  };

  // Handle Update Enquiry Status
  const handleUpdateStatus = async (id: string, value: string) => {
    try {
      const token = localStorage.getItem("freshmart_token");
      const response = await fetch(`/api/enquiries/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: value }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update status");
      }

      toast.success("Enquiry status updated!");
      loadEnquiries();
    } catch (err: any) {
      toast.error(err.message || "Error updating status");
    }
  };

  const pendingCount = enquiries.filter((e) => (e.status || "pending") === "pending").length;
  const interestedCount = enquiries.filter((e) => e.status === "interested").length;
  const notInterestedCount = enquiries.filter((e) => e.status === "not_interested").length;

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background">
      {!isSuperAdmin && <SimpleNav />}
      
      {!isSuperAdmin ? (
        // Admin Login View
        <main className="mx-auto max-w-md px-6 py-24">
          <div className="border border-border p-8 bg-card text-card-foreground">
            <h1 className="mb-2 text-2xl font-light tracking-tight text-center">Admin Access</h1>
            <p className="mb-6 text-xs text-muted-foreground text-center">
              Please authenticate using the designated credentials.
            </p>
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
              {/* Lockout warning */}
              {lockedUntil > Date.now() && (
                <div className="bg-red-50 border border-red-200 rounded px-3 py-2 text-xs text-red-700">
                  🔒 Too many failed attempts. Try again in{" "}
                  {Math.ceil((lockedUntil - Date.now()) / 60000)} min.
                </div>
              )}
              {attemptsLeft < RATE_LIMIT && attemptsLeft > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded px-3 py-2 text-xs text-amber-700">
                  ⚠️ {attemptsLeft} attempt{attemptsLeft !== 1 ? "s" : ""} remaining before 10-min lockout.
                </div>
              )}
              <div>
                <Label htmlFor="sa-user">Username</Label>
                <Input
                  id="sa-user"
                  required
                  placeholder="Username"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={lockedUntil > Date.now()}
                />
              </div>
              <div>
                <Label htmlFor="sa-pass">Password</Label>
                <Input
                  id="sa-pass"
                  type="password"
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={lockedUntil > Date.now()}
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-right">
                🔐 Password hashed with SHA-256 before transmission
              </p>
              <Button
                type="submit"
                disabled={loginBusy || lockedUntil > Date.now()}
                className="w-full rounded-none h-11"
              >
                {loginBusy ? "Authenticating…" : "Login"}
              </Button>
            </form>
          </div>
        </main>
      ) : (
        // Admin Dashboard View
        <main className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <div>
              <h1 className="text-3xl font-light">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Catalog CRUD & Enquiries controls</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-none text-xs" onClick={signOut}>
              Logout Admin
            </Button>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-6 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-2 text-sm font-normal tracking-wide border-b-2 transition-all ${
                activeTab === "products"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Manage Catalog
            </button>
            <button
              onClick={() => setActiveTab("enquiries")}
              className={`pb-2 text-sm font-normal tracking-wide border-b-2 transition-all ${
                activeTab === "enquiries"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              User Enquiries ({enquiries.length})
            </button>
          </div>

          {activeTab === "products" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Create Product Section */}
              <div className="lg:col-span-1 border border-border p-6 bg-card">
                <h2 className="text-lg font-normal mb-4 flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Add New FMCG Product
                </h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <Label htmlFor="p-name">Product Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="p-name"
                      required
                      maxLength={100}
                      placeholder="e.g. Organic Apple Juice"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="p-cat">Category <span className="text-red-500">*</span></Label>
                    <select
                      id="p-cat"
                      required
                      className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="p-desc">Description</Label>
                    <Textarea
                      id="p-desc"
                      rows={4}
                      maxLength={1000}
                      placeholder="Provide details about size, packaging, ingredients, etc."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="p-image" className="flex items-center gap-2 cursor-pointer">
                      <Upload className="h-4 w-4" /> Upload Image
                    </Label>
                    <Input
                      id="p-image"
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                      onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">Image uploads to Cloudinary securely</p>
                  </div>
                  <Button type="submit" disabled={addBusy} className="w-full rounded-none">
                    {addBusy ? "Uploading & Adding…" : "Create Product"}
                  </Button>
                </form>
              </div>

              {/* Read / List Products Section */}
              <div className="lg:col-span-2">
                <h2 className="text-lg font-normal mb-4">Manage Catalog ({products.length} Products)</h2>
                <div className="border border-border bg-card overflow-hidden">
                  <div className="max-h-[600px] overflow-y-auto divide-y divide-border">
                    {products.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground text-sm font-light">
                        No products found. Add products to populate the catalog.
                      </div>
                    ) : (
                      products.map((p) => (
                        <div key={p.id} className="p-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-muted/30 border border-border flex items-center justify-center overflow-hidden shrink-0">
                              {p.imageUrl ? (
                                <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-xs text-muted-foreground uppercase">{p.category.slice(0, 3)}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm font-medium leading-none mb-1">{p.name}</h3>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider">{p.category}</p>
                              {p.description && (
                                <p className="text-xs text-muted-foreground line-clamp-1 mt-1 font-light">{p.description}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-foreground"
                              onClick={() => openEdit(p)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-red-500"
                              onClick={() => handleDeleteProduct(p.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // User Enquiry Table View
            <div>
              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Pending Enquiries Card */}
                <div className="border border-amber-200 bg-amber-50/30 p-6 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-700/80 mb-1">
                      Pending Enquiries
                    </p>
                    <h3 className="text-3xl font-light text-amber-800">{pendingCount}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-600 shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </div>

                {/* Interested Card */}
                <div className="border border-green-200 bg-green-50/30 p-6 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-green-700/80 mb-1">
                      Interested Leads
                    </p>
                    <h3 className="text-3xl font-light text-green-800">{interestedCount}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100/80 flex items-center justify-center text-green-600 shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>

                {/* Not Interested Card */}
                <div className="border border-red-200 bg-red-50/30 p-6 rounded-xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-red-700/80 mb-1">
                      Not Interested
                    </p>
                    <h3 className="text-3xl font-light text-red-800">{notInterestedCount}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-red-100/80 flex items-center justify-center text-red-600 shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-normal mb-4">Received Enquiries ({enquiries.length})</h2>
              <div className="border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3 font-medium">Customer Details</th>
                        <th className="px-6 py-3 font-medium">Enquiry Type</th>
                        <th className="px-6 py-3 font-medium">Product / Quantity</th>
                        <th className="px-6 py-3 font-medium">Message</th>
                        <th className="px-6 py-3 font-medium">Submitted</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border font-light">
                      {enquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                            No enquiries found yet.
                          </td>
                        </tr>
                      ) : (
                        enquiries.map((e) => (
                          <tr key={e._id} className="hover:bg-muted/10 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-foreground">{e.name}</div>
                              <div className="text-xs text-muted-foreground">{e.email}</div>
                              {e.phone && <div className="text-xs text-muted-foreground">Phone: {e.phone}</div>}
                              {e.company && <div className="text-xs text-muted-foreground">Company: {e.company}</div>}
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/25 rounded-none font-medium">
                                {e.enquiryType}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-foreground">{e.product || "—"}</div>
                              <div className="text-xs text-muted-foreground uppercase">{e.category || "—"}</div>
                              {e.quantity && <div className="text-xs text-muted-foreground font-medium mt-0.5">Qty: {e.quantity}</div>}
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <p className="text-xs text-muted-foreground line-clamp-3 whitespace-pre-line leading-relaxed" title={e.message}>
                                {e.message}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-xs text-muted-foreground">
                              {new Date(e.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={e.status || "pending"}
                                onChange={(evt) => handleUpdateStatus(e._id, evt.target.value)}
                                className={`text-xs border px-2.5 py-1 focus:outline-none rounded-none font-medium transition-colors ${
                                  e.status === "interested"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : e.status === "not_interested"
                                    ? "bg-red-50 text-red-700 border-red-200"
                                    : "bg-amber-50 text-amber-700 border-amber-200"
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="interested">Interested</option>
                                <option value="not_interested">Not Interested</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Edit Product Modal */}
      <Dialog open={editingProduct !== null} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="max-w-md bg-background border border-border rounded-none shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-normal">Edit Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProduct} className="space-y-4 pt-2">
            <div>
              <Label htmlFor="edit-name">Product Name <span className="text-red-500">*</span></Label>
              <Input
                id="edit-name"
                required
                maxLength={100}
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-cat">Category <span className="text-red-500">*</span></Label>
              <select
                id="edit-cat"
                required
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-foreground"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                rows={4}
                maxLength={1000}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-image" className="flex items-center gap-2 cursor-pointer">
                <Upload className="h-4 w-4" /> Replace Image (optional)
              </Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={(e) => setEditImageFile(e.target.files ? e.target.files[0] : null)}
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" className="rounded-none" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={editBusy} className="rounded-none">
                {editBusy ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Admin;
