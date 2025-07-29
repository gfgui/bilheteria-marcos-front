'use client'

import { useArtists, useAssociateArtistToEvent } from '@/hooks/use-artists'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  eventId: string
  trigger: React.ReactNode
}

export function ArtistAssociationModal({ eventId, trigger }: Props) {
  const { data: artists, isLoading } = useArtists()
  const { mutateAsync, isPending } = useAssociateArtistToEvent()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleArtist = (id: string) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev)
      copy.has(id) ? copy.delete(id) : copy.add(id)
      return copy
    })
  }

  const handleSubmit = async () => {
  try {
    await Promise.all(
      Array.from(selectedIds).map((artistId) =>
        mutateAsync({ eventId, artistId })
      )
    )
    setSelectedIds(new Set())
  } catch (error) {
    console.error('Erro ao associar artistas:', error)
  }
}

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar artistas ao evento</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="text-muted-foreground text-sm">Carregando artistas...</div>
        ) : (
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {artists?.map((artist) => (
              <label
                key={artist.id}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <Checkbox
                  checked={selectedIds.has(artist.id)}
                  onCheckedChange={() => toggleArtist(artist.id)}
                />
                <span>{artist.name}</span>
              </label>
            ))}
            {artists?.length === 0 && (
              <div className="text-muted-foreground text-sm">Nenhum artista encontrado.</div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isPending || selectedIds.size === 0}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
