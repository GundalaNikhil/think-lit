"use client";
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class AnimationErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Animation Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 text-red-700 mb-4">
            <AlertTriangle size={32} />
            <h3 className="text-xl font-space-grotesk font-bold">Animation Error</h3>
          </div>
          <p className="text-red-600 font-inter mb-6">
            Something went wrong while loading the animation. This might be due to invalid animation code or a rendering issue.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-space-grotesk font-semibold flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AnimationErrorBoundary;
