<?php

namespace App\Console;

use App\Console\Commands\AppInit;
use App\Console\Commands\Pint;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /** @var string[] */
    protected $commands = [
        Pint::class,
        AppInit::class
    ];

    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        require base_path('routes/console.php');
    }
}
