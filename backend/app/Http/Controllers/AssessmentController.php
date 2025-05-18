<?php

namespace App\Http\Controllers;

use App\Models\Training\Assessment;
use App\Models\Training\Course;
use App\Models\Training\CourseEnrollment;
use Illuminate\Http\Request;

class AssessmentController extends Controller
{
    function __construct(){
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    public function index(Course $course)
    {
        return $course->assessments()->withCount('questions')->get();
    }

    public function store(Request $request, Course $course)
    {
        Gate::authorize('create-assessment', $course);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:quiz,exam,assignment',
            'time_limit' => 'nullable|integer',
            'available_from' => 'nullable|date',
            'available_to' => 'nullable|date|after:available_from',
        ]);

        $assessment = $course->assessments()->create($validated);
        return response()->json($assessment, 201);
    }

    // GET /api/v2/assessments/{assessment}
    public function show(Assessment $assessment)
    {
        return response()->json([
            'assessment' => $assessment->load(['questions', 'course']),
            'stats' => [
                'average_score' => $assessment->results()->avg('score'),
                'total_attempts' => $assessment->results()->count()
            ]
        ]);
    }

    // PUT/PATCH /api/v2/assessments/{assessment}
    public function update(Request $request, Assessment $assessment)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'time_limit' => 'sometimes|integer|min:1',
            'passing_score' => 'sometimes|numeric|between:0,100',
            'is_published' => 'sometimes|boolean'
        ]);

        $assessment->update($validated);
        return response()->json($assessment);
    }

    // DELETE /api/v2/assessments/{assessment}
    public function destroy(Assessment $assessment)
    {
        $assessment->delete();
        return response()->json([
            'message' => 'Assessment deleted successfully',
            'deleted_at' => now()->toDateTimeString()
        ]);
    }


    public function submit(Request $request, Assessment $assessment)
    {
        $enrollment = CourseEnrollment::where([
            'user_id' => $this->user,
            'course_id' => $assessment->course_id
        ])->firstOrFail();

        $validated = $request->validate([
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:assessment_questions,id',
            'answers.*.answer' => 'required',
        ]);

        $submission = $assessment->submissions()->create([
            'user_id' => $this->user,
            'answers' => $validated['answers'],
            'submitted_at' => now(),
            'score' => $assessment->auto_grade ? $this->calculateScore($assessment, $validated['answers']) : null
        ]);

        return response()->json($submission, 201);
    }

    private function calculateScore(Assessment $assessment, array $answers)
    {
        $score = 0;
        $questions = $assessment->questions->keyBy('id');

        foreach ($answers as $answer) {
            $question = $questions[$answer['question_id']];
            if ($question->correct_answer === $answer['answer']) {
                $score += $question->points;
            }
        }

        return $score;
    }
}