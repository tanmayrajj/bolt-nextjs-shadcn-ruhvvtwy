"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-800 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <div className="bg-purple-800 rounded-lg p-8 shadow-2xl">
                    <div className="mb-6">
                        <svg className="w-16 h-16 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Something Went Wrong</h2>
                    <p className="text-purple-200 mb-6">Don't worry, this is just a temporary setback. Let's try that again!</p>
                    <button onClick={() => reset()} className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors duration-200">
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
