import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import { AuthProvider } from "./context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Phone Shop Dashboard",
  description: "Manage your phone shop inventory and orders",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto p-8">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

