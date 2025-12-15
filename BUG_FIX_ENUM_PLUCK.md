# Bug Fix: Enum Pluck Error in Admin Dashboard

## Issue
When logging in as Admin or Teacher, the application threw an "Internal Server Error: TypeError - Illegal offset type" at line 49 of AdminController.

## Root Cause
The error occurred when trying to use Laravel's `pluck()` method with enum values as array keys. When the database returns enum objects (like `UserRole`, `QuestionType`, `Difficulty`), they cannot be directly used as array keys in the `pluck('count', 'role')` pattern.

## Files Fixed
- `app/Http/Controllers/AdminController.php`

## Changes Made

### 1. Fixed User Role Statistics (Line 46-49)
**Before:**
```php
$usersByRole = User::select('role', DB::raw('count(*) as count'))
  ->groupBy('role')
  ->get()
  ->pluck('count', 'role');
```

**After:**
```php
$usersByRole = User::select('role', DB::raw('count(*) as count'))
  ->groupBy('role')
  ->get()
  ->mapWithKeys(function ($item) {
    return [$item->role->value => $item->count];
  });
```

### 2. Fixed Question Statistics by Type (Line 298-300)
**Before:**
```php
'by_type' => Question::select('question_type', DB::raw('count(*) as count'))
  ->groupBy('question_type')
  ->pluck('count', 'question_type'),
```

**After:**
```php
'by_type' => Question::select('question_type', DB::raw('count(*) as count'))
  ->groupBy('question_type')
  ->get()
  ->mapWithKeys(function ($item) {
    return [$item->question_type->value => $item->count];
  }),
```

### 3. Fixed Question Statistics by Difficulty (Line 301-303)
**Before:**
```php
'by_difficulty' => Question::select('difficulty', DB::raw('count(*) as count'))
  ->groupBy('difficulty')
  ->pluck('count', 'difficulty'),
```

**After:**
```php
'by_difficulty' => Question::select('difficulty', DB::raw('count(*) as count'))
  ->groupBy('difficulty')
  ->get()
  ->mapWithKeys(function ($item) {
    return [$item->difficulty->value => $item->count];
  }),
```

## Solution Explanation
Instead of using `pluck()` directly on enum fields, we:
1. Call `get()` to retrieve the collection
2. Use `mapWithKeys()` to manually create the key-value pairs
3. Access the enum's string value using `->value` property
4. Return the properly formatted array

This ensures that string values (not enum objects) are used as array keys, which PHP can handle correctly.

## Testing
After applying these fixes:
1. Login as Admin - Dashboard should load without errors
2. Login as Teacher - Dashboard should load without errors
3. Navigate to Admin > Question Bank Management - Statistics should display correctly

## Status
✅ Fixed - Admin and Teacher dashboards should now load successfully
