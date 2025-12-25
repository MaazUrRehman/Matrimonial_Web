import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function CreateContactInformation({ }) {
    const { data, setData, processing, errors, post, reset } = useForm({
        contact_person: '',
        whatsapp_number: '',
        additional_details: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const submit = (e) => {
        e.preventDefault();

        console.log('Submitting Contact Information', data);
        setSnackbar({
            show: true,
            message: 'Contact information saved successfully!',
            type: 'success'
        });
        post(route('candidateProfile.contactInfo.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                console.log('Contact Information submission successful');
            },
            onError: (errs) => {
                console.log('Contact Information submission errors', errs);
            },
        });
        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);
    };


    const contactPersonOptions = [
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

                        {/* Contact Information Section */}
                        <div className="mb-3">
                            <h2 className="text-xl font-bold text-maroon-700 mb-4 pb-2 border-b border-gray-200">
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="contact_person"
                                        value="Contact Person *"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <select
                                        id="contact_person"
                                        name="contact_person"
                                        value={data.contact_person}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('contact_person', e.target.value)}
                                        required
                                    >
                                        {contactPersonOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.contact_person} className="mt-1" />
                                </div>

                                <div className="mb-2">
                                    <InputLabel
                                        htmlFor="whatsapp_number"
                                        value="WhatsApp Number"
                                        className="text-gray-700 font-medium mb-2"
                                    />
                                    <TextInput
                                        id="whatsapp_number"
                                        name="whatsapp_number"
                                        value={data.whatsapp_number}
                                        className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                                        placeholder="+92 XXX XXXXXXX"
                                    />
                                    <InputError message={errors.whatsapp_number} className="mt-1" />
                                </div>
                            </div>

                            <div className="mb-2">
                                <InputLabel
                                    htmlFor="additional_details"
                                    value="Additional Details"
                                    className="text-gray-700 font-medium mb-2"
                                />
                                <textarea
                                    id="additional_details"
                                    name="additional_details"
                                    value={data.additional_details}
                                    rows="4"
                                    className="w-full border-gray-300 focus:border-maroon-500 focus:ring-maroon-500 rounded-lg"
                                    onChange={(e) => setData('additional_details', e.target.value)}
                                    placeholder="Any additional information you'd like to share..."
                                />
                                <InputError message={errors.additional_details} className="mt-1" />
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