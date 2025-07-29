import { EventForm } from "@/components/events/event-form"

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">Add a new event to your system</p>
      </div>
      <EventForm />
    </div>
  )
}
