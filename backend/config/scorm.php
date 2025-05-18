<?php
return [
    'storage' => [
        'disk' => env('SCORM_STORAGE_DISK', 'local'),
        'path' => 'scorm-packages',
    ],
    'local_url' => env('APP_URL').'/storage/scorm/',
];