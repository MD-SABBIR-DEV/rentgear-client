"use client";
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center">
      <h2 className="text-3xl font-bold text-amber-500 mb-3">Something went wrong!</h2>
      <p className="text-slate-400 mb-6 max-w-md">{error?.message || "Unexpected error occurred."}</p>
      <button onClick={() => reset()} className="px-6 py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400">
        Try Again
      </button>
    </div>
  );
}