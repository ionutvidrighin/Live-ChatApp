import './styles/app.scss';
import React, {useContext, useState} from "react";
import UserContext from './components/UserContext';
import {BrowserRouter, Switch, Route } from "react-router-dom";
//import MusicPlayer from './components/MusicPlayer';
import RoomsContent from './components/RoomsContent';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import ChatMenuForMobile from './components/ChatMenuForMobile';

function App() {

  const user = useContext(UserContext);
  const [backgroundImg, setBackgroungImg] = useState("");
  const [roomsContentRender, setRoomsContentRender] = useState(false);

  return (
    <div className="app">
      <BrowserRouter>
        <Switch>  

      {!user ? ( <Route path="/">
              <Home roomsContentRender={roomsContentRender} />
          </Route>
        ) : (   
        <>
          <div className="chat_rooms">
            <ChatMenuForMobile />
          </div> 

          <div className="app_container">
            <Sidebar />
            <Chat
              roomsContentRender={roomsContentRender}
              setRoomsContentRender={setRoomsContentRender}
              backgroundImg={backgroundImg} 
              setBackgroungImg={setBackgroungImg}
            />
            <Route path="/rooms/:roomId">
              <RoomsContent
                setRoomsContentRender={setRoomsContentRender}
                backgroundImg={backgroundImg} 
              />
            </Route>
          </div>
        </>
        )
      }
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
