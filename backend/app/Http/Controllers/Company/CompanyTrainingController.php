<?php
namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Controllers\TrainingParticipant;
use App\Models\Company\Company;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CompanyTrainingController extends Controller
{
    public function subscribeToTraining(Request $request, Company $company)
    {
        $this->authorize('manage', $company);

        $validated = $request->validate([
            'training_id' => 'required|exists:trainings,id',
            'participants' => 'array|exists:users,id'
        ]);

        $subscription = $company->trainingSubscriptions()->create([
            'training_id' => $validated['training_id'],
            'subscription_date' => now()
        ]);

        // Add participants to the training
        TrainingParticipant::insert(
            collect($validated['participants'])
                ->map(fn($id) => [
                    'training_id' => $validated['training_id'],
                    'user_id' => $id,
                    'company_id' => $company->id
                ])->toArray()
        );

        return response()->json($subscription, 201);
    }
}