# Math Racers - Educational Quiz Game Platform

## Project Overview
Create a gamified educational platform called "Math Racers" that helps elementary students (Grades 1-3) practice math skills through an engaging racing-themed quiz game. The platform supports three user roles: Students, Teachers, and Admins.

## Core Concept
Students answer math questions in a racing game format where their racer character moves forward on a track with each correct answer. The faster and more accurately they answer, the more points they earn. Teachers can track student progress, assign topics, and manage questions. Admins oversee the entire system.

## User Roles & Features

### 1. Student Features
- **Dashboard**: Select grade level (1-3) and view available math topics
- **Topic Selection**: Choose from Addition, Subtraction, Multiplication, or Division
- **Difficulty Selection**: Pick Easy, Medium, or Hard difficulty level
- **Quiz Game Interface**:
  - Racing-themed UI with animated race track
  - Racer character (🏎️) that moves forward with correct answers
  - 5-minute countdown timer displayed prominently
  - Large, clear question display with answer input field
  - Real-time visual feedback (celebrations for correct, encouragement for incorrect)
  - Progress bar showing completion percentage
  - Sound effects (toggleable): success, error, completion fanfare, engine sounds
- **Results Screen**: Shows accuracy, points earned, time taken, performance rating
- **Progress Tracking**: View personal statistics, badges earned, and improvement over time
- **Leaderboard**: See rankings by grade level and topic

### 2. Teacher Features
- **Dashboard**: Overview of class performance and recent activity
- **Student Performance Tracking**:
  - View individual student progress by topic
  - See detailed quiz history with accuracy and time metrics
  - Identify struggling students and topics needing attention
- **Class Performance Analytics**:
  - Aggregate statistics by topic and grade level
  - Competency mastery tracking aligned with DepEd standards
  - Visual charts and graphs for performance trends
- **Topic Assignments**: Assign specific topics to students
- **Question Bank Management**:
  - Create custom math questions
  - Edit existing questions
  - Organize by grade level, topic, and difficulty
  - Align questions with DepEd competencies

### 3. Admin Features
- **System Dashboard**: Overall platform statistics and health metrics
- **User Management**: Create, edit, and manage student and teacher accounts
- **Question Bank Management**: Oversee all questions across the platform
- **System Logs**: Monitor user activity and quiz statistics

## Technical Requirements

### Frontend Stack
- **Framework**: React 18+ with Inertia.js for SPA experience
- **Styling**: Tailwind CSS for responsive, modern UI
- **Icons**: Heroicons for consistent iconography
- **Animations**: CSS transitions and keyframes for smooth racer movement and celebrations
- **State Management**: React hooks (useState, useEffect, useRef)

### Backend Stack
- **Framework**: Laravel 12 (PHP 8.2+)
- **Authentication**: Laravel Breeze with Inertia.js
- **Database**: MySQL/PostgreSQL with Eloquent ORM
- **API**: RESTful endpoints using Inertia.js for seamless client-server communication

### Key Models & Database Structure

#### Users Table
- id, name, email, password, role (student/teacher/admin), grade_level (1-3)
- Relationships: hasMany QuizSessions, hasMany StudentProgress

#### Questions Table
- id, question_text, question_type (addition/subtraction/multiplication/division)
- grade_level (1-3), difficulty (easy/medium/hard), correct_answer
- options (JSON for multiple choice), deped_competency, created_by (user_id)

#### QuizSessions Table
- id, student_id, question_type, grade_level, difficulty
- total_questions, question_ids (JSON array), correct_answers, points_earned
- accuracy (percentage), time_taken (seconds), completed_at (timestamp)

#### QuizAnswers Table
- id, quiz_session_id, question_id, student_answer, is_correct
- time_taken (seconds per question), answered_at (timestamp)

#### StudentProgress Table
- id, student_id, question_type, grade_level
- total_quizzes, total_questions_answered, correct_answers
- total_points, average_accuracy, badges_earned (JSON array)
- last_quiz_at (timestamp)

## Game Mechanics

### Scoring System
- **Base Points**: Determined by difficulty (Easy: 5pts, Medium: 10pts, Hard: 15pts)
- **Accuracy Bonus**: Additional points for high accuracy (90%+ = 25pts, 80-89% = 15pts, 70-79% = 10pts)
- **Time Bonus**: Up to 25 bonus points for fast completion (optimal: 30 seconds per question)

### Racer Movement
- Racer position calculated as: (correct_answers / total_questions) × 100%
- Smooth CSS transitions for movement animation
- Bounce/scale effects on correct answers
- Position maintained (no backward movement) on incorrect answers

### Progress & Badges
- Track mastery by topic and grade level
- Award badges for milestones: "Speed Demon" (fast completion), "Accuracy Master" (95%+ accuracy), "Topic Champion" (complete all difficulties)
- Display total points and ranking on leaderboard

## UI/UX Design Guidelines

### Color Scheme
- **Addition**: Blue theme (#3B82F6)
- **Subtraction**: Red theme (#EF4444)
- **Multiplication**: Green theme (#10B981)
- **Division**: Purple theme (#8B5CF6)
- **Neutral**: Gray tones for backgrounds and text

### Racing Theme Elements
- 🏎️ Racer emoji as main character
- 🏁 Checkered flag for finish line
- Race track with lanes and progress markers
- Speedometer-style timer display
- Trophy and medal icons for achievements

### Kid-Friendly Design
- Large, colorful buttons with clear labels
- Emoji icons throughout for visual appeal
- Simple, encouraging language
- Minimal text, maximum visual feedback
- Responsive design for tablets and mobile devices

### Accessibility
- Keyboard navigation support (Enter to submit answers)
- Auto-focus on input fields
- Clear visual feedback for all actions
- Sound toggle for hearing preferences
- High contrast text for readability

## Key User Flows

### Student Quiz Flow
1. Login → Student Dashboard
2. Select Grade Level (if not set)
3. Choose Math Topic (Addition/Subtraction/Multiplication/Division)
4. Select Difficulty (Easy/Medium/Hard)
5. Start Quiz → Race Track Interface loads
6. Answer questions one by one (racer moves forward on correct answers)
7. Timer counts down from 5 minutes
8. Quiz completes when all questions answered or time expires
9. View Results Screen with score breakdown
10. Options: Play Again, View Progress, Return to Dashboard

### Teacher Monitoring Flow
1. Login → Teacher Dashboard
2. View class overview statistics
3. Navigate to Student Performance
4. Select individual student to view detailed progress
5. Review quiz history, accuracy trends, and time metrics
6. Identify topics needing attention
7. Optionally assign specific topics to student

### Question Creation Flow (Teacher)
1. Navigate to Question Bank
2. Click "Create Question"
3. Fill in: Question text, Type, Grade level, Difficulty, Correct answer
4. Add DepEd competency alignment
5. Save question to bank
6. Question becomes available for quizzes

## Routes Structure

### Student Routes
- `/student/dashboard` - Main dashboard with grade/topic selection
- `/student/topics/{grade}` - Topic selection for grade level
- `/student/difficulty/{grade}/{topic}` - Difficulty selection
- `/student/quiz/{sessionId}` - Active quiz game interface
- `/student/progress` - Personal progress and statistics
- `/student/leaderboard` - Rankings and leaderboard

### Teacher Routes
- `/teacher/dashboard` - Teacher overview
- `/teacher/students` - Student performance list
- `/teacher/students/{id}` - Individual student detail
- `/teacher/class-performance` - Class analytics
- `/teacher/assignments` - Topic assignments
- `/teacher/questions` - Question bank CRUD

### Admin Routes
- `/admin/dashboard` - System overview
- `/admin/users` - User management
- `/admin/questions` - Question bank management
- `/admin/logs` - System activity logs

### API Endpoints
- `POST /quiz/start` - Initialize quiz session
- `POST /quiz/answer` - Submit individual answer
- `POST /quiz/complete` - Finalize quiz and calculate score
- `GET /quiz/{sessionId}` - Get quiz session data

## Sample Questions Format

```javascript
{
  question_text: "5 + 3 = ?",
  question_type: "addition",
  grade_level: 1,
  difficulty: "easy",
  correct_answer: "8",
  options: null, // or ["6", "7", "8", "9"] for multiple choice
  deped_competency: "Adds whole numbers up to 10"
}
```

## Performance Requirements
- Quiz interface should load in under 2 seconds
- Racer animations should be smooth (60fps)
- Real-time answer validation without page refresh
- Efficient database queries with proper indexing
- Responsive design working on screens 320px and up

## Security Considerations
- Role-based access control (students can't access teacher/admin routes)
- CSRF protection on all forms
- Input validation and sanitization
- Secure password hashing
- Session management with proper timeouts

## Future Enhancements (Optional)
- Multiplayer racing mode (compete with classmates in real-time)
- Parent portal for progress monitoring
- Printable progress reports
- Custom avatar selection for racers
- More math topics (fractions, geometry, word problems)
- Mobile app version

## Success Metrics
- Student engagement: Average quiz completion rate > 80%
- Learning effectiveness: Average accuracy improvement over time
- Teacher adoption: Active teacher usage > 70%
- System performance: Page load times < 2 seconds

## Design Inspiration
Think of a combination of:
- Kahoot's engaging quiz interface
- Duolingo's gamification and progress tracking
- Mario Kart's racing aesthetic
- Khan Academy's educational focus

Create a vibrant, energetic, and encouraging learning environment that makes math practice feel like playing a game rather than doing homework.
