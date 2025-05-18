<?php

namespace App\Http\Controllers\Company;

use App\Models\CompanyAdvertisement; // Changed
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompanyAdvertisementController extends Controller // Changed
{
    private $user;
    function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth('sanctum')->user();
            return $next($request);
        });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'sometimes|integer'
        ]);

        $ad = CompanyAdvertisement::create($validated); // Changed
        return response()->json($ad, 201);
    }

    // Get single ad
    public function show(CompanyAdvertisement $advertisement)
    {
        return response()->json($advertisement);
    }

    // Update ad
    public function update(Request $request, CompanyAdvertisement $advertisement)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'status' => 'sometimes|integer',
            'budget' => 'sometimes|numeric'
        ]);

        $advertisement->update($validated);
        return response()->json($advertisement);
    }

    // Delete ad
    public function destroy(CompanyAdvertisement $advertisement)
    {
        $advertisement->delete();
        return response()->json(null, 204);
    }

    // List active ads
    public function activeAds()
    {
        $ads = CompanyAdvertisement::where('status', CompanyAdvertisement::STATUSES['active'])
            ->get();
        return response()->json(['active_ads' => $ads]);
    }
}