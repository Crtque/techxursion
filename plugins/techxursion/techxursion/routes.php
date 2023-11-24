<?php

use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;


Route::prefix('api/message')->group(function () {
    Route::post('', function (Request $request) {
        $requestJson = $request->getContent();
      
        $requestArr = json_decode($requestJson,true);
      
        $message = new \Techxursion\Techxursion\Models\Message;
        $message->text = $requestArr['msg'];
        $message->user_id = $requestArr['user_id'];
        $message->anon = $requestArr['anon'];
        $message->save();
        if(!$message->anon) {
            $user = Winter\User\Models\User::find($message->user_id);
            return response()->json(["name"=>$user->name]);
        }
        return response()->json(["name"=>""]);
    });

    Route::get('', function (Request $request) {
        Log::debug($request);
        return response()->json(["get"]);
    });

    Route::get('all', function (Request $request) {
        Log::debug($request);
        return response()->json(["get_all"]);
    });

});

