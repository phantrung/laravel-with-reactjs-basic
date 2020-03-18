<?php

use App\Posts;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    const TOTAL_ITEM = 50;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $this->command->getOutput()->progressStart($this::TOTAL_ITEM);
        for ($i = 1; $i <= $this::TOTAL_ITEM; $i++) {
            Posts::create([
                'title' => $faker->name,
                'content' => $faker->paragraph,
                'user_id' => 2,
            ]);
            $this->command->getOutput()->progressAdvance();
        }

        $this->command->getOutput()->progressFinish();
    }
}
