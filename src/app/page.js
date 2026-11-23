"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import {
  ShieldCheck,
  Clock,
  CreditCard,
  BadgeCheck,
  Star,
  MapPin,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];

const REVIEWS = [
  {
    name: "Tariqul Islam",
    rating: 5,
    comment:
      "Rented a Sony A7 IV for our wedding shoot. Smooth Stripe checkout and mint condition gear!",
  },
  {
    name: "Nusrat Jahan",
    rating: 5,
    comment:
      "Booked a JBL sound system for our university fest. Delivered on time and zero hassle.",
  },
  {
    name: "Kamrul Hasan",
    rating: 4,
    comment:
      "Great platform for construction contractors. Verified owners make it super trustworthy.",
  },
  {
    name: "Sadia Afrin",
    rating: 5,
    comment:
      "Transparent daily pricing and instant booking confirmation. Highly recommended!",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/api/equipment/featured")
      .then((res) => setFeatured(res.data))
      .catch(() => {});
  }, []);

  const handleViewDetails = (id) => {
    if (!user) {
      router.push("/login");
    } else {
      router.push(`/equipment/${id}`);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Banner Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30 border-b border-slate-800 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-semibold">
              Trusted Equipment Rental Marketplace
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Rent Pro-Grade <span className="text-amber-500">Equipment</span>{" "}
              Anytime, Anywhere.
            </h1>
            <p className="text-slate-400 text-lg">
              Connect with verified equipment owners for construction,
              photography, agriculture, and events—backed by secure Stripe
              payments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/equipment"
                className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition flex items-center gap-2"
              >
                Browse Equipment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition"
              >
                List Your Gear
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
              alt="Heavy Equipment Rental"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* 2. Featured Equipment Section (Limit 6) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Featured Equipment
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Top-rated verified equipment ready for immediate booking.
            </p>
          </div>
          <Link
            href="/equipment"
            className="text-amber-400 hover:underline text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs text-amber-400 font-medium">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <p className="text-white font-bold">
                    ${item.rentalPrice}
                    <span className="text-xs text-slate-400 font-normal">
                      /{item.rentalType}
                    </span>
                  </p>
                  <button
                    onClick={() => handleViewDetails(item._id)}
                    className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-semibold rounded-lg hover:bg-amber-400 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Categories Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/equipment?category=${encodeURIComponent(cat)}`}
              className="p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-amber-500/50 transition text-center font-semibold text-white"
            >
              {cat}
            </Link>
          ))}
        </div>
      </motion.section>

      {/* 4. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Why Choose RentGear?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: BadgeCheck,
              title: "Verified Owners",
              desc: "Every equipment owner is vetted for quality and reliability.",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              desc: "Protected checkout powered by Stripe payment gateway.",
            },
            {
              icon: Clock,
              title: "Flexible Periods",
              desc: "Rent daily, weekly, or monthly based on your project timeline.",
            },
            {
              icon: ShieldCheck,
              title: "Affordable Pricing",
              desc: "Transparent rates with zero hidden fees.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3"
            >
              <f.icon className="w-8 h-8 text-amber-500" />
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Extra Section 1: How It Works */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Search & Compare",
              desc: "Filter equipment by category, location, price, and availability.",
            },
            {
              step: "02",
              title: "Book & Pay Securely",
              desc: "Select your rental dates and complete payment via Stripe.",
            },
            {
              step: "03",
              title: "Pick Up or Deliver",
              desc: "Receive your gear on time and track everything from your dashboard.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl"
            >
              <span className="text-3xl font-extrabold text-amber-500/40">
                {s.step}
              </span>
              <h3 className="text-xl font-bold text-white mt-2">{s.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3"
            >
              <div className="flex text-amber-400">
                {Array.from({ length: r.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-300">“{r.comment}”</p>
              <p className="text-xs font-semibold text-white pt-2 border-t border-slate-800">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Extra Section 2: Trusted Owners CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="p-10 bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Own Idle Equipment? Turn It Into Income.
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Join 150+ trusted equipment owners earning passive income on
              RentGear.
            </p>
          </div>
          <Link
            href="/register"
            className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition whitespace-nowrap"
          >
            Become an Owner
          </Link>
        </div>
      </section>
    </div>
  );
}
