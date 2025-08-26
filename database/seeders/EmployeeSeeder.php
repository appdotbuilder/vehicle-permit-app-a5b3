<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'employee_id' => 'EMP001',
                'name' => 'John Smith',
                'department' => 'Engineering',
                'grade' => 'Senior Software Engineer',
                'email' => 'john.smith@company.com',
            ],
            [
                'employee_id' => 'EMP002',
                'name' => 'Sarah Johnson',
                'department' => 'Marketing',
                'grade' => 'Marketing Manager',
                'email' => 'sarah.johnson@company.com',
            ],
            [
                'employee_id' => 'EMP003',
                'name' => 'Michael Brown',
                'department' => 'Sales',
                'grade' => 'Sales Representative',
                'email' => 'michael.brown@company.com',
            ],
            [
                'employee_id' => 'EMP004',
                'name' => 'Emily Davis',
                'department' => 'HR',
                'grade' => 'HR Specialist',
                'email' => 'emily.davis@company.com',
            ],
            [
                'employee_id' => 'EMP005',
                'name' => 'David Wilson',
                'department' => 'Finance',
                'grade' => 'Financial Analyst',
                'email' => 'david.wilson@company.com',
            ],
            [
                'employee_id' => 'EMP006',
                'name' => 'Lisa Anderson',
                'department' => 'Engineering',
                'grade' => 'DevOps Engineer',
                'email' => 'lisa.anderson@company.com',
            ],
            [
                'employee_id' => 'EMP007',
                'name' => 'Robert Taylor',
                'department' => 'Operations',
                'grade' => 'Operations Manager',
                'email' => 'robert.taylor@company.com',
            ],
            [
                'employee_id' => 'EMP008',
                'name' => 'Jennifer Martinez',
                'department' => 'Design',
                'grade' => 'UI/UX Designer',
                'email' => 'jennifer.martinez@company.com',
            ],
        ];

        foreach ($employees as $employee) {
            Employee::create($employee);
        }
    }
}