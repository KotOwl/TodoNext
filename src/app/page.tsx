"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFirebase } from "@/services/database/FirebaseContext";

export default function MainPage() {
  const router = useRouter();
  const { isAuthenticated } = useFirebase();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/events");
    } else {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">
          Redirecting to Events...
        </h1>
      </div>
    </div>
  );
}
