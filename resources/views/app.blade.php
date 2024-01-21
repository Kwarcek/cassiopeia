<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

</head>
<body class="antialiased">
<div id="app"></div>
@production
    @php
        $manifest = json_decode(file_get_contents(public_path('dist/manifest.json')), true);
    @endphp
    <script type="module" src="/dist/{{ $manifest['resources/js/main.js']['file'] }}"></script>
    {{-- <link rel="stylesheet" href="/dist/{{ $manifest['resources/js/main.js']['css'][0] }}"> --}}
@endproduction
@env(['local', 'development', 'staging'])
    @php
        $devUrl = \Illuminate\Support\Facades\Config::get('vite.configs.default.dev_server.url');
    @endphp
    <script type="module" src="{{ "{$devUrl}/@@vite/client" }}"></script>
    <script type="module" src="{{ "{$devUrl}/frontend/main.js" }}"></script>
@endenv
</body>
</html>
