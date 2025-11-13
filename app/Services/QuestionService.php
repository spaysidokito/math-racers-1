<?php

namespace App\Services;

use App\Enums\Difficulty;
use App\Enums\QuestionType;
use App\Models\Question;

class QuestionService
{
  /**
   * Generate answer choices for a question based on difficulty level.
   */
  public function generateAnswerChoices(Question $question): array
  {
    $difficulty = $question->difficulty;
    $correctAnswer = (int) $question->correct_answer;

    // For hard difficulty, return empty array (type the answer)
    if ($difficulty === Difficulty::HARD) {
      return [];
    }

    // Determine number of choices based on difficulty
    $numChoices = $difficulty === Difficulty::EASY ? 2 : 4;

    // Generate wrong answers based on question type
    $wrongAnswers = $this->generateWrongAnswers($question, $numChoices - 1);

    // Combine correct and wrong answers
    $allChoices = array_merge([$correctAnswer], $wrongAnswers);

    // Shuffle the choices
    shuffle($allChoices);

    return $allChoices;
  }

  /**
   * Generate wrong answers for a question.
   */
  private function generateWrongAnswers(Question $question, int $count): array
  {
    $correctAnswer = (int) $question->correct_answer;
    $wrongAnswers = [];
    $attempts = 0;
    $maxAttempts = 50;

    while (count($wrongAnswers) < $count && $attempts < $maxAttempts) {
      $wrongAnswer = $this->generateWrongAnswer($question, $correctAnswer);

      // Ensure the wrong answer is different from correct answer and not already in the list
      if ($wrongAnswer !== $correctAnswer && !in_array($wrongAnswer, $wrongAnswers) && $wrongAnswer > 0) {
        $wrongAnswers[] = $wrongAnswer;
      }

      $attempts++;
    }

    // If we couldn't generate enough unique wrong answers, fill with simple variations
    while (count($wrongAnswers) < $count) {
      $variation = $correctAnswer + (count($wrongAnswers) + 1);
      if (!in_array($variation, $wrongAnswers)) {
        $wrongAnswers[] = $variation;
      } else {
        $wrongAnswers[] = $correctAnswer - (count($wrongAnswers) + 1);
      }
    }

    return $wrongAnswers;
  }

  /**
   * Generate a single wrong answer based on question type and correct answer.
   */
  private function generateWrongAnswer(Question $question, int $correctAnswer): int
  {
    $questionType = $question->question_type;
    $gradeLevel = $question->grade_level;

    // Parse the question to get operands if possible
    $operands = $this->parseQuestionOperands($question->question_text, $questionType);

    if (!empty($operands)) {
      return $this->generateWrongAnswerFromOperands($operands, $questionType, $correctAnswer);
    }

    // Fallback to simple variations
    return $this->generateSimpleWrongAnswer($correctAnswer, $gradeLevel);
  }

  /**
   * Parse question text to extract operands.
   */
  private function parseQuestionOperands(string $questionText, QuestionType $questionType): array
  {
    $symbol = $questionType->symbol();

    // Simple regex to extract numbers from the question
    if (preg_match_all('/\d+/', $questionText, $matches)) {
      return array_map('intval', $matches[0]);
    }

    return [];
  }

  /**
   * Generate wrong answer based on operands and question type.
   */
  private function generateWrongAnswerFromOperands(array $operands, QuestionType $questionType, int $correctAnswer): int
  {
    if (count($operands) < 2) {
      return $this->generateSimpleWrongAnswer($correctAnswer, 1);
    }

    $a = $operands[0];
    $b = $operands[1];

    // Generate common mistakes based on operation type
    switch ($questionType) {
      case QuestionType::ADDITION:
        // Common mistakes: subtraction instead of addition, off by one
        $mistakes = [
          abs($a - $b),
          $a + $b + 1,
          $a + $b - 1,
          $a * $b
        ];
        break;

      case QuestionType::SUBTRACTION:
        // Common mistakes: addition instead of subtraction, wrong order
        $mistakes = [
          $a + $b,
          abs($b - $a),
          $a - $b + 1,
          $a - $b - 1
        ];
        break;

      case QuestionType::MULTIPLICATION:
        // Common mistakes: addition instead of multiplication, off by factor
        $mistakes = [
          $a + $b,
          $a * ($b + 1),
          $a * ($b - 1),
          $a * $b + $a
        ];
        break;

      case QuestionType::DIVISION:
        // Common mistakes: multiplication instead of division, remainder issues
        $mistakes = [
          $a * $b,
          $a / $b + 1,
          $a / $b - 1,
          $a
        ];
        break;

      default:
        $mistakes = [$correctAnswer + 1, $correctAnswer - 1];
    }

    // Filter out negative numbers and the correct answer
    $validMistakes = array_filter($mistakes, fn($m) => $m > 0 && $m !== $correctAnswer);

    if (!empty($validMistakes)) {
      return $validMistakes[array_rand($validMistakes)];
    }

    return $this->generateSimpleWrongAnswer($correctAnswer, 1);
  }

  /**
   * Generate a simple wrong answer variation.
   */
  private function generateSimpleWrongAnswer(int $correctAnswer, int $gradeLevel): int
  {
    $variations = [
      $correctAnswer + rand(1, 5),
      $correctAnswer - rand(1, min(5, $correctAnswer - 1)),
      $correctAnswer + 10,
      $correctAnswer - 10,
      $correctAnswer * 2,
      (int) ($correctAnswer / 2)
    ];

    // Filter out negative numbers and the correct answer
    $validVariations = array_filter($variations, fn($v) => $v > 0 && $v !== $correctAnswer);

    if (!empty($validVariations)) {
      return $validVariations[array_rand($validVariations)];
    }

    // Last resort
    return max(1, $correctAnswer + 1);
  }
}
