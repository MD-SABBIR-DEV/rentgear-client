"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-400">
        Loading dashboard...
      </div>
    );
  }

  const role = user.role || "Customer";

  const links = [
    { href: "/dashboard", label: "Overview" },
    ...(role === "Customer"
      ? [
          { href: "/dashboard/my-rentals", label: "My Rentals" },
          { href: "/dashboard/favorites", label: "Favorites" },
        ]
      : []),
    ...(role === "Owner"
      ? [
          { href: "/dashboard/add-equipment", label: "Add Equipment" },
          { href: "/dashboard/my-equipment", label: "My Equipment" },
          {
            href: "/dashboard/my-equipment-rentals",
            label: "Equipment Rentals",
          },
        ]
      : []),
    ...(role === "Admin"
      ? [
          { href: "/dashboard/all-users", label: "All Users" },
          { href: "/dashboard/all-equipment", label: "All Equipment" },
          { href: "/dashboard/all-rentals", label: "All Rentals" },
        ]
      : []),
    { href: "/dashboard/profile", label: "My Profile" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 min-h-[80vh]">
      <aside className="w-full md:w-64 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
        <div className="pb-4 border-b border-slate-800">
          <p className="text-white font-bold truncate">{user.name}</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full">
            {role}
          </span>
        </div>
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3.5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                pathname === l.href
                  ? "bg-amber-500 text-slate-950 font-semibold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 overflow-x-auto">
        {children}
      </section>
    </div>
  );
}
