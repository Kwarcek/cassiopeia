import Pusher from "pusher-js"
import Echo from "laravel-echo"

export {}

declare global {
    interface Window {
        Pusher: Pusher
        Echo: Echo
    }
}

export interface Ability {
    ability: string,
    permission: string,
}
