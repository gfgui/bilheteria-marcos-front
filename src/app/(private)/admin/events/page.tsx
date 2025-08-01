"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Calendar, MapPin, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEvents } from "@/hooks/use-events"
import { useDeleteEvent } from "@/hooks/use-delete-event"
import { useState } from "react"
import { ArtistAssociationModal } from "@/components/events/artists-association-modal"

export default function EventsPage() {

  const { data: events, isLoading, isError } = useEvents()

  const { deleteEvent, loading } = useDeleteEvent()
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)


  if (isLoading) return <p>Loading events...</p>
  if (isError || !events) return <p>Failed to load events.</p>

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage your events</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/events/new">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="text-lg lg:text-xl">{event.name}</CardTitle>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </div>
                <div className="flex gap-2 self-start">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/events/update/${event.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  {confirmDeleteId === event.id ? (
                    <>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteEvent(event.id)
                          setConfirmDeleteId(null)
                        }}
                        disabled={loading}
                      >
                        {loading ? "Deleting..." : "Confirm"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmDeleteId(null)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmDeleteId(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <ArtistAssociationModal
                    eventId={event.id}
                    trigger={<Button variant="outline">Adicionar artistas</Button>}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">Start Date</div>
                    <div className="text-sm text-muted-foreground truncate">{new Date(event.startDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">End Date</div>
                    <div className="text-sm text-muted-foreground truncate">{new Date(event.endDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium">Venue Sections</div>
                    <div className="text-sm text-muted-foreground">{event.venueSections ? event.venueSections.length : "0"} sections</div>
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <div className="text-sm font-medium">Artists</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.musicalArtists?.slice(0, 2).map((artist) => (
                      <Badge key={artist.id} variant="secondary" className="text-xs">
                        {artist.musicalArtist.name}
                      </Badge>
                    ))}
                    {event.musicalArtists?.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{event.musicalArtists?.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {event.days?.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Event Days:</div>
                  <div className="space-y-1">
                    {event.days?.map((day) => (
                      <div key={day.id} className="text-sm text-muted-foreground">
                        • {day.description} - {new Date(day.date).toLocaleDateString()}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.venueSections && event.venueSections.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Venue Sections:</div>
                  <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                    {event.venueSections.map((section) => (
                      <div key={section.id} className="border rounded p-2">
                        <div className="font-medium text-sm">{section.name}</div>
                        <div className="text-xs text-muted-foreground">Capacity: {section.capacity}</div>
                        <div className="text-xs text-muted-foreground">{section.ticketTypes.length} ticket type(s)</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
