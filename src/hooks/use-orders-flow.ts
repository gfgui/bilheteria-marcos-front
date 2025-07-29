import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import api from "@/lib/api"
import { toast } from "sonner"
import { useCreateOrder, Event, VenueSection } from "./use-orders"

interface TicketType {
  id: string
  name: string
  price: number
  sectionId: string
}

interface Section {
  id: string
  name: string
  eventId: string
  ticketTypes: TicketType[]
}

export function useOrderFlow(eventId?: string): {
  event: Event | undefined
  isLoading: boolean
  isModalOpen: boolean
  selectedSection: VenueSection | null
  selectedTickets: string[]
  openTicketModal: (section: VenueSection) => void
  closeModal: () => void
  toggleTicket: (ticketId: string) => void
  handleSubmitOrder: () => Promise<void>
  isCreating: boolean
  setIsModalOpen: (open: boolean) => void
} {
  const [selectedSection, setSelectedSection] = useState<VenueSection | null>(null)
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: eventId ? ["event", eventId] : [],
    queryFn: async () => {
      const res = await api.get<Event>(`/events/get/${eventId}`)
      return res.data
    },
    enabled: Boolean(eventId),
  })

  const createOrder = useCreateOrder()

  function openTicketModal(section: VenueSection) {
    setSelectedSection(section)
    setSelectedTickets([])
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedTickets([])
    setSelectedSection(null)
  }

  function toggleTicket(ticketId: string) {
    setSelectedTickets((prev) =>
      prev.includes(ticketId)
        ? prev.filter((id) => id !== ticketId)
        : [...prev, ticketId]
    )
  }

  async function handleSubmitOrder() {
    if (selectedTickets.length === 0) {
      toast.error("Selecione pelo menos um ingresso.")
      return
    }

    try {
        console.log(selectedTickets)
      await createOrder.mutateAsync({  ticketTypeIds: selectedTickets.filter(id => id), })
      closeModal()
    } catch {
      // Erro já tratado via onError
    }
  }

  return {
    event,
    isLoading,
    isModalOpen,
    selectedSection,
    selectedTickets,
    openTicketModal,
    closeModal,
    toggleTicket,
    handleSubmitOrder,
    isCreating: createOrder.isPending,
    setIsModalOpen
  }
}
