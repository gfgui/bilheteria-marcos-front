'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface Event {
  id: string
  name: string
  startDate: string
}

interface Section {
  id: string
  name: string
  event: Event
}

interface TicketType {
  id: string
  name: string
  price: number
  section: Section
}

interface Order {
  id: string
  status: string
  createdAt: string
}

interface Ticket {
  id: string
  code: string
  ticketType: TicketType
  order: Order
}

export default function ListTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTickets() {
      setLoading(true)
      setError(null)

      try {
        const res = await api.get<Ticket[]>('/tickets')
        setTickets(res.data)
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message || 'Erro ao carregar tickets'
        setError(msg)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h1>Meus Tickets</h1>

      {loading && <p>Carregando tickets...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && tickets.length === 0 && <p>Nenhum ticket encontrado.</p>}

      <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none' }}>
        {tickets.filter(ticket => ticket.order.status === 'COMPLETED').map((ticket) => (
          <li
            key={ticket.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: 16,
              marginBottom: 12,
              background: '#fafafa'
            }}
          >
            <p><strong>Código:</strong> {ticket.code}</p>
            <p><strong>Evento:</strong> {ticket.ticketType.section.event.name}</p>
            <p><strong>Seção:</strong> {ticket.ticketType.section.name}</p>
            <p><strong>Tipo:</strong> {ticket.ticketType.name}</p>
            <p><strong>Preço:</strong> R$ {(ticket.ticketType.price / 100).toFixed(2).replace('.', ',')}</p>
            <p><strong>Status do pedido:</strong> {ticket.order.status}</p>
            <p><strong>Data do pedido:</strong> {new Date(ticket.order.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}