// animation globals
        var frameInterval = 25; // in ms
        var canvas = null; // canvas DOM object
        var context = null; // canvas context
        var intervalId;
        // ball globals
        var ballRadius = 30;

        // physics globals
        var floorFriction = 0.0005 * frameInterval;

        var ball = null;

        function Ball(x,y,vx,vy,color) {
            this.x=x;
            this.y=y;
            this.vx=vx;
            this.vy=vy;
            this.color=color;
        }

        function init() {
            canvas=document.getElementById("myCanvas");
            context=canvas.getContext("2d");
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight - 60;
            initStageObjects();
            clearInterval(intervalId);
            intervalId = setInterval(updateStage, frameInterval);
        }

        function updateStage() {
            clearCanvas();
            updateStageObjects();
            drawStageObjects();
        }

        function initStageObjects() {
            var white="#B8E1F2";

            ball = new Ball(210,81,0,0,white);
        }

        function drawStageObjects() {
            context.beginPath();
            context.arc(ball.x,ball.y,ballRadius,
                    0,2*Math.PI,false);
            context.fillStyle=ball.color;
            context.fill();
        }


        function updateStageObjects() {

            // set ball position based on velocity
            ball.y+=ball.vy;
            ball.x-=ball.vx;

            // floor friction
            if (ball.vx>0) {
                ball.vx-=floorFriction;
            }
            else if (ball.vx<0) {
                ball.vx+=floorFriction;
            }
            if (ball.vy>0) {
                ball.vy-=floorFriction;
            }
            else if (ball.vy<0) {
                ball.vy+=floorFriction;
            }

            // floor condition
            if (ball.y > (canvas.height-ballRadius)) {
                ball.y=canvas.height-ballRadius-2;
                ball.vy=0;
            }

            // ceiling condition
            if (ball.y < (ballRadius)) {
                ball.y=ballRadius+2;
                ball.vy=0;

            }

            // right wall condition
            if (ball.x > (canvas.width-ballRadius)) {
                ball.x=canvas.width-ballRadius-2;
                ball.vx=0;

            }

            // left wall condition
            if (ball.x < (ballRadius)) {
                ball.x=ballRadius+2;
                ball.vx=0;

            }

        }

        function clearCanvas() {
            context.clearRect(0,0,canvas.width, canvas.height);
        }

        
        
        // The watch id references the current `watchAcceleration`
        var watchID = null;

        // Start watching the acceleration
        //
        function startWatch() {

            // Update acceleration every 3 seconds
            var options = { frequency: 100 };

            watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        }
        
        function stopWatch() {
            if (watchID) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
        }

        // onSuccess: Get a snapshot of the current acceleration
        //
        function onSuccess(acceleration) {
            ball.vx = acceleration.x;
            ball.vy = acceleration.y;
          }

        // onError: Failed to get the acceleration
        //
        function onError() {
            alert('Cannot get accelerometer');
        }

$(document).on('pageshow', '#accelerometer' ,function(){
            var screenHeight = $(".ui-page").height();
            $("#accelContainer").css('height', screenHeight);
            init();
            stopWatch();
            startWatch();
        });   