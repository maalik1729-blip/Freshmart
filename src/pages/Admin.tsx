import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SimpleNav from "@/components/SimpleNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
}

interface UserRow {
  id: string;
  email: string | null;
  display_name: string | null;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [form, setForm] = useState({ name: "", price: "", category: "Rings", description: "" });
  const [busy, setBusy] = useState(false);

  const loadAll = async () => {
    const [{ data: p }, { data: u }] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    ]);
    setProducts((p as Product[]) ?? []);
    setUsers((u as UserRow[]) ?? []);
  };

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin]);

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen bg-background">
        <SimpleNav />
        <main className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-light">Admin</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            You are signed in, but your account does not have admin access.
            Ask an existing admin to grant your account the <code>admin</code> role.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Your user id: <code>{user.id}</code>
          </p>
        </main>
      </div>
    );

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("products").insert({
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      description: form.description.trim() || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Product added");
    setForm({ name: "", price: "", category: "Rings", description: "" });
    loadAll();
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    loadAll();
  };

  const promoteAdmin = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (error) return toast.error(error.message);
    toast.success("Admin role granted");
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-light">Admin Panel</h1>

        <section className="mb-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-medium">Add product</h2>
            <form onSubmit={addProduct} className="space-y-3">
              <div>
                <Label htmlFor="p-name">Name</Label>
                <Input id="p-name" required maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="p-price">Price (€)</Label>
                <Input id="p-price" type="number" min="0" step="0.01" required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="p-cat">Category</Label>
                <select id="p-cat" className="w-full border border-input bg-background px-3 py-2 text-sm"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  <option>Rings</option>
                  <option>Earrings</option>
                  <option>Bracelets</option>
                  <option>Necklaces</option>
                </select>
              </div>
              <div>
                <Label htmlFor="p-desc">Description</Label>
                <Textarea id="p-desc" rows={4} maxLength={1000}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <Button type="submit" disabled={busy} className="rounded-none">
                {busy ? "Adding…" : "Add product"}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-medium">Products ({products.length})</h2>
            <div className="max-h-[400px] space-y-2 overflow-auto pr-2">
              {products.length === 0 && (
                <p className="text-sm text-muted-foreground">No products yet.</p>
              )}
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category} · €{Number(p.price).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteProduct(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Users ({users.length})</h2>
          <div className="overflow-hidden border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Joined</th>
                  <th className="px-4 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="px-4 py-2">{u.display_name ?? "—"}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button variant="outline" size="sm" onClick={() => promoteAdmin(u.id)}>
                        Make admin
                      </Button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No users yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;