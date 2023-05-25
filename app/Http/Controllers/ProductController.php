<?php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Response(['status' => 'success','data' => $products],200);
    }

    public function create()
    {
        $suppliers = Supplier::all();
        $warehouses = Warehouse::all();


        return Response([
        	'status' => 'success',
        	'data' => [
                'suppliers' => $suppliers,
                'warehouses' => $warehouses,
            ],
        ],200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'nullable|numeric',
            'supplier_id' => 'required|exists:suppliers,id',
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        Product::create($request->all());

        return Response(['status' => 'success','message' => 'Product created Successfully'],200);
    }

    public function edit(Product $product)
    {
        $suppliers = Supplier::all();
        $warehouses = Warehouse::all();

        return response()->json([
            'status' => 'success',
            'data' => [
                'product' => $product,
                'suppliers' => $suppliers,
                'warehouses' => $warehouses,
            ],
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'nullable|numeric',
            'supplier_id' => 'required|exists:suppliers,id',
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        $product->update($request->all());
        return Response(['status' => 'success','message' => 'Product updated Successfully'],200);

    }

    public function destroy(Product $product)
    {
        $product->delete();
        return Response(['status' => 'success','message' => 'Product deleted Successfully'],200);
    }
}
