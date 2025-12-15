<?php
// Quick script to check and fix student roles
// Run with: php fix_student_role.php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\UserRole;

echo "Checking student users...\n\n";

$students = User::where('role', 'student')->get();

if ($students->isEmpty()) {
    echo "No students found in database.\n";
    echo "Creating a test student...\n\n";

    $student = User::create([
        'name' => 'Test Student',
        'email' => 'student@test.com',
        'password' => bcrypt('password'),
        'role' => UserRole::STUDENT,
        'grade_level' => 1,
        'email_verified_at' => now(),
    ]);

    echo "✅ Created test student:\n";
    echo "   Email: student@test.com\n";
    echo "   Password: password\n";
    echo "   Role: " . $student->role->value . "\n";
    echo "   Grade: " . $student->grade_level . "\n";
} else {
    echo "Found " . $students->count() . " student(s):\n\n";

    foreach ($students as $student) {
        echo "- {$student->name} ({$student->email})\n";
        echo "  Role: " . $student->role->value . "\n";
        echo "  Grade: " . ($student->grade_level ?? 'Not set') . "\n";
        echo "  Email Verified: " . ($student->email_verified_at ? 'Yes' : 'No') . "\n";

        // Auto-verify email if not verified
        if (!$student->email_verified_at) {
            $student->email_verified_at = now();
            $student->save();
            echo "  ✅ Email verified automatically\n";
        }

        echo "\n";
    }
}

echo "\nDone!\n";
