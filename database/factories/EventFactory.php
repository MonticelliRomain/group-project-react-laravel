<?php

use Faker\Generator as Faker;

$factory->define(App\Event::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence(),
        'date_event' => $faker->dateTime(),
        'description' => $faker->text(),
        'reminder' => $faker->dateTime(),
        'author' =>factory ('App\User')->create()->id,
        'media_type' => 'image',
        'image_url' => 'https://zupimages.net/up/19/15/xpo1.png'
    ];
});
