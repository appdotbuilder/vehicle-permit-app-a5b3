import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

interface PermitFormData {
    employee_id: string;
    start_datetime: string;
    end_datetime: string;
    vehicle_type: string;
    license_plate: string;
    [key: string]: string;
}

interface EmployeeData {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    email: string;
}

export default function CreatePermitRequest() {
    const [employee, setEmployee] = useState<EmployeeData | null>(null);
    const [employeeLoading, setEmployeeLoading] = useState(false);
    const [employeeError, setEmployeeError] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<PermitFormData>({
        employee_id: '',
        start_datetime: '',
        end_datetime: '',
        vehicle_type: '',
        license_plate: '',
    });

    const fetchEmployeeData = async (employeeId: string) => {
        if (!employeeId) {
            setEmployee(null);
            setEmployeeError(null);
            return;
        }

        setEmployeeLoading(true);
        setEmployeeError(null);

        try {
            const response = await fetch(`/api/employees/by-id?employee_id=${encodeURIComponent(employeeId)}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Employee not found');
            }

            setEmployee(result);
        } catch (error) {
            setEmployee(null);
            setEmployeeError(error instanceof Error ? error.message : 'Employee not found');
        } finally {
            setEmployeeLoading(false);
        }
    };

    const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('employee_id', value);
        
        if (value.length >= 3) {
            fetchEmployeeData(value);
        } else {
            setEmployee(null);
            setEmployeeError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('permit-requests.store'));
    };

    const vehicleTypes = [
        'Sedan',
        'SUV',
        'Van',
        'Truck',
        'Motorcycle',
        'Other'
    ];

    return (
        <>
            <Head title="Request Vehicle Permit" />
            <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route('home')}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            ← Back to Home
                        </Link>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
                        <div className="bg-blue-600 px-6 py-4">
                            <h1 className="text-2xl font-bold text-white flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Vehicle Usage Permit Request
                            </h1>
                            <p className="text-blue-100 mt-1">
                                Please fill out the form below to request a vehicle usage permit
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Employee ID Section */}
                            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700">
                                <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                    Employee ID *
                                </label>
                                <input
                                    type="text"
                                    id="employee_id"
                                    value={data.employee_id}
                                    onChange={handleEmployeeIdChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    placeholder="Enter your Employee ID (e.g., EMP001)"
                                    required
                                />
                                {errors.employee_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.employee_id}</p>
                                )}
                                {employeeError && (
                                    <p className="mt-1 text-sm text-red-600">{employeeError}</p>
                                )}
                                
                                {/* Employee Details Display */}
                                {employeeLoading && (
                                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                                        <p className="text-blue-700">Loading employee details...</p>
                                    </div>
                                )}
                                
                                {employee && (
                                    <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-md dark:bg-green-900 dark:border-green-700">
                                        <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Employee Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            <p><span className="font-medium">Name:</span> {employee.name}</p>
                                            <p><span className="font-medium">Department:</span> {employee.department}</p>
                                            <p><span className="font-medium">Grade:</span> {employee.grade}</p>
                                            <p><span className="font-medium">Email:</span> {employee.email}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Date and Time Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="start_datetime" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        Start Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="start_datetime"
                                        value={data.start_datetime}
                                        onChange={(e) => setData('start_datetime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    />
                                    {errors.start_datetime && (
                                        <p className="mt-1 text-sm text-red-600">{errors.start_datetime}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="end_datetime" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        End Date & Time *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="end_datetime"
                                        value={data.end_datetime}
                                        onChange={(e) => setData('end_datetime', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    />
                                    {errors.end_datetime && (
                                        <p className="mt-1 text-sm text-red-600">{errors.end_datetime}</p>
                                    )}
                                </div>
                            </div>

                            {/* Vehicle Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="vehicle_type" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        Vehicle Type *
                                    </label>
                                    <select
                                        id="vehicle_type"
                                        value={data.vehicle_type}
                                        onChange={(e) => setData('vehicle_type', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        required
                                    >
                                        <option value="">Select vehicle type</option>
                                        {vehicleTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.vehicle_type && (
                                        <p className="mt-1 text-sm text-red-600">{errors.vehicle_type}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="license_plate" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        License Plate Number *
                                    </label>
                                    <input
                                        type="text"
                                        id="license_plate"
                                        value={data.license_plate}
                                        onChange={(e) => setData('license_plate', e.target.value.toUpperCase())}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                        placeholder="e.g., ABC-1234"
                                        required
                                    />
                                    {errors.license_plate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.license_plate}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <Link
                                    href={route('home')}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || !employee}
                                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}