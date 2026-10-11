import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NSUT Connect — Student community',
  description: 'The student network for NSUT discussions, announcements, and timetables.',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-67WjXDKHFHNe0i7JPmqzs2l2y0PBbG.png',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-67WjXDKHFHNe0i7JPmqzs2l2y0PBbG.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
