<?php
namespace App\Http\Controllers;

use App\Models\Training\Course;
use Illuminate\Support\Facades\Storage;

class ScormController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'data' => 'required|json'
        ]);

        // Parse SCORM data
        $data = json_decode($validated['data'], true);

        $tracking = ScormTracking::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'scorm_course_id' => $validated['course_id']
            ],
            [
                'progress' => $data['cmi.progress_measure'] * 100,
                'score' => $data['cmi.score.scaled'] * 100,
                'data' => $validated['data']
            ]
        );

        // Trigger progress event
        event(new CourseProgressUpdated(
            auth()->user(),
            Course::find($validated['course_id']),
            $tracking->progress
        ));

        return response()->json($tracking);
    }
    public function uploadPackage(Request $request, Course $course)
    {
        $request->validate([
            'package' => 'required|file|mimes:zip'
        ]);

        // Store in local storage
        $path = $request->file('package')->store(
            '', // root directory of scorm disk
            'scorm'
        );

        $parser = new ScormParser();
        $manifest = $parser->parseManifest(
            Storage::disk('scorm')->path($path)
        );

        $scormCourse = ScormCourse::create([
            'course_id' => $course->id,
            'package_path' => $path,
            'manifest' => $manifest
        ]);

        return response()->json([
            'launch_url' => route('scorm.launch', $scormCourse),
            ...$scormCourse->toArray()
        ], 201);
    }

    public function launch(ScormCourse $scormCourse)
    {
        // Verify user enrollment
        if (!auth()->user()->enrolledIn($scormCourse->course)) {
            abort(403);
        }

        return Storage::disk('scorm')->response(
            $scormCourse->package_path
        );
    }
}