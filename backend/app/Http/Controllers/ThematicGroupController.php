<?php
namespace App\Http\Controllers;

use App\Models\ThematicGroup;
use Illuminate\Http\Request;

class ThematicGroupController extends Controller
{
    public function create(Request $request, Company $company)
    {
        $this->authorize('manage', $company);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'theme' => 'required|string|max:255',
            'purpose' => 'required|string',
            'tags' => 'nullable|array',
            'members' => 'required|array|exists:users,id'
        ]);

        $group = $company->thematicGroups()->create($validated);
        $group->members()->attach($validated['members'], ['role' => 'member']);

        return response()->json([
            'message' => 'Thematic group created',
            'group' => $group->load('members')
        ], 201);
    }

    public function addMember(Request $request, ThematicGroup $group)
    {
        $this->authorize('manageMembers', $group);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|in:member,contributor,leader'
        ]);

        $group->members()->syncWithoutDetaching([
            $validated['user_id'] => ['role' => $validated['role']]
        ]);

        return response()->json(['message' => 'Member added']);
    }

    public function removeMember(ThematicGroup $group, User $user)
    {
        $this->authorize('manageMembers', $group);

        $group->members()->detach($user->id);

        return response()->json(['message' => 'Member removed']);
    }

    public function update(Request $request, ThematicGroup $group)
    {
        $this->authorize('update', $group);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'theme' => 'sometimes|string|max:255',
            'purpose' => 'sometimes|string',
            'tags' => 'sometimes|array'
        ]);

        $group->update($validated);

        return response()->json($group);
    }

    public function destroy(ThematicGroup $group)
    {
        $this->authorize('delete', $group);

        $group->delete();

        return response()->noContent();
    }

    public function updatePhoto(Request $request, ThematicGroup $group)
    {
        $this->authorize('update', $group);

        $request->validate([
            'photo' => 'required|image|max:2048'
        ]);

        $path = $request->file('photo')->store('group-photos', 'public');
        $group->update(['photo_url' => Storage::url($path)]);

        return response()->json(['photo_url' => $group->photo_url]);
    }

    public function search(Request $request)
    {
        $groups = ThematicGroup::query()
            ->when($request->theme, fn($q, $theme) => $q->where('theme', 'like', "%$theme%"))
            ->when($request->tags, fn($q, $tags) => $q->whereJsonContains('tags', $tags))
            ->with(['company', 'members'])
            ->paginate(15);

        return response()->json($groups);
    }

// Add Initiative
    public function addInitiative(Request $request, ThematicGroup $group)
    {
        $this->authorize('addInitiative', $group);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'target_outcomes' => 'required|array',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date'
        ]);

        $initiative = $group->initiatives()->create([
            ...$validated,
            'created_by' => auth()->id()
        ]);

        return response()->json($initiative, 201);
    }

// View Members
    public function viewMembers(ThematicGroup $group)
    {
        $this->authorize('viewMembers', $group);

        $members = $group->members()
            ->withPivot('role')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->pivot->role,
                    'joined_at' => $user->pivot->created_at
                ];
            });

        return response()->json($members);
    }
}