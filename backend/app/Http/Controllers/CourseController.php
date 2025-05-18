<?php
namespace App\Http\Controllers;

use App\Models\Training\Course;
use App\Models\Training\CourseEnrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class CourseController extends Controller
{
    function __construct(){
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    public function index(Request $request)
    {
        $query = Course::with(['instructor', 'content'])
            ->filter($request->only('search', 'difficulty', 'instructor'))
            ->orderBy('created_at', 'desc');

        return $request->has('page')
            ? $query->paginate(15)
            : $query->get();
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Course::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'prerequisites' => 'nullable|array',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'duration' => 'required|integer|min:1'
        ]);

        $course = $request->user()->createdCourses()->create($validated);

        return response()->json($course, 201);
    }

    public function show(Course $course)
    {
        $course->load(['instructor', 'content', 'enrollments']);
        return response()->json($course);
    }

    public function update(Request $request, Course $course)
    {
        Gate::authorize('update', $course);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'prerequisites' => 'sometimes|array',
            'price' => 'sometimes|numeric|min:0',
            'is_published' => 'sometimes|boolean'
        ]);

        $course->update($validated);

        return response()->json($course);
    }

    public function destroy(Course $course)
    {
        Gate::authorize('delete', $course);

        $course->delete();
        return response()->noContent();
    }

    public function enroll(Request $request, Course $course)
    {
        $request->validate([
            'payment_reference' => Rule::requiredIf($course->price > 0)
        ]);

        $enrollment = CourseEnrollment::firstOrCreate([
            'user_id' => $this->user,
            'course_id' => $course->id
        ], [
            'enrolled_at' => now(),
            'payment_reference' => $request->payment_reference
        ]);

        return response()->json($enrollment, 201);
    }

    public function updateProgress(Request $request, Course $course)
    {
        $enrollment = CourseEnrollment::where([
            'user_id' => $this->user,
            'course_id' => $course->id
        ])->firstOrFail();

        $validated = $request->validate([
            'progress' => 'required|numeric|min:0|max:100'
        ]);

        $enrollment->update([
            'progress' => $validated['progress'],
            'completed_at' => $validated['progress'] >= 100 ? now() : null
        ]);

        return response()->json($enrollment);
    }

    public function assignInstructor(Request $request, Course $course)
    {
        Gate::authorize('assignInstructor', $course);

        $validated = $request->validate([
            'instructor_id' => 'required|exists:users,id'
        ]);

        $course->update(['instructor_id' => $validated['instructor_id']]);

        return response()->json($course);
    }

    public function publish(Course $course)
    {
        Gate::authorize('publish', $course);

        $course->update(['is_published' => true]);

        return response()->json(['message' => 'Course published successfully']);
    }

    public function process(Request $request)
    {
        $payment = auth()->user()->charge(
            $request->amount * 100, // Convert to cents
            $request->payment_method_id
        );

        if ($payment->isSucceeded()) {
            CourseEnrollment::create([
                'user_id' => auth()->id(),
                'course_id' => $request->course_id
            ]);
        }

        return response()->json($payment);
    }
}