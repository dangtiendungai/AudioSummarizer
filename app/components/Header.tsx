"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./Button";
import { LogOut, User } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

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
          setUser(null);
        }

        // Listen for auth changes
        const {
          data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            setIsAuthenticated(true);
            setUser({
              email: session.user.email || "",
              name:
                (session.user.user_metadata?.name as string) ||
                session.user.email?.split("@")[0] ||
                "User",
            });
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        });

        subscription = authSubscription;
      } catch (error) {
        // Supabase not configured - app will work without auth
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (error) {
      // Supabase not configured
    }
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link
            href={isAuthenticated ? "/dashboard" : "/"}
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          >
            Audio Summarizer AI
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="secondary">Dashboard</Button>
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {user?.name || "User"}
                  </span>
                </div>
                <Button variant="secondary" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
