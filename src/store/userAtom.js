import { atom } from 'recoil';
import { defaultUserData } from '../constants';

const userAtom = atom({
    key: 'UserData',
    default: defaultUserData
});

export default userAtom;

