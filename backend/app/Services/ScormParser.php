<?php
// app/Services/ScormParser.php
namespace App\Services;

use Exception;
use SimpleXMLElement;
use Illuminate\Support\Facades\Storage;

class ScormParser
{
    public function parseManifest($fullPath)
    {
        $zip = new \ZipArchive;
        if ($zip->open($fullPath) === true) {
            $manifest = $zip->getFromName('imsmanifest.xml');
            $zip->close();
            return $this->parseXmlManifest($manifest);
        }
        throw new Exception('Invalid SCORM package');
    }

    private function parseXmlManifest($xmlString)
    {
        $xml = new SimpleXMLElement($xmlString);
        $xml->registerXPathNamespace('imscp', 'http://www.imsglobal.org/xsd/imscp_v1p1');

        return [
            'identifier' => (string)$xml->attributes()->identifier,
            'title' => (string)$xml->organizations->organization->title,
            'items' => $this->parseItems($xml->organizations->organization->item)
        ];
    }

    private function parseItems($items)
    {
        return collect($items)->map(function ($item) {
            return [
                'identifier' => (string)$item->attributes()->identifier,
                'title' => (string)$item->title,
                'type' => (string)$item->attributes('adlcp', true)->timeLimitAction,
                'completion_threshold' => (float)$item->attributes('adlcp', true)->masteryScore
            ];
        })->toArray();
    }
}