<?php

namespace App\Http\Controllers;


use App\Events\CourseProgressUpdated;
use App\Models\Training\Course;
use App\Models\Training\CourseEnrollment;
use Illuminate\Http\Request;
use Illuminate\Mail\Mailables\Content;
use Image;
use Session;
use Share;

class ContentController extends Controller
{
    function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth('sanctum')->user();
            return $next($request);
        });
    }
    public function uploadContent(Request $request, Course $course)
    {
        $request->validate([
            'file' => 'required|file|mimes:mp4,pdf,zip,scorm|max:204800' // 200MB
        ]);

        $path = $request->file('file')->store('course-content');

        $content = $course->content()->create([
            'title' => $request->title,
            'type' => $this->detectType($request->file),
            'content_url' => $path,
            'duration' => $request->duration
        ]);

        return response()->json($content, 201);
    }

    public function completeContent(Content $content)
    {
        $enrollment = CourseEnrollment::where([
            'user_id' => auth()->id(),
            'course_id' => $content->course_id
        ])->firstOrFail();

        $enrollment->incrementProgress($content->weight);

        event(new CourseProgressUpdated(
            $this->user,
            $content->course,
            $enrollment->progress
        ));
    }
}