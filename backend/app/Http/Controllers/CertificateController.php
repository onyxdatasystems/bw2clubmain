<?php

namespace App\Http\Controllers;

use App\Models\Training\Certificate;
use App\Models\Training\Course;
use App\Models\Training\CourseEnrollment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    private $user;
    function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth('sanctum')->user();
            return $next($request);
        });
    }

    public function generate(Course $course)
    {
        $user = auth()->user();
        if (!$user->courses()->where('course_id', $course->id)->exists()) {
            abort(403, 'Course not completed');
        }

        $enrollment = CourseEnrollment::where([
            'user_id' => $this->user->id(),
            'course_id' => $course->id,
            ['progress', '=', 100]
        ])->firstOrFail();

        $certificate = Certificate::firstOrCreate([
            'user_id' => $this->user->id(),
            'course_id' => $course->id
        ], [
            'certificate_number' => $this->generateCertificateNumber(),
            'issue_date' => now(),
            'verification_url' => URL::signedRoute('certificates.verify', [
                'user' => $this->user->id(),
                'course' => $course->id
            ])
        ]);

        $pdf = PDF::loadView('certificates.default', [
            'certificate' => $certificate
        ]);

        return $pdf->download("certificate-{$course->slug}.pdf");
    }

    private function generateCertificateNumber()
    {
        return 'CERT-' . strtoupper(Str::random(10)) . '-' . now()->format('Ymd');
    }

    public function verify(User $user, Course $course)
    {
        $certificate = Certificate::where([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => 'issued'
        ])->first();

        return response()->json([
            'exists' => !is_null($certificate),
            'certificate' => $certificate,
            'validated_at' => now()->toDateTimeString()
        ]);
    }
}