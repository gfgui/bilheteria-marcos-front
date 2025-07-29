// components/modals/create-user-modal.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"

export function CreateUserModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CUSTOMER" })
  const queryClient = useQueryClient()

  const createUser = useMutation({
    mutationFn: async () => {
      const res = await api.post("/users", form)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
      setForm({ name: "", email: "", password: "", role: "CUSTOMER" })
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Criar Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold mb-4">Novo Usuário</DialogTitle>

        <div className="space-y-4">
          <div>
            <Label>Nome</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label>Senha</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <Label>Role</Label>
            <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => createUser.mutate()} disabled={createUser.isPending}>
            {createUser.isPending ? "Criando..." : "Criar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
