<?php
namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Controllers\PaymentProcessor;
use App\Models\Company\Company;
use App\Models\Company\CompanySubscription;
use App\Models\CompanySubscriptionPlan;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CompanySubscriptionController extends Controller
{
    // Create plan
    public function createPlan(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'duration_days' => 'required|integer',
            'features' => 'sometimes|array'
        ]);

        $plan = CompanySubscriptionPlan::create($validated);
        return response()->json($plan, 201);
    }

    // Get user subscriptions
    public function getSubscriptions(Request $request, Company $company)
    {
        $subscriptions = CompanySubscription::where('company_id', $company->id)
            ->with('plan')
            ->get();
        return response()->json($subscriptions);
    }

    // Cancel subscription
    public function cancelSubscription(Request $request, Company $company)
    {
        $company->subscriptions()->update(['end_date' => now()]);
        return response()->json(['message' => 'Subscription cancelled']);
    }
    public function subscribe(Request $request, Company $company)
    {
        $this->authorize('manage', $company);

        $validated = $request->validate([
            'plan_type' => 'required|string',
            'payment_method' => 'required|string',
            'duration_months' => 'required|integer'
        ]);

        // Process payment
        $payment = PaymentProcessor::charge(
            $request->user(),
            $validated['payment_method'],
            config("plans.{$validated['plan_type']}.price")
        );

        $subscription = $company->subscriptions()->create([
            'plan_type' => $validated['plan_type'],
            'features' => config("plans.{$validated['plan_type']}.features"),
            'start_date' => now(),
            'end_date' => now()->addMonths($validated['duration_months']),
            'payment_history' => [$payment->toArray()]
        ]);

        return response()->json($subscription, 201);
    }

    public function paymentHistory(Company $company)
    {
        $this->authorize('view', $company);

        return $company->subscriptions()
            ->with(['payments'])
            ->get()
            ->pluck('payment_history')
            ->flatten();
    }
}