<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;
use Validator;
class UserController extends Controller
{
    //
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $payload = [
            'password'=>\Hash::make($request->password),
            'email'=>$request->email,
            'name'=>$request->name,
        ];
        $user = new User($payload);
        if ($user->save())
        {
            $response = ['success'=>true,'message'=>'Register Successfully'];
        }
        else
            $response = ['success'=>false, 'data'=>'Register Failed'];

        return response()->json($response, 200);
    }
}
