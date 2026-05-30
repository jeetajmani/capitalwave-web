import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Audio recording, music production, mixing & mastering, and video production at Capital Wave Studio — Victoria, BC.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
