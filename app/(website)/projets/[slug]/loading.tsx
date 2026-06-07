export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-72 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  )
}