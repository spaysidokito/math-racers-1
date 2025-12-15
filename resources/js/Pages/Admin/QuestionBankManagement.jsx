import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function QuestionBankManagement({
    questions,
    creators = [],
    questionStats = {
        total_questions: 0,
        by_grade: {},
        by_type: {},
        by_difficulty: {},
    },
    filters = {},
}) {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

    const { data, setData, get, processing } = useForm({
        search: filters.search || "",
        grade: filters.grade || "all",
        type: filters.type || "all",
        creator: filters.creator || "all",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("admin.question-bank"), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedQuestions(questions?.data?.map((q) => q.id) || []);
        } else {
            setSelectedQuestions([]);
        }
    };

    const handleSelectQuestion = (questionId) => {
        setSelectedQuestions((prev) =>
            prev.includes(questionId)
                ? prev.filter((id) => id !== questionId)
                : [...prev, questionId]
        );
    };

    const handleBulkDelete = () => {
        if (selectedQuestions.length === 0) return;
        setShowBulkDeleteModal(true);
    };

    const confirmBulkDelete = () => {
        router.delete(route("admin.questions.bulk-delete"), {
            data: { question_ids: selectedQuestions },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setSelectedQuestions([]);
                setShowBulkDeleteModal(false);
            },
        });
    };

    const handleExport = () => {
        window.location.href = route("admin.questions.export");
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ❓ Question Bank Management
                </h2>
            }
        >
            <Head title="Question Bank Management" />

            <div className="py-12 bg-gradient-to-br from-gray-50 to-purple-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            ❓ Question Bank
                        </h1>
                        <p className="text-gray-600">Manage all quiz questions</p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">❓</div>
                            <div className="text-sm font-medium opacity-90">
                                Total Questions
                            </div>
                            <div className="text-3xl font-bold">
                                {questionStats.total_questions}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">📚</div>
                            <div className="text-sm font-medium opacity-90">
                                By Grade
                            </div>
                            <div className="text-sm space-y-1 mt-2">
                                {Object.entries(questionStats.by_grade).map(
                                    ([grade, count]) => (
                                        <div key={grade} className="font-semibold">
                                            Grade {grade}: {count}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">🎯</div>
                            <div className="text-sm font-medium opacity-90">
                                By Type
                            </div>
                            <div className="text-sm space-y-1 mt-2">
                                {Object.entries(questionStats.by_type).map(
                                    ([type, count]) => (
                                        <div key={type} className="capitalize font-semibold">
                                            {type}: {count}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden shadow-xl rounded-2xl p-6 text-white transform hover:scale-105 transition-all">
                            <div className="text-4xl mb-2">⚡</div>
                            <div className="text-sm font-medium opacity-90">
                                By Difficulty
                            </div>
                            <div className="text-sm space-y-1 mt-2">
                                {Object.entries(
                                    questionStats.by_difficulty
                                ).map(([difficulty, count]) => (
                                    <div
                                        key={difficulty}
                                        className="capitalize font-semibold"
                                    >
                                        {difficulty}: {count}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Search and Filters */}
                        <div className="p-6 border-b border-gray-200">
                            <form
                                onSubmit={handleSearch}
                                className="flex flex-wrap gap-4 mb-4"
                            >
                                <div className="flex-1 min-w-64">
                                    <input
                                        type="text"
                                        placeholder="Search questions..."
                                        value={data.search}
                                        onChange={(e) =>
                                            setData("search", e.target.value)
                                        }
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={data.grade}
                                        onChange={(e) =>
                                            setData("grade", e.target.value)
                                        }
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="all">All Grades</option>
                                        <option value="1">Grade 1</option>
                                        <option value="2">Grade 2</option>
                                        <option value="3">Grade 3</option>
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="addition">
                                            Addition
                                        </option>
                                        <option value="subtraction">
                                            Subtraction
                                        </option>
                                        <option value="multiplication">
                                            Multiplication
                                        </option>
                                        <option value="division">
                                            Division
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={data.creator}
                                        onChange={(e) =>
                                            setData("creator", e.target.value)
                                        }
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="all">
                                            All Creators
                                        </option>
                                        {creators.map((creator) => (
                                            <option
                                                key={creator.id}
                                                value={creator.id}
                                            >
                                                {creator.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    Search
                                </button>
                            </form>

                            {/* Bulk Actions */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    {selectedQuestions.length > 0 && (
                                        <button
                                            onClick={handleBulkDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Delete Selected (
                                            {selectedQuestions.length})
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={handleExport}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Export CSV
                                </button>
                            </div>
                        </div>

                        {/* Questions Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAll}
                                                checked={
                                                    selectedQuestions.length ===
                                                        (questions?.data
                                                            ?.length || 0) &&
                                                    (questions?.data?.length ||
                                                        0) > 0
                                                }
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Question
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Creator
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {questions?.data?.map((question) => (
                                        <tr
                                            key={question.id}
                                            className={
                                                selectedQuestions.includes(
                                                    question.id
                                                )
                                                    ? "bg-indigo-50"
                                                    : ""
                                            }
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedQuestions.includes(
                                                        question.id
                                                    )}
                                                    onChange={() =>
                                                        handleSelectQuestion(
                                                            question.id
                                                        )
                                                    }
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">
                                                    {question.question_text}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Answer:{" "}
                                                    {question.correct_answer}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {question.image_path ? (
                                                    <div className="flex items-center space-x-2">
                                                        <img
                                                            src={`/storage/${question.image_path}`}
                                                            alt="Question"
                                                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm hover:scale-150 transition-transform cursor-pointer"
                                                            title="Click to view larger"
                                                        />
                                                        <span className="text-xs text-green-600 font-semibold">
                                                            📷
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400">
                                                        No image
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    Grade {question.grade_level}{" "}
                                                    - {question.question_type}
                                                </div>
                                                <div className="text-sm text-gray-500 capitalize">
                                                    {question.difficulty}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {question.creator?.name ||
                                                    "Unknown"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    question.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {questions?.links && questions.links.length > 3 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Showing {questions.from || 0} to{" "}
                                        {questions.to || 0} of{" "}
                                        {questions.total || 0} results
                                    </div>
                                    <div className="flex space-x-1">
                                        {questions.links.map((link, index) =>
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-2 text-sm rounded ${
                                                        link.active
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 text-sm rounded bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bulk Delete Confirmation Modal */}
            {showBulkDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Delete Questions
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete{" "}
                                    {selectedQuestions.length} selected
                                    questions? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    onClick={() =>
                                        setShowBulkDeleteModal(false)
                                    }
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmBulkDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
