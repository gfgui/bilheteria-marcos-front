'use client'

import { useState } from 'react'
import api from '@/lib/api' // Supondo que api seja uma instância do Axios

export default function ConfirmTicket() {
  const [orderId, setOrderId] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await api.patch(`/tickets/${orderId}/confirm`)
      setResult(response.data)
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Erro ao confirmar pedido'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Confirmar Pedido</h1>

      <input
        type="text"
        placeholder="Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ padding: 8, width: '100%', maxWidth: 300, marginBottom: 12 }}
      />

      <br />

      <button onClick={handleConfirm} disabled={loading || !orderId}>
        {loading ? 'Confirmando...' : 'Confirmar'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <pre style={{ marginTop: 16, background: '#f0f0f0', padding: 16 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}
