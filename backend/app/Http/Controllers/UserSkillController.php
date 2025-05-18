<?php

// app/Http/Controllers/Admin/SkillController.php (Admin CRUD)
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
class UserSkillController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->skills()->where('is_active', true)->get();
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id'
        ]);

        $request->user()->skills()->sync($validated['skills']);

        return response()->json(['message' => 'Skills updated successfully']);
    }
}