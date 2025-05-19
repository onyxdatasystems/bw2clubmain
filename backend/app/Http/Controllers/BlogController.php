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
use Image, Session,Share;

class BlogController extends Controller
{
    function __construct(){
        $this->middleware(function ($request, $next) {
            $this->user = Auth()->user();
            return $next($request);
        });
    }

    public function index()
    {
        $blogs = Blog::with('category')
            ->orderBy('id', 'DESC')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $blogs,
            'categories' => Blogcategory::all()
        ]);
    }

    public function userBlogs(){
        $blogs = Blog::where('user_id', $this->user->id)
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|max:255',
            'category' => 'required',
        ]);

        if ($request->image && !empty($request->image)) {

            $file_name = FileUploader::upload($request->image, 'public/storage/blog/thumbnail', 370);
            FileUploader::upload($request->image, 'public/storage/blog/coverphoto/'.$file_name, 900);
        }

        $blog = new Blog();
        $blog->user_id = Auth::user()->id;
        $blog->title = $request->title;
        $blog->category_id = $request->category;
        $tags =  json_decode($request->tag,true);
        $tag_array = array();
        if(is_array($tags)){
            foreach($tags as $key => $tag){
                $tag_array[$key]=$tag['value'];
            }
        }
        $blog->tag = json_encode($tag_array);
        $blog->description = $request->description;
        if($request->image && !empty($request->image)){
            $blog->thumbnail = $file_name;
        }
        $blog->view = json_encode(array());
        $blog->save();

        return response()->json([
            'success' => true,
            'message' => get_phrase('Blog Created Successfully'),
            'data' => $blog
        ]);
    }

    public function update(Request $request,$id){
        
        $request->validate([
            'title' => 'required|max:255',
            'category' => 'required',
            'description' => 'sometimes',
            'image' => 'nullable|image|max:2048',
            'tags' => 'nullable|array'
        ]);
        $blog = Blog::find($id);

        if ($request->image && !empty($request->image)) {

            $file_name = FileUploader::upload($request->image, 'public/storage/blog/thumbnail', 370);
            FileUploader::upload($request->image, 'public/storage/blog/coverphoto/'.$file_name, 900);

            $imagename = $blog->thumbnail;
            removeFile('blog', $imagename);
        }

        $data = $request->only(['title', 'category_id', 'description']);
        $blog->user_id = Auth::user()->id;
        !empty($request->image) ? $blog->thumbnail =  $file_name : $blog->thumbnail;
        $data['tag'] = json_encode($request->tags ?? []);

        $blog->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog
        ]);
    }

    public function delete($id){
        $blog = Blog::where('user_id', Auth::id())->findOrFail($id);

        if ($blog->thumbnail) {
            Storage::disk('public')->delete($blog->thumbnail);
        }

        $blog->delete();

        return response()->json([
            'success' => true,
            'message' => 'Blog deleted successfully'
        ]);
    }



    public function loadMore(Request $request){
        $blogs = Blog::orderBy('id', 'DESC')
            ->skip($request->offset)
            ->take(6)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);
    }



    public function show($id){
        $response['comments'] = Comments::where('is_type','blog')->where('id_of_type',$id)->get();
        $response['socailshare'] = Share::currentPage()
                            ->facebook()
                            ->twitter()
                            ->linkedin()
                            ->telegram()->getRawLinks();
        $blog = Blog::find($id);
        $blog_view_data = json_decode($blog->view);
        if (!in_array(auth()->user()->id, $blog_view_data)){
            // $blog_view_data == "" ? $blog_view_data = json_encode(array()) : json_encode($blog_view_data);
            array_push($blog_view_data, auth()->user()->id);
            $blog->view =  json_encode($blog_view_data);
            $blog->save();
        }


         // New
         $friendships = Friendships::where(function ($query) {
            $query->where('accepter', auth()->user()->id)
                ->orWhere('requester', auth()->user()->id);
        })
            ->where('is_accepted', 1)
            ->orderBy('friendships.importance', 'desc')
            ->take(15)->get();

        $response['friendships'] = $friendships;
    //new

        $response['blog'] = $blog;
        $response['categories'] = Blogcategory::all();
        $response['recent_posts'] = Blog::orderBy('id','DESC')->limit('5')->get();

        return response()->json([
            'success' => true,
            'data' => $response,
            'message' => 'Data fetched'
        ], 201);
    }


    public function category_blog($categoryId)
    {
        $blogs = Blog::where('category', $categoryId)
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $blogs,
            'category' => Blogcategory::find($categoryId)
        ]);
    }



    // blog search
    public function search(Request $request){

        $request->validate(['search' => 'required|string']);

        $blogs = Blog::where('title', 'like', '%'.$request->search.'%')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $blogs
        ]);


    }













}
