<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Blogcategory;
use App\Models\Friendships;
use App\Models\Comments;
use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Image, Session, Share;
use App\Helpers\ApiResponse; // Import the ApiResponse helper

class BlogController extends Controller
{
    public function blogs()
    {
        $categories = Blogcategory::all();
        $blogs = Blog::orderBy('id', 'DESC')->limit('10')->get();

        return ApiResponse::success([
            'categories' => $categories,
            'blogs' => $blogs,
        ], 'Blogs fetched successfully');
    }

    public function myblog()
    {
        $blogs = Blog::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->get();
        return ApiResponse::success($blogs, 'User blogs fetched successfully');
    }

    public function create()
    {
        $blog_category = Blogcategory::all();
        return ApiResponse::success($blog_category, 'Blog categories fetched successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/blog/thumbnail', 370);
            FileUploader::upload($request->image, 'public/storage/blog/coverphoto/' . $file_name, 900);
        }

        $blog = new Blog();
        $blog->user_id = Auth::user()->id;
        $blog->title = $request->title;
        $blog->category_id = $request->category;
        $tags = json_decode($request->tag, true);
        $tag_array = [];

        if (is_array($tags)) {
            foreach ($tags as $key => $tag) {
                $tag_array[$key] = $tag['value'];
            }
        }

        $blog->tag = json_encode($tag_array);
        $blog->description = $request->description;

        if ($request->image && !empty($request->image)) {
            $blog->thumbnail = $file_name;
        }

        $blog->view = json_encode([]);
        $blog->save();

        return ApiResponse::success($blog, 'Blog created successfully', 201);
    }

    public function edit($id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return ApiResponse::error(null, 'Blog not found', 404);
        }

        $blog_category = Blogcategory::all();
        return ApiResponse::success([
            'blog' => $blog,
            'blog_category' => $blog_category,
        ], 'Blog data fetched successfully');
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($validator->fails()) {
            return ApiResponse::error($validator->errors(), 'Validation failed', 422);
        }

        $blog = Blog::find($id);
        if (!$blog) {
            return ApiResponse::error(null, 'Blog not found', 404);
        }

        if ($request->image && !empty($request->image)) {
            $file_name = FileUploader::upload($request->image, 'public/storage/blog/thumbnail', 370);
            FileUploader::upload($request->image, 'public/storage/blog/coverphoto/' . $file_name, 900);
        }

        $imagename = $blog->thumbnail;

        $blog->title = $request->title;
        $blog->category_id = $request->category;
        $tags = json_decode($request->tag, true);
        $tag_array = [];

        if (is_array($tags)) {
            foreach ($tags as $key => $tag) {
                $tag_array[$key] = $tag['value'];
            }
        }

        $blog->tag = json_encode($tag_array);
        $blog->description = $request->description;

        if (!empty($request->image)) {
            $blog->thumbnail = $file_name;
        }

        $blog->save();

        if (!empty($request->image)) {
            removeFile('blog', $imagename);
        }

        return ApiResponse::success($blog, 'Blog updated successfully');
    }

    public function delete($id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return ApiResponse::error(null, 'Blog not found', 404);
        }

        $imagename = $blog->thumbnail;
        $blog->delete();

        if ($imagename) {
            removeFile('blog', $imagename);
        }

        return ApiResponse::success(null, 'Blog deleted successfully');
    }

    public function load_blog_by_scrolling(Request $request)
    {
        $blogs = Blog::orderBy('id', 'DESC')->skip($request->offset)->take(6)->get();
        return ApiResponse::success($blogs, 'Blogs fetched successfully');
    }

    public function single_blog($id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return ApiResponse::error(null, 'Blog not found', 404);
        }

        $comments = Comments::where('is_type', 'blog')->where('id_of_type', $id)->get();
        $socailshare = Share::currentPage()
            ->facebook()
            ->twitter()
            ->linkedin()
            ->telegram()
            ->getRawLinks();

        $blog_view_data = json_decode($blog->view);
        if (!in_array(auth()->user()->id, $blog_view_data)) {
            array_push($blog_view_data, auth()->user()->id);
            $blog->view = json_encode($blog_view_data);
            $blog->save();
        }

        $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)->get();

        $categories = Blogcategory::all();
        $recent_posts = Blog::orderBy('id', 'DESC')->limit('5')->get();

        return ApiResponse::success([
            'blog' => $blog,
            'comments' => $comments,
            'socailshare' => $socailshare,
            'friendships' => $friendships,
            'categories' => $categories,
            'recent_posts' => $recent_posts,
        ], 'Single blog fetched successfully');
    }

    public function category_blog($category)
    {
        $categories = Blogcategory::all();
        $blogs = Blog::where('category_id', $category)->get();

        return ApiResponse::success([
            'categories' => $categories,
            'blogs' => $blogs,
        ], 'Category blogs fetched successfully');
    }

    public function search()
    {
        $search = $_GET['search'];
        $posts = Blog::where('title', 'LIKE', '%' . $search . "%")->get();

        if ($posts->isEmpty()) {
            return ApiResponse::error(null, 'No posts found', 404);
        }

        return ApiResponse::success($posts, 'Search results fetched successfully');
    }
}