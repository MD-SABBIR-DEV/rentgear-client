"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "@/components/AuthProvider";
import toast from "react-hot-toast";
import { Heart, MapPin, ShieldCheck, Calendar, X } from "lucide-react";

export default function EquipmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    quantity: 1,
    contactNumber: "",
    deliveryAddress: "",
    notes: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (id && user) {
      api
        .get(`/api/equipment/${id}`)
        .then((res) => setItem(res.data))
        .catch(() => toast.error("Failed to load equipment"))
        .finally(() => setLoading(false));
    }
  }, [id, user]);

  const handleAddFavorite = async () => {
    try {
      await api.post("/api/favorites", {
        equipmentId: item._id,
        equipmentName: item.name,
        image: item.image,
        rentalPrice: item.rentalPrice,
        category: item.category,
      });
      toast.success("Added to favorites!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not add to favorites");
    }
  };

  const calculateTotal = () => {
    if (!form.startDate || !form.endDate || !item)
      return item?.rentalPrice || 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    return days * item.rentalPrice * Number(form.quantity || 1);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (Number(form.quantity) > item.availableQuantity) {
      toast.error(`Only ${item.availableQuantity} units available.`);
      return;
    }
    setSubmitting(true);
    try {
      const totalAmount = calculateTotal();
      const res = await api.post("/api/create-checkout-session", {
        equipmentId: item._id,
        equipmentName: item.name,
        ownerEmail: item.ownerEmail,
        ...form,
        totalAmount,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
      setSubmitting(false);
    }
  };

  if (authLoading || loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        Loading details...
      </div>
    );
  if (!item)
    return (
      <div className="text-center py-20 text-slate-400">
        Equipment not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold">
              {item.category}
            </span>
            <button
              onClick={handleAddFavorite}
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-red-400 transition"
            >
              <Heart className="w-4 h-4" /> Add to Favorites
            </button>
          </div>

          <h1 className="text-3xl font-bold text-white">{item.name}</h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            {item.description}
          </p>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800 text-sm">
            <div>
              <span className="text-slate-400">Price:</span>{" "}
              <strong className="text-amber-400">
                ${item.rentalPrice}/{item.rentalType}
              </strong>
            </div>
            <div>
              <span className="text-slate-400">Available Qty:</span>{" "}
              <strong className="text-white">{item.availableQuantity}</strong>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-400" /> {item.location}
            </div>
            <div>
              <span className="text-slate-400">Owner:</span>{" "}
              <strong className="text-white">{item.ownerName}</strong>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" /> Rental Terms &
              Conditions
            </p>
            <p>
              {item.terms ||
                "Standard rental agreement applies. Return equipment in good condition."}
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={item.availableQuantity < 1}
            className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition disabled:opacity-50"
          >
            {item.availableQuantity > 0 ? "Book Now" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> Book {item.name}
            </h2>

            <form onSubmit={handleBooking} className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Quantity (Max {item.availableQuantity})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={item.availableQuantity}
                    required
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contactNumber}
                    onChange={(e) =>
                      setForm({ ...form, contactNumber: e.target.value })
                    }
                    placeholder="+8801..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={form.deliveryAddress}
                  onChange={(e) =>
                    setForm({ ...form, deliveryAddress: e.target.value })
                  }
                  placeholder="House, Road, Area, City"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">
                  Additional Notes
                </label>
                <textarea
                  rows="2"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg flex justify-between items-center border border-slate-800">
                <span className="text-slate-400">Estimated Total:</span>
                <span className="text-xl font-bold text-amber-400">
                  ${calculateTotal()}
                </span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition disabled:opacity-50"
              >
                {submitting
                  ? "Redirecting to Stripe..."
                  : "Proceed to Stripe Payment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
