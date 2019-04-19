<?php
namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Invitation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $name)
    {
        $this->user = $user;
        $this->name = $name;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.invitation');
    }
}
