<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\Event;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\Reminder;


class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        \Log::info('In Kernel schedule function');
        $reminder = DB::table('events')
                        ->join('list_of_participants', 'list_of_participants.event', 'events.id')
                        ->join('users' , 'list_of_participants.participant', '=','users.id' )

                        ->select('users.email AS email', 'users.name AS name', 'events.name AS eventName','events.date_event', 'events.id')
                        ->where('events.reminder', '<=', 'NOW()')
                        ->where('list_of_participants.reminded', 'false')
                        ->get();

                    DB::table('list_of_participants')
                        ->join('events', 'list_of_participants.event', 'events.id')
                        ->where('events.reminder', '<=', 'NOW()')
                        ->update(['reminded' => 'true']);

        foreach ($reminder as $reminders) {
            \Log::info($reminders->email);
            Mail::to($reminders->email)->send(new Reminder($reminders));
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
