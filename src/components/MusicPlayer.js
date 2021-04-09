import React, {useState, useRef, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const MusicPlayer = ({musicLibrary, setMusicLibrary}) => {

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [songDuration, setSongDuration] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    })
    const audioRef = useRef();

    useEffect(() => {
        const getAllSongs = async () => {
            const data = await fetch('https://livechat-backend-ionut.herokuapp.com/songs');
            const res = await data.json();
            await setSongs(res);  
            await setCurrentSong(res[0]);  
        }
        getAllSongs();       

    }, [])
   
    const playSong = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const songDetails = async (e) => {
        const current = e.target.currentTime;
        const roundedSongCurrentTime = Math.round(current);
        const roundedSongDuration = Math.round(e.target.duration);
        const animation = Math.round((roundedSongCurrentTime / roundedSongDuration) * 100)
        await setSongDuration({...songDuration,
                        currentTime: current, 
                        duration: e.target.duration,
                        animationPercentage: animation})
    }
    
    const musicSlider = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongDuration({...songDuration, currentTime: e.target.value})
    }

    const volumeHandler = (e) => {
        const val = Number(e.target.value / 100);
        setVolume(val);
        audioRef.current.volume = val;
    }

    const skipSong = async (direction) => {
        let songIndex = songs.findIndex((element) => element._id === currentSong._id);
        if (direction === 'forward') {
            await setCurrentSong(songs[(songIndex + 1) % songs.length])
            if(isPlaying) audioRef.current.play();
        }
        if (direction === 'rewind') {
            if((songIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1])
                if(isPlaying) audioRef.current.play();
                return
            }
            await setCurrentSong(songs[(songIndex - 1) % songs.length])
            if(isPlaying) audioRef.current.play();
        }
    }

    const autoSkip = async () => {
        const songIndex = songs.findIndex((element) => element._id === currentSong._id);
        await setCurrentSong(songs[(songIndex + 1) % songs.length])
        if(isPlaying) audioRef.current.play();
    }


    return (
        <div className={musicLibrary ? "music_open" : "music_closed"}>

            <div className="top__section">
                <div onClick={() => setMusicLibrary(!musicLibrary)} id="closing__arrow">
                    <ChevronLeftIcon />
                </div>

                <Avatar 
                    id="song_image"
                    src={currentSong === undefined ? "" : currentSong.img}
                />

                <div className="volume">
                    <VolumeDownIcon className="volume__control" />
                    <input onChange={volumeHandler} id="volume_bar" type="range" defaultValue={100}/>
                    <VolumeUpIcon className="volume__control" />
                </div>

                <div className="song__name">
                    <p>{currentSong === undefined ? "" : currentSong.name}</p>
                </div>
               
                <div className="audio_slider">
                    <input 
                        onChange={musicSlider} 
                        value={songDuration.currentTime}
                        max={songDuration.duration || 0}
                        id="music_bar" 
                        type="range" 
                    />

                    <div 
                        className="slider" 
                        style={{transform: `translateX(${songDuration.animationPercentage}%)`}}> 
                    </div>
                </div>
  
                <div className="audio__section">

                    <FastRewindRoundedIcon onClick={() => skipSong('rewind')} id="rewind"/>
                    
                    {!isPlaying ? (
                    <Fab size="small">
                        <PlayCircleFilledWhiteRoundedIcon onClick={playSong}/>
                    </Fab> ) : ( <Fab size="small">
                        <PauseCircleFilledRoundedIcon onClick={playSong}/>
                    </Fab>)}

                    <FastForwardRoundedIcon onClick={() => skipSong('forward')} id="forward"/>

                    <audio 
                        onTimeUpdate={songDetails}
                        onEnded={autoSkip}
                        ref={audioRef} 
                        src={currentSong === undefined ? "" : currentSong.url} >
                    </audio>

                </div>
            </div>

            <div className="bottom__section">
                {songs.map((song) => (
                    <div 
                        onClick={ () => { (async function() {
                                        await setCurrentSong(song)
                                        if (isPlaying) audioRef.current.play();
                                        //console.log(song)
                                        //console.log(currentSong)
                                    })()
                            	} } 
                        className={currentSong === undefined ? "" : song._id === currentSong._id ? "song-active" : "song" }                        
                        key={song._id}>
                        <p>{song.name}</p>
                    </div>
                    ) 
                )}
            </div>
        </div>
    )
}

export default MusicPlayer;
