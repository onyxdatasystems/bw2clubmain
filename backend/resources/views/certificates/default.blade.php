<!DOCTYPE html>
<html>
<head>
    <style>
        .certificate {
            border: 2px solid #000;
            padding: 2cm;
            text-align: center;
            font-family: Arial, sans-serif;
        }
        .logo { width: 150px; }
        .signature { width: 200px; }
    </style>
</head>
<body>
<div class="certificate">
    <img src="{{ public_path('images/logo.png') }}" class="logo">
    <h1>Certificate of Completion</h1>
    <p>Awarded to {{ $certificate->user->name }}</p>
    <p>For successfully completing {{ $certificate->course->title }}</p>
    <p>Certificate Number: {{ $certificate->certificate_number }}</p>
    <p>Issued on {{ $certificate->issue_date->format('F j, Y') }}</p>
    <img src="{{ public_path('images/signature.png') }}" class="signature">
</div>
</body>
</html>