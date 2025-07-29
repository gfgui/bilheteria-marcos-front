"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; // já configurado com Axios

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async ({ name, email, password }: RegisterPayload) => {
    setLoading(true);
    setError(null);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Registro bem-sucedido → redireciona para login
      router.push("/login?success=1");
    } catch (err: any) {
      // Axios coloca erro em err.response
      const message =
        err.response?.data?.message || "Erro ao registrar";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};