import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedRequests {
    data: PermitRequest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Filters {
    search: string;
    department: string;
    status: string;
    date_from: string;
    date_to: string;
}

interface Props {
    requests: PaginatedRequests;
    departments: string[];
    filters: Filters;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Permit Requests',
        href: '/permit-requests',
    },
];

export default function PermitRequestIndex({ requests, departments, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [department, setDepartment] = useState(filters.department || '');
    const [status, setStatus] = useState(filters.status || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const [processing, setProcessing] = useState(false);

    const handleSearch = () => {
        router.get(route('permit-requests.index'), {
            search: search,
            department: department,
            status: status,
            date_from: dateFrom,
            date_to: dateTo,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setDepartment('');
        setStatus('');
        setDateFrom('');
        setDateTo('');
        router.get(route('permit-requests.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleStatusUpdate = (request: PermitRequest, newStatus: 'approved' | 'rejected') => {
        const notes = newStatus === 'rejected' 
            ? prompt('Please provide a reason for rejection:')
            : null;
            
        if (newStatus === 'rejected' && !notes) {
            return; // User cancelled
        }

        setProcessing(true);
        
        router.patch(route('permit-requests.update', request.id), {
            status: newStatus,
            notes: notes,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                // Refresh the page data
                router.reload({ only: ['requests'] });
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[status as keyof typeof classes]}`}>
                <span className="mr-1">{icons[status as keyof typeof icons]}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permit Request Management" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📋 Permit Request Management</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Review and manage vehicle usage permit requests</p>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Search employee..."
                            />
                        </div>
                        <div>
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Department
                            </label>
                            <select
                                id="department"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Departments</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="date_from" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                From Date
                            </label>
                            <input
                                type="date"
                                id="date_from"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                            >
                                Search
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handleReset}
                                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Permit Requests ({requests.total} total)
                        </h3>
                    </div>
                    
                    {requests.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Employee
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Vehicle Details
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Usage Period
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Submitted
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                                        {requests.data.map((request) => (
                                            <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {request.employee.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-300">
                                                            {request.employee.employee_id} • {request.employee.department}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            {request.employee.grade}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {request.vehicle_type}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-300 font-mono">
                                                        {request.license_plate}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {formatDateTime(request.start_datetime)}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-300">
                                                        to {formatDateTime(request.end_datetime)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(request.status)}
                                                    {request.reviewed_at && (
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            by {request.reviewer?.name}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                                    {formatDateTime(request.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link
                                                            href={route('permit-requests.show', request.id)}
                                                            className="text-blue-600 hover:text-blue-700 px-2 py-1 rounded text-xs"
                                                        >
                                                            View
                                                        </Link>
                                                        {request.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(request, 'approved')}
                                                                    disabled={processing}
                                                                    className="text-green-600 hover:text-green-700 px-2 py-1 rounded text-xs disabled:opacity-50"
                                                                >
                                                                    Approve
                                                                </button>
                                                                <button
                                                                    onClick={() => handleStatusUpdate(request, 'rejected')}
                                                                    disabled={processing}
                                                                    className="text-red-600 hover:text-red-700 px-2 py-1 rounded text-xs disabled:opacity-50"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {requests.last_page > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Showing {(requests.current_page - 1) * requests.per_page + 1} to{' '}
                                            {Math.min(requests.current_page * requests.per_page, requests.total)} of{' '}
                                            {requests.total} results
                                        </div>
                                        <div className="flex space-x-1">
                                            {requests.links.map((link, index) => {
                                                if (!link.url) {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500"
                                                        >
                                                            {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                                        </span>
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`px-3 py-2 text-sm rounded-md ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                        preserveState
                                                        replace
                                                    >
                                                        {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No permit requests found</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {Object.values(filters).some(Boolean)
                                    ? 'Try adjusting your search criteria.'
                                    : 'No permit requests have been submitted yet.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}