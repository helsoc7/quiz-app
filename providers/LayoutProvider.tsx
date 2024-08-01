"use client";

import { usePathname } from "next/navigation";
import { fetchUsers } from "@/app/(auth)/actions/fetchUsers";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";

function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(
    pathname.split("/")[1]
  );

  const getNavbar = () => {
    if (isPublicRoute) return null;
    return <Navbar />;
  };

  const getFooter = () => {
    if (isPublicRoute) return null;
    return <Footer />;
  };

  const getContent = () => {
    if (isPublicRoute) return <>{children}</>;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-secondary">
        <div className="shadow-lg mb-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {children}
      </div>
    );
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await fetchUsers();
      if (response.error) throw new Error(response.error.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isPublicRoute) getCurrentUser();
  }, [isPublicRoute]);

  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-between">
      {getNavbar()}
      {getContent()}
      {getFooter()}
    </div>
  );
}

export default LayoutProvider;