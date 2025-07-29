// components/modals/update-user-modal.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api"
import { Pencil } from "lucide-react"
import { User } from "@/hooks/use-users"

export function UpdateUserModal({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<{
  name: string
  email: string
  role: "ADMIN" | "CUSTOMER"
}>({
  name: user.name,
  email: user.email,
  role: user.role as "ADMIN" | "CUSTOMER",
})
  const queryClient = useQueryClient()

  const updateUser = useMutation({
    mutationFn: async () => {
      const res = await api.put(`/users/${user.id}`, form)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      setOpen(false)
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>

        <DialogTitle>Editar Usuário</DialogTitle>

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
            <Label>Role</Label>
            <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value as "ADMIN" | "CUSTOMER" })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="CUSTOMER">CUSTOMER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => updateUser.mutate()} disabled={updateUser.isPending}>
            {updateUser.isPending ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
