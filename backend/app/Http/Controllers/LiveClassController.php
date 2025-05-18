<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Image, Session,Share;

class LiveClassController extends Controller
{
    public function create(Request $request, Course $course)
    {
        $zoom = new ZoomAPI();

        $meeting = $zoom->createMeeting([
            'topic' => $course->title,
            'start_time' => $request->time,
            'duration' => $request->duration
        ]);

        $course->liveClasses()->create([
            'meeting_id' => $meeting['id'],
            'start_time' => $request->time,
            'join_url' => $meeting['join_url']
        ]);

        return response()->json($meeting);
    }
}