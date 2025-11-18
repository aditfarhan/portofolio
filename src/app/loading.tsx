export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[100dvh] bg-background">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted">Loading portfolio...</p>
      </div>
    </div>
  );
}
