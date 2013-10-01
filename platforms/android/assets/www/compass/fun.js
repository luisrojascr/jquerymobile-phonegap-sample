        var compassInterval = 25; // in ms
        var compassCanvas = null; // canvas DOM object
        var compassContext = null; // canvas context
        var degree = null;
        var compass = null;

        function initCompassObjects() {
            compass = new Image();
            compass.src = "compass.png"
        }

        function updateCompassStage() {
            updateCompassObjects();
            drawCompassObjects();
        }

        function updateCompassObjects() {
            compassContext.save();
            compassContext.clearRect(0,0,compassCanvas.width, compassCanvas.height);
            compassContext.translate(175, 175);
            compassContext.rotate(degree * 0.0174532925199432957); //rotate
        }

        function drawCompassObjects() {
            compassContext.drawImage(compass,-175,-175, 350, 350);
            compassContext.restore();
        }

        function initCompass() {
            compassCanvas=document.getElementById("myCanvas");
            compassContext=compassCanvas.getContext("2d");
            initCompassObjects();
            setInterval(updateCompassStage, compassInterval);
        }

        // The watch id references the current `watchHeading`
        var watchCompassID = null;

        // Wait for device API libraries to load
        //
        // Start watching the compass
        //
        function startCompassWatch() {

            // Update compass 20 times per second
            var options = { frequency: 50 };

            watchCompassID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
        }

        // Stop watching the compass
        //
        function stopCompassWatch() {
            if (watchCompassID) {
                navigator.compass.clearWatch(watchCompassID);
                watchCompassID = null;
            }
        }

        // onSuccess: Get the current heading
        //
        function onCompassSuccess(heading) {
            degree = heading.magneticHeading;
        }

        // onError: Failed to get the heading
        //
        function onCompassError(compassError) {
            alert('Compass error: ' + compassError.code);
        }
        
        $(document).on('pageshow', '#compass' ,function(){
            var screenHeight = $(".ui-page").height();
            $("#compassContainer").css('height', screenHeight);
            initCompass();
            stopCompassWatch();
            startCompassWatch();
        });   