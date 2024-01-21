<?php

namespace App\Console\Commands;

class AppInit extends Command
{
    protected $signature = 'app:init';

    protected $description = 'Initialization of Laravel App';

    public function handle(): int
    {
        $this->call('migrate', ['--force' => true]);
        $this->call('db:seed', ['--force' => true]);

        $this->info('Publishing horizon assets');
        $this->call('horizon:install');

        $this->info('Generating JWT Secret');
        $this->call('jwt:secret', ['--always-no' => true]);

        if(!$this->laravel->environment('production')) {
            $this->nonProductionInit();
        }

        return Command::SUCCESS;
    }

    private function nonProductionInit(): int
    {
        $this->call('pint:init');

        return 0;
    }
}
