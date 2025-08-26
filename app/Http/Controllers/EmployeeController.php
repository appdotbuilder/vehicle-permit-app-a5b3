<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $department = $request->get('department');
        
        $employees = Employee::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                           ->orWhere('employee_id', 'like', "%{$search}%")
                           ->orWhere('email', 'like', "%{$search}%");
            })
            ->when($department, function ($query, $department) {
                return $query->where('department', $department);
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        $departments = Employee::distinct()->pluck('department')->sort()->values();

        return Inertia::render('employees/index', [
            'employees' => $employees,
            'departments' => $departments,
            'filters' => [
                'search' => $search,
                'department' => $department,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('employees/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $employee = Employee::create($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $employee = null)
    {
        // Handle AJAX request for employee lookup by ID
        if ($request->ajax() || $request->wantsJson()) {
            $employeeId = $request->get('employee_id');
            
            if (!$employeeId) {
                return response()->json(['error' => 'Employee ID is required'], 400);
            }

            $employeeRecord = Employee::where('employee_id', $employeeId)->first();

            if (!$employeeRecord) {
                return response()->json(['error' => 'Employee not found'], 404);
            }

            return response()->json([
                'id' => $employeeRecord->id,
                'employee_id' => $employeeRecord->employee_id,
                'name' => $employeeRecord->name,
                'department' => $employeeRecord->department,
                'grade' => $employeeRecord->grade,
                'email' => $employeeRecord->email,
            ]);
        }

        // Regular show functionality
        if (is_string($employee)) {
            $employee = Employee::findOrFail($employee);
        } elseif (is_numeric($employee)) {
            $employee = Employee::findOrFail($employee);
        }

        $employee->load(['permitRequests' => function ($query) {
            $query->latest()->limit(10);
        }]);

        return Inertia::render('employees/show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('employees/edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return redirect()->route('employees.show', $employee)
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully.');
    }


}