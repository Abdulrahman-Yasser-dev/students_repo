<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('courses')->insert([
            [
                'title' => 'دورة تطوير الويب المتقدمة',
                'location' => 'مقر الأكاديمية - الرياض',
                'description' => 'دورة شاملة لتعلم Laravel وReact مع تطبيقات عملية متقدمة.',
                'start_at' => '2025-08-01',
                'end_at' => '2025-08-30',
                'time_start' => '17:00:00',
                'time_end' => '20:00:00',
                'seats' => 20,
                'price' => 950.00,
                'gender' => 'boy',
                'image' => 'courses/web-advanced.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'دورة تصميم الجرافيك للمبتدئين',
                'location' => 'عن بُعد (أونلاين)',
                'description' => 'تعلم أساسيات التصميم باستخدام Photoshop وIllustrator للمبتدئين.',
                'start_at' => '2025-08-05',
                'end_at' => '2025-09-05',
                'time_start' => '18:00:00',
                'time_end' => '19:30:00',
                'seats' => 30,
                'price' => 500.00,
                'gender' => 'girl',
                'image' => 'courses/graphic-basics.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'دورة تحليل البيانات باستخدام Excel وPower BI',
                'location' => 'مركز التدريب - جدة',
                'description' => 'اكتسب مهارات تحليل البيانات باستخدام أدوات مايكروسوفت.',
                'start_at' => '2025-09-01',
                'end_at' => '2025-09-25',
                'time_start' => '16:00:00',
                'time_end' => '19:00:00',
                'seats' => 15,
                'price' => 750.00,
                'gender' => 'boy',
                'image' => 'courses/data-analysis.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
