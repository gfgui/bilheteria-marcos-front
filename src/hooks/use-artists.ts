import api from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Artist {
  id: string
  name: string
  MusicalArtistOnEvent: {
    id: string
    event: {
      name: string
    }
  }[]
  musicalArtist: {
    id: string
    name: string
  }
}

// Fetch all artists
export function useArtists() {
  return useQuery<Artist[]>({
    queryKey: ['artists'],
    queryFn: async () => {
      const { data } = await api.get('/artists/list')
      return data
    },
  })
}


// Fetch artist by ID
export function useGetArtist(id?: string) {
  return useQuery<Artist>({
    queryKey: ['artist', id],
    queryFn: async () => {
      const { data } = await api.get(`/artists/${id}`)
      return data
    },
    enabled: !!id, // only run if id exists
  })
}

// Create artist
export function useCreateArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (artist: { name: string }) => {
      const { data } = await api.post('/artists', artist)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
    },
  })
}

// Update artist
export function useUpdateArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { name?: string } }) => {
      const res = await api.put(`/artists/${id}`, data)
      return res.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
      queryClient.invalidateQueries({ queryKey: ['artist', id] })
    },
  })
}

// Delete artist
export function useDeleteArtist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/artists/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
    },
  })
}

// Associate artist to event
export function useAssociateArtistToEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventId, artistId }: { eventId: string; artistId: string }) => {
      const res = await api.post(`/artists/${eventId}/associate/${artistId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
      queryClient.invalidateQueries({ queryKey: ['events'] }) // se existir cache de eventos
    },
  })
}

// Dissociate artist from event
export function useDissociateArtistFromEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventId, artistId }: { eventId: string; artistId: string }) => {
      const res = await api.delete(`/artists/${eventId}/dissociate/${artistId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artists'] })
      queryClient.invalidateQueries({ queryKey: ['events'] }) // se aplicável
    },
  })
}