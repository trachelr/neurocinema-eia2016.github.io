// Initialize Firebase
var config = {
    apiKey: "AIzaSyBI1lAq_sWUkSyuw6_q9Tp4Xq57pTqQLUU",
    authDomain: "neurocinema-a859d.firebaseapp.com",
    databaseURL: "https://neurocinema-a859d.firebaseio.com",
    storageBucket: "neurocinema-a859d.appspot.com",
};
firebase.initializeApp(config);

var vid = document.getElementById('videoel');
var video_player = document.getElementById('youtube_player');
var video = document.querySelector("#youtube_player video");
var overlay = document.getElementById('overlay');
var overlayCC = overlay.getContext('2d');
document.getElementById('youtube_player').style.visibility = 'hidden';

var xdata = [];
var ydata = [];

var today = new Date();
var day = parseInt(today.toISOString().replaceAll('-','').split('T')[0])
var data = 'gaze'
var path = today.toISOString().replaceAll(':','') + '/' + data
path = path.replaceAll('-','').replace('.','')

// init firebase
firebase.database().ref(path).set({
    localisation: [{
        sublocalisations: {
            localisation: [],
        },
        label: "EllipseWithBoudingBox-1",
        tcin: "00:00:00.0000",
        tcout: "00:60:00.0000",
        tclevel: 0
    }],
    id: 'gaze-overlay',
    type: "visual_tracking",
    algorithm: "ridge",
    processor: "R. Trachel",
    processed: 0, //parseInt(path.split('T')[0]),
    version: 1
});
/********** check and set up video/webcam **********/

function enablestart() {
    var startbutton = document.getElementById('startbutton');
    startbutton.value = "start";
    startbutton.disabled = null;
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// check for camerasupport
if (navigator.getUserMedia) {
    // set up stream
    var videoSelector = {video : true};
    if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
        var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
        if (chromeVersion < 20) {
            videoSelector = "video";
        }
    };

    navigator.getUserMedia(videoSelector, function( stream ) {
        if (vid.mozCaptureStream) {
            vid.mozSrcObject = stream;
        } else {
            vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        vid.play();
    }, function() {
        //insertAltVideo(vid);
        alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
    });
} else {
    //insertAltVideo(vid);
    alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
}

function showPlayer() {
    video_player = videojs('youtube_player');
    document.getElementById('youtube_player').style.visibility = 'visible';
    // load video
    video_player.load();
    video_player.requestFullscreen();
    // start playing
    video_player.play();
}

function writeUserGaze(x, y, timestamp) {
    var ref = firebase.database().ref(path + '/localisation/0/sublocalisations/localisation');
    // sync down from server
    var list = [];
    ref.on('value', function(snap) { list = snap.val(); });
    x = x / viewportwidth;
    y = y / viewportheight;
    // this is the correct way to change an array
    list.push({
        shape: {
            t: "ellipse",
            c: {
                x: x,
                y: y
            },
            rx: 0.01,
            ry: 0.01,
            o: 0.0
        },
        tc: timestamp,
        tclevel: 1
    });
    ref.set(list);
}

window.onload = function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
        //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
        //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        if(!data)
            return;
        if (xdata.length == 10) {
            var ts = videojs('youtube_player').currentTime();
            var min = String(ts / 60).split('.')[0].pad(2);
            var sec = String(ts).split('.')[0].pad(2);
            var ms = String(String(ts).split('.')[1]).substr(0,4)
            timestamp = "00:".concat(min).concat(":").concat(sec).concat(".").concat(ms)
            if (ts > 0) {
                writeUserGaze(math.mean(xdata), math.mean(ydata), timestamp);
            }
            xdata = [];
            ydata = [];
        } else {
            xdata.push(data.x);
            ydata.push(data.y);
        }
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

        var width = 400;
        var height = 300;
        var topDist = '0px';
        var leftDist = '0px';
        
        var setup = function() {
            webgazer.params.imgWidth = width;
            webgazer.params.imgHeight = height;
            var cl = webgazer.getTracker().clm;

            function drawLoop() {
                requestAnimFrame(drawLoop);
            }
            drawLoop();
        };

        function checkIfReady() {
            if (webgazer.isReady()) {
                setup();
            } else {
                setTimeout(checkIfReady, 100);
            }
        }
        setTimeout(checkIfReady,100);
};

window.onbeforeunload = function() {
    //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    window.localStorage.clear(); //Comment out if you want to save data across different sessions 
}