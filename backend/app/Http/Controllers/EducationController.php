<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->educations;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string',
            'degree' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date'
        ]);

        return $request->user()->educations()->create($validated);
    }

    public function update(Request $request, Education $education)
    {
        $this->authorize('update', $education);

        $validated = $request->validate([
            'institution' => 'sometimes|string',
            'degree' => 'sometimes|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date'
        ]);

        $education->update($validated);
        return $education;
    }

    public function destroy(Education $education)
    {
        $this->authorize('delete', $education);
        $education->delete();
        return response()->noContent();
    }
}