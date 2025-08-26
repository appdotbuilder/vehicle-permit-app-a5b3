import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    email: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface PermitRequest {
    id: number;
    start_datetime: string;
    end_datetime: string;
    vehicle_type: string;
    license_plate: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
    reviewed_at?: string;
    created_at: string;
    employee: Employee;
    reviewer?: User;
}

interface Props {
    request: PermitRequest;
    [key: string]: unknown;
}

export default function ShowPermitRequest({ request }: Props) {
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const classes = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };

        const icons = {
            pending: '⏳',
            approved: '✅',
            rejected: '❌',
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${classes[status as keyof typeof classes]}`}>
                <span className="mr-1">{icons[status as keyof typeof icons]}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <Head title={`Permit Request #${request.id}`} />
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
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-white">
                                        Vehicle Permit Request #{request.id}
                                    </h1>
                                    <p className="text-blue-100 mt-1">
                                        Submitted on {formatDateTime(request.created_at)}
                                    </p>
                                </div>
                                <div>
                                    {getStatusBadge(request.status)}
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Employee Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
                                            👤 Employee Information
                                        </h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 dark:bg-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Employee ID:</span>
                                                <span className="text-gray-900 dark:text-white">{request.employee.employee_id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Name:</span>
                                                <span className="text-gray-900 dark:text-white">{request.employee.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Department:</span>
                                                <span className="text-gray-900 dark:text-white">{request.employee.department}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Grade:</span>
                                                <span className="text-gray-900 dark:text-white">{request.employee.grade}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Email:</span>
                                                <span className="text-gray-900 dark:text-white">{request.employee.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Request Status */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
                                            📊 Request Status
                                        </h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 dark:bg-gray-700">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Status:</span>
                                                {getStatusBadge(request.status)}
                                            </div>
                                            {request.reviewed_at && (
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-600 dark:text-gray-300">Reviewed At:</span>
                                                    <span className="text-gray-900 dark:text-white">{formatDateTime(request.reviewed_at)}</span>
                                                </div>
                                            )}
                                            {request.reviewer && (
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-600 dark:text-gray-300">Reviewed By:</span>
                                                    <span className="text-gray-900 dark:text-white">{request.reviewer.name}</span>
                                                </div>
                                            )}
                                            {request.notes && (
                                                <div>
                                                    <span className="font-medium text-gray-600 dark:text-gray-300">Notes:</span>
                                                    <p className="mt-1 text-gray-900 dark:text-white">{request.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
                                            🚗 Vehicle Information
                                        </h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 dark:bg-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Vehicle Type:</span>
                                                <span className="text-gray-900 dark:text-white">{request.vehicle_type}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">License Plate:</span>
                                                <span className="text-gray-900 font-mono dark:text-white">{request.license_plate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
                                            📅 Usage Period
                                        </h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-3 dark:bg-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Start Date & Time:</span>
                                                <span className="text-gray-900 dark:text-white">{formatDateTime(request.start_datetime)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">End Date & Time:</span>
                                                <span className="text-gray-900 dark:text-white">{formatDateTime(request.end_datetime)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-600 dark:text-gray-300">Duration:</span>
                                                <span className="text-gray-900 dark:text-white">
                                                    {Math.ceil((new Date(request.end_datetime).getTime() - new Date(request.start_datetime).getTime()) / (1000 * 60 * 60 * 24))} days
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Success Message */}
                            {request.status === 'pending' && (
                                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900 dark:border-blue-700">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-blue-700 dark:text-blue-200">
                                            Your permit request has been submitted successfully. HR will review it shortly and you'll be notified of the decision.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {request.status === 'approved' && (
                                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900 dark:border-green-700">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-green-700 dark:text-green-200">
                                            🎉 Your permit request has been approved! You can now use the requested vehicle during the specified period.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {request.status === 'rejected' && (
                                <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900 dark:border-red-700">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-red-700 dark:text-red-200">
                                            Your permit request has been rejected. Please check the notes above for more information or contact HR.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}