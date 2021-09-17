import { atom } from 'recoil';

const defaultUserData = {
    authToken: localStorage.getItem('authToken')
}

const userAtom = atom({
    key: 'UserData',
    default: defaultUserData
});

export default userAtom;

