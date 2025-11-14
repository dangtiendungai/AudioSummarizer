"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Button from "./Button";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );

  useEffect(() => {
    // Check authentication status
    const authToken = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (authToken && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password");

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
            {isAuthPage ? (
              <Link href="/">
                <Button variant="secondary">Back to Home</Button>
              </Link>
            ) : isAuthenticated ? (
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
