<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Badge;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BadgeController extends Controller
{
    public function badge()
    {
        try {
            $user = auth()->user();
            
            $badges = Badge::where('user_id', $user->id)
                ->orderByDesc('id')
                ->get();

            return ApiResponse::success([
                'badges' => $badges,
                'current_date' => Carbon::now()->toDateTimeString()
            ]);

        } catch (\Exception $e) {
            return ApiResponse::error('Failed to retrieve badges: ' . $e->getMessage());
        }
    }

    public function badge_info()
    {
        try {
            return ApiResponse::success([
                'info' => [
                    'description' => 'Badge information',
                    'requirements' => [
                        'minimum_level' => 5,
                        'required_achievements' => 3
                    ],
                    'benefits' => [
                        'exclusive_content',
                        'priority_support'
                    ]
                ]
            ]);
            
        } catch (\Exception $e) {
            return ApiResponse::error('Failed to retrieve badge info');
        }
    }

    public function payment_configuration($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date'
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        try {
            $user = auth()->user();
            $badge_price = Setting::where('type', 'badge_price')->value('description') ?? 0;

            $start_date = Carbon::parse($request->start_date);
            $end_date = $start_date->copy()->addDays(30);

            $payment_details = [
                'items' => [
                    [
                        'id' => $id,
                        'title' => $request->title,
                        'description' => $request->description,
                        'price' => (float)$badge_price,
                        'tax' => 0,
                        'discount' => 0
                    ]
                ],
                'metadata' => [
                    'start_date' => $start_date->toDateTimeString(),
                    'end_date' => $end_date->toDateTimeString(),
                    'user_id' => $user->id
                ],
                'payment_flow' => [
                    'cancel_url' => route('badge'),
                    'success_url' => route('payment.success')
                ],
                'total_amount' => (float)$badge_price
            ];

            return ApiResponse::success([
                'payment_configuration' => $payment_details,
                'payment_initiation_url' => route('payment.initiate')
            ], 'Payment configuration ready', 201);

        } catch (\Exception $e) {
            return ApiResponse::error('Payment configuration failed: ' . $e->getMessage());
        }
    }
}