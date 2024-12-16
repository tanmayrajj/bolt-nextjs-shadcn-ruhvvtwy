import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <h1 className="text-9xl font-bold text-white mb-4">404</h1>
                <div className="bg-blue-800 rounded-lg p-8 shadow-2xl">
                    <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
                    <p className="text-blue-200 mb-6">Oops! The page you're looking for seems to have vanished into thin air.</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
                        Return Home
                    </Link>
                </div>
                <div className="mt-8 text-blue-200 text-sm">Lost? Don't worry, it happens to the best of us.</div>
            </div>
        </div>
    );
}
