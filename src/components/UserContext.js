import React, {useState, useEffect, createContext} from 'react';
import { auth } from '../components/Firebase';

const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        auth.onAuthStateChanged((changedUserState) => {
            setUser(changedUserState);
        })
    },[])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext;
export {UserProvider};
