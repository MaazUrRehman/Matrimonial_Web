import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function CreatePersonalInfo({ }) {
    const { data, setData, processing, errors, post, reset } = useForm({
        full_name: '',
        age: '',
        date_of_birth: '',
        height_feet: '',
        height_inches: '',
        religion: '',
        sect: '',
        caste: '',
        marital_status: '',
        city: '',
        country: '',

    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const submit = (e) => {
        e.preventDefault();

        console.log('Submitting PersonalInformation', data);
        setSnackbar({
            show: true,
            message: 'Personal Information saved successfully!',
            type: 'success'
        });

        post(route('candidateProfile.personalInformation.store'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                console.log('PersonalInformation submission successful');
            },
            onError: (errs) => {
                console.log('PersonalInformation submission errors', errs);
            },
        });

        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);
    };

    const maritalStatusOptions = [
        { value: '', label: 'Select Marital Status' },
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' },
        { value: 'Separated', label: 'Separated' },
    ];

    const genderOptions = [
        { value: '', label: 'Select Gender' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
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

                        {/* Personal Information Section */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold text-maroon-700 mb-4 pb-2 border-b border-gray-200">
                                Personal Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="full_name"
                                        value="Full Name *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="full_name"
                                        name="full_name"
                                        value={data.full_name}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                    <InputError message={errors.full_name} className="mt-1" />
                                </div>

                                {/* Age */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="age"
                                        value="Age"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="age"
                                        type="number"
                                        name="age"
                                        value={data.age}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('age', e.target.value)}
                                        placeholder="Your age"
                                    />
                                    <InputError message={errors.age} className="mt-1" />
                                </div>

                                {/* Date of Birth */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="date_of_birth"
                                        value="Date of Birth"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="date_of_birth"
                                        type="date"
                                        name="date_of_birth"
                                        value={data.date_of_birth}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                    />
                                    <InputError message={errors.date_of_birth} className="mt-1" />
                                </div>

                                {/* Gender */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="gender"
                                        value="Gender *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={data.gender}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('gender', e.target.value)}
                                        required
                                    >
                                        {genderOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.gender} className="mt-1" />
                                </div>


                                {/* Height */}
                                <div className="mb-2">
                                    <InputLabel
                                        value="Height"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="height_feet"
                                                value={data.height_feet}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('height_feet', e.target.value)}
                                                placeholder="Feet"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="height_inches"
                                                value={data.height_inches}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('height_inches', e.target.value)}
                                                placeholder="Inches"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Religion & Sect */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="religion"
                                        value="Religion"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="religion"
                                        name="religion"
                                        value={data.religion}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('religion', e.target.value)}
                                        placeholder="e.g., Islam"
                                    />
                                    <InputError message={errors.religion} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="sect"
                                        value="Sect"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="sect"
                                        name="sect"
                                        value={data.sect}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('sect', e.target.value)}
                                        placeholder="e.g., Sunni - Hanafi"
                                    />
                                    <InputError message={errors.sect} className="mt-1" />
                                </div>

                                {/* Caste & Marital Status */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="caste"
                                        value="Caste / Biradari"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="caste"
                                        name="caste"
                                        value={data.caste}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('caste', e.target.value)}
                                        placeholder="Your caste or biradari"
                                    />
                                    <InputError message={errors.caste} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="marital_status"
                                        value="Marital Status *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="marital_status"
                                        name="marital_status"
                                        value={data.marital_status}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('marital_status', e.target.value)}
                                        required
                                    >
                                        {maritalStatusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.marital_status} className="mt-1" />
                                </div>

                                {/* City & Country */}
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="city"
                                        value="City *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="city"
                                        name="city"
                                        value={data.city}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('city', e.target.value)}
                                        required
                                        placeholder="e.g., Lahore"
                                    />
                                    <InputError message={errors.city} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="country"
                                        value="Country *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="country"
                                        name="country"
                                        value={data.country}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('country', e.target.value)}
                                        required
                                        placeholder="e.g., Pakistan"
                                    />
                                    <InputError message={errors.country} className="mt-1" />
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