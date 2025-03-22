<?php

namespace App\Http\Controllers;

use App\Models\Marketplace;
use App\Models\Media_files;
use App\Models\SavedProduct;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Image;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class MarketplaceController extends Controller
{
    public function allproducts()
    {
        $products = Marketplace::orderBy('id', 'DESC')->limit('10')->get();
        return ApiResponse::success($products, "Products retrieved successfully", 200);
    }

    public function userproduct()
    {
        $products = Marketplace::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->get();
        return ApiResponse::success($products, "User products retrieved successfully", 200);
    }

    public function store(Request $request)
    {
        $rules = array(
            'title' => 'required|max:255',
            'price' => 'required',
            'location' => 'required',
            'condition' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $marketplace = new Marketplace();
        $marketplace->user_id = auth()->user()->id;
        $marketplace->title = $request->title;
        $marketplace->currency_id = $request->currency;
        $marketplace->price = $request->price;
        $marketplace->location = $request->location;
        $marketplace->category = $request->category;
        $marketplace->condition = $request->condition;
        $marketplace->brand = $request->brand;
        $marketplace->buy_link = $request->buy_link;
        $marketplace->status = $request->status;
        $marketplace->description = $request->description;
        $marketplace->save();
        $product_id = $marketplace->id;

        if ($product_id) {
            if (is_array($request->multiple_files) && $request->multiple_files[0] != null) {
                $rules = array('multiple_files' => 'mimes:jpeg,jpg,png,gif');
                $validator = Validator::make($request->multiple_files, $rules);
                if ($validator->fails()) {
                    return ApiResponse::error($validator->errors(), "File validation failed", 422);
                }

                foreach ($request->multiple_files as $key => $media_file) {
                    $file_name = FileUploader::upload($media_file, 'public/storage/marketplace/thumbnail', 315);
                    FileUploader::upload($media_file, 'public/storage/marketplace/coverphoto/' . $file_name, 315);

                    $file_type = 'image';

                    $media_file_data = array(
                        'user_id' => auth()->user()->id,
                        'product_id' => $product_id,
                        'file_name' => $file_name,
                        'file_type' => $file_type,
                        'created_at' => time(),
                        'updated_at' => time(),
                    );
                    Media_files::create($media_file_data);

                    if ($key == '0') {
                        $productupdate = Marketplace::find($product_id);
                        $productupdate->image = $file_name;
                        $productupdate->save();
                    }
                }
            }
            return ApiResponse::success(null, "Marketplace product added successfully", 201);
        }
        return ApiResponse::error(null, "Failed to add product", 500);
    }

    public function update(Request $request, $id)
    {
        $rules = array(
            'title' => 'required|max:255',
            'price' => 'required',
            'location' => 'required',
            'condition' => 'required',
            'status' => 'required',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), "Validation failed", 422);
        }

        $marketplace = Marketplace::find($id);
        if (!$marketplace) {
            return ApiResponse::error(null, "Product not found", 404);
        }

        $marketplace->user_id = auth()->user()->id;
        $marketplace->title = $request->title;
        $marketplace->currency_id = $request->currency;
        $marketplace->price = $request->price;
        $marketplace->location = $request->location;
        $marketplace->category = $request->category;
        $marketplace->condition = $request->condition;
        $marketplace->brand = $request->brand;
        $marketplace->status = $request->status;
        $marketplace->description = $request->description;
        $marketplace->save();

        if (is_array($request->multiple_files) && $request->multiple_files[0] != null) {
            $rules = array('multiple_files' => 'mimes:jpeg,jpg,png,gif');
            $validator = Validator::make($request->multiple_files, $rules);
            if ($validator->fails()) {
                return ApiResponse::error($validator->errors(), "File validation failed", 422);
            }

            // Delete previous files
            $previousFiles = Media_files::where('product_id', $id)->get();
            foreach ($previousFiles as $previousFile) {
                removeFile('marketplace', $previousFile->file_name);
                $previousFile->delete();
            }

            // Upload new files
            foreach ($request->multiple_files as $key => $media_file) {
                $file_name = FileUploader::upload($media_file, 'public/storage/marketplace/thumbnail', 315);
                FileUploader::upload($media_file, 'public/storage/marketplace/coverphoto/' . $file_name, 315);

                $file_type = 'image';

                $media_file_data = array(
                    'user_id' => auth()->user()->id,
                    'product_id' => $id,
                    'file_name' => $file_name,
                    'file_type' => $file_type,
                    'created_at' => time(),
                    'updated_at' => time(),
                );
                Media_files::create($media_file_data);

                if ($key == '0') {
                    $marketplace->image = $file_name;
                    $marketplace->save();
                }
            }
        }
        return ApiResponse::success(null, "Marketplace product updated successfully", 200);
    }

    public function product_delete($id)
    {
        $market = Marketplace::find($id);
        if (!$market) {
            return ApiResponse::error(null, "Product not found", 404);
        }

        $imagename = $market->image;
        $done = $market->delete();
        if ($done) {
            removeFile('marketplace', $imagename);
            return ApiResponse::success(null, "Product deleted successfully", 200);
        }
        return ApiResponse::error(null, "Failed to delete product", 500);
    }

    public function load_product_by_scrolling(Request $request)
    {
        $products = Marketplace::orderBy('id', 'DESC')->skip($request->offset)->take(6)->get();
        return ApiResponse::success($products, "Products loaded successfully", 200);
    }

    public function single_product($id)
    {
        $product = Marketplace::find($id);
        if (!$product) {
            return ApiResponse::error(null, "Product not found", 404);
        }

        $related_products = Marketplace::where('brand', $product->brand)->orWhere('category', $product->category)->get();
        $product_images = Media_files::where('product_id', $id)->where('file_type', 'image')->get();

        $data = [
            'product' => $product,
            'related_products' => $related_products,
            'product_images' => $product_images,
        ];
        return ApiResponse::success($data, "Product details retrieved successfully", 200);
    }

    public function filter()
    {
        $search = $_GET['search'] ?? null;
        $condition = $_GET['condition'] ?? null;
        $min = $_GET['min'] ?? null;
        $max = $_GET['max'] ?? null;
        $location = $_GET['location'] ?? null;

        $query = Marketplace::where('status', 1);

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        if ($condition) {
            $query->where('condition', $condition);
        }

        if ($min) {
            $query->where('price', '>=', $min);
        }

        if ($max) {
            $query->where('price', '<=', $max);
        }

        if ($location) {
            $query->where('location', 'like', '%' . $location . '%');
        }

        $products = $query->get();
        return ApiResponse::success($products, "Filtered products retrieved successfully", 200);
    }

    public function saved_product()
    {
        $saved_products = SavedProduct::all();
        return ApiResponse::success($saved_products, "Saved products retrieved successfully", 200);
    }

    public function save_for_later($id)
    {
        $saveproduct = new SavedProduct();
        $saveproduct->user_id = auth()->user()->id;
        $saveproduct->product_id = $id;
        $saveproduct->save();

        return ApiResponse::success(null, "Product saved successfully", 201);
    }

    public function unsave_for_later($id)
    {
        $done = SavedProduct::where('product_id', $id)->where('user_id', auth()->user()->id)->delete();
        if ($done) {
            return ApiResponse::success(null, "Product unsaved successfully", 200);
        }
        return ApiResponse::error(null, "Failed to unsave product", 500);
    }

    public function single_product_ifrane($id)
    {
        $product = Marketplace::find($id);
        if (!$product) {
            return ApiResponse::error(null, "Product not found", 404);
        }

        $product_images = Media_files::where('product_id', $id)->where('file_type', 'image')->get();

        $data = [
            'product' => $product,
            'product_images' => $product_images,
        ];
        return ApiResponse::success($data, "Product details retrieved successfully", 200);
    }
}