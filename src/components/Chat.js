import React, {useState, useRef} from 'react';
import {auth} from './Firebase';
import { useHistory } from "react-router-dom";
import MusicPlayer from '../components/MusicPlayer';
import Button from '@material-ui/core/Button';
import AlbumIcon from '@material-ui/icons/Album';
import Smile from '../avatars/smile_eye.png';
import Avatar from '@material-ui/core/Avatar';
import Bg1 from '../avatars/bg1.jpg';
import Bg2 from '../avatars/bg2.jpg';
import Bg3 from '../avatars/bg3.jpg';
import Bg4 from '../avatars/bg4.jpg';
import Bg5 from '../avatars/bg5.png';

const Chat = ({setBackgroungImg, backgroundImg, roomsContentRender, setRoomsContentRender}) => {

    const [logoutPopUp, setlogoutPopUp] = useState(false);
    const [musicLibrary, setMusicLibrary] = useState(false);

    const history = useHistory();
    const SignOut = () => {
        const askUser = window.confirm('Are you sure you want to logout ?');
        if (askUser) {
            auth.signOut();
            history.push("");
        }
        setRoomsContentRender(false);
        setBackgroungImg("");
    }

    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [seconds, setSeconds] = useState(null);

    const renderClock = () => {
        function generateTime() {
            const date = new Date();
            setHour(date.getHours());
            setMinute(date.getMinutes());
            setSeconds(date.getSeconds());
        }
        setInterval(generateTime, 1000);

        return (
            <div className="clock">
                { roomsContentRender ? (
                    <>
                    <Avatar 
                        onClick={() => setBackgroungImg('bg1')} 
                        src={Bg1} 
                        className="background"
                    />
                    <Avatar 
                        onClick={() => setBackgroungImg('bg2')} 
                        src={Bg2} 
                        className="background"
                    />
                    <Avatar 
                        onClick={() => setBackgroungImg('bg3')} 
                        src={Bg3} 
                        className="background"
                    />
                    <Avatar 
                        onClick={() => setBackgroungImg('bg4')} 
                        src={Bg4} 
                        className="background"
                    />
                    <Avatar 
                        onClick={() => setBackgroungImg('bg5')} 
                        src={Bg5} 
                        className="background"
                    />
                    </>
                ) : ( 
                    <>
                    <div className="second"> 
                        <span className="top">{seconds}</span> 
                    </div>
                        <span className="separator">:</span>
                    <div className="minute"> 
                        <span className="top">{minute}</span> 
                    </div>
                        <span className="separator">:</span>
                    <div className="hour">
                        <span className="top">{hour}</span> 
                    </div>
                    </>
                 ) 
                }
            </div>
        )
    }

    const changeBg = useRef();

    const backGround = () => {
        switch(backgroundImg) {
            case 'bg1':
            changeBg.current.style.backgroundImage = `url(${Bg1})`;
            break;

            case 'bg2':
            changeBg.current.style.backgroundImage = `url(${Bg2})`;
            break;

            case 'bg3':
            changeBg.current.style.backgroundImage = `url(${Bg3})`;
            break;

            case 'bg4':
            changeBg.current.style.backgroundImage = `url(${Bg4})`;
            break;

            case 'bg5':
            changeBg.current.style.backgroundImage = `url(${Bg5})`;
            break;

            default:
        } 
    }
    backGround();

    return (
        <div className="chat">

            <div className="chat_header">
                
                {renderClock()}

                <Button
                    onClick={() => setMusicLibrary(!musicLibrary)}
                    variant="contained"
                    className="music_library"
                    startIcon={<AlbumIcon id="disc" />}
                >
                   <p>Music <span>Library</span> </p>
                </Button>

                <Button
                    onMouseEnter={() => setlogoutPopUp(!logoutPopUp)} 
                    onMouseLeave={() => setlogoutPopUp(!logoutPopUp)}
                    onClick={SignOut}
                    variant="contained"
                    className="logout-btn"
                >
                    Logout
                </Button>

                <div className={logoutPopUp ? "logout-popup-show" : "logout-popup"}>
                    <p>Logout ?</p>
                </div>
            </div>

           <div ref={changeBg} className="conversations">
               <MusicPlayer 
                    musicLibrary={musicLibrary}
                    setMusicLibrary={setMusicLibrary}
               />
                <h2>Welcome</h2>
                <img src={Smile} alt="icon"/>
                <h3>Create a room or select an existing one</h3>
            </div> 
        
        </div>
    )
}

export default Chat;
