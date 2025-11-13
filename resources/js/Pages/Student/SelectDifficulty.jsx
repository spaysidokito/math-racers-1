import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function SelectDifficulty({ auth, grade, topic, difficulties }) {
    const handleDifficultySelect = (difficulty) => {
        router.post(route("student.quiz.start"), {
            grade: grade,
            topic: topic,
            difficulty: difficulty,
        });
    };

    const topicLabels = {
        addition: "Addition",
        subtraction: "Subtraction",
        multiplication: "Multiplication",
        division: "Division",
    };

    const difficultyColors = {
        easy: "bg-green-500 hover:bg-green-600",
        medium: "bg-yellow-500 hover:bg-yellow-600",
        hard: "bg-red-500 hover:bg-red-600",
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Choose Difficulty
                </h2>
            }
        >
            <Head title="Choose Difficulty" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    Choose Your Difficulty
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Grade {grade} - {topicLabels[topic]}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {difficulties.map((difficulty) => (
                                    <div
                                        key={difficulty.value}
                                        className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer"
                                        onClick={() =>
                                            handleDifficultySelect(
                                                difficulty.value
                                            )
                                        }
                                    >
                                        <div className="text-center">
                                            <div
                                                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                                                    difficultyColors[
                                                        difficulty.value
                                                    ]
                                                }`}
                                            >
                                                {difficulty.points}
                                            </div>
                                            <h3 className="text-xl font-semibold mb-2">
                                                {difficulty.label}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {difficulty.description}
                                            </p>
                                            <div className="text-sm text-gray-500">
                                                {difficulty.points} points per
                                                correct answer
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center">
                                <Link
                                    href={route("student.topics", { grade })}
                                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    ← Back to Topics
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
