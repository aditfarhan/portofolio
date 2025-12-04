
/**
 * Error Boundary Component
 * 
 * React error boundary for graceful error handling in the component tree.
 * Catches JavaScript errors anywhere in the child component tree and displays a fallback UI.
 * 
 * @module components/ErrorBoundary
 */

"use client";

import { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props for ErrorBoundary component
 */
interface ErrorBoundaryProps {
    /** Child components to wrap */
    children: ReactNode;
    /** Optional fallback UI to render on error */
    fallback?: ReactNode;
    /** Optional callback when error occurs */
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
    /** Whether an error has been caught */
    hasError: boolean;
    /** The error that was caught */
    error: Error | null;
    /** Additional error information from React */
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Wraps components to catch and handle errors gracefully.
 * Prevents the entire app from crashing when a component throws an error.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    /**
     * Static method called when an error is thrown in a child component
     * 
     * @param error - The error that was thrown
     * @returns New state with error information
     */
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return {
            hasError: true,
            error,
        };
    }

    /**
     * Lifecycle method called after an error has been thrown
     * 
     * @param error - The error that was thrown
     * @param errorInfo - Additional error information from React
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console in development
        if (process.env.NODE_ENV === "development") {
            console.error("Error caught by ErrorBoundary:", error, errorInfo);
        }

        // Update state with error info
        this.setState({
            errorInfo,
        });

        // Call onError callback if provided
        this.props.onError?.(error, errorInfo);

        // In production, you would send this to an error reporting service
        // Example: logErrorToService(error, errorInfo);
    }

    /**
     * Reset error boundary state
     */
    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render(): ReactNode {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback } = this.props;

        if (hasError) {
            // Use custom fallback if provided
            if (fallback) {
                return fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full bg-card border border-token rounded-lg p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-foreground">
                                Something went wrong
                            </h2>
                        </div>

                        <p className="text-muted mb-4">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>

                        {process.env.NODE_ENV === "development" && error && (
                            <details className="mb-4">
                                <summary className="cursor-pointer text-sm text-muted hover:text-foreground">
                                    Error Details (Development Only)
                                </summary>
                                <div className="mt-2 p-3 bg-background rounded border border-token">
                                    <p className="text-xs font-mono text-red-500 mb-2">
                                        {error.toString()}
                                    </p>
                                    {errorInfo && (
                                        <pre className="text-xs font-mono overflow-x-auto text-muted">
                                            {errorInfo.componentStack}
                                        </pre>
                                    )}
                                </div>
                            </details>
                        )}

                        <div className="flex gap-2">
                            <button
                                onClick={this.handleReset}
                                className="flex-1 px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 transition-colors font-medium"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-4 py-2 bg-card border border-token text-foreground rounded-md hover:bg-muted/10 transition-colors font-medium"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;
