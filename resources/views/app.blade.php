<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
{{--    <meta name="csrf-token" value="{{ csrf_token() }}" />--}}

    <title>Laravel</title>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
</head>
<body class="antialiased">
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
