// Novo hook atualizado para suporte a criação e update
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"

export interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "CUSTOMER"
  createdAt: string
}

interface CreateUserInput {
  name: string
  email: string
  password: string
  role?: "ADMIN" | "CUSTOMER"
}

interface UpdateUserInput {
  name?: string
  email?: string
  role?: "ADMIN" | "CUSTOMER"
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<User[]>("/users")
      return response.data
    }
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      const response = await api.post<User>("/users", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: UpdateUserInput) => {
      const response = await api.put<User>(`/users/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/users/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    }
  })
}