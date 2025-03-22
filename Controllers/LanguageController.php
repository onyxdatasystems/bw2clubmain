<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class LanguageController extends Controller
{
    public function language()
    {
        $languages = Language::select('name')->groupBy('name')->get();
        return ApiResponse::success($languages, 'Languages fetched successfully');
    }

    public function language_add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $lang = new Language();
        $lang->name = $request->language;
        $lang->phrase = $request->language;
        $lang->translated = $request->language;
        $lang->save();

        return ApiResponse::success($lang, 'Language added successfully');
    }

    public function language_update(Request $request, $language)
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        DB::table('languages')->where('name', $language)->update(['name' => strtolower($request->language)]);
        return ApiResponse::success(null, 'Language updated successfully');
    }

    public function edit_phrase($language)
    {
        $all_phrase = Language::where('name', $language)->get();
        return ApiResponse::success($all_phrase, 'Phrases fetched successfully');
    }

    public function update_phrase(Request $request, $id)
    {
        $row = Language::where('id', $id)->first();
        if (!$row) {
            return ApiResponse::error(null, 'Phrase not found', 404);
        }

        $phrase = $row->phrase;
        if (strpos($row->phrase, '____') === true && strpos($request->translated, '____') === true) {
            DB::table('languages')->where('id', $id)->update(['translated' => $request->translated]);
            return ApiResponse::success(null, 'Phrase updated successfully');
        } elseif (strpos($row->phrase, '____') === false) {
            DB::table('languages')->where('id', $id)->update(['translated' => $request->translated]);
            return ApiResponse::success(null, 'Phrase updated successfully');
        } else {
            return ApiResponse::error(null, 'Invalid phrase format', 400);
        }
    }
}