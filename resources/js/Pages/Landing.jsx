import { Head, Link } from "@inertiajs/react";

export default function Landing() {
    return (
        <>
            <Head title="Math Racers" />
            <div className="min-h-screen bg-gradient-to-b from-indigo-600 via-indigo-700 to-indigo-800 text-white">
                <header className="container mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="text-2xl">🏁</span>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            Math Racers
                        </span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link
                            href={route("login")}
                            className="rounded-md px-4 py-2 bg-white/10 hover:bg-white/20 transition"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route("register")}
                            className="rounded-md px-4 py-2 bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition"
                        >
                            Sign up
                        </Link>
                    </nav>
                </header>

                <main className="container mx-auto px-6 pt-10 pb-20">
                    <section className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                                Race to mastery with fun, adaptive math quizzes
                            </h1>
                            <p className="mt-4 text-white/80 text-lg">
                                Practice addition, subtraction, multiplication,
                                and division with game-like quizzes, progress
                                tracking, and leaderboards.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    href={route("register")}
                                    className="rounded-lg px-6 py-3 bg-white text-indigo-700 font-semibold hover:bg-gray-100 transition"
                                >
                                    Get started free
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="rounded-lg px-6 py-3 bg-white/10 hover:bg-white/20 transition"
                                >
                                    I already have an account
                                </Link>
                            </div>
                            <div className="mt-8 flex items-center gap-6 text-white/80">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">📈</span>
                                    <span>Track progress</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🏅</span>
                                    <span>Earn badges</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⚡</span>
                                    <span>Fast gameplay</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-6 bg-white/10 rounded-2xl blur-xl"></div>
                            <div className="relative rounded-2xl bg-white text-gray-900 shadow-2xl overflow-hidden">
                                <div className="p-6 border-b bg-gray-50">
                                    Quiz Preview
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="text-sm text-gray-500">
                                        Grade 2 • Addition
                                    </div>
                                    <div className="text-3xl font-bold">
                                        12 + 9 = ?
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="rounded-lg border px-4 py-3 hover:bg-indigo-50">
                                            20
                                        </button>
                                        <button className="rounded-lg border px-4 py-3 hover:bg-indigo-50">
                                            21
                                        </button>
                                        <button className="rounded-lg border px-4 py-3 hover:bg-indigo-50">
                                            22
                                        </button>
                                        <button className="rounded-lg border px-4 py-3 hover:bg-indigo-50">
                                            19
                                        </button>
                                    </div>
                                    <div className="pt-2 text-sm text-gray-500">
                                        Time left: 18s
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-20 grid md:grid-cols-3 gap-6">
                        <div className="rounded-xl bg-white/10 p-6">
                            <div className="text-3xl">🧮</div>
                            <h3 className="mt-3 text-xl font-semibold">
                                Curriculum-aligned
                            </h3>
                            <p className="mt-2 text-white/80">
                                Questions scale by grade levels 1–3 and cover
                                core operations.
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-6">
                            <div className="text-3xl">🎯</div>
                            <h3 className="mt-3 text-xl font-semibold">
                                Adaptive difficulty
                            </h3>
                            <p className="mt-2 text-white/80">
                                Keeps learners engaged with balanced challenge
                                and quick feedback.
                            </p>
                        </div>
                        <div className="rounded-xl bg-white/10 p-6">
                            <div className="text-3xl">👥</div>
                            <h3 className="mt-3 text-xl font-semibold">
                                Leaderboards
                            </h3>
                            <p className="mt-2 text-white/80">
                                Friendly competition motivates practice and
                                improvement.
                            </p>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-white/10">
                    <div className="container mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/80">
                        <div>© {new Date().getFullYear()} Math Racers</div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-white">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-white">
                                Terms
                            </a>
                            <a href="#" className="hover:text-white">
                                Contact
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
