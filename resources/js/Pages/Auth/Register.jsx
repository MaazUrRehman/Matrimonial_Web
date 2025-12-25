import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        
            <div className="min-h-screen bg-maroon-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Register yourself
                        </h1>
                        <p className="text-maroon-200">
                            & Join us to find your perfect match
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                        
                        {/* Name Field */}
                        <div className="mb-5">
                            <InputLabel 
                                htmlFor="name" 
                                value="Full Name" 
                                className="text-gray-700 font-medium mb-2"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Enter your full name"
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

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
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                placeholder="Create a password"
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-6">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="text-gray-700 font-medium mb-2"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                placeholder="Confirm your password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-1" />
                        </div>

                        {/* Submit Button */}
                        <div className="mb-6">
                            <PrimaryButton 
                                className="w-full bg-maroon-600 justify-center hover:bg-maroon-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </PrimaryButton>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-maroon-600 hover:text-maroon-700 font-semibold transition-colors duration-200"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
    );
}