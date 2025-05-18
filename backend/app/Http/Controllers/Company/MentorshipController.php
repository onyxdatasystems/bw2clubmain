<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\MentorshipMatch;
use Illuminate\Http\Request;

class MentorshipController extends Controller
{
    // Create match
    public function createMatch(Request $request)
    {
        $validated = $request->validate([
            'mentee_id' => 'required|exists:users,id',
            'mentor_id' => 'required|exists:users,id',
            'topics' => 'sometimes|array'
        ]);

        $match = MentorshipMatch::create($validated);
        return response()->json($match, 201);
    }

    // List matches
    public function listMatches()
    {
        $matches = MentorshipMatch::where('status', 0)
            ->with(['mentee', 'mentor'])
            ->get();
        return response()->json($matches);
    }

    // End match
    public function endMatch(MentorshipMatch $match)
    {
        $match->update(['status' => 1]);
        return response()->json(['message' => 'Mentorship ended']);
    }
}