var xdata = [];
var ydata = [];
var data = 'gaze'
var today = new Date();
var path = data + '/' + today.toISOString().replaceAll(':','')
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

    var width = vid.width;//320;
    var height = vid.height; //240;
    var topDist = '0px';
    var leftDist = '0px';
    
    var setup = function() {
        var video = document.getElementById('webgazerVideoFeed');
        video.style.display = 'block';
        video.style.position = 'absolute';
        video.style.top = topDist;
        video.style.left = leftDist;
        video.width = width;
        video.height = height;
        video.style.margin = '0px';

        webgazer.params.imgWidth = width;
        webgazer.params.imgHeight = height;

        var overlay = document.createElement('canvas');
        overlay.id = 'overlay';
        overlay.style.position = 'absolute';
        overlay.width = width;
        overlay.height = height;
        overlay.style.top = topDist;
        overlay.style.left = leftDist;
        overlay.style.margin = '0px';

        document.body.appendChild(overlay);

        var cl = webgazer.getTracker().clm;

        function drawLoop() {
            requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,width,height);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
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