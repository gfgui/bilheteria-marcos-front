"use client"

import { use } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useUpdateEvent } from "@/hooks/use-update-event"
import { EventForm } from "@/components/events/event-form"
import api from "@/lib/api"

async function fetchEventById(id: string) {
  const res = await api.get(`/events/${id}`)
  return res.data
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const updateEvent = useUpdateEvent()
  const resolvedParams = use(params)

  const { data, isLoading } = useQuery({
    queryKey: ["event", resolvedParams.id],
    queryFn: () => fetchEventById(resolvedParams.id)
  })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Event not found</p>

  const defaultValues = {
    name: data.name,
    description: data.description ?? "",
    coverImage: data.coverImage ?? "",
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    days: data.days.map((d: any) => ({
      description: d.description,
      date: new Date(d.date)
    })),
    venueSections: data.venueSections.map((s: any) => ({
      name: s.name,
      capacity: s.capacity,
      ticketTypes: s.ticketTypes.map((t: any) => ({
        name: t.name,
        price: Number(t.price),
        totalQuantity: t.totalQuantity
      }))
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Update your event details</p>
      </div>
      <EventForm
        defaultValues={defaultValues}
        isEditMode
        onSubmit={(payload) =>
          updateEvent.mutate(
            { id: resolvedParams.id, data: payload },
            {
              onSuccess: () => router.push("/admin/events"),
              onError: () => alert("Failed to update")
            }
          )
        }
      />
    </div>
  )
}
