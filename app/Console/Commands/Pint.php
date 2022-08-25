<?php

namespace App\Console\Commands;

use App\Services\Pint\Installer;

class Pint extends Command
{
    protected $signature = 'pint:init';

    protected $description = 'Initialization of Laravel Pint on git pre-commit hook';

    public function handle(): int
    {
        $installer = new Installer();

        $installer->install();

        return 0;
    }
}
