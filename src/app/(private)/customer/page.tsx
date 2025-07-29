"use client"

import { useState } from "react"
import { useEvents } from "@/hooks/use-events" 
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: events = [], isLoading, isError } = useEvents()

  const filteredEvents = events.filter((event: any) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold">Eventos Disponíveis</h1>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Bilheteria Marcos</h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
              Compre seus ingressos para os mais diversos eventos.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Loading/Error State */}
        {isLoading && <p className="text-center">Carregando eventos...</p>}
        {isError && <p className="text-center text-red-500">Falha ao carregar eventos.</p>}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img
                  src={event.coverImage || "/placeholder.svg?height=200&width=400&query=evento musical"}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-primary">Gratuito</span>
                </div>
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <CardDescription className="text-sm">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(event.endDate)}</span>
                </div>
                <div className="pt-4">
                  <Link href={`/customer/event/${event.id}`}>
                    <Button>Ver Evento</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum evento encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
