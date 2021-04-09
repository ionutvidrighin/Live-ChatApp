import React, {useState, useEffect, useContext} from 'react';
import UserContext from './UserContext';
import CancelIcon from '@material-ui/icons/Cancel';
import Pic1 from '../avatars/pic1.jpg';
import Pic2 from '../avatars/pic2.jpg';
import Pic3 from '../avatars/pic3.jpg';


const SidebarUserProfile = ({setUserAvatar, setprofileState}) => {

    const user = useContext(UserContext);
    const [retrieveImages, setRetrieveImages] = useState([]);
    //const [defaultAvatars] = useState(Avatars);
    const [userUniqueId, setUserUniqueId] = useState("");

    useEffect(() => {
        const getImages = async () => {
            const data = await fetch('https://livechat-backend-ionut.herokuapp.com/');
            const res = await data.json()
            setRetrieveImages(res);
        }
        getImages();

    }, [user.uid])


    useEffect(() => {
        const getUserId = () => {
            retrieveImages.map(element => setUserUniqueId(element.id))
        }
        getUserId();
    },[retrieveImages])

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
            <>
            <h3 id="local-time">Local Time</h3>
            <div className="clock">
                <div className="clock_hour"> 
                    <span className="top">{hour}</span> 
                    <span className="bottom">hour</span> 
                </div>
                <div className="clock_minute"> 
                    <span className="top">{minute}</span> 
                    <span className="bottom">minute</span> 
                </div>
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}} className="clock_second"> 
                    <span className="top">{seconds}</span> 
                    <span className="bottom">seconds</span> 
                </div>
            </div>
            </>
        )
    }

    return (
        <div className="sidebar__user_profile">
            <CancelIcon onClick={() => setprofileState(false)} />

            <h3 className="change-avatar"> <span>Change profile picture</span> </h3>    
            
            <div className="images">
            {
                userUniqueId === user.uid ? (
                    <>
                    {retrieveImages.map((image, i) => 
                    <div key={i} className="img-avatars">
                        <img onClick={() => setUserAvatar(image.imageURL)}
                        src={image.imageURL} alt="avatar"/>
                    </div> 
                     )}
                    </>
                    ) : (
                    <>
                    <div className="img-avatars">
                        <img onClick={() => setUserAvatar(Pic1)}
                        src={Pic1} alt="avatar"/>
                    </div> 

                    <div className="img-avatars">
                        <img onClick={() => setUserAvatar(Pic2)}
                        src={Pic2} alt="avatar"/>
                    </div> 

                    <div className="img-avatars">
                        <img onClick={() => setUserAvatar(Pic3)}
                        src={Pic3} alt="avatar"/>
                    </div> 
                    </>
                    )
            }
            </div>

            {renderClock()}
            
        </div>
    )
}

export default SidebarUserProfile;
