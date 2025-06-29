// hooks/useEvents.ts
"use client"

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

export interface Event {
  id: string
  name: string
  description: string | null
  coverImage: string | null
  startDate: string
  endDate: string
}

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get("/events") // ajuste conforme sua rota
      return response.data
    },
  })
}
