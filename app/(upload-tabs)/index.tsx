import LoadingScreen from "@/src/lib/Loader";
import React, { lazy, Suspense } from "react";

const NotesUploadComponent = lazy(
  () => import("@/src/components/Upload/Notes")
);
const NotesUpload = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <NotesUploadComponent />
    </Suspense>
  );
};

export default NotesUpload;
