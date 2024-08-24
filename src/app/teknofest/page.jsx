// pages/teknofest.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TeknofestRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /register
    router.push("/register?reftype=teknofest");
  }, [router]);

  return null;
}
