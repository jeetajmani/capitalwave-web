import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-svh">
      <div className="flex min-h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold">Coming Soon...</h1>
          <Image
            src="/images/cws_logo.jpg"
            alt="Coming Soon"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}