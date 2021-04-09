import React, {useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";
import dataBase from '../components/Firebase';
import UserContext from './UserContext';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';

const ChatMenuForMobile = () => {

    const user = useContext(UserContext);
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");
    const [rooms, setRooms] = useState([]);

    useEffect( () => {
        setUserAvatar(user.photoURL);
        setUserName(user.displayName);
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
        <div className="menu__mobile">

            <div className="new_room">

                <Fab id="add_new_room" onClick={createNewRoom} >
                    <AddIcon />
                </Fab>
            </div>

            <div className="user_data">
                <Avatar src={userAvatar} id="user_avatar" />
                <h4>{userName}</h4>
            </div>

            <div className="all_rooms">
                <h3>Chat Rooms</h3>
                <div className="rooms_area">
                {rooms.map((element, i) => (
                    <Link className="room" key={i} to={`/rooms/${element.id}`}>
                        <span>{element.data.name}</span>
                    </Link>
                    )
                )}
                </div>
            </div>

        </div>
    )
}

export default ChatMenuForMobile;
