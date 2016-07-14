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
var overlay = document.getElementById('video_overlay');
var overlayCC = overlay.getContext('2d');
document.getElementById('youtube_player').style.visibility = 'hidden';

/********** check and set up video/webcam **********/
function enablestart() {
    var startbutton = document.getElementById('startbutton');
    startbutton.value = "start";
    startbutton.disabled = null;
    var showbutton = document.getElementById('showplayer');
    showbutton.disabled = null;
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

vid.addEventListener('canplay', enablestart, false);
var today = new Date();
var day = parseInt(today.toISOString().replaceAll('-','').split('T')[0])
var data = 'emotion'
var path = data + '/' + today.toISOString().replaceAll(':','')
path = path.replaceAll('-','').replace('.','')
/*********** setup of emotion detection *************/
var last = ""; //["", "", "", ""];
var timestamp = ""; //["", "", "", ""];
var enames = ["angry", "sad", "surprised", "happy"]
var ctrack = new clm.tracker({useWebGL : true});
ctrack.init(pModel);

for (var i = 0;i < enames.length; i++) {
    // init firebase
    firebase.database().ref(path + '/' + enames[i]).set({
        localisation: [{
            sublocalisations: {
                localisation: [],
            },
            type: "segments",
            tcin: "00:00:00.0000",
            tcout: "00:60:00.0000",
            tclevel: 0
        }],
        id: enames[i],
        type: "segments",
        algorithm: "clmtrackr",
        processor: "R. Trachel",
        processed: day,
        version: 1
    });
}

function writeEmotionSegment(videoID, min, sec, ms) {
    if (last == "") {
        last = videoID
    }
    if (timestamp == "") {
        console.log('getting: ' + timestamp)
        timestamp = "00:".concat(min).concat(":").concat(sec).concat(".").concat(ms)
    } else {
        if (last == videoID) {
            // remember only the first time stamp
            console.log('not saving timestamp...')
        } else {
            console.log('writing timestamp' + timestamp)
            var ref = firebase.database().ref(path + '/' + videoID + '/localisation/0/sublocalisations/localisation');
            // sync down from server
            var list = [];
            ref.on('value', function(snap) { list = snap.val(); });
            // this is the correct way to change an array
            list.push({
                tcin: timestamp,
                tcout: "00:".concat(min).concat(":").concat(sec).concat(".").concat(ms),
                tclevel: 1
            });
            ref.set(list);
            console.log('writting: ' + timestamp)
            timestamp = "";
            last = "";
        }
    }
}

function startVideo() {
    // start video
    vid.play();
    // start tracking
    ctrack.start(vid);
    // start loop to draw face
    drawLoop();
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

function drawLoop() {
    requestAnimFrame(drawLoop);
    overlayCC.clearRect(0, 0, 400, 300);
    //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
    if (ctrack.getCurrentPosition()) {
        ctrack.draw(overlay);
    }
    var cp = ctrack.getCurrentParameters();
    var er = ec.meanPredict(cp);
    var player = videojs('youtube_player');
    var ts = player.currentTime();
    if (er) {
        updateData(er);
        for (var i = 0;i < er.length;i++) {
            if (er[i].value > 0.8) {
                // console.log(enames[i] + ': ' + er[i].value)
                var minnow = String(ts / 60).split('.')[0].pad(2);
                var secnow = String(ts).split('.')[0].pad(2);
                var msnow = String(String(ts).split('.')[1]).substr(0,4)
                writeEmotionSegment(enames[i], minnow, secnow, msnow);
                document.getElementById('icon'+(i+1)).style.visibility = 'visible';
            } else {
                document.getElementById('icon'+(i+1)).style.visibility = 'hidden';
            }
        }
    }
}

var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();    

/************ d3 code for barchart *****************/

var margin = {top : 20, right : 20, bottom : 10, left : 40},
    width = 400 - margin.left - margin.right,
    height = 100 - margin.top - margin.bottom;

var barWidth = 30;

var formatPercent = d3.format(".0%");

var x = d3.scale.linear()
    .domain([0, ec.getEmotions().length]).range([margin.left, width+margin.left]);

var y = d3.scale.linear()
    .domain([0,1]).range([0, height]);

var svg = d3.select("#emotion_chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

svg.selectAll("rect").
  data(emotionData).
  enter().
  append("svg:rect").
  attr("x", function(datum, index) { return x(index); }).
  attr("y", function(datum) { return height - y(datum.value); }).
  attr("height", function(datum) { return y(datum.value); }).
  attr("width", barWidth).
  attr("fill", "#2d578b");

svg.selectAll("text.labels").
  data(emotionData).
  enter().
  append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", function(datum) { return height - y(datum.value); }).
  attr("dx", -barWidth/2).
  attr("dy", "1.2em").
  attr("text-anchor", "middle").
  text(function(datum) { return datum.value;}).
  attr("fill", "white").
  attr("class", "labels");

svg.selectAll("text.yAxis").
  data(emotionData).
  enter().append("svg:text").
  attr("x", function(datum, index) { return x(index) + barWidth; }).
  attr("y", height).
  attr("dx", -barWidth/2).
  attr("text-anchor", "middle").
  attr("style", "font-size: 12").
  text(function(datum) { return datum.emotion;}).
  attr("transform", "translate(0, 18)").
  attr("class", "yAxis");

function updateData(data) {
    // update
    var rects = svg.selectAll("rect")
        .data(data)
        .attr("y", function(datum) { return height - y(datum.value); })
        .attr("height", function(datum) { return y(datum.value); });
    var texts = svg.selectAll("text.labels")
        .data(data)
        .attr("y", function(datum) { return height - y(datum.value); })
        .text(function(datum) { return datum.value.toFixed(1);});

    // enter 
    rects.enter().append("svg:rect");
    texts.enter().append("svg:text");

    // exit
    rects.exit().remove();
    texts.exit().remove();
}

/******** stats ********/
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
document.getElementById('vid_container').appendChild( stats.domElement );
// update stats on every iteration
document.addEventListener('clmtrackrIteration', function(event) {
    stats.update();
}, false);
