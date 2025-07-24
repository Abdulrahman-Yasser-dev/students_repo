<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|regex:/^05[0-9]{8}$/|unique:students,phone',
            'gender' => 'required|in:boy,girl',
            'study_method' => 'required|string',
        ]);

        $student = Student::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'gender' => $validated['gender'],
            'study_method' => $validated['study_method'],
            'statues' => 'pending',
        ]);

        return response()->json([
            'message' => 'تم التسجيل بنجاح. في انتظار التحقق.',
            'student_id' => $student->id
        ]);
    }
}
