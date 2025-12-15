import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    TrophyIcon,
    ClockIcon,
    AcademicCapIcon,
    ChartBarIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function StudentDetail({
    student,
    quizzesByTopic,
    progressByTopic,
    competencyAnalysis,
    activityTimeline,
}) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getPerformanceColor = (accuracy) => {
        if (accuracy >= 80) return "text-green-600 bg-green-100";
        if (accuracy >= 60) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const getMasteryColor = (level) => {
        if (level >= 90) return "text-purple-600 bg-purple-100";
        if (level >= 80) return "text-green-600 bg-green-100";
        if (level >= 70) return "text-blue-600 bg-blue-100";
        if (level >= 60) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case "improving":
                return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
            case "declining":
                return (
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                );
            default:
                return <ChartBarIcon className="h-5 w-5 text-gray-500" />;
        }
    };

    const getTopicEmoji = (topic) => {
        const emojis = {
            addition: "➕",
            subtraction: "➖",
            multiplication: "✖️",
            division: "➗",
        };
        return emojis[topic] || "📊";
    };

    const topics = ["addition", "subtraction", "multiplication", "division"];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route("teacher.student-performance")}
                            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white p-3 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                        >
                            <ArrowLeftIcon className="h-5 w-5" />
                        </Link>
                        <div>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                👤 {student.name} - Grade {student.grade_level}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Detailed Performance Analytics
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`${student.name} - Student Details`} />

            <div className="py-12 bg-gradient-to-br from-gray-50 to-indigo-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📊 Student Performance Report
                        </h1>
                        <p className="text-gray-600">Comprehensive analytics and insights</p>
                    </div>

                    {/* Student Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="flex items-center">
                                <div className="text-5xl mr-4">🏆</div>
                                <div>
                                    <p className="text-sm font-medium opacity-90">
                                        Total Points
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {student.total_points}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="flex items-center">
                                <div className="text-5xl mr-4">🎖️</div>
                                <div>
                                    <p className="text-sm font-medium opacity-90">
                                        Total Badges
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {student.total_badges}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="flex items-center">
                                <div className="text-5xl mr-4">🎯</div>
                                <div>
                                    <p className="text-sm font-medium opacity-90">
                                        Avg Accuracy
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {Object.values(quizzesByTopic).length >
                                        0
                                            ? (
                                                  Object.values(
                                                      quizzesByTopic
                                                  ).reduce(
                                                      (sum, topic) =>
                                                          sum +
                                                          topic.average_accuracy,
                                                      0
                                                  ) /
                                                  Object.values(quizzesByTopic)
                                                      .length
                                              ).toFixed(1)
                                            : 0}
                                        %
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="flex items-center">
                                <div className="text-5xl mr-4">📝</div>
                                <div>
                                    <p className="text-sm font-medium opacity-90">
                                        Total Quizzes
                                    </p>
                                    <p className="text-3xl font-bold">
                                        {Object.values(quizzesByTopic).reduce(
                                            (sum, topic) =>
                                                sum + topic.total_attempts,
                                            0
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Topic Performance */}
                    <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-indigo-100">
                        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-2">📚</span>
                                Topic Performance Overview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {topics.map((topic) => {
                                    const quizData = quizzesByTopic[topic];
                                    const progressData = progressByTopic[topic];

                                    if (!quizData && !progressData) return null;

                                    return (
                                        <div
                                            key={topic}
                                            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-lg font-bold text-gray-900 capitalize flex items-center">
                                                    <span className="text-2xl mr-2">{getTopicEmoji(topic)}</span>
                                                    {topic}
                                                </h4>
                                                {progressData && (
                                                    <span
                                                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getMasteryColor(
                                                            progressData.mastery_level
                                                        )}`}
                                                    >
                                                        {
                                                            progressData.mastery_category
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-600 mb-1">
                                                        Total Points
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {progressData?.total_points ||
                                                            0}
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-600 mb-1">
                                                        Mastery Level
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {progressData?.mastery_level?.toFixed(
                                                            1
                                                        ) || 0}
                                                        %
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-600 mb-1">
                                                        Quiz Attempts
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {quizData?.total_attempts ||
                                                            0}
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-lg">
                                                    <p className="text-xs text-gray-600 mb-1">
                                                        Avg Accuracy
                                                    </p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {quizData?.average_accuracy?.toFixed(
                                                            1
                                                        ) || 0}
                                                        %
                                                    </p>
                                                </div>
                                            </div>

                                            {progressData?.badges_earned &&
                                                progressData.badges_earned
                                                    .length > 0 && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                            <span className="mr-1">🏅</span>
                                                            Badges Earned
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {progressData.badges_earned.map(
                                                                (
                                                                    badge,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="inline-flex items-center px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-md"
                                                                    >
                                                                        <TrophyIcon className="h-3 w-3 mr-1" />
                                                                        {
                                                                            badge.type
                                                                        }
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Competency Analysis */}
                    {Object.keys(competencyAnalysis).length > 0 && (
                        <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-green-100">
                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="mr-2">🎓</span>
                                    Competency Analysis & Recommendations
                                </h3>
                                <div className="space-y-6">
                                    {Object.entries(competencyAnalysis).map(
                                        ([topic, analysis]) => (
                                            <div
                                                key={topic}
                                                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-lg font-bold text-gray-900 capitalize flex items-center">
                                                        <span className="text-2xl mr-2">{getTopicEmoji(topic)}</span>
                                                        {topic}
                                                    </h4>
                                                    <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                                                        {getTrendIcon(
                                                            analysis.improvement_trend
                                                        )}
                                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                                            {
                                                                analysis.improvement_trend
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
                                                        <p className="text-xs text-gray-600 mb-1">
                                                            Overall Accuracy
                                                        </p>
                                                        <p className="text-2xl font-bold text-gray-900">
                                                            {
                                                                analysis.overall_accuracy
                                                            }
                                                            %
                                                        </p>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                                                        <p className="text-xs text-gray-600 mb-1">
                                                            Recent Accuracy
                                                        </p>
                                                        <p className="text-2xl font-bold text-gray-900">
                                                            {
                                                                analysis.recent_accuracy
                                                            }
                                                            %
                                                        </p>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
                                                        <p className="text-xs text-gray-600 mb-1">
                                                            Total Attempts
                                                        </p>
                                                        <p className="text-2xl font-bold text-gray-900">
                                                            {
                                                                analysis.total_attempts
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg">
                                                        <p className="text-xs text-gray-600 mb-1">
                                                            Mastery Level
                                                        </p>
                                                        <span
                                                            className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getMasteryColor(
                                                                analysis.overall_accuracy
                                                            )}`}
                                                        >
                                                            {
                                                                analysis.mastery_level
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                {analysis.recommendations &&
                                                    analysis.recommendations
                                                        .length > 0 && (
                                                        <div className="mt-4 pt-4 border-t border-gray-200 bg-blue-50 p-4 rounded-lg">
                                                            <p className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                                                                <span className="mr-2">💡</span>
                                                                Recommendations:
                                                            </p>
                                                            <ul className="space-y-2">
                                                                {analysis.recommendations.map(
                                                                    (
                                                                        rec,
                                                                        index
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex items-start text-sm text-gray-700"
                                                                        >
                                                                            <span className="mr-2 text-blue-600 font-bold">•</span>
                                                                            {
                                                                                rec
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Activity Timeline */}
                    <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-purple-100">
                        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="mr-2">⏱️</span>
                                Recent Activity Timeline
                            </h3>
                            {activityTimeline.length > 0 ? (
                                <div className="flow-root">
                                    <ul className="-mb-8">
                                        {activityTimeline.map(
                                            (activity, index) => (
                                                <li key={index}>
                                                    <div className="relative pb-8">
                                                        {index !==
                                                            activityTimeline.length -
                                                                1 && (
                                                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gradient-to-b from-purple-300 to-pink-300" />
                                                        )}
                                                        <div className="relative flex space-x-3">
                                                            <div>
                                                                <span
                                                                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white shadow-lg ${getPerformanceColor(
                                                                        activity.accuracy
                                                                    )
                                                                        .replace(
                                                                            "text-",
                                                                            "bg-"
                                                                        )
                                                                        .replace(
                                                                            "-600",
                                                                            "-500"
                                                                        )}`}
                                                                >
                                                                    <AcademicCapIcon className="h-5 w-5 text-white" />
                                                                </span>
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <p className="text-sm text-gray-700">
                                                                            Completed{" "}
                                                                            <span className="font-bold text-gray-900 capitalize">
                                                                                {getTopicEmoji(activity.topic)} {
                                                                                    activity.topic
                                                                                }
                                                                            </span>{" "}
                                                                            quiz for Grade {activity.grade}
                                                                        </p>
                                                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                                                            {formatDate(
                                                                                activity.date
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                                                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-2 rounded-lg">
                                                                            <p className="text-xs text-gray-600">Score</p>
                                                                            <p className="text-sm font-bold text-gray-900">
                                                                                {
                                                                                    activity.score
                                                                                }{" "}
                                                                                pts
                                                                            </p>
                                                                        </div>
                                                                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2 rounded-lg">
                                                                            <p className="text-xs text-gray-600">Accuracy</p>
                                                                            <p className="text-sm font-bold text-gray-900">
                                                                                {activity.accuracy.toFixed(
                                                                                    1
                                                                                )}
                                                                                %
                                                                            </p>
                                                                        </div>
                                                                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-2 rounded-lg">
                                                                            <p className="text-xs text-gray-600">Questions</p>
                                                                            <p className="text-sm font-bold text-gray-900">
                                                                                {
                                                                                    activity.questions
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 rounded-lg">
                                                                            <p className="text-xs text-gray-600">Time</p>
                                                                            <p className="text-sm font-bold text-gray-900">
                                                                                {Math.floor(
                                                                                    activity.time_taken /
                                                                                        60
                                                                                )}
                                                                                :
                                                                                {(
                                                                                    activity.time_taken %
                                                                                    60
                                                                                )
                                                                                    .toString()
                                                                                    .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                    )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-xl">
                                    <div className="text-6xl mb-4">📭</div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        No recent activity
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        This student hasn't completed any
                                        quizzes recently.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
