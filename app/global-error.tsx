"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
                    <div className="max-w-lg w-full text-center">
                        <h1 className="text-6xl font-bold text-red-500 mb-8">Oops!</h1>
                        <div className="bg-gray-800 rounded-lg p-8 shadow-2xl">
                            <h2 className="text-2xl font-semibold text-white mb-4">Something went terribly wrong</h2>
                            <p className="text-gray-300 mb-6">We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.</p>
                            <button onClick={() => reset()} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200">
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
