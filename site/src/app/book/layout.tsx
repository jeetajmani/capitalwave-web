import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Session',
  description: 'Reserve studio time at Capital Wave Studio — recording, music production, mixing, mastering, and video production. Victoria, BC.',
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}
