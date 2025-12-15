import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
        grade_level: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Join the Race! 🚀</h2>
                <p className="text-gray-600">Create your account and start learning</p>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">❌</div>
                    <div className="font-bold mb-1">Registration Error</div>
                    <div className="text-left space-y-1">
                        {Object.values(errors).map((error, index) => (
                            <div key={index}>• {error}</div>
                        ))}
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="👤 Full Name" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Enter your name"
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="📧 Email" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="🔒 Password" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="🔒 Confirm Password"
                        className="text-gray-700 font-semibold"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        placeholder="••••••••"
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="role" value="🎭 I am a..." className="text-gray-700 font-semibold" />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        onChange={(e) => setData("role", e.target.value)}
                        required
                    >
                        <option value="student">🎓 Student</option>
                        <option value="teacher">👨‍🏫 Teacher</option>
                        <option value="admin">⚙️ Admin</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                {data.role === "student" && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
                        <InputLabel htmlFor="grade_level" value="📚 Grade Level" className="text-gray-700 font-semibold" />

                        <select
                            id="grade_level"
                            name="grade_level"
                            value={data.grade_level}
                            className="mt-2 block w-full border-2 border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-lg px-4 py-3 text-lg transition-all"
                            onChange={(e) =>
                                setData("grade_level", e.target.value)
                            }
                            required
                        >
                            <option value="">Select your grade</option>
                            <option value="1">🌟 Grade 1</option>
                            <option value="2">⭐ Grade 2</option>
                            <option value="3">✨ Grade 3</option>
                        </select>

                        <InputError
                            message={errors.grade_level}
                            className="mt-2"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-6"
                >
                    {processing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating account...
                        </span>
                    ) : (
                        <span>🚀 Get Started Free!</span>
                    )}
                </button>

                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href={route("login")}
                            className="text-indigo-600 hover:text-indigo-800 font-bold underline"
                        >
                            Log in here! 🏁
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
