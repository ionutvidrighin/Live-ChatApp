import React from 'react';
import { signIn } from '../components/Firebase';
import SmileLogo from '../avatars/smile.png';
import GoogleLogo from '../avatars/google.png';
import AppLogo from '../avatars/app_logo.png';

const Home = () => {

    return (
        <div className="home">
            <div className="login">
                <img id="smile-icon" src={SmileLogo} alt="smile"/>
                <img id="google-logo" src={GoogleLogo} alt="google"/>
                <h2>Sign In</h2>
                <div onClick={signIn} className="login_button">
                    <img id="logo-btn" src={GoogleLogo} alt="google"/>
                    <p>SIGN IN WITH GOOGLE</p>
                </div>
               <img id="app-logo" src={AppLogo} alt="app-logo"/>
            </div>
        </div>
    )
}

export default Home;
