<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
class Reminder extends Mailable
{
    use Queueable, SerializesModels;

    public $reminders;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($reminders)
    {
        $this->reminders = $reminders;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.reminder');
    }
}