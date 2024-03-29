"use client";

import Signup from "@/components/Signup";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const SignupPage = () => {
  const { authStatus } = useAuth();
  const router = useRouter();

  if (authStatus) {
    router.replace("/profile");
    return <></>;
  }

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <Signup />
    </section>
  );
};

export default SignupPage;
