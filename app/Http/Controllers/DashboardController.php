<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\PermitRequest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $stats = [
            'total_employees' => Employee::count(),
            'pending_requests' => PermitRequest::pending()->count(),
            'approved_requests' => PermitRequest::approved()->count(),
            'rejected_requests' => PermitRequest::rejected()->count(),
        ];

        $recentRequests = PermitRequest::with(['employee'])
            ->latest()
            ->limit(10)
            ->get();

        $pendingRequests = PermitRequest::with(['employee'])
            ->pending()
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentRequests' => $recentRequests,
            'pendingRequests' => $pendingRequests,
        ]);
    }
}