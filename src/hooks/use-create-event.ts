"use client"

import { useMutation } from "@tanstack/react-query"

import api from "@/lib/api"

interface CreateEventPayload {
  name: string
  description: string
  coverImage?: string
  startDate: string // ISO format
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

export function useCreateEvent() {
  return useMutation({
    mutationFn: async (data: CreateEventPayload) => {
      const response = await api.post("/events", data)
      return response.data
    }
  })
}