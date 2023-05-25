<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    public function login(Request $request)
	{
	    $credentials = $request->only('email', 'password');

	    if (Auth::attempt($credentials)) {
	        // Authentication passed...
	        $user = Auth::user();
	        $token = $user->createToken('example')->accessToken;
	        return Response(['status' => 200,'token' => $token],200);
	    } else {
	        // Authentication failed...
	        return Response(['status' => 200,'message' => 'Invalid login credentials'],200);
	       
	    }

	}
	public function userLogout()
    {
        if(Auth::guard('api')->check()){
            $accessToken = Auth::guard('api')->user()->token();

                \DB::table('oauth_refresh_tokens')
                    ->where('access_token_id', $accessToken->id)
                    ->update(['revoked' => true]);
            $accessToken->revoke();

            return Response(['message' => 'User logout successfully.'],200);
        }
        return Response(['data' => 'Unauthorized'],401);
    }
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);
        //  dd($validatedData);
         // First of all define validation rules
        // $rules = [
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|unique:users|max:255',
        //     'password' => 'required|string|min:8|confirmed',
        // ];
        // // Define custom validation message for above validation
        // $messages = [
        //     'name.required' => 'name is Required',
        //     'email.required' => 'email is Required',
        //     'password.required' => 'password is Required',
        // ];
        // // This can check validation and return new error message if found
        // $validator = Validator::make($request->all(), $rules, $messages);
        // if ($validator->fails()) {
        //     return Response([
        //         'status' => false,
        //         'message' => 'Something Went Wrong',
        //         'data' => $validator->errors(),
        //         'status_code' => 422,
        //     ],422);
        // }

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Auth::login($user);

        
        return Response(['status' => 200,'message' => "User Created Successfully"],200);
        // return redirect('/dashboard');
    }
}
