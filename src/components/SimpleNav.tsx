import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact Us" },
  { to: "/enquiry", label: "Enquiry" },
];

const SimpleNav = () => {
  const { user, isSuperAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-foreground">🛒 FreshMart</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-light transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isSuperAdmin && (
            <Link to="/super-admin">
              <Button size="sm" variant="outline" className="rounded-none">
                Super Admin
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile links */}
      <nav className="md:hidden flex items-center justify-center gap-5 border-t border-border py-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `text-xs font-light ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default SimpleNav;