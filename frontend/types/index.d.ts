import Pusher from 'pusher-js';

export {};

declare global {
    interface Window {
        Pusher: Pusher;
    }
}
