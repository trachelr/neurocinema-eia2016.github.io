
var video_player = document.getElementById("video_player");
var links = video_player.getElementsByTagName('a');
for (var i=0; i<links.length; i++) {
    links[i].onclick = handler;
}


function handler(e) {

    e.preventDefault();
    videotarget = this.getAttribute("href");
    filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
    video = document.querySelector("#video_player video");
    video.removeAttribute("controls");
    video.removeAttribute("poster");
    source = document.querySelectorAll("#video_player video source");
    source[0].src = filename + ".mp4";
    //source[1].src = filename + ".webm";
    video.load();
    video.play();

}