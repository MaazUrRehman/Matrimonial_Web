import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function CreateEducationAndProfession({ }) {
    const { data, setData, processing, errors, post, reset } = useForm({
        education_level: '',
        occupation: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });


    const submit = (e) => {
        e.preventDefault();

        console.log('Submitting EducationAndProfession', data);
        setSnackbar({
            show: true,
            message: 'Education and Profession saved successfully!',
            type: 'success'
        });
        post(route('candidateProfile.educationAndProfession.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                console.log('EducationAndProfession submission successful');
            },
            onError: (errs) => {
                console.log('EducationAndProfession submission errors', errs);
            },
        });

        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);

    };


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

                        {/* Education & Profession Section */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold text-maroon-700 mb-4 pb-2 border-b border-gray-200">
                                Education & Profession
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="education_level"
                                        value="Education Level *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="education_level"
                                        name="education_level"
                                        value={data.education_level}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('education_level', e.target.value)}
                                        required
                                    >
                                        {educationOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.education_level} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="occupation"
                                        value="Occupation / Job Title *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="occupation"
                                        name="occupation"
                                        value={data.occupation}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('occupation', e.target.value)}
                                        required
                                        placeholder="Your profession"
                                    />
                                    <InputError message={errors.occupation} className="mt-1" />
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