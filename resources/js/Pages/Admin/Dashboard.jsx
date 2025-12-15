import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    user,
    statistics,
    recentUsers,
    recentQuizSessions,
    questionStats,
    usersByRole,
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ⚙️ Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🎯 System Overview
                        </h1>
                        <p className="text-gray-600">Monitor and manage Math Racers platform</p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-5">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                            <div className="text-4xl mb-2">👥</div>
                            <div className="text-sm font-medium opacity-90">
                                Total Users
                            </div>
                            <div className="text-3xl font-bold">
                                {statistics.total_users}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                            <div className="text-4xl mb-2">🎓</div>
                            <div className="text-sm font-medium opacity-90">
                                Students
                            </div>
                            <div className="text-3xl font-bold">
                                {statistics.total_students}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                            <div className="text-4xl mb-2">👨‍🏫</div>
                            <div className="text-sm font-medium opacity-90">
                                Teachers
                            </div>
                            <div className="text-3xl font-bold">
                                {statistics.total_teachers}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                            <div className="text-4xl mb-2">❓</div>
                            <div className="text-sm font-medium opacity-90">
                                Questions
                            </div>
                            <div className="text-3xl font-bold">
                                {statistics.total_questions}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300">
                            <div className="text-4xl mb-2">🏁</div>
                            <div className="text-sm font-medium opacity-90">
                                Quiz Sessions
                            </div>
                            <div className="text-3xl font-bold">
                                {statistics.total_quiz_sessions}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Users */}
                        <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-blue-100">
                            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">👤</span>
                                    Recent Users
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div
                                                    className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                                                        user.role === "student"
                                                            ? "bg-blue-500 text-white"
                                                            : user.role ===
                                                              "teacher"
                                                            ? "bg-green-500 text-white"
                                                            : "bg-purple-500 text-white"
                                                    }`}
                                                >
                                                    {user.role === "student" ? "🎓" : user.role === "teacher" ? "👨‍🏫" : "⚙️"} {user.role}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent Quiz Sessions */}
                        <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-green-100">
                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">🏁</span>
                                    Recent Quiz Activity
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentQuizSessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">
                                                    {session.student?.name ||
                                                        "Unknown Student"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    📚 Grade {session.grade_level}{" "}
                                                    - {session.question_type}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-green-600">
                                                    ✅ {session.correct_answers}/
                                                    {session.total_questions}
                                                </div>
                                                <div className="text-xs text-orange-600 font-semibold">
                                                    ⭐ {session.points_earned} pts
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Question Statistics */}
                        <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-purple-100">
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">📊</span>
                                    Question Distribution
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {Object.entries(questionStats).map(
                                        ([grade, topics]) => (
                                            <div key={grade} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                                                <div className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                                                    <span className="mr-2">🎯</span>
                                                    Grade {grade}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {topics.map((topic) => (
                                                        <div
                                                            key={
                                                                topic.question_type
                                                            }
                                                            className="text-xs bg-white px-3 py-2 rounded-lg font-semibold text-gray-700"
                                                        >
                                                            {
                                                                topic.question_type
                                                            }
                                                            : <span className="text-purple-600">{topic.count}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Users by Role */}
                        <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-orange-100">
                            <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                    <span className="mr-2">👥</span>
                                    Users by Role
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {Object.entries(usersByRole).map(
                                        ([role, count]) => (
                                            <div
                                                key={role}
                                                className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl"
                                            >
                                                <div className="text-sm font-bold text-gray-900 capitalize flex items-center">
                                                    <span className="mr-2">
                                                        {role === "student" ? "🎓" : role === "teacher" ? "👨‍🏫" : "⚙️"}
                                                    </span>
                                                    {role}s
                                                </div>
                                                <div className="text-lg font-bold text-orange-600">
                                                    {count}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
