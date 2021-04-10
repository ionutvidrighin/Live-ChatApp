import React, {useState, useEffect, useContext, useRef} from 'react';
import UserContext from './UserContext';
import { useParams } from "react-router-dom";
import dataBase from './Firebase';
import firebase from 'firebase';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import msgTone from '../avatars/message_tone.mp3';
import Bg1 from '../avatars/bg1.jpg';
import Bg2 from '../avatars/bg2.jpg';
import Bg3 from '../avatars/bg3.jpg';
import Bg4 from '../avatars/bg4.jpg';
import Bg5 from '../avatars/bg5.png';

const RoomsContent = ({backgroundImg, setRoomsContentRender}) => {

    const user = useContext(UserContext);
    const [getMessage, setGetMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [msgId, setMsgId] = useState("");
    const [editedMsg, setEditedMsg] = useState("");
    const [showMsgUniqueId, setShowMsgUniqueId] = useState("");

    const { roomId } = useParams();

    useEffect( () => {
       dataBase.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot(item => (
            setGetMessage(item.docs.map(message => ({
                id: message.id,
                data: message.data()
            }) ))
        ))
    },[roomId])

    useEffect(() => {
        setRoomsContentRender(true);
    })
    
    const msgRef = useRef();
    useEffect(() => {
        const triggerMessageTone = async () => {
            let arr = await getMessage[getMessage.length - 1];
            if (arr === undefined) return;
            else if (arr.data.name !== user.displayName)  {
                msgRef.current.play();
                return;
            }
        }
        triggerMessageTone()       
    },[getMessage])

    const sendNewMessage = (e) => {
        e.preventDefault();
        dataBase.collection('rooms').doc(roomId).collection('messages').add({
            message: newMessage,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setNewMessage("");
    }

    const submitEditedMsg = (e) => {
        e.preventDefault();
        dataBase.collection('rooms').doc(roomId).collection('messages').doc(msgId).set({
            message: editedMsg,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setEditedMsg("");
    }

    const changeBgImg = useRef();

    const backGround = () => {
        switch(backgroundImg) {
            case 'bg1':
            changeBgImg.current.style.backgroundImage = `url(${Bg1})`;
            break;

            case 'bg2':
            changeBgImg.current.style.backgroundImage = `url(${Bg2})`;
            break;

            case 'bg3':
            changeBgImg.current.style.backgroundImage = `url(${Bg3})`;
            break;

            case 'bg4':
            changeBgImg.current.style.backgroundImage = `url(${Bg4})`;
            break;

            case 'bg5':
            changeBgImg.current.style.backgroundImage = `url(${Bg5})`;
            break;

            default:
        } 
    }
    backGround();


    return (
        <div ref={changeBgImg} className="chatroom__content">
            <audio ref={msgRef} src={msgTone}></audio>

            <div className="conversations">
                {
                    getMessage.map(({data, id}) => (
                        <div
                            onMouseEnter={() => setShowMsgUniqueId(id)} 
                            onMouseLeave={() => setShowMsgUniqueId("")} 
                            key={id} 
                            className={`message_sender ${data.name === user.displayName && "message_receiver"}`}>
                            
                            <span id="name">{data.name.substr(0, data.name.indexOf(' ')) || data.name}</span>
                            {data.message}
                            <span id="date">{new Date(data.timestamp?.toDate()).toLocaleDateString("en-US")}</span>
                            
                            <div className="edit-delete_section">
                                <EditIcon
                                    className={ id === showMsgUniqueId && data.name === user.displayName ? "show" : "hide"} 
                                    onClick={ () => (function(){
                                                        if(data.name === user.displayName) {
                                                        setMsgId(id);
                                                    }
                                                })() }
                                />

                                <DeleteOutlineIcon 
                                    className={ id === showMsgUniqueId && data.name === user.displayName ? "show" : "hide"}
                                    onClick={() => function deleteMsg() {
                                                        const userRes = window.confirm('You really want to delete?')
                                                        if (!userRes) return
                                                        dataBase.collection('rooms').doc(roomId).collection('messages').doc(id).delete()
                                                    }()
                                            }
                                />
                            </div>

                            <form className="edit__form">
                                <input 
                                    type='text' 
                                    value={editedMsg} 
                                    onChange={(e) => setEditedMsg(e.target.value)} 
                                    className={id === msgId && data.name === user.displayName ? `show-editField` : `hide-editField`}
                                />
                                <HighlightOffIcon 
                                    onClick={() => setMsgId("")} 
                                    className={id === msgId && data.name === user.displayName ? `show-closeEditField` : `hide-closeEditField`}
                                />
                                
                                <button
                                    id="submit-edit__btn" 
                                    onClick={submitEditedMsg} 
                                    type="submit"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    ))
                }
            </div>

            <div className="footer">
                <form>
                    <input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        type="text" 
                        placeholder="type a message..."
                    />
                    <button 
                        onClick={sendNewMessage} 
                        type="submit"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RoomsContent;
