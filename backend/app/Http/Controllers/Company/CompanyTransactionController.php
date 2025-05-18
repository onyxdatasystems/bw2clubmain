<?php
// app/Http/Controllers/CompanyTransactionController.php
namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Company\Company;
use App\Models\Company\CompanyTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class CompanyTransactionController extends Controller
{
    public function index(Company $company)
    {
        $this->authorize('viewTransactions', $company);

        return $company->transactions()
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    public function store(Request $request, Company $company)
    {
        $this->authorize('createTransaction', $company);

        $validated = $request->validate([
            'amount' => 'required|numeric',
            'type' => ['required', Rule::in(['payment', 'refund', 'deposit', 'withdrawal'])],
            'description' => 'required|string|max:500'
        ]);

        $transaction = DB::transaction(function () use ($validated, $company) {
            // Create transaction
            $transaction = $company->transactions()->create($validated);

            // Update company balance
            $company->balance += $validated['type'] === 'withdrawal'
                ? -$validated['amount']
                : $validated['amount'];

            $company->save();

            return $transaction;
        });

        return response()->json($transaction, 201);
    }

    public function show(Company $company, CompanyTransaction $transaction)
    {
        $this->authorize('viewTransaction', [$company, $transaction]);

        return $transaction;
    }
}