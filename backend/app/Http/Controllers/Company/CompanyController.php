<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CompanyController extends Controller
{
    /**
     * Create new company
     */
    public function store(Request $request)
    {
        $this->authorize('create', Company::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:companies',
            'description' => 'required|string',
            'required_skills' => 'required|array',
            'job_titles' => 'required|array',
            'location' => 'required|string',
            'balance' => 'required|numeric|min:0'
        ]);

        // Prevent direct balance updates
        if ($request->has('balance')) {
            return response()->json([
                'message' => 'Balance can only be modified through transactions'
            ], 422);
        }

        $company = DB::transaction(function () use ($validated, $request) {
            $company = Company::create($validated);
            $company->staff()->attach($this->user, ['role' => 'admin']);
            return $company;
        });

        return response()->json($company, 201);
    }

    /**
     * Update company details
     */
    public function update(Request $request, Company $company)
    {
        $this->authorize('update', $company);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:companies,name,'.$company->id,
            'description' => 'sometimes|string',
            'required_skills' => 'sometimes|array',
            'job_titles' => 'sometimes|array',
            'location' => 'sometimes|string',
            'balance' => 'sometimes|numeric|min:0'
        ]);

        // Prevent direct balance updates
        if ($request->has('balance')) {
            return response()->json([
                'message' => 'Balance can only be modified through transactions'
            ], 422);
        }

        $company->update($validated);
        return response()->json($company);
    }

    /**
     * Delete company
     */
    public function destroy(Company $company)
    {
        $this->authorize('delete', $company);

        DB::transaction(function () use ($company) {
            $company->staff()->detach();
            $company->delete();
        });

        return response()->noContent();
    }

    /**
     * Add staff member
     */
    public function addStaff(Request $request, Company $company)
    {
        $this->authorize('addStaff', $company);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role' => ['required', Rule::in(['admin', 'hr', 'manager', 'staff'])]
        ]);

        $company->staff()->syncWithoutDetaching([
            $validated['user_id'] => ['role' => $validated['role']]
        ]);

        return response()->json(['message' => 'Staff member added']);
    }

    /**
     * Check company balance
     */
    public function checkBalance(Company $company)
    {
        $this->authorize('viewBalance', $company);

        return response()->json([
            'balance' => $company->balance,
            'currency' => 'USD',
            'last_updated' => $company->updated_at
        ]);
    }
}