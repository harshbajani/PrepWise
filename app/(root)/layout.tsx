import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import SignOutButton from "@/components/Signout";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  const user = await getCurrentUser();

  if (!isUserAuthenticated) redirect("/sign-in");
  return (
    <div className="root-layout">
      <nav className="flex flex-row justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </Link>
        <div className="flex items-center gap-4">
          <Avatar className="size-10">
            <AvatarFallback className="text-primary-100 text-xl">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <SignOutButton />
        </div>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
