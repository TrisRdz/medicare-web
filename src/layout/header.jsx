import { useHistory } from 'react-router-dom';
import './header.css';

import { useEffect } from 'react';
import { useUserData } from '../store/useUserData';

const Header = () => {

    const history = useHistory();
    const { userData, updateUserData, setUserData } = useUserData();
    const { authToken } = userData || {};

    const isLoggedIn = Boolean(authToken);

    useEffect(() => {
        if (isLoggedIn) {
            updateUserData();
        }
    }, [authToken]);

    const signOut = () => {
        setUserData({
            authToken: null,
            user: null
        })
        localStorage.removeItem('authToken');
        history.replace('/');
    }

    console.log(authToken, 'sadhksahdhaskdhashdashhd');

    return (
        <header className='headerContainer'>
            <h1 className='headerText' onClick={() => history.push('/')}>Medicare</h1>
            <div>
                {isLoggedIn ?
                    <div>
                        <button className='headerButton' onClick={() => history.push('/profile')}>
                            Appointments
                        </button>
                        <button className='headerButton' onClick={signOut}>
                            Sign Out
                        </button>
                    </div>
                    :
                    <button className='headerButton' onClick={() => history.push('/login')}>Sign In</button>}
            </div>
        </header>
    )
}

export default Header;
