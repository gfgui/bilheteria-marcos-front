"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async ({ email, password }: LoginPayload): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // important to avoid automatic redirects
      });

      if (res?.ok) {
        //test type user
        router.push("/admin");
        return { success: true };
      } else {
        setError(res?.error || "Invalid credentials");
        return { success: false, message: res?.error || "Invalid credentials" };
      }
    } catch (err) {
      setError("Unexpected error");
      return { success: false, message: "Unexpected error" };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
