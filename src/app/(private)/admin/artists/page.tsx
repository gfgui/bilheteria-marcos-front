'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Music } from "lucide-react"
import Link from "next/link"
import { useArtists } from "@/hooks/use-artists"
import { ArtistFormModal } from "@/components/artists/artists-form-modal"

export default function ArtistsPage() {
  const { data: artists, isLoading, error } = useArtists()

  if (isLoading) return <p className="text-muted-foreground">Loading artists...</p>
  if (error) return <p className="text-destructive">Failed to load artists.</p>

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Musical Artists</h1>
          <p className="text-muted-foreground">Manage your musical artists</p>
        </div>
        <ArtistFormModal type="create" trigger={
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Artist
          </Button>
        } />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {artists?.map((artist) => (
          <Card key={artist.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{artist.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {artist.MusicalArtistOnEvent?.length ?? 0} event(s)
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <ArtistFormModal type="edit" artist={artist} trigger={
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  } />
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">Recent Events:</div>
                {artist.MusicalArtistOnEvent?.slice(0, 3).map((artistEvent) => (
                  <div key={artistEvent.id} className="text-sm text-muted-foreground truncate">
                    • {artistEvent.event.name}
                  </div>
                ))}
                {(artist.MusicalArtistOnEvent?.length ?? 0) === 0 && (
                  <div className="text-sm text-muted-foreground">No events yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}