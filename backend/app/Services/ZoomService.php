<?php
// app/Services/ZoomService.php
namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Madnest\LaravelZoom\LaravelZoom;

// app/Services/ZoomService.php
use GuzzleHttp\Client;

class ZoomService {
    protected $client;

    public function __construct() {
        $this->client = new Client([
            'base_uri' => 'https://api.zoom.us/v2/',
            'headers' => [
                'Authorization' => 'Bearer '.$this->getAccessToken(),
                'Content-Type' => 'application/json',
            ]
        ]);
    }

    private function getAccessToken()
    {
        // Check if we have a valid cached token
        if (Cache::has('zoom_access_token')) {
            return Cache::get('zoom_access_token');
        }

        $client = new Client();

        try {
            $response = $client->post('https://zoom.us/oauth/token', [
                'auth' => [
                    config('zoom.client_id'),
                    config('zoom.client_secret')
                ],
                'form_params' => [
                    'grant_type' => 'client_credentials',
                    'account_id' => config('zoom.account_id')
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            // Cache token for 50 minutes (Zoom tokens expire in 1 hour)
            Cache::put('zoom_access_token', $data['access_token'], now()->addMinutes(50));

            return $data['access_token'];

        } catch (\Exception $e) {
            // Handle different error scenarios
            Log::error('Zoom OAuth failed: ' . $e->getMessage());
            throw new \Exception('Failed to authenticate with Zoom API');
        }
    }

    public function createMeeting($data) {
        $response = $this->client->post('users/me/meetings', [
            'json' => $data
        ]);
        return json_decode($response->getBody(), true);
    }
}