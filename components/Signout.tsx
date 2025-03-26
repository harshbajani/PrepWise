"use client";

import { signOut } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
    router.push("/sign-in");
  };

  return (
    <Button
      onClick={handleSignOut}
      className="px-4 py-2 text-sm text-primary-100 hover:text-primary-200 transition-colors cursor-pointer"
      variant="outline"
    >
      Sign out
    </Button>
  );
}
