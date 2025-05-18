<?php

namespace App\Http\Controllers;

use App\Models\Initiative;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class InitiativeController extends Controller
{
    function __construct(){
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    // Get all initiatives
    public function index()
    {
        return Initiative::with(['thematicGroup', 'creator'])->paginate(10);
    }

    // Create new initiative
    public function store(Request $request)
    {
        $validated = $request->validate([
            'thematic_group_id' => 'required|exists:thematic_groups,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_outcomes' => 'required|array',
            'target_outcomes.*' => 'string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $initiative = Initiative::create([
            ...$validated,
            'created_by' => Auth::id()
        ]);

        return response()->json($initiative, 201);
    }

    // Get single initiative
    public function show(Initiative $initiative)
    {
        return $initiative->load(['thematicGroup', 'creator', 'cheers', 'feedbacks']);
    }

    // Update initiative
    public function update(Request $request, Initiative $initiative)
    {
        $validated = $request->validate([
            'thematic_group_id' => 'sometimes|exists:thematic_groups,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'target_outcomes' => 'sometimes|array',
            'target_outcomes.*' => 'string',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $initiative->update($validated);
        return response()->json($initiative);
    }

    // Delete initiative
    public function destroy(Initiative $initiative)
    {
        $initiative->delete();
        return response()->json(null, 204);
    }

    // Additional Methods
    public function cheer(Initiative $initiative)
    {
        $initiative->cheers()->firstOrCreate([
            'user_id' => Auth::id()
        ]);

        return response()->json([
            'message' => 'Cheers added!',
            'total_cheers' => $initiative->cheers()->count()
        ]);
    }

    public function feedback(Request $request, Initiative $initiative)
    {
        $validated = $request->validate([
            'feedback' => 'required|string|max:1000'
        ]);

        $feedback = $initiative->feedbacks()->create([
            'user_id' => Auth::id(),
            'feedback' => $validated['feedback']
        ]);

        return response()->json($feedback, 201);
    }

    public function spread(Initiative $initiative)
    {
        // Implement sharing logic (e.g., increment share count or create share record)
        $initiative->increment('share_count');

        return response()->json([
            'message' => 'Initiative shared successfully!',
            'share_count' => $initiative->share_count
        ]);
    }
}