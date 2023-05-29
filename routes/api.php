<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->group(function(){
    Route::post('login','login');
    Route::post('register','register');
});

Route::controller(UserController::class)->group(function(){
    Route::post('logout','userLogout');
})->middleware('auth:api');

Route::controller(SupplierController::class)->group(function(){
    Route::post('addsupplier','store');
    Route::get('getsupplier','getData');
})->middleware('auth:api');

Route::controller(WarehouseController::class)->group(function(){
    Route::get('getallwarehouse','getData');
    Route::post('addwarehouse','store');
})->middleware('auth:api');

Route::controller(ProductController::class)->group(function(){
    Route::get('getallproducts','index');
    Route::post('addproduct','store');
})->middleware('auth:api');
