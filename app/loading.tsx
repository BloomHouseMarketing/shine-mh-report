export default function Loading() {
  return (
    <main className="py-8">
      <div className="mb-8">
        <div className="h-9 w-64 bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-4 w-80 bg-gray-200 animate-pulse rounded-xl mt-2" />
        <div className="h-3 w-52 bg-gray-200 animate-pulse rounded-xl mt-1.5" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="h-[120px] bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-[120px] bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-[120px] bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-[120px] bg-gray-200 animate-pulse rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="h-[360px] bg-gray-200 animate-pulse rounded-xl" />
        <div className="h-[360px] bg-gray-200 animate-pulse rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 h-[300px] bg-gray-200 animate-pulse rounded-xl" />
        <div className="lg:col-span-1 h-[300px] bg-gray-200 animate-pulse rounded-xl" />
      </div>
    </main>
  );
}
