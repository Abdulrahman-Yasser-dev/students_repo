<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;
    protected $fillable = [
        'title',
        'location',
        'description',
        'start_at',
        'end_at',
        'time_start',
        'time_end',
        'seats',
        'price',
        'gender',
        'image',
    ];
}
