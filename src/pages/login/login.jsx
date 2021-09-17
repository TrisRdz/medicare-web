import { useState, useMemo } from "react"

import { useLocation, useHistory } from "react-router-dom";
import DefaultInput from "../../components/input/input";
import { validateEmail } from "../../utils/validations";
import '../../App.css'
import apiCall from "../../utils/api";
import { useSetRecoilState } from "recoil";
import userAtom from "../../store/userAtom";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setUserAtom = useSetRecoilState(userAtom);
    const history = useHistory();

    const { state } = useLocation();
    const isValidInput = useMemo(() => {
        if (!email.length || !password.length) {
            return false;
        };
        if (!validateEmail(email)) {
            return false;
        }
        return true;
    }, [email, password]);

    const login = async () => {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        const response = await apiCall({
            method: 'POST',
            data: formData,
            url: 'token'
        });
        const authToken = response && response.data && response.data.access_token;
        if (authToken) {
            setUserAtom({
                authToken
            });
            localStorage.setItem('authToken', authToken);
            history.replace('/');
        }
    }

    return (
        <div>
            {state && state.fromSignupFlow &&
                <p style={{
                    backgroundColor: 'lightgreen',
                    maxWidth: 'max-content',
                    padding: 10, borderRadius: 5,
                    borderColor: 'green',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    marginBottom: 20
                }}>
                    Account Created. Please login to continue
                </p>}
            <div className='authContainer'>
                <DefaultInput
                    value={email}
                    placeholder='Enter email'
                    label='Email'
                    onChange={(event) => setEmail(event.target.value)}
                />
                <DefaultInput
                    value={password}
                    placeholder='Enter password'
                    label='Password'
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div style={{ margin: '20px 0', fontSize: 14 }}>
                    <a href='/register' >New user? Register here</a>
                </div>
                <button className='primaryButton' disabled={!isValidInput} onClick={login}>
                    Login
                </button>
            </div>
        </div>
    )
};

export default LoginPage;
