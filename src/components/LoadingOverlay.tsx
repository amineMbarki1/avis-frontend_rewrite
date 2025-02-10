import { Spinner } from "@heroui/react";

export default function LoadingOverlay({ children, isLoading }) {
  return (
    <div className="relative min-w-fit min-h-fit w-full h-full">
      {isLoading && (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-white bg-opacity-80">
          <Spinner />
        </div>
      )}
      {children}
    </div>
  );
}
