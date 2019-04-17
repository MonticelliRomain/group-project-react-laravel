
<!DOCTYPE html>
    <html lang="{{ app()->getLocale() }}">
    <head>
    <link href="../images/pandab.jpg" rel="icon" type="image/jpg"  />
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>EventDab</title>
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">


        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
                integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
                 crossorigin=""/>

        <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css"/> -->
        
    </head>
    <body>
        <div id="example"></div>

        <script src="{{ asset('js/app.js') }}"></script>
        <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
        integrity="sha512-QVftwZFqvtRNi0ZyCtsznlKSWOStnDORoefr1enyq5mVL4tmKB3S/EnC3rRJcxCPavG10IcrVGSmPh6Qw5lwrg=="
        crossorigin=""></script>
    </body>
    </html>
