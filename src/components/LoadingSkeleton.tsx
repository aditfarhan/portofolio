/**
 * Loading Skeleton Component
 * 
 * Shows a skeleton UI while content is loading.
 * Improves perceived performance and user experience.
 * 
 * @module components/LoadingSkeleton
 */

/**
 * Loading skeleton for the main deck area
 * 
 * Provides a placeholder UI that matches the layout of the actual content.
 * Reduces layout shift and provides visual feedback during loading.
 * 
 * @example
 * ```tsx
 * <Suspense fallback={<LoadingSkeleton />}>
 *   <HomeDeck />
 * </Suspense>
 * ```
 */
export default function LoadingSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
                {/* Main card skeleton */}
                <div className="relative mx-auto" style={{ maxWidth: "800px" }}>
                    <div className="bg-card border border-token rounded-2xl p-8 shadow-2xl animate-pulse">
                        {/* Header skeleton */}
                        <div className="flex flex-col items-center gap-4 mb-6">
                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-muted/30" />

                            {/* Name */}
                            <div className="h-8 w-64 bg-muted/30 rounded-lg" />

                            {/* Title */}
                            <div className="h-4 w-48 bg-muted/20 rounded" />
                        </div>

                        {/* Content skeleton */}
                        <div className="space-y-3 mt-8">
                            <div className="h-4 w-full bg-muted/20 rounded" />
                            <div className="h-4 w-5/6 bg-muted/20 rounded" />
                            <div className="h-4 w-4/6 bg-muted/20 rounded" />
                        </div>

                        {/* Button skeleton */}
                        <div className="mt-8 flex justify-center">
                            <div className="h-10 w-32 bg-muted/30 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Subtle loading indicator */}
                <div className="mt-4 flex justify-center">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
