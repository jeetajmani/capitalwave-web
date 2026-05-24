export function smoothScrollToElement(id: string, duration = 900) {
  const el = document.getElementById(id)
  if (!el) return

  const targetY = el.getBoundingClientRect().top + window.scrollY
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()

  const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

  const step = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * easeOutExpo(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}
