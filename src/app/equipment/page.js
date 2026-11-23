"use client";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import { Search, MapPin } from "lucide-react";

const CATEGORIES = [
  "All",
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];

function AllEquipmentContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [location, setLocation] = useState("");
  const [rentalType, setRentalType] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("recent");

  const fetchEquipment = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== "All") params.category = category;
      if (location) params.location = location;
      if (rentalType !== "All") params.rentalType = rentalType;
      if (availability !== "All") params.availability = availability;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sort) params.sort = sort;

      const res = await api.get("/api/equipment", { params });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, category, location, rentalType, availability, maxPrice, sort]);

  useEffect(() => {
    const timer = setTimeout(fetchEquipment, 300);
    return () => clearTimeout(timer);
  }, [fetchEquipment]);

  const handleViewDetails = (id) => {
    if (!user) router.push("/login");
    else router.push(`/equipment/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">All Equipment</h1>
        <p className="text-slate-400 text-sm mt-1">
          Search, filter, and rent verified equipment across Bangladesh.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Filter by Location (e.g. Dhaka)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-amber-500"
        />

        <select
          value={rentalType}
          onChange={(e) => setRentalType(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none"
        >
          <option value="All">All Rental Types</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <input
          type="number"
          placeholder="Max Price ($)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-amber-500"
        />

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none"
        >
          <option value="All">All Availability</option>
          <option value="Available">Available Only</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none"
        >
          <option value="recent">Recently Added</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* 3-Column Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          Loading equipment...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          No equipment found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
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
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-medium">
                      {item.category}
                    </span>
                    <span
                      className={
                        item.availableQuantity > 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      {item.availableQuantity > 0
                        ? "Available"
                        : "Out of Stock"}
                    </span>
                  </div>
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
      )}
    </div>
  );
}

export default function AllEquipmentPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-slate-400">Loading...</div>
      }
    >
      <AllEquipmentContent />
    </Suspense>
  );
}
