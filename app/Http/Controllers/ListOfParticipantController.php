<?php
namespace App\Http\Controllers;

use App\listOfParticipant;
use App\Event;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ListOfParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $participants = listOfParticipant::all();
        return response()->json($participants);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Event $event)
    {
        
        $userEvent = new listOfParticipant;
        $test = json_decode(DB::table('list_of_participants')
        ->select('participant')
        ->where('event', '=', $event->id)
        ->get());
        
        if ($test != NULL && ($test[0]->participant === auth('api')->user()->id)) {
            return response()->json([
                'message' => 'You are already suscribed!']);
        }
        $userEvent['event'] = $event->id;
        $userEvent['participant'] = auth('api')->user()->id;
        $userEvent->save();


        return response()->json([
            'message' => 'Inscription successful'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\listOfParticipant  $listOfParticipant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $unsub = DB::table('list_of_participants')
            ->where('participant','=', auth('api')->user()->id)
            ->where('event','=', $id)
            ->delete();

        return response()->json([
            "message" => "Record deleted"
        ]);
    }

    public function myParticipation(Request $request){
        
        $events = DB::table('list_of_participants')
            ->join('users','list_of_participants.participant', '=', 'users.id')
            ->join('events','list_of_participants.event', '=', 'events.id')
            ->select('events.*')
            ->where('list_of_participants.participant','=', auth('api')->user()->id)
            ->get();

        return $events;
    }
}
