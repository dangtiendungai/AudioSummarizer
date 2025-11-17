"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { createClient } from "../../../lib/supabase/client";
import {
  Mail,
  Calendar,
  BarChart3,
  Clock,
  ShieldCheck,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

interface ProfileInfo {
  name: string;
  email: string;
  createdAt: string;
  summariesCount: number;
  totalMinutes: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw userError || new Error("Unable to load user information.");
        }

        const { data: summaries, error: summariesError } = await supabase
          .from("summaries")
          .select("duration");

        if (summariesError) {
          throw summariesError;
        }

        const summariesCount = summaries?.length || 0;
        const totalMinutes = (summaries || []).reduce((acc, item) => {
          const seconds =
            typeof item.duration === "number" ? item.duration : Number(item.duration);
          return acc + (Number.isFinite(seconds) ? seconds : 0);
        }, 0);

        if (isMounted) {
          setProfile({
            name:
              (user.user_metadata?.name as string) ||
              user.email?.split("@")[0] ||
              "User",
            email: user.email || "",
            createdAt: user.created_at || "",
            summariesCount,
            totalMinutes: Math.round(totalMinutes / 60),
          });
          setNameInput(
            (user.user_metadata?.name as string) ||
              user.email?.split("@")[0] ||
              "User"
          );
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load your profile. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile().catch(() => {
      /* handled above */
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setSaveStatus("error");
      setSaveMessage("Display name cannot be empty.");
      return;
    }

    setSaveStatus("saving");
    setSaveMessage("Updating profile...");

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          name: nameInput.trim(),
        },
      });

      if (updateError) {
        throw updateError;
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: nameInput.trim(),
            }
          : prev
      );
      setSaveStatus("success");
      setSaveMessage("Profile updated successfully.");
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage(
        err instanceof Error ? err.message : "Unable to update profile."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-white border border-red-200 rounded-xl p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Unable to load profile
        </h1>
        <p className="text-gray-600 mb-6">
          {error ||
            "Something went wrong while loading your profile. Please refresh the page."}
        </p>
        <Button onClick={() => window.location.reload()} variant="primary">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your account information and security preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-semibold text-blue-600">
              {profile.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-xl text-gray-900">{profile.name}</p>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Summaries</p>
            <p className="text-3xl font-bold text-gray-900">
              {profile.summariesCount}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Audio Minutes Processed</p>
            <p className="text-3xl font-bold text-gray-900">
              {profile.totalMinutes}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-white border border-gray-200 rounded-xl p-6 lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Account Details
          </h2>
          <p className="text-gray-600 mb-6">
            Update your display name and review account information.
          </p>

          <form onSubmit={handleSave} className="space-y-6">
            <TextField
              label="Display Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your full name"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Email Address
                  </p>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Member Since
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {saveMessage && (
              <div
                className={`rounded-lg border p-3 text-sm ${
                  saveStatus === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : saveStatus === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-blue-200 bg-blue-50 text-blue-700"
                }`}
              >
                {saveMessage}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              isLoading={saveStatus === "saving"}
              className="w-full sm:w-auto"
            >
              Save Changes
            </Button>
          </form>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Security</h2>
          <p className="text-gray-600">
            Keep your account protected with strong credentials.
          </p>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mt-1" />
            <p className="text-sm text-gray-600">
              Password resets are handled securely via email. We never store
              your credentials in plaintext.
            </p>
          </div>

          <Link href="/forgot-password">
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              Reset Password
            </Button>
          </Link>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Pro tip
              </p>
              <p className="text-sm text-gray-600">
                Use the same email address to receive transcript exports and
                password reset links.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

