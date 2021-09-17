import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../store/userAtom';
import './header.css';

import UserPlaceholder from '../assets/userPlaceholder.png';

const Header = () => {

    const history = useHistory();
    const { authToken } = useRecoilValue(userAtom);

    return (
        <header className='headerContainer'>
            <h1 className='headerText' onClick={() => history.push('/')}>Medicare</h1>
            <div>
                {authToken ?<img src={UserPlaceholder} alt='userImage' className='userImage' onClick={() => history.push('/profile')} /> :
                    <button className='loginButton' onClick={() => history.push('/login')}>Login</button>}
            </div>
        </header>
    )
}

export default Header;
