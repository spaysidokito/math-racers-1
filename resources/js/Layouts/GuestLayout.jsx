import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 pt-6 sm:justify-center sm:pt-0 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🏎️</div>
                <div className="absolute top-40 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>⭐</div>
                <div className="absolute bottom-32 left-20 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🏁</div>
                <div className="absolute bottom-20 right-32 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>✨</div>
                <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>🚀</div>
                <div className="absolute top-1/3 right-1/4 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}>🏆</div>
            </div>

            <div className="relative z-10">
                <Link href="/" className="block">
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-2 animate-bounce">🏎️</div>
                        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Math Racers</h1>
                        <p className="text-white/90 text-sm mt-1">Race to mastery with fun math!</p>
                    </div>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white/95 backdrop-blur-sm px-8 py-8 shadow-2xl sm:max-w-md sm:rounded-2xl relative z-10 border-4 border-white/50">
                {children}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-white/80 text-sm relative z-10">
                <p>🌟 Track progress • 🏅 Earn badges • ⚡ Fast gameplay</p>
            </div>
        </div>
    );
}
