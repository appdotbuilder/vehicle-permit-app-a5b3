import React from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Vehicle Usage Permit System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="rounded-lg bg-blue-600 p-2">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold">Vehicle Permit System</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                                    >
                                        HR Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        HR Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            🚗 Vehicle Usage Permit System
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Streamline your company's vehicle usage requests with our comprehensive permit management system. 
                            Easy for employees to request, simple for HR to manage.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href={route('permit-requests.create')}
                                className="inline-block rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white hover:bg-green-700 transition-colors shadow-lg"
                            >
                                📝 Request Vehicle Permit
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    👥 HR/Admin Login
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 dark:bg-blue-900">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Request Form</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Employees simply enter their ID and the system auto-populates their details. Select dates, vehicle type, and submit instantly.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 dark:bg-green-900">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12h1v12z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Real-time Notifications</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                HR gets instant notifications for new requests. Employees get notified immediately when their request is approved or rejected.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 dark:bg-purple-900">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Complete Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                HR dashboard with employee management, request history, filtering, and Excel export capabilities for comprehensive oversight.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-8 shadow-lg dark:bg-gray-800">
                        <h3 className="text-2xl font-bold text-center mb-6">Key Features</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-lg flex items-center">
                                    <span className="mr-2">👤</span> For Employees
                                </h4>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Auto-populate details with Employee ID
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Simple date/time and vehicle selection
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Instant submission and tracking
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Real-time approval notifications
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-lg flex items-center">
                                    <span className="mr-2">🏢</span> For HR/Admin
                                </h4>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Complete employee database management
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        One-click approve/reject requests
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Advanced filtering and search
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 mt-1 text-green-500">✓</span>
                                        Export data to Excel reports
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Vehicle Usage Permit System - Streamlining company vehicle management</p>
                    <p className="mt-2">
                        Built with ❤️ using Laravel & React
                    </p>
                </footer>
            </div>
        </>
    );
}