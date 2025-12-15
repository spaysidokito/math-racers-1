import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function SystemLogs({
    userActivity,
    quizStats,
    dailyActivity,
    systemStats,
    filters,
    dateFilterOptions,
}) {
    const { data, setData, get, processing } = useForm({
        date_filter: filters.date_filter || "last_7_days",
        activity_type: filters.activity_type || "all",
    });

    const handleFilterChange = () => {
        get(route("admin.system-logs"), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    📊 System Activity Logs
                </h2>
            }
        >
            <Head title="System Logs" />

            <div className="py-12 bg-gradient-to-br from-gray-50 to-green-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📊 System Activity
                        </h1>
                        <p className="text-gray-600">Monitor platform usage and performance</p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-green-100 mb-6">
                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        📅 Date Range
                                    </label>
                                    <select
                                        value={data.date_filter}
                                        onChange={(e) => {
                                            setData(
                                                "date_filter",
                                                e.target.value
                                            );
                                            setTimeout(handleFilterChange, 100);
                                        }}
                                        className="rounded-xl border-2 border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2 font-semibold"
                                    >
                                        {Object.entries(dateFilterOptions).map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Statistics */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-5">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">✅</div>
                            <div className="text-sm font-medium opacity-90">
                                Active Users
                            </div>
                            <div className="text-3xl font-bold">
                                {systemStats.total_active_users}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">🆕</div>
                            <div className="text-sm font-medium opacity-90">
                                New Users
                            </div>
                            <div className="text-3xl font-bold">
                                {systemStats.new_users_period}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">🎯</div>
                            <div className="text-sm font-medium opacity-90">
                                Quiz Attempts
                            </div>
                            <div className="text-3xl font-bold">
                                {systemStats.total_quiz_attempts}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">🏁</div>
                            <div className="text-sm font-medium opacity-90">
                                Completed Quizzes
                            </div>
                            <div className="text-3xl font-bold">
                                {systemStats.completed_quizzes}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">❓</div>
                            <div className="text-sm font-medium opacity-90">
                                Questions Created
                            </div>
                            <div className="text-3xl font-bold">
                                {systemStats.questions_created}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* User Activity */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">
                                    User Activity
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {userActivity.map((activity) => (
                                        <div
                                            key={activity.student_id}
                                            className="flex items-center justify-between"
                                        >
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {activity.student?.name ||
                                                        "Unknown User"}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {activity.student?.email ||
                                                        "No email"}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {activity.quiz_count}{" "}
                                                    quizzes
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Last:{" "}
                                                    {new Date(
                                                        activity.last_activity
                                                    ).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {userActivity.length === 0 && (
                                        <div className="text-center text-gray-500 py-8">
                                            No user activity found for the
                                            selected period.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quiz Statistics */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Quiz Performance
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {quizStats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="border-b border-gray-100 pb-3"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="text-sm font-medium text-gray-900">
                                                    Grade {stat.grade_level} -{" "}
                                                    {stat.question_type}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {stat.total_attempts}{" "}
                                                    attempts
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                                                <div>
                                                    Avg Correct:{" "}
                                                    {parseFloat(
                                                        stat.avg_correct
                                                    ).toFixed(1)}
                                                </div>
                                                <div>
                                                    Avg Time:{" "}
                                                    {Math.round(stat.avg_time)}s
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {quizStats.length === 0 && (
                                        <div className="text-center text-gray-500 py-8">
                                            No quiz statistics found for the
                                            selected period.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Daily Activity Chart */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg lg:col-span-2">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Daily Activity
                                </h3>
                            </div>
                            <div className="p-6">
                                {dailyActivity.length > 0 ? (
                                    <div className="space-y-2">
                                        {dailyActivity.map((day) => (
                                            <div
                                                key={day.date}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="text-sm text-gray-600">
                                                    {new Date(
                                                        day.date
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-sm font-medium text-gray-900 mr-2">
                                                        {day.count}
                                                    </div>
                                                    <div
                                                        className="bg-indigo-200 h-2 rounded"
                                                        style={{
                                                            width: `${Math.max(
                                                                10,
                                                                (day.count /
                                                                    Math.max(
                                                                        ...dailyActivity.map(
                                                                            (
                                                                                d
                                                                            ) =>
                                                                                d.count
                                                                        )
                                                                    )) *
                                                                    200
                                                            )}px`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No daily activity data found for the
                                        selected period.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
