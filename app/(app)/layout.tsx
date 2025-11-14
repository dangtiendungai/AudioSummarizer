"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { createClient } from "../../lib/supabase/client";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          setIsAuthenticated(true);
          setUser({
            email: authUser.email || "",
            name:
              (authUser.user_metadata?.name as string) ||
              authUser.email?.split("@")[0] ||
              "User",
          });
        } else {
          setIsAuthenticated(false);
          router.push("/login?redirect=" + pathname);
        }
      } catch (error) {
        // Supabase not configured - redirect to login
        setIsAuthenticated(false);
        router.push("/login?redirect=" + pathname);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
