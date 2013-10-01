
 
        var onGeoSuccess = function(position) {

            var myLat = position.coords.latitude;
            var myLong = position.coords.longitude;

            //MAP
            var mapOptions = {
                center: new google.maps.LatLng(myLat, myLong),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(myLat, myLong),
                map: map,
                title: 'H'
            });
        }

        function onGeoError(error) {
            alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
        }
        
        $(document).on('pageshow', '#geolocation' ,function(){
            var screenHeight = $(".ui-page").height();
            $("#map_canvas").css('height', screenHeight);
            navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError,{'enableHighAccuracy':true,'timeout':10000});
        });   
        