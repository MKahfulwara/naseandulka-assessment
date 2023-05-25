<?php
namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function store(Request $request)
    {
    	// dd($request->address);
        $request->validate([
            'name' => 'required',
        ]);

        Supplier::create([
        	'name' => $request->name,
            'address' => $request->address,
        	]);
        return Response(['status' => 200,'message' => 'Supplier created successfully'],200);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'nullable',
        ]);

        $supplier->update($request->all());

        return Response(['status' => 200,'message' => 'Supplier created Successfully'],200);
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return Response(['status' => 200,'message' => 'Supplier deleted Successfully'],200);
       
    }
}
