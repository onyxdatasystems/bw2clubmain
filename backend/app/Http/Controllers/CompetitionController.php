<?php

namespace App\Http\Controllers;


use App\Models\FileUploader;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Image, Session,Share;

class CompetitionController extends Controller
{
    public function ongoing()
    {
        return Competition::where('status', 'ongoing')->get();
    }

    public function upcoming()
    {
        return Competition::where('status', 'upcoming')->get();
    }

    public function past()
    {
        return Competition::where('status', 'past')->get();
    }
}