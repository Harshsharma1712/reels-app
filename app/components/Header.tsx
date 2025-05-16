"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold hover:opacity-90 transition"
          onClick={() =>
            showNotification("Welcome to Reels App", "info")
          }
        >
          <Home className="w-5 h-5" />
          <span>Reels App</span>
        </Link>

        {/* Right-side menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 rounded-2xl shadow-lg">
            {session ? (
              <>
                <DropdownMenuItem className="text-muted-foreground text-sm">
                  {session.user?.email?.split("@")[0]}
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link
                    href="/upload"
                    onClick={() =>
                      showNotification("Welcome to Admin Dashboard", "info")
                    }
                  >
                    Video Upload
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link
                  href="/login"
                  onClick={() =>
                    showNotification("Please sign in to continue", "info")
                  }
                >
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
