import { useState } from "react"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

export function useDeleteEvent() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const deleteEvent = async (eventId: string) => {
    setLoading(true)
    try {
      const response = await api.delete(`/events/${eventId}`)
      if (response.status === 200 || response.status === 204) {
        router.refresh()
      } else {
        console.error("Failed to delete event", response)
      }
    } catch (error) {
      console.error("Error deleting event:", error)
    } finally {
      setLoading(false)
    }
  }

  return { deleteEvent, loading }
}