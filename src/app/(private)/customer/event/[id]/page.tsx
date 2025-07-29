"use client"

import { useParams } from "next/navigation"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticket, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"
import { useOrderFlow } from "@/hooks/use-orders-flow"

import { VenueSection } from "@/hooks/use-orders"

export default function EventDetailsPage() {
  const params = useParams()
  const eventId = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string | undefined)

  const {
    event,
    isLoading,
    isModalOpen,
    selectedSection,
    selectedTickets,
    openTicketModal,
    toggleTicket,
    handleSubmitOrder,
    closeModal,
    setIsModalOpen,
    isCreating,
  } = useOrderFlow(eventId)

  if (!eventId || isLoading || !event) {
    return <div className="p-8">Carregando evento...</div>
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.name}</h1>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {event.venueSections.map((section, index) => (
          <Card
            key={section.id}
            className="hover:shadow-lg transition-shadow duration-200 border-0 shadow-md"
          >
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold">
                  {section.name || `Seção ${index + 1}`}
                </span>
              </CardTitle>
              <CardDescription className="text-sm font-medium text-gray-600">
                Capacidade:{" "}
                <span className="text-primary font-semibold">
                  {section.capacity}
                </span>{" "}
                pessoas
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                onClick={() => openTicketModal(section)}
                className="w-full font-medium shadow-sm hover:shadow-md transition-all duration-200"
                size="lg"
                title={`Selecionar ingressos para ${section.name}`}
                aria-label={`Selecionar ingressos para ${section.name}`}
              >
                <Ticket className="h-4 w-4 mr-2" />
                Selecionar Ingressos
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Ingressos disponíveis
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {(selectedSection?.ticketTypes ?? []).map((ticket) => (
              <div
                key={ticket.id}
                className={`
                  border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-sm
                  ${
                    selectedTickets.includes(ticket.id)
                      ? "bg-primary/5 border-primary shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }
                `}
                onClick={() => toggleTicket(ticket.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleTicket(ticket.id)
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {ticket.name}
                    </p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      R$ {(ticket.price / 100).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  {selectedTickets.includes(ticket.id) && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            className="mt-6 w-full font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            onClick={handleSubmitOrder}
            size="lg"
            disabled={isCreating}
          >
            {isCreating ? "Processando..." : "Finalizar Pedido"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
