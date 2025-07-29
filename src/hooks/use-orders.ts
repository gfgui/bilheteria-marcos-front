import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import { toast } from "sonner"

export interface TicketType {
  id: string
  name: string
  price: number
  sectionId: string
}

export interface VenueSection {
  id: string
  name: string
  capacity: number
  ticketTypes: TicketType[]
}

export interface Event {
  id: string
  name: string
  startDate: string
  venueSections: VenueSection[]
}

export interface Section {
  name: string
  event: Event
}

export interface Ticket {
  id: string
  code: string
  ticketType: TicketType
}

export interface Order {
  id: string
  totalAmount: number
  status: string
  createdAt: string
  tickets: Ticket[]
}

interface CreateOrderPayload {
  ticketTypeIds: string[]
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation<Order, Error, CreateOrderPayload>({
    mutationFn: async ({ ticketTypeIds }) => {
      const res = await api.post<Order>("/orders", { ticketTypeIds })
      return res.data
    },
    onSuccess: () => {
      toast.success("Pedido criado com sucesso!")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
    onError: (error) => {
      toast.error("Erro ao criar o pedido.")
      console.error(error)
    },
  })
}

export function useListOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get<Order[]>("/orders")
      return res.data
    },
  })
}

export function useOrderById(id?: string) {
  return useQuery<Order>({
    queryKey: id ? ["orders", id] : [],
    queryFn: async () => {
      const res = await api.get<Order>(`/orders/${id}`)
      return res.data
    },
    enabled: Boolean(id),
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()

  return useMutation<Order, Error, string>({
    mutationFn: async (orderId) => {
      const res = await api.patch<Order>(`/orders/${orderId}/cancel`)
      return res.data
    },
    onSuccess: () => {
      toast.success("Pedido cancelado.")
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
    onError: (error) => {
      toast.error("Erro ao cancelar o pedido.")
      console.error(error)
    },
  })
}
