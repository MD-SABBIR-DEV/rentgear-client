import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-white mb-3"
          >
            <div className="p-1.5 bg-amber-500 rounded-lg text-slate-950">
              <Wrench className="w-4 h-4" />
            </div>
            <span>
              Rent<span className="text-amber-500">Gear</span>
            </span>
          </Link>
          <p className="text-sm">
            Transparent and secure equipment rental marketplace connecting
            verified owners with customers.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/equipment" className="hover:text-amber-400">
                All Equipment
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-amber-400">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            <li>Construction Equipment</li>
            <li>Photography Equipment</li>
            <li>Agriculture & Vehicles</li>
            <li>Event & Electronics</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Connect With Us</h4>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="p-2 bg-slate-900 rounded-lg hover:text-white transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <p className="text-xs mt-4">
            © {new Date().getFullYear()} RentGear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
