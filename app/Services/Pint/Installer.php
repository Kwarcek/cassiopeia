<?php

namespace App\Services\Pint;

class Installer
{
    private const BASH_SCRIPT = 'https://gist.githubusercontent.com/ogorzalka/2d355e35c9308cd274ce3232de4cd19c/raw/570166574382b71c59e8803d7343143979d13c61/pre-commit.sh';

    public function install(): bool
    {
        if (! is_dir($this->getGitHookDirectoryPath())) {
            throw new \Exception('Not a git repository');
        }

        if (file_exists($this->getCurrentPreCommitFilePath())) {
            $this->copyCurrentPreCommitFile();
        }

        $process = copy(
            self::BASH_SCRIPT,
            $this->getGitHookDirectoryPath().DIRECTORY_SEPARATOR.'pre-commit'
        );

        if ($process === false) {
            throw new \Exception('Copying process failed');
        }

        shell_exec('chmod +x '.$this->getGitHookDirectoryPath().DIRECTORY_SEPARATOR.'pre-commit');

        return true;
    }

    private function copyCurrentPreCommitFile(): bool
    {
        $gitHookPath = $this->getGitHookDirectoryPath().DIRECTORY_SEPARATOR;

        return copy(
            $gitHookPath.'pre-commit',
            $gitHookPath.now()->toDateTimeString().'_pre-commit'
        );
    }

    private function getCurrentPreCommitFilePath(): string
    {
        return $this->getGitHookDirectoryPath().DIRECTORY_SEPARATOR.'pre-commit';
    }

    private function getGitHookDirectoryPath(): string
    {
        return base_path().DIRECTORY_SEPARATOR.'.git'.DIRECTORY_SEPARATOR.'hooks';
    }
}
