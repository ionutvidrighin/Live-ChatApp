import React, {useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";
import dataBase from '../components/Firebase';
import UserContext from './UserContext';
import SidebarUserProfile from './SidebarUserProfile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import ChatRoomIcon from '../avatars/chat-room.jpg';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Sidebar = ({setMusic}) => {

    const user = useContext(UserContext);
    const [profileState, setprofileState] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [userAvatar, setUserAvatar] = useState("");
    const [test, setTest] = useState(false);

    useEffect( () => {
        setUserAvatar(user.photoURL);
    }, [user])

    useEffect( () => {
        dataBase.collection('rooms').onSnapshot((item) =>
        setRooms(item.docs.map( (doc) => ({
                id : doc.id,
                data: doc.data()
                }))
            )
        )
    }, [])

    const createNewRoom = () => {
        const roomName = prompt('Enter room name');
        if (roomName) {
            dataBase.collection('rooms').add({
                name: roomName
            })
            .then(() => console.log('creat'))
        }
    }

    return (
        <div className="sidebar">

            <div className="sidebar__header">

            <div className={test ? "show-up" : "test-toggle"}>
                <p>Create new chat room ?</p>
            </div>

            <Fab 
                onMouseEnter={() => setTest(!test)} 
                onMouseLeave={() => setTest(!test)}
                onClick={createNewRoom}
            >
                <AddIcon />
            </Fab>

            <MoreHorizIcon onClick={() => setprofileState(!profileState)} id="menu_bullets" />
                <Avatar src={userAvatar}/>
                <h4>{user.displayName}</h4>
            </div>

            { profileState ? (
                <SidebarUserProfile 
                    setUserAvatar={setUserAvatar} 
                    setprofileState={setprofileState} 
                />
            ) : (
            <div className="rooms__container">
                {rooms.map((element, i) => (
                    <Link className="room" key={i} to={`/rooms/${element.id}`}>
                        <div key={element.id} className="channel">
                            <Avatar src={ChatRoomIcon}/>
                            <h3>{element.data.name}</h3>
                        </div>
                    </Link>
                    )
                )}

            </div>
            ) }

          
        </div>
    )
}

export default Sidebar
