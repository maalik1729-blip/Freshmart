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
import { Trash2, Edit, Plus, X, Upload, Check } from "lucide-react";
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

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginBusy(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        throw error;
      }
      
      if (!data?.user?.isSuperAdmin) {
        await supabase.auth.signOut();
        throw new Error("You are not authorized as an Admin.");
      }
      
      toast.success("Successfully authenticated as Admin");
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
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

  // Handle Accept Enquiry
  const handleAcceptEnquiry = async (id: string) => {
    try {
      const token = localStorage.getItem("freshmart_token");
      const response = await fetch(`/api/enquiries/${id}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to accept enquiry");
      }

      toast.success("Enquiry accepted and kept in database!");
      loadEnquiries();
    } catch (err: any) {
      toast.error(err.message || "Error accepting enquiry");
    }
  };

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
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="sa-user">Username</Label>
                <Input
                  id="sa-user"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sa-pass">Password</Label>
                <Input
                  id="sa-pass"
                  type="password"
                  required
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={loginBusy} className="w-full rounded-none h-11">
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
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
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
                              <div className="flex flex-col gap-1.5">
                                <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/25 rounded-none font-medium">
                                  {e.enquiryType}
                                </span>
                                {e.status === "accepted" ? (
                                  <span className="inline-block text-[10px] uppercase font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 w-max">
                                    Accepted
                                  </span>
                                ) : (
                                  <span className="inline-block text-[10px] uppercase font-bold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 w-max">
                                    Pending
                                  </span>
                                )}
                              </div>
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
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={e.status === "accepted"}
                                  className={`h-8 w-8 ${
                                    e.status === "accepted"
                                      ? "text-green-300 cursor-not-allowed"
                                      : "text-green-600 hover:text-green-700 hover:bg-green-50"
                                  }`}
                                  onClick={() => handleAcceptEnquiry(e._id)}
                                  title="Accept & Keep Enquiry"
                                >
                                  <Check className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleDeleteEnquiry(e._id)}
                                  title="Delete Enquiry"
                                >
                                  <X className="h-5 w-5" />
                                </Button>
                              </div>
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
