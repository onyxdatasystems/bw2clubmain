<?php
namespace App\Http\Controllers;

use App\Services\ZoomService;
use Illuminate\Http\Request;

class ZoomController extends Controller
{
    protected $zoom;

    public function __construct(ZoomService $zoomService)
    {
        $this->zoom = $zoomService;
    }

    public function createMeeting(Request $request)
    {
        $validated = $request->validate([
            'topic' => 'required|string',
            'start_time' => 'required|date',
            'duration' => 'required|integer|min:15'
        ]);

        $meeting = $this->zoom->createMeeting($validated);

        return response()->json([
            'join_url' => $meeting['join_url'],
            'meeting_id' => $meeting['id'],
            'password' => $meeting['password']
        ]);
    }

    // Add to ZoomController
    public function redirectToZoom()
    {
        return Socialite::driver('zoom')->redirect();
    }

    public function handleZoomCallback()
    {
        $user = Socialite::driver('zoom')->user();
        // Store access token
    }
}