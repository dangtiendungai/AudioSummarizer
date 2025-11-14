"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createClient();

        // Get tokens from hash (Supabase puts tokens in the hash for security)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const type = hashParams.get("type");

        // Also check query params as fallback
        const queryParams = new URLSearchParams(window.location.search);
        const queryAccessToken = queryParams.get("access_token");
        const queryRefreshToken = queryParams.get("refresh_token");
        const queryType = queryParams.get("type");

        const finalAccessToken = accessToken || queryAccessToken;
        const finalRefreshToken = refreshToken || queryRefreshToken;
        const finalType = type || queryType;

        if (finalType === "recovery") {
          // Password reset flow - redirect to reset password page
          router.push("/reset-password");
          return;
        }

        if (finalAccessToken && finalRefreshToken) {
          // Exchange tokens for session
          const { data, error } = await supabase.auth.setSession({
            access_token: finalAccessToken,
            refresh_token: finalRefreshToken,
          });

          if (error) {
            setStatus("error");
            setMessage("Verification failed. Please try again.");
            setTimeout(() => {
              router.push("/login");
            }, 3000);
            return;
          }

          if (data.session) {
            setStatus("success");
            setMessage(
              "Email verified successfully! Redirecting to dashboard..."
            );
            // Redirect to dashboard after successful verification
            setTimeout(() => {
              router.push("/dashboard");
              router.refresh();
            }, 1500);
            return;
          }
        }

        // Check if user is already authenticated (might have been verified already)
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setStatus("success");
          setMessage("You're already verified! Redirecting to dashboard...");
          setTimeout(() => {
            router.push("/dashboard");
            router.refresh();
          }, 1500);
        } else {
          setStatus("error");
          setMessage("Invalid verification link. Please try again.");
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred. Please try again.");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {status === "loading" && (
              <>
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Verifying Email
                </h1>
                <p className="text-gray-600">{message}</p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Email Verified!
                </h1>
                <p className="text-gray-600">{message}</p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Verification Failed
                </h1>
                <p className="text-gray-600">{message}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
