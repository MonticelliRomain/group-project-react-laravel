<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Event extends Model
{
    protected $fillable = [
        'name',
        'date_event',
        'author',
        'description',
        'address',
        'reminder',
        'image_url',
        'media_type'
    ];

    public function author(){
        return $this->belongsTo('App\User', 'author');
    }

    public function users(){
        return $this->belongsToMany('App\User', 'listOfParticipant');
    }
}
