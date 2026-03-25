import { Suspense } from "react";
import { ReservationSearch } from "../components/ReservationSearch";
import { Skeleton } from "../components/ui/Skeleton";

export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-6 lg:py-section-gap">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-xl mx-auto gap-4">
            <Skeleton width="w-12" height="h-12" className="rounded-full" />
            <Skeleton width="w-48" height="h-6" />
            <Skeleton width="w-64" height="h-4" />
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
              <Skeleton height="h-10" className="flex-1" />
              <Skeleton height="h-10" className="flex-1" />
              <Skeleton width="w-24" height="h-10" />
            </div>
          </div>
        }
      >
        <ReservationSearch />
      </Suspense>
    </main>
  );
}
