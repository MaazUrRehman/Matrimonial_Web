import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function CreateFamilyBackground({ }) {
    const { data, setData, processing, errors, post, reset } = useForm({
        father_name: '',
        mother_name: '',
        father_profession: '',
        mother_profession: '',
        brothers_count: '',
        sisters_count: '',
        brothers_married: '',
        sisters_married: '',
        social_status: '',
        family_residence: '',
        financial_status: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });


    const submit = (e) => {
        e.preventDefault();

        console.log('Submitting FamilyBackground', data);
        setSnackbar({
            show: true,
            message: 'Family Background saved successfully!',
            type: 'success'
        });
        post(route('candidateProfile.familyBackground.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                console.log('FamilyBackground submission successful');
            },

            onError: (errs) => {
                console.log('FamilyBackground submission errors', errs);
            },
        });
        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);
    };

    const socialStatusOptions = [
        { value: '', label: 'Select Social Status' },
        { value: 'High Class', label: 'High Class' },
        { value: 'Upper Middle', label: 'Upper Middle Class' },
        { value: 'Middle Class', label: 'Middle Class' },
    ];

    const financialStatusOptions = [
        { value: '', label: 'Select Financial Status' },
        { value: 'Well Settled', label: 'Well Settled' },
        { value: 'Upper Middle', label: 'Upper Middle Class' },
        { value: 'Middle Class', label: 'Middle Class' },
    ];

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };


    return (
        <AuthenticatedLayout>

            {/* SnackBar Component with 4 seconds duration */}
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


                        {/* Family Background Section */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold text-maroon-700 mb-4 pb-2 border-b border-gray-200">
                                Family Background
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="father_name"
                                        value="Father's Name"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="father_name"
                                        name="father_name"
                                        value={data.father_name}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('father_name', e.target.value)}
                                        placeholder="Enter Father's Name"
                                    />
                                    <InputError message={errors.father_name} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="mother_name"
                                        value="Mother's Name"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="mother_name"
                                        name="mother_name"
                                        value={data.mother_name}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('mother_name', e.target.value)}
                                        placeholder="Enter Mother's Name"
                                    />
                                    <InputError message={errors.mother_name} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="father_profession"
                                        value="Father's Profession"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="father_profession"
                                        name="father_profession"
                                        value={data.father_profession}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('father_profession', e.target.value)}
                                        placeholder="e.g., Retired Government Officer"
                                    />
                                    <InputError message={errors.father_profession} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="mother_profession"
                                        value="Mother's Profession"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="mother_profession"
                                        name="mother_profession"
                                        value={data.mother_profession}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('mother_profession', e.target.value)}
                                        placeholder="e.g., Housewife, Teacher"
                                    />
                                    <InputError message={errors.mother_profession} className="mt-1" />
                                </div>

                                {/* Brothers and Sisters */}
                                <div className="mb-2">
                                    <InputLabel
                                        value="Brothers"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="brothers_count"
                                                value={data.brothers_count}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('brothers_count', e.target.value)}
                                                placeholder="Total"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="brothers_married"
                                                value={data.brothers_married}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('brothers_married', e.target.value)}
                                                placeholder="Married"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        value="Sisters"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="sisters_count"
                                                value={data.sisters_count}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('sisters_count', e.target.value)}
                                                placeholder="Total"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <TextInput
                                                type="number"
                                                name="sisters_married"
                                                value={data.sisters_married}
                                                className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                                onChange={(e) => setData('sisters_married', e.target.value)}
                                                placeholder="Married"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="social_status"
                                        value="Social Status"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="social_status"
                                        name="social_status"
                                        value={data.social_status}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('social_status', e.target.value)}
                                    >
                                        {socialStatusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.social_status} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="family_residence"
                                        value="Family Residence"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="family_residence"
                                        name="family_residence"
                                        value={data.family_residence}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('family_residence', e.target.value)}
                                        placeholder="City and area"
                                    />
                                    <InputError message={errors.family_residence} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="financial_status"
                                        value="Financial Status"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="financial_status"
                                        name="financial_status"
                                        value={data.financial_status}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('financial_status', e.target.value)}
                                    >
                                        {financialStatusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.financial_status} className="mt-1" />
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