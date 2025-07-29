import { useMutation } from "@tanstack/react-query"
import api from "@/lib/api"

interface UpdateEventPayload {
  id: string
  data: {
    name: string
    description: string
    coverImage?: string
    startDate: string
    endDate: string
    days: {
      description: string
      date: string
    }[]
    venueSections: {
      name: string
      capacity: number
      ticketTypes: {
        name: string
        price: number
        totalQuantity: number
      }[]
    }[]
  }
}

export function useUpdateEvent() {
  return useMutation({
    mutationFn: async ({ id, data }: UpdateEventPayload) => {
      const response = await api.put(`/events/${id}`, data)
      return response.data
    }
  })
}