<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=9" />
	<title>播放器</title>
	<style>
	    html,body{
            width:100%;
            height:100%;
            overflow: hidden;
        }
        * {
            margin: 0;
            padding: 0;
        }
        #container {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            width:100%;
            height:100%;
        }
	</style>
	<script>
	    var m3u8Url = new URLSearchParams(location.search.substring(1)).get('url')
	    var resumeKey = "";
	    if (m3u8Url) {
	     	let parsedUrl = new URL(m3u8Url);
            let videoDomain = parsedUrl.hostname;
            let match = parsedUrl.pathname.match(/\/(\d+)_/);
            let videoId = match ? match[1] : null;   
            resumeKey = `${videoDomain}-${videoId}:progress`;
	    }
	</script>
</head>
<body>
    <div id="container">
        
    </div>
    <script src="js/hls.min.js?_t=202508141626"></script>
    <script src="js/artplayer.js?_t=202508141626"></script>    
    <script>
        document.addEventListener("DOMContentLoaded", (event) => {
            window.player = new Artplayer({
                container: '#container',
                url: m3u8Url,
                autoplay: true,
                autoSize: false,
                loop: false,
                mutex: true,
                setting: true,
                pip: true,
                flip: false,
                lock: true,
                fastForward: true,
                playbackRate: true,
                aspectRatio: true,
                theme: '#ff0057',
                fullscreen: true,
                fullscreenWeb: true,
                miniProgressBar: true,
                autoOrientation: true,
                airplay: false,
                whitelist: ['*'],
                customType: {
                    m3u8: function (video, url) {
                        if (Hls.isSupported()) {
                            if (window.player.hls) window.player.hls.destroy();
                            const hls = new Hls();
                            hls.loadSource(url);
                            hls.attachMedia(video);
                            window.player.hls = hls;
                            window.player.on('destroy', () => hls.destroy());
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = url;
                        } else {
                            window.player.notice.show = 'Unsupported playback format: m3u8';
                        }
                    },
                }
            });
            
            window.video_hash = resumeKey;
            window.player.on('video:progress', (event) => {
                if (!window.player.currentTime) { return }
                if (window.video_hash != "") localStorage.setItem(window.video_hash, window.player.currentTime)
            })
            window.player.on('ready', () => {
                console.log("Atrplayer ready")
                window.player.contextmenu.remove('version')
                var progress = parseFloat(localStorage.getItem(window.video_hash))
                if (isNaN(progress)) {
                    progress = 0
                }
                window.player.seek = progress
            })
			window.player.on('video:ended', () => {
				if(window.parent.$('#playbox').attr('data-index') < window.parent.videoList.length - 1){
		           var nextJISHU=Number(window.parent.$('#playbox').attr('data-index')) + Number(1);
		           window.parent.location.href=(window.parent.moviekuhost)+window.parent.$('.videolist a:eq('+nextJISHU+')').attr('href');
	            }    
            })
        });
    </script>
</body>
</html>