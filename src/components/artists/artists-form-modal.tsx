'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCreateArtist, useUpdateArtist, Artist } from '@/hooks/use-artists'
import { useEffect, useState } from 'react'

interface ArtistFormModalProps {
  trigger: React.ReactNode
  type: 'create' | 'edit'
  artist?: Artist
}

export function ArtistFormModal({ trigger, type, artist }: ArtistFormModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const createMutation = useCreateArtist()
  const updateMutation = useUpdateArtist()

  const isEdit = type === 'edit'

  useEffect(() => {
    if (isEdit && artist) {
      setName(artist.name)
    } else {
      setName('')
    }
  }, [isEdit, artist, open])

  function handleSubmit() {
    if (isEdit && artist) {
      updateMutation.mutate({ id: artist.id, data: { name } }, {
        onSuccess: () => setOpen(false)
      })
    } else {
      createMutation.mutate({ name }, {
        onSuccess: () => setOpen(false)
      })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Artist' : 'Create Artist'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update artist details below.' : 'Add a new musical artist to the system.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Artist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isLoading || name.length < 2}>
            {isLoading ? 'Saving...' : isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}