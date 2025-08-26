<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of notifications.
     */
    public function index()
    {
        $notifications = auth()->user()
            ->notifications()
            ->latest()
            ->paginate(20);

        return Inertia::render('notifications/index', [
            'notifications' => $notifications,
        ]);
    }

    /**
     * Mark a notification as read.
     */
    public function update(Request $request, Notification $notification)
    {
        // Ensure user can only update their own notifications
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->update([
            'read' => true,
            'read_at' => now(),
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * Store a new resource (mark all notifications as read).
     */
    public function store()
    {
        auth()->user()
            ->notifications()
            ->where('read', false)
            ->update([
                'read' => true,
                'read_at' => now(),
            ]);

        return response()->json(['success' => true]);
    }

    /**
     * Display the specified resource (unread notification count).
     */
    public function show($id = null)
    {
        // If called for unread count (when $id is 'unread-count')
        if ($id === 'unread-count') {
            $count = auth()->user()
                ->notifications()
                ->where('read', false)
                ->count();

            return response()->json(['count' => $count]);
        }

        // Regular show functionality
        $notification = auth()->user()
            ->notifications()
            ->findOrFail($id);

        return response()->json(['notification' => $notification]);
    }
}