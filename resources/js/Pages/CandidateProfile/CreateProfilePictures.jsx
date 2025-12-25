import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SnackBar from '@/Components/SnackBar';
import { useState } from 'react';

export default function CreateProfilePictures({ }) {
    const { data, setData, processing, errors, post, reset } = useForm({
        profile_pic: '',
        picture_half_view: '',
        picture_full_view: '',
        picture_left_view: '',
        picture_right_view: '',
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (data.picture_half_view) {
            formData.append('picture_half_view', data.picture_half_view);
        }
        if (data.picture_full_view) {
            formData.append('picture_full_view', data.picture_full_view);
        }
        if (data.picture_left_view) {
            formData.append('picture_left_view', data.picture_left_view);
        }
        if (data.picture_right_view) {
            formData.append('picture_right_view', data.picture_right_view);
        }

        console.log('Submitting ProfilePictures', data);

        setSnackbar({
            show: true,
            message: 'Profile Pictures saved successfully!',
            type: 'success'
        });

        router.post(route('candidateProfile.profilePictures.store'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });

        setTimeout(() => {
            router.visit(route('candidateProfile.nextStep'));
        }, 2000);
    };

    const handleFileChange = (fieldName, file) => {
        setData(fieldName, file);
    };

    const removeFile = (fieldName) => {
        setData(fieldName, '');
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, show: false }));
    };


    const FileInputField = ({ label, fieldName, description }) => (
        <div className="mb-6">
            <InputLabel
                htmlFor={fieldName}
                value={label}
                className="text-gray-700 font-medium mb-3"
            />
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <div className="flex items-center justify-between w-full p-3 border-2 border-gray-300 rounded-lg bg-white hover:border-maroon-400 transition-all duration-200">
                        <span className="text-sm text-gray-600 truncate">
                            {data[fieldName] ? data[fieldName].name : `No ${label.toLowerCase()} selected`}
                        </span>
                        <label htmlFor={fieldName} className="ml-3">
                            <span className="bg-maroon-600 hover:bg-maroon-700 text-white py-2 px-4 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200">
                                Choose File
                            </span>
                            <input
                                id={fieldName}
                                name={fieldName}
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(fieldName, e.target.files[0])}
                                accept="image/*"
                            />
                        </label>
                    </div>
                    {description && (
                        <p className="text-xs text-gray-500 mt-2">{description}</p>
                    )}
                    <InputError message={errors[fieldName]} className="mt-2" />
                </div>

                {/* Image Preview */}
                {data[fieldName] && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-maroon-300 flex-shrink-0">
                        <img
                            src={URL.createObjectURL(data[fieldName])}
                            alt={`${label} preview`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => removeFile(fieldName)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
        </div>
    );



    return (
        <AuthenticatedLayout>
            <Head title="Upload Profile Pictures" />
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
                            Upload Profile Pictures
                        </h1>
                        <p className="text-gray-600">
                            Add different views of yourself to create a complete profile
                        </p>
                    </div>

                    <form onSubmit={submit} className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
                        {/* Profile Pictures Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-maroon-700 mb-6 pb-2 border-b border-gray-200">
                                Profile Pictures
                            </h2>

                            {/* Half View */}
                            <FileInputField
                                label="Profile Picture *"
                                fieldName="picture_half_view"
                                description="Upper body or half-length photo"
                            />

                            {/* Full View */}
                            <FileInputField
                                label="Full View"
                                fieldName="picture_full_view"
                                description="Full body standing photo"
                            />

                            {/* Left View */}
                            <FileInputField
                                label="Left View"
                                fieldName="picture_left_view"
                                description="Profile view from left side"
                            />

                            {/* Right View */}
                            <FileInputField
                                label="Right View"
                                fieldName="picture_right_view"
                                description="Profile view from right side"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4 border-t border-gray-200">
                            <PrimaryButton
                                className="bg-maroon-600 hover:bg-maroon-700 text-white py-3 px-8 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing ? 'Uploading...' : 'Upload Pictures'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}