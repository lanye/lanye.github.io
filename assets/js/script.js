document.oncontextmenu = function() {return false;}
function playmusic(str){
 var strarr = ['gh','master','net','cdn','https','lanyeaudio','jsdelivr','/',':','mp3','.','lanye'];
 var playbox = document.getElementById('audioBox');
 if(playbox.style.display=='none'){	
  $(str).removeClass('fa-play').addClass('fa-pause');
  var arr = [];
  for(i=1;i<45;i++){
     arr.push(strarr[4]+strarr[8]+strarr[7]+strarr[7]+strarr[3]+strarr[10]+strarr[6]+strarr[10]+strarr[2]+strarr[7]+strarr[0]+strarr[7]+strarr[11]+strarr[7]+strarr[5]+strarr[7]+i+strarr[10]+strarr[9])
  }
  var myAudio = new Audio(); 
  myAudio.preload = true; 
  myAudio.controls = true; 
  myAudio.controlsList = 'nodownload';
  myAudio.oncontextmenu = 'return false';
  myAudio.src = arr.pop();  
  myAudio.addEventListener('ended', playEndedHandler, false); 
  myAudio.play(); 
  document.getElementById("audioBox").appendChild(myAudio); 
  myAudio.loop = false;
  playbox.style.display='block';
  function playEndedHandler(){ 
     myAudio.src = arr.pop(); 
     myAudio.play();
    !arr.length && myAudio.removeEventListener('ended',playEndedHandler,false);
  } 
}else{
  $(str).removeClass('fa-pause').addClass('fa-play');
  playbox.style.display='none';
  playbox.innerHTML='';
}
}
