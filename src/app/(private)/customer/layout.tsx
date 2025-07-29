import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/customer/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <AppSidebar />
                <main className="flex-1">{children}</main>
            </div>
        </SidebarProvider>
    )
}
