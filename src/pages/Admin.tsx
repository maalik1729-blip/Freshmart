import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SimpleNav from "@/components/SimpleNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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
          <h1 className="text-3xl font-light">Dashboard</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            You are signed in, but your account does not have dashboard access.
          </p>
        </main>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <SimpleNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 pb-4 border-b border-border">
          <h1 className="text-3xl font-light">Member Dashboard</h1>
          <p className="text-xs text-muted-foreground">Read-only catalogs and members information</p>
        </div>

        <section className="mb-16 grid gap-10 md:grid-cols-2">
          {/* Read-Only Products List */}
          <div>
            <h2 className="mb-4 text-lg font-medium">Product Catalog ({products.length})</h2>
            <div className="max-h-[400px] space-y-2 overflow-auto pr-2 border border-border p-4 bg-card/10">
              {products.length === 0 && (
                <p className="text-sm text-muted-foreground">No products yet.</p>
              )}
              {products.map((p) => (
                <div key={p.id} className="flex items-center justify-between border border-border p-3 bg-card">
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Read-Only Users List */}
          <div>
            <h2 className="mb-4 text-lg font-medium">Registered Members ({users.length})</h2>
            <div className="overflow-hidden border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="px-4 py-2 font-medium">Name</th>
                    <th className="px-4 py-2 font-medium">Email</th>
                    <th className="px-4 py-2 font-medium">Joined</th>
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
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No users yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;