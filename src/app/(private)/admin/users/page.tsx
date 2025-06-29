import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, User, Mail } from "lucide-react"

const mockUsers = [
  {
    id: "u1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "u3",
    name: "Mike Davis",
    email: "mike.davis@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "u4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "u5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "CUSTOMER",
    createdAt: new Date("2024-05-12"),
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    createdAt: new Date("2024-01-01"),
  },
]

export default function UsersPage() {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800"
      case "CUSTOMER":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage system users and their roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            System Users
          </CardTitle>
          <CardDescription>All registered users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.createdAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
