<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

</head>
<body class="antialiased">
    <div id="app"></div>
    @if(App::environment('production'))
        @vite
    @else
        <script type="module" src="http://localhost:5173/frontend/app.js"></script>
    @endif
</body>
</html>
