"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      toast.error(
        "Password must be at least 6 characters with 1 uppercase & 1 lowercase letter.",
      );
      return;
    }

    setLoading(true);
    let finalImage = photoUrl || "https://i.ibb.co/4pDNDk1/avatar.png";

    if (photoFile) {
      try {
        const formData = new FormData();
        formData.append("image", photoFile);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          formData,
        );
        finalImage = res.data.data.display_url;
      } catch {
        toast.error("Image upload failed, using default avatar.");
      }
    }

    const { error } = await signUp.email({
      email,
      password,
      name,
      image: finalImage,
    });

    setLoading(false);
    if (error) {
      toast.error(error.message || "Registration failed");
    } else {
      toast.success("Account created successfully!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-slate-400 text-sm mb-6">
          Join RentGear to rent or list equipment.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Photo URL (or Upload Below)
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-amber-500 mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="w-full text-xs text-slate-400"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 chars, 1 Upper, 1 Lower"
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
