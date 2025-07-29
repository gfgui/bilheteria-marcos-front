"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, User as UserIcon, Mail, Trash2 } from "lucide-react"

import { CreateUserModal } from "@/components/users/create-user-modal"
import { UpdateUserModal } from "@/components/users/update-user-modal"


import { useDeleteUser, useUsers } from "@/hooks/use-users"

export default function UsersPage() {
  const { data: users, isLoading, isError } = useUsers()

  const deleteUser = useDeleteUser()

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

  if (isLoading) {
    return <p>Loading users...</p>
  }

  if (isError || !users) {
    return <p>Failed to load users.</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage system users and their roles</p>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <CreateUserModal />
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
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
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
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <UpdateUserModal user={user} />
                    <button
                      onClick={() => {
                        const confirmed = confirm(`Are you sure you want to delete ${user.name}?`)
                        if (confirmed) {
                          deleteUser.mutate(user.id)
                        }
                      }}
                      className="text-red-600 hover:underline"
                      title="Delete user"
                    >
                      <Trash2 className="inline h-4 w-4" />
                    </button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}