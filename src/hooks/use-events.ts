import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

export interface Event {
  id: string
  name: string
  description: string | null
  coverImage: string | null
  startDate: string
  endDate: string
  musicalArtists: {
    id: string
    musicalArtist: { name: string }
  }[]
  days: {
    id: string
    description: string
    date: string
  }[]
  venueSections: {
    id: string
    name: string
    capacity: number
    ticketTypes: {
      id: string
      name: string
      price: number
      totalQuantity: number
    }[]
  }[]
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await api.get<Event[]>("/events/list")
      return res.data
    }
  })
}