import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '20-Day Python + AI Learning Tracker',
  description: 'Track your 20-day journey learning Python and AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
