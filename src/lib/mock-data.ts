export const mockEvents = [
  {
    id: "1",
    name: "Summer Music Festival 2024",
    description: "The biggest summer music festival featuring top artists from around the world",
    coverImage: "/placeholder.svg?height=200&width=400",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-07-17"),
    days: [
      {
        id: "d1",
        eventId: "1",
        description: "Opening Day - Rock & Pop",
        date: new Date("2024-07-15"),
      },
      {
        id: "d2",
        eventId: "1",
        description: "Main Day - All Genres",
        date: new Date("2024-07-16"),
      },
      {
        id: "d3",
        eventId: "1",
        description: "Closing Day - Electronic",
        date: new Date("2024-07-17"),
      },
    ],
    venueSections: [
      {
        id: "vs1",
        eventId: "1",
        name: "VIP Section",
        capacity: 500,
        ticketTypes: [
          {
            id: "tt1",
            sectionId: "vs1",
            name: "VIP Early Bird",
            price: 299.99,
            totalQuantity: 200,
          },
          {
            id: "tt2",
            sectionId: "vs1",
            name: "VIP Regular",
            price: 399.99,
            totalQuantity: 300,
          },
        ],
      },
      {
        id: "vs2",
        eventId: "1",
        name: "General Admission",
        capacity: 2000,
        ticketTypes: [
          {
            id: "tt3",
            sectionId: "vs2",
            name: "GA Early Bird",
            price: 89.99,
            totalQuantity: 800,
          },
          {
            id: "tt4",
            sectionId: "vs2",
            name: "GA Regular",
            price: 129.99,
            totalQuantity: 1200,
          },
        ],
      },
    ],
    musicalArtists: [
      {
        id: "ma1",
        eventId: "1",
        musicalArtistId: "a1",
        musicalArtist: {
          id: "a1",
          name: "The Electric Waves",
        },
      },
      {
        id: "ma2",
        eventId: "1",
        musicalArtistId: "a2",
        musicalArtist: {
          id: "a2",
          name: "Luna Rodriguez",
        },
      },
      {
        id: "ma3",
        eventId: "1",
        musicalArtistId: "a3",
        musicalArtist: {
          id: "a3",
          name: "Midnight Symphony",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Jazz & Blues Night",
    description: "An intimate evening of jazz and blues with renowned artists",
    coverImage: "/placeholder.svg?height=200&width=400",
    startDate: new Date("2024-08-20"),
    endDate: new Date("2024-08-20"),
    days: [
      {
        id: "d4",
        eventId: "2",
        description: "Jazz & Blues Evening",
        date: new Date("2024-08-20"),
      },
    ],
    venueSections: [
      {
        id: "vs3",
        eventId: "2",
        name: "Premium Seating",
        capacity: 150,
        ticketTypes: [
          {
            id: "tt5",
            sectionId: "vs3",
            name: "Premium",
            price: 149.99,
            totalQuantity: 150,
          },
        ],
      },
    ],
    musicalArtists: [
      {
        id: "ma4",
        eventId: "2",
        musicalArtistId: "a4",
        musicalArtist: {
          id: "a4",
          name: "Sarah Johnson Trio",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Electronic Dance Festival",
    description: "The ultimate EDM experience with world-class DJs",
    coverImage: "/placeholder.svg?height=200&width=400",
    startDate: new Date("2024-09-10"),
    endDate: new Date("2024-09-12"),
    days: [
      {
        id: "d5",
        eventId: "3",
        description: "House & Techno Night",
        date: new Date("2024-09-10"),
      },
      {
        id: "d6",
        eventId: "3",
        description: "Trance & Progressive",
        date: new Date("2024-09-11"),
      },
      {
        id: "d7",
        eventId: "3",
        description: "Dubstep & Bass",
        date: new Date("2024-09-12"),
      },
    ],
    venueSections: [
      {
        id: "vs4",
        eventId: "3",
        name: "Dance Floor",
        capacity: 3000,
        ticketTypes: [
          {
            id: "tt6",
            sectionId: "vs4",
            name: "3-Day Pass",
            price: 199.99,
            totalQuantity: 2500,
          },
          {
            id: "tt7",
            sectionId: "vs4",
            name: "Single Day",
            price: 79.99,
            totalQuantity: 500,
          },
        ],
      },
    ],
    musicalArtists: [
      {
        id: "ma5",
        eventId: "3",
        musicalArtistId: "a5",
        musicalArtist: {
          id: "a5",
          name: "DJ Neon",
        },
      },
      {
        id: "ma6",
        eventId: "3",
        musicalArtistId: "a6",
        musicalArtist: {
          id: "a6",
          name: "Bass Master",
        },
      },
    ],
  },
]

export const mockArtists = [
  {
    id: "a1",
    name: "The Electric Waves",
    MusicalArtistOnEvent: [
      {
        id: "ma1",
        eventId: "1",
        musicalArtistId: "a1",
        event: {
          id: "1",
          name: "Summer Music Festival 2024",
        },
      },
    ],
  },
  {
    id: "a2",
    name: "Luna Rodriguez",
    MusicalArtistOnEvent: [
      {
        id: "ma2",
        eventId: "1",
        musicalArtistId: "a2",
        event: {
          id: "1",
          name: "Summer Music Festival 2024",
        },
      },
    ],
  },
  {
    id: "a3",
    name: "Midnight Symphony",
    MusicalArtistOnEvent: [
      {
        id: "ma3",
        eventId: "1",
        musicalArtistId: "a3",
        event: {
          id: "1",
          name: "Summer Music Festival 2024",
        },
      },
    ],
  },
  {
    id: "a4",
    name: "Sarah Johnson Trio",
    MusicalArtistOnEvent: [
      {
        id: "ma4",
        eventId: "2",
        musicalArtistId: "a4",
        event: {
          id: "2",
          name: "Jazz & Blues Night",
        },
      },
    ],
  },
  {
    id: "a5",
    name: "DJ Neon",
    MusicalArtistOnEvent: [
      {
        id: "ma5",
        eventId: "3",
        musicalArtistId: "a5",
        event: {
          id: "3",
          name: "Electronic Dance Festival",
        },
      },
    ],
  },
  {
    id: "a6",
    name: "Bass Master",
    MusicalArtistOnEvent: [
      {
        id: "ma6",
        eventId: "3",
        musicalArtistId: "a6",
        event: {
          id: "3",
          name: "Electronic Dance Festival",
        },
      },
    ],
  },
  {
    id: "a7",
    name: "Acoustic Dreams",
    MusicalArtistOnEvent: [],
  },
  {
    id: "a8",
    name: "Rock Legends",
    MusicalArtistOnEvent: [],
  },
]

export const mockOrders = [
  {
    id: "o1",
    userId: "u1",
    totalAmount: 599.98,
    status: "completed",
    createdAt: new Date("2024-06-15"),
    user: {
      id: "u1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "CUSTOMER",
    },
    tickets: [
      {
        id: "t1",
        orderId: "o1",
        ticketTypeId: "tt1",
        code: "VIP-001-2024",
        ticketType: {
          id: "tt1",
          name: "VIP Early Bird",
          price: 299.99,
          section: {
            id: "vs1",
            name: "VIP Section",
            event: {
              id: "1",
              name: "Summer Music Festival 2024",
            },
          },
        },
      },
      {
        id: "t2",
        orderId: "o1",
        ticketTypeId: "tt1",
        code: "VIP-002-2024",
        ticketType: {
          id: "tt1",
          name: "VIP Early Bird",
          price: 299.99,
          section: {
            id: "vs1",
            name: "VIP Section",
            event: {
              id: "1",
              name: "Summer Music Festival 2024",
            },
          },
        },
      },
    ],
  },
  {
    id: "o2",
    userId: "u2",
    totalAmount: 179.98,
    status: "pending",
    createdAt: new Date("2024-06-20"),
    user: {
      id: "u2",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "CUSTOMER",
    },
    tickets: [
      {
        id: "t3",
        orderId: "o2",
        ticketTypeId: "tt3",
        code: "GA-001-2024",
        ticketType: {
          id: "tt3",
          name: "GA Early Bird",
          price: 89.99,
          section: {
            id: "vs2",
            name: "General Admission",
            event: {
              id: "1",
              name: "Summer Music Festival 2024",
            },
          },
        },
      },
      {
        id: "t4",
        orderId: "o2",
        ticketTypeId: "tt3",
        code: "GA-002-2024",
        ticketType: {
          id: "tt3",
          name: "GA Early Bird",
          price: 89.99,
          section: {
            id: "vs2",
            name: "General Admission",
            event: {
              id: "1",
              name: "Summer Music Festival 2024",
            },
          },
        },
      },
    ],
  },
  {
    id: "o3",
    userId: "u3",
    totalAmount: 149.99,
    status: "completed",
    createdAt: new Date("2024-06-25"),
    user: {
      id: "u3",
      name: "Mike Davis",
      email: "mike.davis@example.com",
      role: "CUSTOMER",
    },
    tickets: [
      {
        id: "t5",
        orderId: "o3",
        ticketTypeId: "tt5",
        code: "JAZZ-001-2024",
        ticketType: {
          id: "tt5",
          name: "Premium",
          price: 149.99,
          section: {
            id: "vs3",
            name: "Premium Seating",
            event: {
              id: "2",
              name: "Jazz & Blues Night",
            },
          },
        },
      },
    ],
  },
  {
    id: "o4",
    userId: "u4",
    totalAmount: 399.96,
    status: "completed",
    createdAt: new Date("2024-06-28"),
    user: {
      id: "u4",
      name: "Emily Chen",
      email: "emily.chen@example.com",
      role: "CUSTOMER",
    },
    tickets: [
      {
        id: "t6",
        orderId: "o4",
        ticketTypeId: "tt6",
        code: "EDM-001-2024",
        ticketType: {
          id: "tt6",
          name: "3-Day Pass",
          price: 199.99,
          section: {
            id: "vs4",
            name: "Dance Floor",
            event: {
              id: "3",
              name: "Electronic Dance Festival",
            },
          },
        },
      },
      {
        id: "t7",
        orderId: "o4",
        ticketTypeId: "tt6",
        code: "EDM-002-2024",
        ticketType: {
          id: "tt6",
          name: "3-Day Pass",
          price: 199.99,
          section: {
            id: "vs4",
            name: "Dance Floor",
            event: {
              id: "3",
              name: "Electronic Dance Festival",
            },
          },
        },
      },
    ],
  },
  {
    id: "o5",
    userId: "u5",
    totalAmount: 259.97,
    status: "cancelled",
    createdAt: new Date("2024-06-30"),
    user: {
      id: "u5",
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "CUSTOMER",
    },
    tickets: [
      {
        id: "t8",
        orderId: "o5",
        ticketTypeId: "tt4",
        code: "GA-003-2024",
        ticketType: {
          id: "tt4",
          name: "GA Regular",
          price: 129.99,
          section: {
            id: "vs2",
            name: "General Admission",
            event: {
              id: "1",
              name: "Summer Music Festival 2024",
            },
          },
        },
      },
      {
        id: "t9",
        orderId: "o5",
        ticketTypeId: "tt4",
        code: "GA-004-2024",
        ticketType: {
          id: "tt4",
          name: "GA Regular",
          price: 129.99,
          section: {
            id: "vs2",
            name: "General Admission",
            event: {
              id: "1",
              name: "Summer Music Festival 2024",
            },
          },
        },
      },
    ],
  },
]

export const mockStats = {
  eventsCount: mockEvents.length,
  artistsCount: mockArtists.length,
  ordersCount: mockOrders.length,
  totalRevenue: mockOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.totalAmount, 0),
}
