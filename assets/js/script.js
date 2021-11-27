function playmusic(){
 var playbox = document.getElementById('audioBox');
 if(playbox.style.display=='none'){	
  var arr = [];
  for(i=1;i<45;i++){
     arr.push('https://cdn.jsdelivr.net/gh/lanye/lanyeaudio@master/'+i+'.mp3')
  }
  var myAudio = new Audio(); 
  myAudio.preload = true; 
  myAudio.controls = true; 
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
 playbox.style.display='none';
 playbox.innerHTML='';
}
}
