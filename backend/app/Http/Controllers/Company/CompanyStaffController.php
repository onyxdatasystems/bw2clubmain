<?php
namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CompanyStaffController extends Controller
{
    public function addStaff(Request $request, Company $company): \Illuminate\Http\JsonResponse
    {
        $this->authorize('manage', $company);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => 'required|in:admin,hr,manager,staff'
        ]);

        $staff = $company->staff()->create($validated);

        return response()->json($staff, 201);
    }

    public function createGroup(Request $request, Company $company): \Illuminate\Http\JsonResponse
    {
        $this->authorize('manage', $company);

        $validated = $request->validate([
            'name' => 'required|string',
            'purpose' => 'required|string',
            'members' => 'array|exists:users,id'
        ]);

        $group = $company->groups()->create($validated);
        $group->members()->attach($validated['members']);

        return response()->json($group, 201);
    }
}
