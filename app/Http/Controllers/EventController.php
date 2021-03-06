<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\User;
use App\Mail\Invitation;
use App\Mail\InvitationToStranger;
use Illuminate\Support\Facades\Mail;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
                'image_url' => 'required',
                'image_url.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

         if($request->hasfile('image_url'))
         {
            $file = $request->file('image_url');
            $name=time().$file->getClientOriginalName();
            $file->move(public_path().'/images/', $name);
        }

        $params = $request->all();
        $params['author'] = auth('api')->user()->id;
        $event = Event::create($params);
        $event['author'] = $event->author()->get()[0];
        return response()->json([
            'message' => 'Event created',
            'event' => $event
        ]);
    }

    public function emailFriends(Request $request){

        $emails = $request->email;

        foreach($emails as $email) {
            $user =json_decode(User::where('email', '=', $email)->get());

            if($user !== []){
                Mail::to($email)->send(new Invitation($user));

            }

            else {
                Mail::to($email)->send(new InvitationToStranger());

            }
        }
        return response()->json([
            'message' => 'Le tilt'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ret['event'] = DB::table('events')
            ->join('users','users.id', '=', 'events.author')
            ->select('users.name as author', 'events.name', 'events.date_event', 'events.description', 'events.image_url', 'events.reminder', 'events.media_type', 'events.address')
            ->where('events.id', '=', $id)
            ->get();

        $ret['participants'] = DB::table('list_of_participants')
            ->join('users', 'users.id', '=','list_of_participants.participant')
            ->select('users.name as username', 'users.id')
            ->where('list_of_participants.event','=', $id)
            ->get();

        return $ret;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::update('update events set name = ?, date_event = ?, description = ?, reminder = ?, image_url = ? , address = ?, media_type = ? where id = ?',
        [$request->name, $request->date_event, $request->description, $request->reminder, $request->image_url,$request->address, $request->media_type, $id ]);
        return response()->json([
            'message' => 'Event updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Event deleted'
        ]);
    }

    public function myEvent(){
        $events = DB::table('events')
            ->where('author', auth('api')->user()->id)
            ->get();;
        return response()->json($events);
    }

    public function past(){
        $events = DB::table('events')
            ->join('users','users.id', '=', 'events.author')
            ->select('users.name as author', 'events.id', 'events.name', 'events.date_event', 'events.description', 'events.image_url', 'events.media_type')
            ->where('events.date_event', '<','NOW()')
            ->orderBy('events.date_event', 'desc')
            ->get();
        return response()->json($events);
    }

    public function futur(){
        $events = DB::table('events')
            ->join('users','users.id', '=', 'events.author')
            ->select('users.name as author', 'events.id', 'events.name', 'events.date_event', 'events.description', 'events.image_url', 'events.media_type')
            ->where('events.date_event', '>=','NOW()')
            ->orderBy('events.date_event', 'asc')
            ->get();

        return response()->json($events);
    }
}
