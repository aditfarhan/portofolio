import { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}
interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback ?? (
                    <div className="h-full flex flex-col items-center justify-center gap-2 p-6 text-center">
                        <p className="text-sm text-white/38">Unable to load this section.</p>
                        <button
                            className="text-2xs text-white/25 underline underline-offset-2 hover:text-white/55 transition-colors"
                            onClick={() => this.setState({ hasError: false })}
                        >
                            Try again
                        </button>
                    </div>
                )
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
