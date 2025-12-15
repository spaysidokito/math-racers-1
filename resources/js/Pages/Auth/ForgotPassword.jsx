import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password? 🔑</h2>
                <p className="text-gray-600">
                    No problem! We'll send you a reset link.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    ✅ {status}
                </div>
            )}

            {errors.email && (
                <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">❌</div>
                    <div>{errors.email}</div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">📧 Email Address</label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="your@email.com"
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                    {processing ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        <span>📧 Send Reset Link</span>
                    )}
                </button>
            </form>
        </GuestLayout>
    );
}
