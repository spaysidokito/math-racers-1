import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login.store'), {
            onFinish: () => reset('password'),
            onError: (errors) => {
                console.log('Login errors:', errors);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back! 🎉</h2>
                <p className="text-gray-600">Ready to race and learn?</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    ✅ {status}
                </div>
            )}

            {(errors.email || errors.password) && (
                <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">❌</div>
                    <div className="font-bold mb-1">Login Failed</div>
                    <div>{errors.email || errors.password || 'Invalid credentials. Please try again.'}</div>
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="📧 Email" className="text-gray-700 font-semibold" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2 block w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-3 text-lg transition-all"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="your@email.com"
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
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ms-2 text-sm text-gray-600 font-medium">
                            Remember me
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium underline"
                        >
                            Forgot password?
                        </Link>
                    )}
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
                            Logging in...
                        </span>
                    ) : (
                        <span>🏁 Start Racing!</span>
                    )}
                </button>

                <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="text-indigo-600 hover:text-indigo-800 font-bold underline"
                        >
                            Sign up free! 🚀
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
