<?php
namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class WarehouseController extends Controller
{
	public function getData()
    {
        // $warehouses = Warehouse::all();
        $warehouses = Warehouse::join('suppliers', 'warehouses.supplier_id', '=', 'suppliers.id')
        ->select('warehouses.*', 'suppliers.name as supplier_name')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $warehouses,
        ]);
        return Response(['status' => 'success','data' => $warehouses],200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'supplier_id' => 'required',
            'address' => 'nullable',
        ]);

        Warehouse::create($request->all());

        return Response(['status' => 'success','message' => 'Warehouse created successfully'],200);
    }

    public function update(Request $request, Warehouse $warehouse)
    {
        $request->validate([
            'supplier_id' => 'required',
            'address' => 'nullable',
        ]);

        $warehouse->update($request->all());
        return Response(['status' => 'success','message' => 'Warehouse Updated successfully'],200);
      
    }

    public function destroy(Warehouse $warehouse)
    {
        $warehouse->delete();

        return redirect()->route('warehouses.index')->with('success', 'Warehouse deleted successfully');
    }
}
