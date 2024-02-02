"use client";

import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { authStatus } = useAuth();
  const router = useRouter();

  if (!authStatus) {
    router.replace("/login");
    return <></>;
  }
  return children;
};

export default ProtectedLayout;
