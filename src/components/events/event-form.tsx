"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useCreateEvent } from "@/hooks/use-create-event"
interface EventFormProps {
  defaultValues?: {
    name: string
    description: string
    coverImage?: string
    startDate: string | Date
    endDate: string | Date
    days: { description: string; date: string | Date }[]
    venueSections: {
      name: string
      capacity: number
      ticketTypes: {
        name: string
        price: number
        totalQuantity: number
      }[]
    }[]
  }
  isEditMode?: boolean
  onSubmit?: (payload: any) => void
}

interface VenueSection {
  name: string
  capacity: number
  ticketTypes: {
    name: string
    price: number
    totalQuantity: number
  }[]
}

interface Day {
  description: string
  date: Date | undefined
}

export function EventForm({ defaultValues, onSubmit }: EventFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: defaultValues?.name ?? "",
    description: defaultValues?.description ?? "",
    coverImage: defaultValues?.coverImage ?? "",
    startDate: defaultValues?.startDate ? new Date(defaultValues.startDate) : undefined,
    endDate: defaultValues?.endDate ? new Date(defaultValues.endDate) : undefined,
  })

  const [days, setDays] = useState<Day[]>(
    defaultValues?.days?.length
      ? defaultValues.days.map(d => ({ description: d.description, date: new Date(d.date) }))
      : [{ description: "", date: undefined }]
  )

  const [venueSections, setVenueSections] = useState<VenueSection[]>(
    defaultValues?.venueSections?.length
      ? defaultValues.venueSections
      : [
        {
          name: "",
          capacity: 0,
          ticketTypes: [{ name: "", price: 0, totalQuantity: 0 }],
        },
      ]
  )

  const createEvent = useCreateEvent()

  const addDay = () => {
    setDays([...days, { description: "", date: undefined }])
  }

  const removeDay = (index: number) => {
    setDays(days.filter((_, i) => i !== index))
  }

  const updateDay = (index: number, field: keyof Day, value: any) => {
    const updatedDays = [...days]
    updatedDays[index] = { ...updatedDays[index], [field]: value }
    setDays(updatedDays)
  }

  const addVenueSection = () => {
    setVenueSections([
      ...venueSections,
      { name: "", capacity: 0, ticketTypes: [{ name: "", price: 0, totalQuantity: 0 }] },
    ])
  }

  const removeVenueSection = (index: number) => {
    setVenueSections(venueSections.filter((_, i) => i !== index))
  }

  const updateVenueSection = (index: number, field: keyof VenueSection, value: any) => {
    const updatedSections = [...venueSections]
    updatedSections[index] = { ...updatedSections[index], [field]: value }
    setVenueSections(updatedSections)
  }

  const addTicketType = (sectionIndex: number) => {
    const updatedSections = [...venueSections]
    updatedSections[sectionIndex].ticketTypes.push({ name: "", price: 0, totalQuantity: 0 })
    setVenueSections(updatedSections)
  }

  const removeTicketType = (sectionIndex: number, ticketIndex: number) => {
    const updatedSections = [...venueSections]
    updatedSections[sectionIndex].ticketTypes = updatedSections[sectionIndex].ticketTypes.filter(
      (_, i) => i !== ticketIndex,
    )
    setVenueSections(updatedSections)
  }

  const updateTicketType = (sectionIndex: number, ticketIndex: number, field: string, value: any) => {
    const updatedSections = [...venueSections]
    updatedSections[sectionIndex].ticketTypes[ticketIndex] = {
      ...updatedSections[sectionIndex].ticketTypes[ticketIndex],
      [field]: value,
    }
    setVenueSections(updatedSections)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.startDate || !formData.endDate) return

    const payload = {
      name: formData.name,
      description: formData.description,
      coverImage: formData.coverImage?.trim() || undefined,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
      days: days
        .filter(day => day.date)
        .map(day => ({
          description: day.description,
          date: day.date!.toISOString()
        })),
      venueSections: venueSections.map(section => ({
        name: section.name,
        capacity: section.capacity,
        ticketTypes: section.ticketTypes.map(ticket => ({
          name: ticket.name,
          price: ticket.price,
          totalQuantity: ticket.totalQuantity
        }))
      }))
    }

    if (onSubmit) {
      onSubmit(payload)
    } else {
      createEvent.mutate(payload, {
        onSuccess: () => router.push("/admin/events"),
        onError: (err) => {
          alert("Failed to create event")
          console.error(err)
        }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Basic information about the event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => setFormData({ ...formData, startDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData({ ...formData, endDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Event Days</CardTitle>
              <CardDescription>Define specific days within the event</CardDescription>
            </div>
            <Button type="button" onClick={addDay} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Day
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {days.map((day, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Description</Label>
                <Input
                  value={day.description}
                  onChange={(e) => updateDay(index, "description", e.target.value)}
                  placeholder="Day description"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !day.date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {day.date ? format(day.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={day.date}
                      onSelect={(date) => updateDay(index, "date", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {days.length > 1 && (
                <Button type="button" variant="outline" size="icon" onClick={() => removeDay(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Venue Sections</CardTitle>
              <CardDescription>Define venue sections and ticket types</CardDescription>
            </div>
            <Button type="button" onClick={addVenueSection} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {venueSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Section {sectionIndex + 1}</h4>
                {venueSections.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeVenueSection(sectionIndex)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Section Name</Label>
                  <Input
                    value={section.name}
                    onChange={(e) => updateVenueSection(sectionIndex, "name", e.target.value)}
                    placeholder="VIP, General Admission, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Capacity</Label>
                  <Input
                    type="number"
                    value={section.capacity}
                    onChange={(e) => updateVenueSection(sectionIndex, "capacity", Number.parseInt(e.target.value) || 0)}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">Ticket Types</h5>
                  <Button type="button" onClick={() => addTicketType(sectionIndex)} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ticket Type
                  </Button>
                </div>
                {section.ticketTypes.map((ticketType, ticketIndex) => (
                  <div key={ticketIndex} className="grid gap-4 md:grid-cols-4 items-end">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={ticketType.name}
                        onChange={(e) => updateTicketType(sectionIndex, ticketIndex, "name", e.target.value)}
                        placeholder="Early Bird, Regular, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={ticketType.price}
                        onChange={(e) =>
                          updateTicketType(sectionIndex, ticketIndex, "price", Number.parseFloat(e.target.value) || 0)
                        }
                        placeholder="99.99"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={ticketType.totalQuantity}
                        onChange={(e) =>
                          updateTicketType(
                            sectionIndex,
                            ticketIndex,
                            "totalQuantity",
                            Number.parseInt(e.target.value) || 0,
                          )
                        }
                        placeholder="50"
                      />
                    </div>
                    {section.ticketTypes.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeTicketType(sectionIndex, ticketIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : defaultValues ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  )
}
