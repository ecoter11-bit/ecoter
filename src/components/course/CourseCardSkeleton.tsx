import { cn } from '@/lib/utils'

function Bone({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded bg-neutral-100', className)} />
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="h-1 w-full bg-neutral-200" />
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex gap-2">
          <Bone className="h-5 w-20 rounded-full" />
          <Bone className="h-5 w-16 rounded-full" />
        </div>
        <Bone className="mb-2 h-6 w-3/4" />
        <Bone className="mb-1 h-4 w-full" />
        <Bone className="mb-4 h-4 w-1/2" />
        <div className="mb-4 flex gap-4">
          <Bone className="h-4 w-16" />
          <Bone className="h-4 w-20" />
        </div>
        <Bone className="mb-4 h-8 w-full rounded-lg" />
        <div className="flex-1 space-y-2">
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-3/4" />
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-5">
          <Bone className="h-6 w-16" />
          <Bone className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  )
}
