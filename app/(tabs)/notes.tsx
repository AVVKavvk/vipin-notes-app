// app/(tabs)/notes.tsx
import LoadingScreen from "@/src/lib/Loader";
import { lazy, Suspense } from "react";

const NotesIndex = lazy(() => import("@/src/components/Notes/Index"));
export default function Notes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <NotesIndex />
    </Suspense>
  );
}
