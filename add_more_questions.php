<?php
// Script to add more questions to the database
// Run with: php add_more_questions.php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Question;
use App\Models\User;
use App\Enums\QuestionType;
use App\Enums\Difficulty;

echo "Adding more questions to the database...\n\n";

// Get a teacher to assign as creator
$teacher = User::where('role', 'teacher')->first();
if (!$teacher) {
    $teacher = User::where('role', 'admin')->first();
}

if (!$teacher) {
    echo "❌ No teacher or admin found. Please create one first.\n";
    exit(1);
}

echo "Using creator: {$teacher->name}\n\n";

// Grade 1 Addition - Easy (adding 15 more questions to make 20 total)
$grade1AdditionEasy = [
    ['question_text' => '5 + 3 = ?', 'correct_answer' => '8'],
    ['question_text' => '2 + 6 = ?', 'correct_answer' => '8'],
    ['question_text' => '7 + 1 = ?', 'correct_answer' => '8'],
    ['question_text' => '4 + 5 = ?', 'correct_answer' => '9'],
    ['question_text' => '6 + 3 = ?', 'correct_answer' => '9'],
    ['question_text' => '2 + 7 = ?', 'correct_answer' => '9'],
    ['question_text' => '5 + 4 = ?', 'correct_answer' => '9'],
    ['question_text' => '3 + 6 = ?', 'correct_answer' => '9'],
    ['question_text' => '1 + 8 = ?', 'correct_answer' => '9'],
    ['question_text' => '5 + 5 = ?', 'correct_answer' => '10'],
    ['question_text' => '6 + 4 = ?', 'correct_answer' => '10'],
    ['question_text' => '7 + 3 = ?', 'correct_answer' => '10'],
    ['question_text' => '8 + 2 = ?', 'correct_answer' => '10'],
    ['question_text' => '9 + 1 = ?', 'correct_answer' => '10'],
    ['question_text' => '1 + 1 = ?', 'correct_answer' => '2'],
];

echo "Adding Grade 1 Addition Easy questions...\n";
$count = 0;
foreach ($grade1AdditionEasy as $q) {
    Question::create([
        'question_text' => $q['question_text'],
        'question_type' => QuestionType::ADDITION,
        'grade_level' => 1,
        'difficulty' => Difficulty::EASY,
        'correct_answer' => $q['correct_answer'],
        'deped_competency' => 'M1NS-Ia-26.1: Add whole numbers up to 100 without regrouping',
        'created_by' => $teacher->id,
    ]);
    $count++;
}
echo "✅ Added {$count} Grade 1 Addition Easy questions\n\n";

// Grade 1 Addition - Medium (adding 10 more)
$grade1AdditionMedium = [
    ['question_text' => '15 + 4 = ?', 'correct_answer' => '19'],
    ['question_text' => '17 + 2 = ?', 'correct_answer' => '19'],
    ['question_text' => '18 + 1 = ?', 'correct_answer' => '19'],
    ['question_text' => '10 + 8 = ?', 'correct_answer' => '18'],
    ['question_text' => '15 + 3 = ?', 'correct_answer' => '18'],
    ['question_text' => '12 + 6 = ?', 'correct_answer' => '18'],
    ['question_text' => '11 + 6 = ?', 'correct_answer' => '17'],
    ['question_text' => '14 + 3 = ?', 'correct_answer' => '17'],
    ['question_text' => '10 + 7 = ?', 'correct_answer' => '17'],
    ['question_text' => '13 + 5 = ?', 'correct_answer' => '18'],
];

echo "Adding Grade 1 Addition Medium questions...\n";
$count = 0;
foreach ($grade1AdditionMedium as $q) {
    Question::create([
        'question_text' => $q['question_text'],
        'question_type' => QuestionType::ADDITION,
        'grade_level' => 1,
        'difficulty' => Difficulty::MEDIUM,
        'correct_answer' => $q['correct_answer'],
        'deped_competency' => 'M1NS-Ib-26.2: Add 2-digit numbers and 1-digit numbers without regrouping',
        'created_by' => $teacher->id,
    ]);
    $count++;
}
echo "✅ Added {$count} Grade 1 Addition Medium questions\n\n";

// Grade 1 Addition - Hard (adding 10 new)
$grade1AdditionHard = [
    ['question_text' => '23 + 15 = ?', 'correct_answer' => '38'],
    ['question_text' => '34 + 12 = ?', 'correct_answer' => '46'],
    ['question_text' => '41 + 26 = ?', 'correct_answer' => '67'],
    ['question_text' => '52 + 33 = ?', 'correct_answer' => '85'],
    ['question_text' => '61 + 24 = ?', 'correct_answer' => '85'],
    ['question_text' => '32 + 45 = ?', 'correct_answer' => '77'],
    ['question_text' => '21 + 56 = ?', 'correct_answer' => '77'],
    ['question_text' => '43 + 34 = ?', 'correct_answer' => '77'],
    ['question_text' => '54 + 23 = ?', 'correct_answer' => '77'],
    ['question_text' => '62 + 15 = ?', 'correct_answer' => '77'],
];

echo "Adding Grade 1 Addition Hard questions...\n";
$count = 0;
foreach ($grade1AdditionHard as $q) {
    Question::create([
        'question_text' => $q['question_text'],
        'question_type' => QuestionType::ADDITION,
        'grade_level' => 1,
        'difficulty' => Difficulty::HARD,
        'correct_answer' => $q['correct_answer'],
        'deped_competency' => 'M1NS-Ic-26.3: Add 2-digit numbers and 2-digit numbers without regrouping',
        'created_by' => $teacher->id,
    ]);
    $count++;
}
echo "✅ Added {$count} Grade 1 Addition Hard questions\n\n";

// Check totals
$totalG1AddEasy = Question::forGrade(1)->ofType(QuestionType::ADDITION)->withDifficulty(Difficulty::EASY)->count();
$totalG1AddMedium = Question::forGrade(1)->ofType(QuestionType::ADDITION)->withDifficulty(Difficulty::MEDIUM)->count();
$totalG1AddHard = Question::forGrade(1)->ofType(QuestionType::ADDITION)->withDifficulty(Difficulty::HARD)->count();

echo "\n📊 Final Counts:\n";
echo "   Grade 1 Addition Easy: {$totalG1AddEasy}\n";
echo "   Grade 1 Addition Medium: {$totalG1AddMedium}\n";
echo "   Grade 1 Addition Hard: {$totalG1AddHard}\n";

echo "\n✅ Done! You now have enough questions for 10-question quizzes.\n";
