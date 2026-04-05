import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Attire Inspo",
  description: 'Your AI fashion stylist',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
