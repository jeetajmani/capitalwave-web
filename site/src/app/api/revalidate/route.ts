import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const type = body?._type as string | undefined

    if (type === 'talent') {
      revalidatePath('/roster')
      revalidatePath('/')
    } else if (type === 'event') {
      revalidatePath('/events')
      revalidatePath('/')
    } else {
      // Fallback: revalidate everything
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type: type ?? 'all' })
  } catch {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
  }
}
