import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const getRoleGradient = () => {
        switch (user.role) {
            case "admin":
                return "from-purple-600 to-indigo-700";
            case "teacher":
                return "from-blue-600 to-cyan-700";
            case "student":
                return "from-green-600 to-emerald-700";
            default:
                return "from-gray-600 to-gray-700";
        }
    };

    const getRoleEmoji = () => {
        switch (user.role) {
            case "admin":
                return "👑";
            case "teacher":
                return "👨‍🏫";
            case "student":
                return "🎓";
            default:
                return "👤";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className={`bg-gradient-to-r ${getRoleGradient()} shadow-lg`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center space-x-2 group">
                                    <div className="text-3xl transform group-hover:scale-110 transition-transform">🏎️</div>
                                    <span className="text-white font-bold text-xl hidden sm:block">Math Racers</span>
                                </Link>
                            </div>

                            <div className="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    🏠 Dashboard
                                </NavLink>

                                {/* Admin Navigation */}
                                {user.role === "admin" && (
                                    <>
                                        <NavLink
                                            href={route("admin.users")}
                                            active={route().current(
                                                "admin.users"
                                            )}
                                        >
                                            👥 Users
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.question-bank")}
                                            active={route().current(
                                                "admin.question-bank"
                                            )}
                                        >
                                            ❓ Questions
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.system-logs")}
                                            active={route().current(
                                                "admin.system-logs"
                                            )}
                                        >
                                            📋 System Logs
                                        </NavLink>
                                    </>
                                )}

                                {/* Student Navigation */}
                                {user.role === "student" && (
                                    <>
                                        <NavLink
                                            href={route("student.progress")}
                                            active={route().current(
                                                "student.progress"
                                            )}
                                        >
                                            📊 Progress
                                        </NavLink>
                                        <NavLink
                                            href={route("student.leaderboard")}
                                            active={route().current(
                                                "student.leaderboard"
                                            )}
                                        >
                                            🏆 Leaderboard
                                        </NavLink>
                                    </>
                                )}

                                {/* Teacher Navigation */}
                                {user.role === "teacher" && (
                                    <>
                                        <NavLink
                                            href={route(
                                                "teacher.questions.index"
                                            )}
                                            active={route().current(
                                                "teacher.questions.*"
                                            )}
                                        >
                                            ❓ Questions
                                        </NavLink>
                                        <NavLink
                                            href={route(
                                                "teacher.student-performance"
                                            )}
                                            active={route().current(
                                                "teacher.student-performance"
                                            )}
                                        >
                                            👨‍🎓 Students
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-xl bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-bold leading-4 text-white transition duration-150 ease-in-out hover:bg-white/30 focus:outline-none border border-white/30 shadow-lg"
                                            >
                                                <span className="mr-2">{getRoleEmoji()}</span>
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            👤 Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            🚪 Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-xl p-2 text-white bg-white/20 backdrop-blur-sm transition duration-150 ease-in-out hover:bg-white/30 focus:bg-white/30 focus:outline-none border border-white/30"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden bg-white/10 backdrop-blur-sm"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            🏠 Dashboard
                        </ResponsiveNavLink>

                        {/* Admin Navigation */}
                        {user.role === "admin" && (
                            <>
                                <ResponsiveNavLink
                                    href={route("admin.users")}
                                    active={route().current("admin.users")}
                                >
                                    👥 Users
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.question-bank")}
                                    active={route().current(
                                        "admin.question-bank"
                                    )}
                                >
                                    ❓ Questions
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.system-logs")}
                                    active={route().current(
                                        "admin.system-logs"
                                    )}
                                >
                                    📋 System Logs
                                </ResponsiveNavLink>
                            </>
                        )}

                        {/* Student Navigation */}
                        {user.role === "student" && (
                            <>
                                <ResponsiveNavLink
                                    href={route("student.progress")}
                                    active={route().current("student.progress")}
                                >
                                    📊 Progress
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("student.leaderboard")}
                                    active={route().current(
                                        "student.leaderboard"
                                    )}
                                >
                                    🏆 Leaderboard
                                </ResponsiveNavLink>
                            </>
                        )}

                        {/* Teacher Navigation */}
                        {user.role === "teacher" && (
                            <>
                                <ResponsiveNavLink
                                    href={route("teacher.questions.index")}
                                    active={route().current(
                                        "teacher.questions.*"
                                    )}
                                >
                                    ❓ Questions
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("teacher.student-performance")}
                                    active={route().current(
                                        "teacher.student-performance"
                                    )}
                                >
                                    👨‍🎓 Students
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    <div className="border-t border-white/20 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-bold text-white flex items-center">
                                <span className="mr-2">{getRoleEmoji()}</span>
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-white/80">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                👤 Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                🚪 Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
