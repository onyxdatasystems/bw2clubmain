<?php

namespace App\Http\Controllers;

use App\Models\WorkExperience;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class WorkExperienceController extends Controller
{
    /**
     * Get all work experiences for the authenticated user
     */
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->workExperiences()
                ->orderBy('start_date', 'desc')
                ->get()
        );
    }

    /**
     * Store a new work experience
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current_position' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $workExperience = $request->user()->workExperiences()->create(
            $validator->validated()
        );

        return response()->json($workExperience, Response::HTTP_CREATED);
    }

    /**
     * Update an existing work experience
     */
    public function update(Request $request, WorkExperience $workExperience)
    {
        $this->authorize('update', $workExperience);

        $validator = Validator::make($request->all(), [
            'company' => 'sometimes|string|max:255',
            'position' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_current_position' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $workExperience->update($validator->validated());

        return response()->json($workExperience);
    }

    /**
     * Delete a work experience
     */
    public function destroy(WorkExperience $workExperience)
    {
        $this->authorize('delete', $workExperience);

        $workExperience->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}