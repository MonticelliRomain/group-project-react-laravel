<?php

namespace Tests\Feature;

use App\Event;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class EventTest extends TestCase
{
   use DatabaseMigrations;

    /** @test */
    public function it_will_show_all_events()
    {
        $events = factory(Event::class, 10)->create();

        $response = $this->get(route('events.index'));

        $response->assertStatus(200);

        $response->assertJson($events->toArray());
    }

    /** @test */
    public function it_will_create_events()
    {
        $response = $this->post(route('events.store'), [
            'name'       => 'This is a title',
            'date_event' => '1985-12-12',
            'description' => 'This is a description'
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('events', [
            'name' => 'This is a title'
        ]);

        $response->assertJsonStructure([
            'message',
            'Event' => [
                'name',
                'date_event',
                'description',
                'updated_at',
                'created_at',
                'id'
            ]
        ]);
    }

    /** @test */
    public function it_will_show_a_event()
    {
        $this->post(route('events.store'), [
            'name'       => 'This is a title',
            'date_event' => '1985-12-12',
            'description' => 'This is a description'
        ]);

        $event = Event::all()->first();

        $response = $this->get(route('events.show', $event->id));

        $response->assertStatus(200);

        $response->assertJson($event->toArray());
    }

    /** @test */
    public function it_will_update_a_event()
    {
        $this->post(route('events.store'), [
            'name' => 'This is a title',
            'date_event' => '1985-12-12',
            'description' => 'This is a description'
        ]);

        $event = Event::all()->first();

        $response = $this->put(route('events.update', $event->id), [
            'name' => 'This is the updated title'
        ]);

        $response->assertStatus(200);

        $event = $event->fresh();

        $this->assertEquals('This is the updated title', $event->name);

        $response->assertJsonStructure([
           'message',
           'Event' => [
               'name',
               'date_event',
               'description',
               'updated_at',
               'created_at',
               'id'
           ]
       ]);
    }

    /** @test */
    public function it_will_delete_a_event()
    {
        $this->post(route('events.store'), [
            'name'       => 'This is a title',
            'date_event' => '1985-12-12',
            'description' => 'This is a description'
            'reminder'    => $faker->dateTimeAD()
            'author'      => factory ('App\User')->create()->id
    ];
        ]);

        $event = Event::all()->first();

        $response = $this->delete(route('events.destroy', $event->id));

        $event = $event->fresh();

        $this->assertNull($event);

        $response->assertJsonStructure([
            'message'
        ]);
    }
}


