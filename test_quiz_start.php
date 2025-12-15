<?php
// Test quiz start functionality
// Run with: php test_quiz_start.php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Models\Question;
use App\Enums\QuestionType;
use App\Enums\Difficulty;

echo "Testing Quiz Start Functionality\n";
echo "================================\n\n";

// Get the test student
$student = User::where('email', 'student@test.com')->first();

if (!$student) {
    echo "❌ Test student not found!\n";
    exit(1);
}

echo "✅ Found student: {$student->name}\n";
echo "   Email: {$student->email}\n";
echo "   Role: {$student->role->value}\n";
echo "   Grade: {$student->grade_level}\n\n";

// Test parameters
$grade = 1;
$topic = 'addition';
$difficulty = 'easy';

echo "Testing with:\n";
echo "   Grade: $grade\n";
echo "   Topic: $topic\n";
echo "   Difficulty: $difficulty\n\n";

// Check if questions exist
$questions = Question::forGrade($grade)
    ->ofType(QuestionType::from($topic))
    ->withDifficulty(Difficulty::from($difficulty))
    ->get();

echo "Found {$questions->count()} questions\n";

if ($questions->isEmpty()) {
    echo "❌ No questions available!\n";
    echo "\nLet's check what questions exist:\n";

    $allQuestions = Question::select('grade_level', 'question_type', 'difficulty', \DB::raw('count(*) as count'))
        ->groupBy('grade_level', 'question_type', 'difficulty')
        ->get();

    foreach ($allQuestions as $q) {
        echo "   Grade {$q->grade_level} - {$q->question_type->value} - {$q->difficulty->value}: {$q->count} questions\n";
    }
} else {
    echo "✅ Questions available!\n";
    echo "\nSample questions:\n";
    foreach ($questions->take(3) as $q) {
        echo "   - {$q->question_text} = {$q->correct_answer}\n";
    }
}

echo "\n✅ Quiz start test complete!\n";
