import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Create({
    auth,
    questionTypes,
    difficulties,
    gradeLevels,
    depedCompetencies,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        question_text: "",
        image: null,
        question_type: "",
        grade_level: "",
        difficulty: "",
        correct_answer: "",
        options: ["", "", "", ""],
        deped_competency: "",
    });

    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [availableCompetencies, setAvailableCompetencies] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const handleGradeChange = (gradeLevel) => {
        setData("grade_level", gradeLevel);
        updateCompetencies(gradeLevel, data.question_type);
    };

    const handleTypeChange = (questionType) => {
        setData("question_type", questionType);
        updateCompetencies(data.grade_level, questionType);
    };

    const updateCompetencies = (gradeLevel, questionType) => {
        if (
            gradeLevel &&
            questionType &&
            depedCompetencies[gradeLevel] &&
            depedCompetencies[gradeLevel][questionType]
        ) {
            setAvailableCompetencies(
                depedCompetencies[gradeLevel][questionType]
            );
        } else {
            setAvailableCompetencies([]);
        }
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData("options", newOptions);
    };

    const toggleMultipleChoice = () => {
        setIsMultipleChoice(!isMultipleChoice);
        if (!isMultipleChoice) {
            setData("options", ["", "", "", ""]);
        } else {
            setData("options", []);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("image", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData("image", null);
        setImagePreview(null);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("question_text", data.question_text);
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("question_type", data.question_type);
        formData.append("grade_level", data.grade_level);
        formData.append("difficulty", data.difficulty);
        formData.append("correct_answer", data.correct_answer);
        formData.append("deped_competency", data.deped_competency);

        if (isMultipleChoice) {
            const filteredOptions = data.options.filter(
                (option) => option.trim() !== ""
            );
            filteredOptions.forEach((option, index) => {
                formData.append(`options[${index}]`, option);
            });
        }

        post(route("teacher.questions.store"), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create New Question
                    </h2>
                    <Link href={route("teacher.questions.index")}>
                        <SecondaryButton>Back to Questions</SecondaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Create Question" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Question Text */}
                                <div>
                                    <InputLabel
                                        htmlFor="question_text"
                                        value="Question Text"
                                    />
                                    <textarea
                                        id="question_text"
                                        value={data.question_text}
                                        onChange={(e) =>
                                            setData(
                                                "question_text",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="3"
                                        placeholder="Enter the math question..."
                                        required
                                    />
                                    <InputError
                                        message={errors.question_text}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <InputLabel
                                        htmlFor="image"
                                        value="Question Image (Optional)"
                                    />
                                    <div className="mt-2">
                                        {imagePreview ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="max-w-md max-h-64 rounded-lg border-2 border-gray-300 shadow-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <label
                                                htmlFor="image"
                                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-12 h-12 mb-3 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 5MB
                                                    </p>
                                                </div>
                                                <input
                                                    id="image"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        )}
                                    </div>
                                    <InputError
                                        message={errors.image}
                                        className="mt-2"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        📸 Add an image to make the question more engaging and visual for students!
                                    </p>
                                </div>

                                {/* Grade Level and Question Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="grade_level"
                                            value="Grade Level"
                                        />
                                        <select
                                            id="grade_level"
                                            value={data.grade_level}
                                            onChange={(e) =>
                                                handleGradeChange(
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">
                                                Select Grade Level
                                            </option>
                                            {gradeLevels.map((grade) => (
                                                <option
                                                    key={grade.value}
                                                    value={grade.value}
                                                >
                                                    {grade.label}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.grade_level}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="question_type"
                                            value="Question Type"
                                        />
                                        <select
                                            id="question_type"
                                            value={data.question_type}
                                            onChange={(e) =>
                                                handleTypeChange(e.target.value)
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">
                                                Select Question Type
                                            </option>
                                            {questionTypes.map((type) => (
                                                <option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label} ({type.symbol})
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.question_type}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* Difficulty */}
                                <div>
                                    <InputLabel
                                        htmlFor="difficulty"
                                        value="Difficulty Level"
                                    />
                                    <select
                                        id="difficulty"
                                        value={data.difficulty}
                                        onChange={(e) =>
                                            setData(
                                                "difficulty",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    >
                                        <option value="">
                                            Select Difficulty
                                        </option>
                                        {difficulties.map((difficulty) => (
                                            <option
                                                key={difficulty.value}
                                                value={difficulty.value}
                                            >
                                                {difficulty.label} (
                                                {difficulty.points} points)
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.difficulty}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Correct Answer */}
                                <div>
                                    <InputLabel
                                        htmlFor="correct_answer"
                                        value="Correct Answer"
                                    />
                                    <TextInput
                                        id="correct_answer"
                                        value={data.correct_answer}
                                        onChange={(e) =>
                                            setData(
                                                "correct_answer",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full"
                                        placeholder="Enter the correct answer..."
                                        required
                                    />
                                    <InputError
                                        message={errors.correct_answer}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Multiple Choice Options */}
                                <div>
                                    <div className="flex items-center mb-3">
                                        <input
                                            type="checkbox"
                                            id="multiple_choice"
                                            checked={isMultipleChoice}
                                            onChange={toggleMultipleChoice}
                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        <label
                                            htmlFor="multiple_choice"
                                            className="ml-2 text-sm text-gray-700"
                                        >
                                            Make this a multiple choice question
                                        </label>
                                    </div>

                                    {isMultipleChoice && (
                                        <div className="space-y-3">
                                            <InputLabel value="Answer Options (include the correct answer as one of the options)" />
                                            {data.options.map(
                                                (option, index) => (
                                                    <div key={index}>
                                                        <TextInput
                                                            value={option}
                                                            onChange={(e) =>
                                                                handleOptionChange(
                                                                    index,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block w-full"
                                                            placeholder={`Option ${
                                                                index + 1
                                                            }`}
                                                        />
                                                    </div>
                                                )
                                            )}
                                            <InputError
                                                message={errors.options}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* DepEd Competency */}
                                <div>
                                    <InputLabel
                                        htmlFor="deped_competency"
                                        value="DepEd Competency"
                                    />
                                    {availableCompetencies.length > 0 ? (
                                        <select
                                            id="deped_competency"
                                            value={data.deped_competency}
                                            onChange={(e) =>
                                                setData(
                                                    "deped_competency",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">
                                                Select Competency
                                            </option>
                                            {availableCompetencies.map(
                                                (competency, index) => (
                                                    <option
                                                        key={index}
                                                        value={competency}
                                                    >
                                                        {competency}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    ) : (
                                        <TextInput
                                            id="deped_competency"
                                            value={data.deped_competency}
                                            onChange={(e) =>
                                                setData(
                                                    "deped_competency",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            placeholder="Enter DepEd competency..."
                                            required
                                        />
                                    )}
                                    <InputError
                                        message={errors.deped_competency}
                                        className="mt-2"
                                    />
                                    {data.grade_level &&
                                        data.question_type &&
                                        availableCompetencies.length === 0 && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                No predefined competencies
                                                available. Please enter
                                                manually.
                                            </p>
                                        )}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex items-center justify-end space-x-3">
                                    <Link
                                        href={route("teacher.questions.index")}
                                    >
                                        <SecondaryButton type="button">
                                            Cancel
                                        </SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing
                                            ? "Creating..."
                                            : "Create Question"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
