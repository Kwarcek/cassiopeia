<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class TestEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public function __construct(private User $user)
    {
        //
    }

    public function broadcastOn(): PrivateChannel
    {
        return new PrivateChannel('User.' . $this->user->id);
    }
}
