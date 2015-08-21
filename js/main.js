var _getAllFilesFromFolder = function(callBack) {
    var currentLocation = window.location.href;
    var locationSplit = currentLocation.split("/");
    delete locationSplit[(locationSplit.length-1)];
    var currentFolder = locationSplit.join("/");
    var xmlhttp;
    mp3List=[];
    if (window.XMLHttpRequest){
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }else{
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            //console.log(xmlhttp.responseText);
            var response = xmlhttp.responseText
            var wrapper= document.createElement('div');
            wrapper.innerHTML= response;
            var anchorTags = wrapper.getElementsByTagName("a");            
            for (i = 0; i < anchorTags.length; i++) {
                if(anchorTags[i].text.search(".mp3")>0){
                    mp3List.push(anchorTags[i].text);
                }                
            }
            callBack(mp3List);
        }
    }
    xmlhttp.open("GET",currentFolder+'audio/',true);
    xmlhttp.send();
};
//Used to get the result callback function after ajax call
_getAllFilesFromFolder(function (tracksList) {
    audioApp(tracksList);
});
function _(id){
	return document.getElementById(id);
}
function audioApp(tracksList){
    console.log(tracksList);
	var audio = new Audio();
	var audio_folder = "audio/";
	var audio_ext = ".mp3";
	var audio_index = 1;
	var is_playing = false;
	var playingtrack;
	var trackbox = _("trackbox");
	var tracks = {
	    "track1":["Track Number 1", "fast_lane"],
		"track2":["Track Number 2", "breathe"],
		"track3":["Track Number 3", "stranglehold"]
	};    
    for(var track in tracksList){
        console.log(tracksList[track]);
		var tb = document.createElement("div");
		var pb = document.createElement("button");
		var tn = document.createElement("div");
		tb.className = "trackbar";
		pb.className = "playbutton";
		tn.className = "trackname";
		tn.innerHTML = audio_index+". "+tracksList[track];
		pb.id = tracksList[track];
		pb.addEventListener("click", switchTrack);
		tb.appendChild(pb);
		tb.appendChild(tn);
		trackbox.appendChild(tb);
		audio_index++;
	}
	audio.addEventListener("ended",function(){
	    _(playingtrack).style.background = "url(images/playbtn.png)";
		playingtrack = "";
		is_playing = false;
	});
	function switchTrack(event){
		if(is_playing){
		    if(playingtrack != event.target.id){
			    is_playing = true;
				_(playingtrack).style.background = "url(images/playbtn.png)";
			    event.target.style.background = "url(images/pausebtn.png)";
			    audio.src = audio_folder+event.target.id;
	            audio.play();
			} else {
			    audio.pause();
			    is_playing = false;
				event.target.style.background = "url(images/playbtn.png)";
			}
		} else {
			is_playing = true;
			event.target.style.background = "url(images/pausebtn.png)";
			if(playingtrack != event.target.id){
				audio.src = audio_folder+event.target.id;
			}
	        audio.play();
		}
		playingtrack = event.target.id;
	}
}
//window.addEventListener("load", audioApp);
