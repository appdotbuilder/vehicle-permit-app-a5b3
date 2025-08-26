import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
}

interface PermitRequest {
    id: number;
    start_datetime: string;
    end_datetime: string;
    vehicle_type: string;
    license_plate: string;
    status: string;
    created_at: string;
    employee: Employee;
}

interface Stats {
    total_employees: number;
    pending_requests: number;
    approved_requests: number;
    rejected_requests: number;
}

interface Props {
    stats: Stats;
    recentRequests: PermitRequest[];
    pendingRequests: PermitRequest[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentRequests, pendingRequests }: Props) {
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status: string) => {
        const classes = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };

        return (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${classes[status as keyof typeof classes]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="HR Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🚗 Vehicle Permit Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Manage vehicle permit requests and employee data</p>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Employees</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total_employees}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending Requests</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending_requests}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Approved Requests</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.approved_requests}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Rejected Requests</p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.rejected_requests}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href={route('employees.index')}
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Manage Employees</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Add, edit, or view employees</p>
                            </div>
                        </Link>

                        <Link
                            href={route('permit-requests.index')}
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">View All Requests</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Manage permit requests</p>
                            </div>
                        </Link>

                        <Link
                            href={route('notifications.index')}
                            className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h1v12z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">View notification history</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Pending Requests */}
                {pendingRequests.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pending Requests Requiring Attention</h3>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-600">
                            {pendingRequests.map((request) => (
                                <div key={request.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {request.employee.name} ({request.employee.employee_id})
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {request.employee.department} • {request.vehicle_type} • {request.license_plate}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {formatDateTime(request.start_datetime)} - {formatDateTime(request.end_datetime)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getStatusBadge(request.status)}
                                            <Link
                                                href={route('permit-requests.show', request.id)}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                Review →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Requests */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Requests</h3>
                            <Link
                                href={route('permit-requests.index')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                View all →
                            </Link>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-600">
                        {recentRequests.length > 0 ? (
                            recentRequests.map((request) => (
                                <div key={request.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {request.employee.name} ({request.employee.employee_id})
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {request.employee.department} • {request.vehicle_type} • {request.license_plate}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Submitted {formatDateTime(request.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {getStatusBadge(request.status)}
                                            <Link
                                                href={route('permit-requests.show', request.id)}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                View →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                                No recent requests found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}