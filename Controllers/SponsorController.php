<?php

namespace App\Http\Controllers;

use App\Models\FileUploader;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use App\Helpers\ApiResponse; // Import the ApiResponse helper
use Image;

class SponsorController extends Controller
{
    public function view_sponsor()
    {
        $sponsors = Sponsor::orderBy('id', 'DESC')->paginate(10);
        return ApiResponse::success($sponsors, "Sponsors fetched successfully", 200);
    }

    public function create_sponsor()
    {
        // Since this is a form view, it can remain as is for web routes.
        // For API-only applications, you might return a JSON response with form fields.
        return ApiResponse::success([], "Create sponsor form data", 200);
    }

    public function save_sponsor(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|string',
            'image' => ['required', 'mimes:jpg,jpeg,png'],
        ]);

        $file_ext = $request->file('image')->extension();
        $filename = rand(0, 1000) . '.' . $file_ext;

        $sponsor = new Sponsor();
        $sponsor->user_id = auth()->user()->id;
        $sponsor->name = $request->name;
        $sponsor->image = $filename;
        $sponsor->description = $request->description;
        $sponsor->ext_url = $request->ext_url;
        $sponsor->status = 1;
        $done = $sponsor->save();

        if ($done) {
            FileUploader::upload($request->image, 'public/storage/sponsor/thumbnail/' . $filename, 300);
            return ApiResponse::success($sponsor, "Sponsored post added successfully", 201);
        }

        return ApiResponse::error(null, "Failed to add sponsored post", 500);
    }

    public function edit_sponsor($id)
    {
        $sponsor = Sponsor::find($id);
        if (!$sponsor) {
            return ApiResponse::error(null, "Sponsor not found", 404);
        }

        return ApiResponse::success($sponsor, "Sponsor data fetched successfully", 200);
    }

    public function update_sponsor(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|string',
            'image' => ['mimes:jpg,jpeg,png'],
        ]);

        $sponsor = Sponsor::find($id);
        if (!$sponsor) {
            return ApiResponse::error(null, "Sponsor not found", 404);
        }

        $sponsor->name = $request->name;
        if ($request->hasFile('image')) {
            $file_ext = $request->file('image')->extension();
            $filename = rand(0, 1000) . '.' . $file_ext;
            $sponsor->image = $filename;
        }
        $sponsor->description = $request->description;
        $sponsor->end_date = $request->end_date;
        $sponsor->ext_url = $request->ext_url;
        $sponsor->status = $request->status;
        $done = $sponsor->save();

        if ($done) {
            if ($request->hasFile('image')) {
                FileUploader::upload($request->image, 'public/storage/sponsor/thumbnail/' . $filename, 300);
            }
            return ApiResponse::success($sponsor, "Sponsored post updated successfully", 200);
        }

        return ApiResponse::error(null, "Failed to update sponsored post", 500);
    }

    public function delete_sponsor($id)
    {
        $sponsor = Sponsor::find($id);
        if (!$sponsor) {
            return ApiResponse::error(null, "Sponsor not found", 404);
        }

        $imagename = $sponsor->image;
        $done = $sponsor->delete();

        if ($done) {
            removeFile('sponsor', $imagename);
            return ApiResponse::success(null, "Sponsored post deleted successfully", 200);
        }

        return ApiResponse::error(null, "Failed to delete sponsored post", 500);
    }

    public function ad_status($type, $id)
    {
        $sponsor = Sponsor::find($id);
        if (!$sponsor) {
            return ApiResponse::error(null, "Sponsor not found", 404);
        }

        $valid = $sponsor->end_date;

        if ($type == 'active') {
            if (strtotime('now') < $valid) {
                $sponsor->status = 1;
                $sponsor->save();
                return ApiResponse::success($sponsor, "Ad activated successfully", 200);
            } else {
                return ApiResponse::error(null, "Ad date expired", 400);
            }
        } else {
            if (strtotime('now') < $valid) {
                $sponsor->status = 0;
                $sponsor->save();
                return ApiResponse::success($sponsor, "Ad deactivated successfully", 200);
            } else {
                return ApiResponse::error(null, "Ad date expired", 400);
            }
        }
    }
}