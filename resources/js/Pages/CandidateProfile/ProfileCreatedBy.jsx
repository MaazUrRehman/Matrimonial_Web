import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function ProfileCreatedBy() {
    const { data, setData, processing, errors } = useForm({
        created_by: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const submit = (e) => {
        e.preventDefault();
        console.log('Submitting ProfileCreatedBy', data);
        setSnackbar({
            show: true,
            message: 'Profile information saved successfully!',
            type: 'success'
        });

        router.post(route('candidateProfile.profileCreatedBy.store'), data, {
            preserveScroll: true,
            preserveState: true,
        });

        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);
    };

    const createdByOptions = [
        { value: '', label: 'Select Creator' },
        { value: 'Self', label: 'Self' },
        { value: 'Parent', label: 'Parent' },
        { value: 'Siblings', label: 'Siblings' },
        { value: 'Other Relative', label: 'Other Relative' },
        { value: 'Friend', label: 'Friend' },
    ];

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile Created By" />

            {/* SnackBar Component with 4 seconds duration */}
            <SnackBar
                message={snackbar.message}
                type={snackbar.type}
                isVisible={snackbar.show}
                onClose={handleSnackbarClose}
                duration={1000} 
            />

            <div className="py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-maroon-700 mb-2">
                            Complete Your Profile
                        </h1>
                        <p className="text-gray-600">
                            Help us find your perfect match by providing detailed information
                        </p>
                    </div>

                    <form onSubmit={submit} className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                        {/* Personal Information Section */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold text-maroon-700 mb-4 pb-2 border-b border-gray-200">
                                Created by
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Created by */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="created_by"
                                        value="Created by *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="created_by"
                                        name="created_by"
                                        value={data.created_by}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg shadow-sm"
                                        onChange={(e) => setData('created_by', e.target.value)}
                                        required
                                    >
                                        {createdByOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.created_by} className="mt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <PrimaryButton
                                className="bg-maroon-600 hover:bg-maroon-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 shadow-md"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save & Continue'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}