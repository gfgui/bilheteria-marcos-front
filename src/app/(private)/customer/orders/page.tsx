"use client"

import React from "react"
import { useListOrders, Order } from "@/hooks/use-orders"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useListOrders()

  if (isLoading) {
    return <div className="p-8">Carregando pedidos...</div>
  }

  if (error) {
    return <div className="p-8 text-red-600">Erro ao carregar pedidos.</div>
  }

  if (!orders || orders.length === 0) {
    return <div className="p-8">Nenhum pedido encontrado.</div>
  }

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>
      <div className="space-y-6">
        {orders.map((order: Order) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Pedido ID: {order.id}</span>
              <span className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="mb-2">
              <strong>Status:</strong>{" "}
              <span className={`font-semibold ${
                order.status === "cancelled" ? "text-red-600" :
                order.status === "COMPLETED" ? "text-green-600" :
                "text-yellow-600"
              }`}>
                {order.status}
              </span>
            </div>
            <div className="mb-2">
              <strong>Total:</strong> R$ {(order.totalAmount / 100).toFixed(2).replace(".", ",")}
            </div>
            <div>
              <strong>Ingressos:</strong>
              <ul className="mt-1 list-disc list-inside">
                {order.tickets.map(ticket => (
                  <li key={ticket.id} className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span>{ticket.ticketType.name} - Código: {ticket.code}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
