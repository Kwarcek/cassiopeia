<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\App;

class Deploy extends Command
{
    protected $signature = 'app:deploy';

    protected $description = 'Deploy application';

    public function handle(): int
    {
        $this->call('migrate', ['--force' => true]);
        $this->call('db:seed', ['--force' => true]);

        $this->info('Publishing horizon assets');
        $this->call('horizon:install');

        $this->info('Generating JWT Secret');
        $this->call('jwt:secret', ['--always-no' => true]);

        if(!App::environment('production')) {
            $this->onlyForDevelopment();
        }

        return 0;
    }

    private function onlyForDevelopment(): int
    {
        $this->call('pint:init');
        return 0;
    }
}
