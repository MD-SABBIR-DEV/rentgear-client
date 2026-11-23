"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { CheckCircle } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("booking_id");
  const [status, setStatus] = useState("verifying");
  const [txId, setTxId] = useState("");

  useEffect(() => {
    if (sessionId && bookingId) {
      api
        .post("/api/confirm-payment", { sessionId, bookingId })
        .then((res) => {
          setTxId(res.data.transactionId);
          setStatus("success");
        })
        .catch(() => setStatus("error"));
    }
  }, [sessionId, bookingId]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
        {status === "verifying" && (
          <p className="text-slate-300">Verifying your Stripe payment...</p>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
            <h1 className="text-2xl font-bold text-white">
              Payment Successful!
            </h1>
            <p className="text-sm text-slate-400">
              Your rental booking has been confirmed.
            </p>
            {txId && (
              <p className="text-xs bg-slate-950 p-2 rounded text-amber-400 break-all">
                Transaction ID: {txId}
              </p>
            )}
            <Link
              href="/dashboard/my-rentals"
              className="inline-block mt-4 px-6 py-2.5 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400"
            >
              View My Rentals
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-red-400">
              Verification Failed
            </h1>
            <Link
              href="/dashboard/my-rentals"
              className="inline-block mt-4 px-6 py-2.5 bg-slate-800 text-white rounded-lg"
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-slate-400">Loading...</div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
