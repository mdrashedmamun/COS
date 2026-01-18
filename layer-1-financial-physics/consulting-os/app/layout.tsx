import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Consulting OS - Growth Physics Calculator',
  description: 'Discover your business constraint and get a tailored 90-day playbook to fix it.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-warm-50 text-warm-900 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
