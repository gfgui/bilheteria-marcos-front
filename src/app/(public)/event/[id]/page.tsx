"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Artist } from "@/hooks/use-artists"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Calendar, MapPin, Music, Users, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

async function fetchEventById(id: string) {
    const res = await api.get(`/events/get/${id}`)
    return res.data
}

export default function EventDetailsPage() {
    const params = useParams()
    const rawId = params.id

    // ✅ Garante que é uma string simples (não array)
    const id = typeof rawId === "string" ? rawId : rawId?.[0]

    const { data: event, isLoading } = useQuery({
        queryKey: ["event", id],
        queryFn: () => fetchEventById(id!),
        enabled: typeof id === "string",
    })

    if (!id || typeof id !== "string") {
        return <div className="p-8 text-red-500">ID do evento inválido</div>
    }

    if (isLoading || !event) {
        return <div className="p-8 text-muted-foreground">Carregando evento...</div>
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header com imagem de capa */}
            <div className="relative h-96 w-full overflow-hidden">
                {event.coverImage ? (
                    <Image src={event.coverImage || "/placeholder.svg"} alt={event.name} fill className="object-cover" priority />
                ) : (
                    <div className="h-full w-full bg-gradient-to-r from-purple-500 to-pink-500" />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-4xl font-bold text-white mb-4">{event.name}</h1>
                        <div className="flex flex-wrap gap-4 text-white/90">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                <span>
                                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Coluna principal */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Descrição */}
                        {event.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sobre o Evento</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Artistas Musicais */}
                        {event.musicalArtists.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Music className="h-5 w-5" />
                                        Artistas Musicais
                                    </CardTitle>
                                    <CardDescription>
                                        {event.musicalArtists.length} artista{event.musicalArtists.length !== 1 ? "s" : ""} confirmado
                                        {event.musicalArtists.length !== 1 ? "s" : ""}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {event.musicalArtists.map((artist: Artist, index: number) => (
                                            <div key={artist.id || index} className="flex items-center gap-4 p-4 border rounded-lg">
                                                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                                    <Music className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-muted-foreground">{artist.musicalArtist.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dias do Evento */}
                        {event.days.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Dias do Evento
                                    </CardTitle>
                                    <CardDescription>
                                        {event.days.length} dia{event.days.length !== 1 ? "s" : ""} de evento
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        {event.days.map((day: any, index: number) => (
                                            <div key={day.id || index} className="flex items-center gap-4 p-4 border rounded-lg">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="font-semibold text-primary">{index + 1}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Dia {index + 1}</p>
                                                    <p className="text-sm text-muted-foreground">Programação do evento</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Informações do evento */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Data de início</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(event.startDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Data de término</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(event.endDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Music className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Artistas</p>
                                        <p className="text-sm text-muted-foreground">{event.musicalArtists.length} confirmados</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Duração</p>
                                        <p className="text-sm text-muted-foreground">{event.days.length} dias</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seções do Local */}
                        {event.venueSections.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Seções do Local
                                    </CardTitle>
                                    <CardDescription>
                                        {event.venueSections.length} seção{event.venueSections.length !== 1 ? "ões" : ""} disponível
                                        {event.venueSections.length !== 1 ? "eis" : ""}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {event.venueSections.map((section: any, index: number) => (
                                        <div key={section.id || index} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                                                        <Users className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Seção {index + 1}</h3>
                                                        <p className="text-sm text-muted-foreground">Local do evento</p>
                                                    </div>
                                                </div>
                                                <Link href="/register"><Button size="sm" variant="outline">
                                                    <Ticket className="h-4 w-4 mr-2" />
                                                    Ver
                                                </Button></Link>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {/* Call to action */}
                        <Card>
                            <CardContent className="pt-6">
                                <Link href="/register"><Button className="w-full" size="lg">
                                    <Ticket className="h-5 w-5 mr-2" />
                                    Comprar Ingressos
                                </Button></Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
