<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Paths to apply CORS
    'allowed_methods' => ['*'], // Allow all methods (GET, POST, etc.)
    'allowed_origins' => ['http://localhost:3000'], // Your Next.js frontend URL
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Enable if using cookies/auth
];