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

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-maroon-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl w-full">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-maroon-200">
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                    
                    {/* Email Field */}
                    <div className="mb-5">
                        <InputLabel 
                            htmlFor="email" 
                            value="Email" 
                            className="text-gray-700 font-medium mb-2"
                        />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password Field */}
                    <div className="mb-5">
                        <InputLabel 
                            htmlFor="password" 
                            value="Password" 
                            className="text-gray-700 font-medium mb-2"
                        />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>


                    {/* Submit Button */}
                    <div className="mb-6">
                        <PrimaryButton 
                            className="w-full bg-maroon-600 hover:bg-maroon-700 text-white justify-center py-3 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </PrimaryButton>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                href={route('register')}
                                className="text-maroon-600 hover:text-maroon-700 font-semibold transition-colors duration-200"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}