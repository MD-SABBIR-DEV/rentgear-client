"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddEquipmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Construction Equipment",
    location: "",
    rentalPrice: "",
    rentalType: "Daily",
    availableQuantity: 1,
    condition: "Excellent",
    brand: "",
    model: "",
    terms: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl =
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&q=80";

    if (imageFile) {
      try {
        const fd = new FormData();
        fd.append("image", imageFile);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          fd,
        );
        imageUrl = res.data.data.display_url;
      } catch {
        toast.error("Image upload failed, using default image.");
      }
    }

    try {
      await api.post("/api/equipment", { ...form, image: imageUrl });
      toast.success("Equipment added (Pending Admin Approval)!");
      router.push("/dashboard/my-equipment");
    } catch {
      toast.error("Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold text-white">Add New Equipment</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
      >
        <input
          required
          placeholder="Equipment Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        >
          <option>Construction Equipment</option>
          <option>Photography Equipment</option>
          <option>Vehicles & Transportation</option>
          <option>Agriculture Equipment</option>
          <option>Electronics</option>
          <option>Event Equipment</option>
        </select>
        <input
          required
          placeholder="Location (e.g. Dhaka)"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <input
          required
          type="number"
          placeholder="Rental Price ($)"
          value={form.rentalPrice}
          onChange={(e) => setForm({ ...form, rentalPrice: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <select
          value={form.rentalType}
          onChange={(e) => setForm({ ...form, rentalType: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <input
          required
          type="number"
          min="1"
          placeholder="Available Quantity"
          value={form.availableQuantity}
          onChange={(e) =>
            setForm({ ...form, availableQuantity: e.target.value })
          }
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <input
          required
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <input
          required
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <input
          required
          placeholder="Condition (e.g. Excellent)"
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 text-xs"
        />
        <textarea
          required
          rows="3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="md:col-span-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <textarea
          required
          rows="2"
          placeholder="Rental Terms & Conditions"
          value={form.terms}
          onChange={(e) => setForm({ ...form, terms: e.target.value })}
          className="md:col-span-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Uploading & Saving..." : "Add Equipment"}
        </button>
      </form>
    </div>
  );
}
