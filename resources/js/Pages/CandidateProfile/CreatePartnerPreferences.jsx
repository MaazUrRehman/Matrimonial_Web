import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function CreatePartnerPreferences({ }) {
    const { data, setData, processing, errors, post, reset } = useForm({
        preferred_age_min: '',
        preferred_age_max: '',
        preferred_education: '',
        preferred_profession: '',
        preferred_caste: '',
        preferred_marital_status: '',
        preferred_city: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const submit = (e) => {
        e.preventDefault();

        console.log('Submitting PartnerPreferences', data);
        setSnackbar({
            show: true,
            message: 'Partner Preferences saved successfully!',
            type: 'success'
        });
        post(route('candidateProfile.partnerPreferences.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                console.log('PartnerPreferences submission successful');
            },
            onError: (errs) => {
                console.log('PartnerPreferences submission errors', errs);
            },
        });

        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);
    };

    const maritalStatusOptions = [
        { value: '', label: 'Select Marital Status' },
        { value: 'Single', label: 'Single' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
        { value: 'Separated', label: 'Separated' },
    ];

    const educationOptions = [
        { value: '', label: 'Select Education Level' },
        { value: 'Matric', label: 'Matric' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Bachelors', label: 'Bachelor\'s' },
        { value: 'Masters', label: 'Master\'s' },
        { value: 'PhD', label: 'PhD' },
    ];

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };


    return (
        <AuthenticatedLayout>
            {/* SnackBar Component with 1 seconds duration */}
            <SnackBar
                message={snackbar.message}
                type={snackbar.type}
                isVisible={snackbar.show}
                onClose={handleSnackbarClose}
                duration={1000} // `1` seconds
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

                        {/* Partner Preferences Section */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold text-maroon-700 mb-4 pb-2 border-b border-gray-200">
                                Partner Preferences
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <InputLabel
                                        value="Preferred Age Range"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="preferred_age_min"
                                                value={data.preferred_age_min}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('preferred_age_min', e.target.value)}
                                                placeholder="Min"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="preferred_age_max"
                                                value={data.preferred_age_max}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('preferred_age_max', e.target.value)}
                                                placeholder="Max"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="preferred_education"
                                        value="Preferred Education"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="preferred_education"
                                        name="preferred_education"
                                        value={data.preferred_education}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('preferred_education', e.target.value)}
                                    >
                                        {educationOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.preferred_education} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="preferred_profession"
                                        value="Profession Preference"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="preferred_profession"
                                        name="preferred_profession"
                                        value={data.preferred_profession}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('preferred_profession', e.target.value)}
                                        placeholder="e.g., Working, Business"
                                    />
                                    <InputError message={errors.preferred_profession} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="preferred_caste"
                                        value="Caste Preference"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="preferred_caste"
                                        name="preferred_caste"
                                        value={data.preferred_caste}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('preferred_caste', e.target.value)}
                                        placeholder="Preferred caste"
                                    />
                                    <InputError message={errors.preferred_caste} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="preferred_marital_status"
                                        value="Marital Status Preference"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="preferred_marital_status"
                                        name="preferred_marital_status"
                                        value={data.preferred_marital_status}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('preferred_marital_status', e.target.value)}
                                    >
                                        {maritalStatusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.preferred_marital_status} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="preferred_city"
                                        value="City Preference"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="preferred_city"
                                        name="preferred_city"
                                        value={data.preferred_city}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('preferred_city', e.target.value)}
                                        placeholder="Preferred city"
                                    />
                                    <InputError message={errors.preferred_city} className="mt-1" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <PrimaryButton
                                className="bg-maroon-600 hover:bg-maroon-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Profile'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}